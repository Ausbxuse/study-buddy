package discover;
import account.Account;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;



public class Matching {
    public ArrayList<Account> getListofMatches(String username) throws ClassNotFoundException{

        ArrayList<Account> matches; 

        Connection conn = null;
		Statement st = null;
		ResultSet rs = null;
		int  uid = -1;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://localhost/fillin?user=root&password=fillin");
			st = conn.createStatement();
            PreparedStatement preparedStatement = connection.prepareStatement("SELECT UID FROM Users WHERE username = ?");
            preparedStatement.setString(1, username);

            rs = preparedStatement.executeQuery();

            if (rs.next()) {
                uid = rs.getInt("UID");
            }


		} catch (SQLException sqle) {
			System.out.println(sqle.getMessage());
		}
		finally {
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
			} catch (SQLException sqle) {
				System.out.println(sqle.getMessage());
			}
		}
		return matches;
	}

       
}
