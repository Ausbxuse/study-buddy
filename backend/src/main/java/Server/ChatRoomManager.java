import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ChatRoomManager {
    private static final ConcurrentHashMap<String, ChatroomThread> chatRooms = new ConcurrentHashMap<>();
    private static final ExecutorService executorService = Executors.newCachedThreadPool();
    
    public static void createChatRoom(String roomName, boolean isPrivate, String ChatRoompassword) {
    	// Connect to database
        String url = "jdbc:mysql://localhost:3306/finalProject";
        String username = "root";
        String password = "password";

        try (Connection connection = DriverManager.getConnection(url,username, password)) {
            // Insert a new chat room into the database
            String insertQuery = "INSERT INTO Chatrooms (NAME, PRIVATE, PASSWORD) VALUES (?, ?, ?, ?)";
            try (PreparedStatement preparedStatement = connection.prepareStatement(insertQuery)) {
                preparedStatement.setString(1, roomName);
                preparedStatement.setBoolean(2, isPrivate);
                preparedStatement.setString(3, ChatRoompassword); // Assuming no password for now

                int rowsAffected = preparedStatement.executeUpdate();
                if (rowsAffected > 0) {
                    // If the room creation is successful, initiate the chat room thread
                    ChatroomThread chatRoomThread = new ChatroomThread(roomName);
                    chatRooms.put(roomName, chatRoomThread);
                    executorService.submit(chatRoomThread);
                } else {
                    // Handle failure to create the chat room
                    System.out.println("Failed to create chat room in the database.");
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }


}
