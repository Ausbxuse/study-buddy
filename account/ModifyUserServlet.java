import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/ModifyUserServlet")
public class ModifyUserServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public ModifyUserServlet() {
        super();
    }

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String username = request.getParameter("username");
		String password = request.getParameter("password");
        String firstname = request.getParameter("firstname");
        String lastname = request.getParameter("lastname");
        String prefname = request.getParameter("prefname");
        String shortterm = request.getParameter("shortterm");
        String longterm = request.getParameter("longterm");
        String gpa = request.getParameter("gpa");
        String year = request.getParameter("year");
		
		JDBC jdbc = new JDBC();
		try {
			jdbc.modifyUser(username, password, firstname, lastname, prefname, shortterm, longterm, gpa, year);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
	}
}