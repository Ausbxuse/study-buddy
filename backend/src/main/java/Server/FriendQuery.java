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

@WebServlet("/FriendQuery")
public class FriendQuery extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String userId = request.getParameter("userId");
        JsonArray friendList = new JsonArray();
        Gson gson = new Gson();

        String sql = "SELECT u.* FROM USERS u " +
                     "JOIN FRIENDS f ON u.UID = f.FUID " +
                     "WHERE f.UID = ?";
        
        try {
			Class.forName("com.mysql.cj.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
        try (Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/CHATDB", "root", "PASSWORD");
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, Integer.parseInt(userId));
            
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    JsonObject friend = new JsonObject();
                    friend.addProperty("UID", rs.getInt("UID"));
                    friend.addProperty("USERNAME", rs.getString("USERNAME"));
                    friend.addProperty("FIRSTNAME", rs.getString("FIRSTNAME"));
                    friend.addProperty("LASTNAME", rs.getString("LASTNAME"));
                    friend.addProperty("PREFNAME", rs.getString("PREFNAME"));
                    friend.addProperty("SHORTTERM", rs.getBoolean("SHORTTERM"));
                    friend.addProperty("LONGTERM", rs.getBoolean("LONGTERM"));
                    friend.addProperty("GPA", rs.getDouble("GPA"));
                    friend.addProperty("YEAR", rs.getInt("YEAR"));
                    friendList.add(friend);
                }
            }
        } catch (SQLException e) {
            throw new ServletException("SQL error", e);
        }

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST");
        response.setHeader("Access-Control-Allow-Headers", "Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization");
        response.getWriter().write(gson.toJson(friendList));
    }
}
