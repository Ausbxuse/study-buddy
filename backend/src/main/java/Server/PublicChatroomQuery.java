package Server;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/PublicChatroomQuery")
public class PublicChatroomQuery extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        JsonArray chatroomList = new JsonArray();
        Gson gson = new Gson();
        
        try {
			Class.forName("com.mysql.cj.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
        try (Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/CHATDB", "root", "PASSWORD");
             PreparedStatement stmt = conn.prepareStatement("SELECT CID, NAME FROM CHATROOMS WHERE PRIVATE = 0");
             ResultSet rs = stmt.executeQuery()) {
            
            while (rs.next()) {
                JsonObject chatroom = new JsonObject();
                chatroom.addProperty("CID", rs.getInt("CID"));
                chatroom.addProperty("NAME", rs.getString("NAME"));
                chatroomList.add(chatroom);
            }
        } catch (SQLException e) {
            throw new ServletException("SQL error", e);
        }

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST");
        response.setHeader("Access-Control-Allow-Headers", "Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization");
        response.getWriter().write(gson.toJson(chatroomList));
    }
}
