package final_proj;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

@WebServlet("/RoomsServlet")
public class RoomsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        PrintWriter out = resp.getWriter();

        Map<String, Integer> rooms = ChatEndpoint.getRoomCounts();
        System.out.println(rooms);
        // Convert the rooms map to JSON
        String json = new Gson().toJson(rooms);
        out.println(json);
    }
}