//allows room chat and individual chat
//for individual chat, type "@user" before message

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.HashMap;
import java.util.Map;

public class ChatServer {
    private int port = 6789;
    protected Map<String, ClientHandler> clients;

    public ChatServer(int port) {
        this.port = port;
        this.clients = new HashMap<>();
    }

    public void start() {
        try (ServerSocket serverSocket = new ServerSocket(port)) {
            System.out.println("Chat Server is listening on port " + port);

            while (true) {
                Socket socket = serverSocket.accept();
                ClientHandler newUser = new ClientHandler(socket, this);
                newUser.start();
            }

        } catch (IOException e) {
            System.out.println("Error in the server: " + e.getMessage());
            e.printStackTrace();
        }
    }

    void addClient(String userName, ClientHandler clientHandler) {
        clients.put(userName, clientHandler);
    }

    void removeClient(String userName, ClientHandler clientHandler) {
        clients.remove(userName);
        System.out.println("The user " + userName + " quitted.");
    }

    void broadcast(String message, ClientHandler excludeUser) {
        for (ClientHandler aClient : clients.values()) {
            if (aClient != excludeUser) {
                aClient.sendMessage(message);
            }
        }
    }

    void sendPrivateMessage(String message, String userName) {
        clients.get(userName).sendMessage(message);
    }

    public static void main(String[] args) {
        ChatServer server = new ChatServer(6789);
        server.start();
    }
}