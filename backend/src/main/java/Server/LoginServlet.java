import javax.servlet.http.*;

import com.google.gson.Gson;
import com.google.gson.annotations.Expose;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.annotation.WebServlet;

@WebServlet("/login")
public class LoginServlet extends HttpServlet{
	public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException{
		String s = "";
		BufferedReader reader = req.getReader();
		String temp;
		while((temp = reader.readLine()) != null) {
			s += temp;
		}
		System.out.println(s);
		resp.addHeader("Access-Control-Allow-Origin", "*");
		resp.addHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, HEAD");
		resp.addHeader("Access-Control-Allow-Headers", "X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept");
		resp.addHeader("Access-Control-Max-Age", "1728000");
		ResponseContent content = new ResponseContent("success","123456");
		Gson gson = new Gson();
		resp.setContentType("application/json");
		resp.getWriter().print(gson.toJson(content));
	}
	public void doOptions(HttpServletRequest req, HttpServletResponse resp) throws IOException{
		resp.setHeader("Access-Control-Allow-Origin", "*");
		resp.setHeader("Access-Control-Allow-Methods", "POST");
		resp.setHeader("Access-Control-Allow-Headers", "Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization");
		resp.getWriter().write("Hello");
	}
	private class ResponseContent {
		@Expose
		public String state;
		@Expose
		public String token;
		public ResponseContent(String n, String c) {state = n; token = c;}
		public String getState() {return state;}
		public String getToken() {return token;}
		public void setState(String s) {state = s;}
		public void setToken(String s) {token = s;}
	}

}