import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

public class UserAuthentication {

    // JDBC Database URL
    static final String url = "jdbc:mysql://localhost:3306/finalProject";
    // Database credentials
    static final String username = "root";
    static final String password = "password";

    // Check user credentials and return authentication token
    public static String authenticateUser(String username, String password) {
        Connection conn = null;
        PreparedStatement st = null;
        ResultSet rs = null;

        try {
            // Open a connection
            conn = DriverManager.getConnection(url, username, password);

            // Prepare SQL query
            String sql = "SELECT username, password FROM users WHERE username=?";
            st = conn.prepareStatement(sql);
//            stmt.setString(1, username);

            // Execute the query
            rs = st.executeQuery();

            // Check if the user exists
            if (rs.next()) {
                // Verify password using basic hashing
                String storedPassword = rs.getString("password");
                if (verifyPassword(password, storedPassword)) {
                    // Authentication successful
                    String authToken = generateAuthToken();
                    return "{\"status\": \"success\", \"token\": \"" + authToken + "\"}";
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            // Close resources
            try {
                if (rs != null) {
                	rs.close();
                }
                if (st != null) {
                	st.close();
                }
                if (conn != null) {
                	conn.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        // Authentication failed
        return "{\"status\": \"failed\", \"message\": \"Authentication failed.\"}";
    }

    // Verify password using basic hashing
    private static boolean verifyPassword(String inputPassword, String storedPassword) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hashedInput = md.digest(inputPassword.getBytes(StandardCharsets.UTF_8));

            // Convert byte array to hexadecimal format
            StringBuilder hexStringBuilder = new StringBuilder();
            for (byte b : hashedInput) {
                hexStringBuilder.append(String.format("%02x", b));
            }

            // Compare stored hashed password with newly hashed input password
            return hexStringBuilder.toString().equals(storedPassword);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return false;
        }
    }

    // Generate a random authentication token
    private static String generateAuthToken() {
        return UUID.randomUUID().toString();
    }
}
