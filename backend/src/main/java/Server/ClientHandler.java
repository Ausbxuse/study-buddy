
import java.io.*;
import java.net.Socket;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ClientHandler extends Thread {
    private Socket socket;
    private ChatServer server;
    private PrintWriter writer;

    public ClientHandler(Socket socket, ChatServer server) {
        this.socket = socket;
        this.server = server;
    }

    public void run() {
        try {
            InputStream input = socket.getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(input));

            OutputStream output = socket.getOutputStream();
            writer = new PrintWriter(output, true);

            printUsers();

            String userName = reader.readLine();
            server.addClient(userName, this);

            String serverMessage = "New user connected: " + userName;
            server.broadcast(serverMessage, this);

            String clientMessage;

            do {
                clientMessage = reader.readLine();
                if (clientMessage.startsWith("@")) {
                    String[] parts = clientMessage.split(" ", 2);
                    if (parts.length > 1) {
                        String targetUser = parts[0].substring(1);
                        String personalizedMessage = "[" + userName + " (private)]: " + parts[1];
                        server.sendPrivateMessage(personalizedMessage, targetUser);
                    }
                } else {
                    serverMessage = "[" + userName + "]: " + clientMessage;
                    server.broadcast(serverMessage, this);
                }
            } while (!clientMessage.equals("bye"));

            server.removeClient(userName, this);
            socket.close();

            serverMessage = userName + " has left.";
            server.broadcast(serverMessage, this);

        } catch (IOException ex) {
            System.out.println("Error in ClientHandler: " + ex.getMessage());
            ex.printStackTrace();
        }
    }

    void sendMessage(String message) {
        writer.println(message);
    }

    private void printUsers() {
        if (server.clients.size() > 0) {
            writer.println("Connected users: " + server.clients.keySet());
        } else {
            writer.println("No other users connected");
        }
    }
}