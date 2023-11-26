import java.sql.*;

public class JDBC {
	public void registerUser(String username, String password, String firstname, String lastname, String prefname, String shortterm, String longterm, String gpa, String year) throws ClassNotFoundException {
		Connection conn = null;
		PreparedStatement st = null;
		
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://localhost/fillin?user=root&password=fillin");
			
			st = conn.prepareStatement("INSERT INTO Users (username, password, firstname, lastname, prefname, shortterm, longterm, gpa, year) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
			st.setString(1, username);
			st.setString(2, password);
			st.setString(3, firstname);
            st.setString(4, lastname);
			st.setString(5, prefname);
			st.setString(6, shortterm);
            st.setString(7, longterm);
			st.setString(8, gpa);
			st.setString(9, year);
			st.executeUpdate();
			
		}
		catch (SQLException sqle) {
			System.out.println(sqle.getMessage());
		} catch (ClassNotFoundException ex) {
			System.out.println("MySQL Driver not found!");
		}
		finally {
			try {
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
	}

    public void modifyUser(String username, String password, String firstname, String lastname, String prefname, String shortterm, String longterm, String gpa, String year) throws ClassNotFoundException {
		Connection conn = null;
		PreparedStatement st = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://localhost/fillin?user=root&password=fillin");
            
            st = conn.prepareStatement("UPDATE Users SET password=?, firstname=?, lastname=?, prefname=?, shortterm=?, longterm=?, gpa=?, year=? WHERE username=?");
            st.setString(1, password);
            st.setString(2, firstname);
            st.setString(3, lastname);
            st.setString(4, prefname);
            st.setString(5, shortterm);
            st.setString(6, longterm);
            st.setString(7, gpa);
            st.setString(8, year);
            st.setString(9, username); 
            st.executeUpdate();
			
		}
		catch (SQLException sqle) {
			System.out.println(sqle.getMessage());
		} catch (ClassNotFoundException ex) {
			System.out.println("MySQL Driver not found!");
		}
		finally {
			try {
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
	}

    public Account userInfo(String username) throws ClassNotFoundException {
		Connection conn = null;
		Statement st = null;
		ResultSet rs = null;
        Account u;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://localhost/fillin?user=root&password=fillin");
            st = conn.createStatement();
            rs = st.executeQuery("SELECT username, password, firstname, lastname, prefname, shortterm, longterm, gpa, year FROM Users u");

            while (rs.next()) {
                String us = rs.getString("username");
                if (us.equals(username)) {
                    u = new Account(us, rs.getString("password"), rs.getString("firstname"), rs.getString("lastname"), rs.getString("prefname"),
                    rs.getString("shorterm"), rs.getString("longterm"), rs.getString("gpa"), rs.getString("year"));
                }
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
        return u;
    }
}