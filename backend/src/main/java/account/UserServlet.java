package account;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;


@WebServlet("/UserServlet")
public class UserServlet extends HttpServlet {
  private static final long serialVersionUID = 1L;

  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    // Set CORS headers
    response.setHeader("Access-Control-Allow-Origin", "*"); // Allow any origin
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // Allowed methods
    response.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allowed headers

    String username = request.getParameter("username");
    String action = request.getParameter("action");
    JDBC jdbc = new JDBC();
    try {
    if (action.equals("Register")) {
        String password = request.getParameter("password");
        String firstname = request.getParameter("firstname");
        String lastname = request.getParameter("lastname");
        String prefname = request.getParameter("prefname");
        String shortterm = request.getParameter("shortterm");
        String longterm = request.getParameter("longterm");
        String gpa = request.getParameter("gpa");
        String year = request.getParameter("year");
        int error = jdbc.registerUser(username, password, firstname, lastname, prefname, Boolean.parseBoolean(shortterm), Boolean.parseBoolean(longterm), Double.parseDouble(gpa), Integer.parseInt(year));
        if (error == 1) {
          response.setContentType("text/plain");
          response.getWriter().write("existingUsername");	
        } else {
          response.setContentType("text/plain");
          response.getWriter().write("noError");
        }
      } else if (action.equals("Modify")) {
        String password = request.getParameter("password");
        String firstname = request.getParameter("firstname");
        String lastname = request.getParameter("lastname");
        String prefname = request.getParameter("prefname");
        String shortterm = request.getParameter("shortterm");
        String longterm = request.getParameter("longterm");
        String gpa = request.getParameter("gpa");
        String year = request.getParameter("year");
        jdbc.modifyUser(username, password, firstname, lastname, prefname, Boolean.parseBoolean(shortterm), Boolean.parseBoolean(longterm), Double.parseDouble(gpa), Integer.parseInt(year));
      } else if (action.equals("Info")) {
        Account results = jdbc.userInfo(username);
        Gson gson = new Gson();
        String jsonRestaurantData = gson.toJson(results);
        response.setContentType("application/json");
        response.getWriter().write(jsonRestaurantData);
      }
    } catch (ClassNotFoundException e) {
      e.printStackTrace();
    }
  }
}
