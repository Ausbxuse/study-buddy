package discover;
import javax.servlet.annotation.WebServlet;
import java.io.*;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import com.google.gson.Gson;



@WebServlet("/fetchDiscover")
public class FetchDiscover extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        
        JDBC jdbc = new JDBC();
        String json = "";
        String username = request.getParameter("username");
        try {
            json = jdbc.getListofMatches(username);

        }
        catch (ClassNotFoundException cnfe) {
        	System.out.println(cnfe.getMessage());
        }



        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST");
        response.setHeader("Access-Control-Allow-Headers", "Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization");
        response.getWriter().write(json); 

        //response.getWriter().println(json);

        
    }
}
