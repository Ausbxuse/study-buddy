package account;

import java.sql.*;

public class JDBC {
  public ResponseMessage registerUser(String username, String password, String firstname, String lastname, String prefname, boolean shortterm, boolean longterm, Double gpa, Integer year) throws ClassNotFoundException {
    Connection conn = null;
    PreparedStatement st = null;
    Statement st2 = null;
    ResultSet rs = null;
    ResponseMessage rm = new ResponseMessage("success", "Successfully registered user");
    try {
      Class.forName("com.mysql.cj.jdbc.Driver");
      conn = DriverManager.getConnection("jdbc:mysql://localhost/CHATDB?user=root&password=fillin");
      st2 = conn.createStatement();
      rs = st2.executeQuery("SELECT USERNAME FROM Users u");
      while (rs.next()) {
        String u = rs.getString("USERNAME");
        if (u.equals(username)) {
        	rm = new ResponseMessage("failure", "User name is already in use");
        	return rm;
        } 
      }
      st = conn.prepareStatement("INSERT INTO Users (USERNAME, PASSWORD, FIRSTNAME, LASTNAME, PREFNAME, SHORTTERM, LONGTERM, GPA, YEAR) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
      st.setString(1, username);
      st.setString(2, password);
      st.setString(3, firstname);
      st.setString(4, lastname);
      st.setString(5, prefname);
      st.setBoolean(6, shortterm);
      st.setBoolean(7, longterm);
      st.setDouble(8, gpa);
      st.setInt(9, year);
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
    return rm;
  }


  public void modifyUser(String username, String password, String firstname, String lastname, String prefname, boolean shortterm, boolean longterm, Double gpa, Integer year) throws ClassNotFoundException {
    Connection conn = null;
    PreparedStatement st = null;
    try {
      Class.forName("com.mysql.cj.jdbc.Driver");
      conn = DriverManager.getConnection("jdbc:mysql://localhost/CHATDB?user=root&password=fillin");
      st = conn.prepareStatement("UPDATE Users SET PASSWORD=?, FIRSTNAME=?, LASTNAME=?, PREFNAME=?, SHORTTERM=?, LONGTERM=?, GPA=?, YEAR=? WHERE USERNAME=?");
      st.setString(1, password);
      st.setString(2, firstname);
      st.setString(3, lastname);
      st.setString(4, prefname);
      st.setBoolean(5, shortterm);
      st.setBoolean(6, longterm);
      st.setDouble(7, gpa);
      st.setInt(8, year);
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
    Account u = null;
    try {
      Class.forName("com.mysql.cj.jdbc.Driver");
      conn = DriverManager.getConnection("jdbc:mysql://localhost/CHATDB?user=root&password=fillin");
      st = conn.createStatement();
      rs = st.executeQuery("SELECT USERNAME, PASSWORD, FIRSTNAME, LASTNAME, PREFNAME, SHORTTERM, LONGTERM, GPA, YEAR FROM Users u");

      while (rs.next()) {
        String us = rs.getString("USERNAME");
        if (us.equals(username)) {
          u = new Account(us, rs.getString("PASSWORD"), rs.getString("FIRSTNAME"), rs.getString("LASTNAME"), rs.getString("PREFNAME"),
            rs.getBoolean("SHORTTERM"), rs.getBoolean("LONGTERM"), rs.getDouble("GPA"), rs.getInt("YEAR"));
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
  
  public ResponseContent loginUser(String username, String password) throws ClassNotFoundException {
		Connection conn = null;
		Statement st = null;
		ResultSet rs = null;
		ResponseContent rc = new ResponseContent("failure", "0");
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://localhost/CHATDB?user=root&password=fillin");
			st = conn.createStatement();
			rs = st.executeQuery("SELECT USERNAME, PASSWORD, UID FROM Users u");
			while (rs.next()) {
				String u = rs.getString("USERNAME");
				String uid = rs.getString("UID");
				String p = rs.getString("PASSWORD");
				if (u.equals(username) && p.equals(password)) {
					rc = new ResponseContent("success", uid); 
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
		return rc;
	}

}
