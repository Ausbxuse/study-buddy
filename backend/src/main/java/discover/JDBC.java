package discover;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class JDBC {
  public String getListofMatches(String username) throws ClassNotFoundException{
    String matchesJson= ""; 

    Connection conn = null;
    Statement st = null;
    ResultSet rs = null;
    int  uid = -1;
    try {
      Class.forName("com.mysql.cj.jdbc.Driver");
      conn = DriverManager.getConnection("jdbc:mysql://localhost/fillin?user=root&password=fillin");

      int userUid = getUserUid(conn, username);

      boolean shortterm = getShorttermValue(conn, userUid);
      boolean longterm = getLongtermValue(conn, userUid);

      List<Integer> userCids = getUserCids(conn, userUid);

      matchesJson = getUserJson(conn, userUid, shortterm, longterm, userCids);


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
    return matchesJson;
  }

  private int getUserUid(Connection conn, String username) throws SQLException {
    int userUid = -1;

    String sql = "SELECT UID FROM USERS WHERE username = ?";
    try (PreparedStatement preparedStatement = conn.prepareStatement(sql)) {
        preparedStatement.setString(1, username);

        try (ResultSet resultSet = preparedStatement.executeQuery()) {
            if (resultSet.next()) {
                userUid = resultSet.getInt("UID");
            }
        }
    }

    return userUid;
}

private boolean getShorttermValue(Connection conn, int uid) throws SQLException {
  boolean shortterm = false;

  String sql = "SELECT shortterm FROM USERS WHERE UID = ?";
  try (PreparedStatement preparedStatement = conn.prepareStatement(sql)) {
      preparedStatement.setInt(1, uid);

      try (ResultSet resultSet = preparedStatement.executeQuery()) {
          if (resultSet.next()) {
              shortterm = resultSet.getBoolean("shortterm");
          }
      }
  }

  return shortterm;
}

private boolean getLongtermValue(Connection conn, int uid) throws SQLException {
  boolean longterm = false;

  String sql = "SELECT longterm FROM USERS WHERE UID = ?";
  try (PreparedStatement preparedStatement = conn.prepareStatement(sql)) {
      preparedStatement.setInt(1, uid);

      try (ResultSet resultSet = preparedStatement.executeQuery()) {
          if (resultSet.next()) {
              longterm = resultSet.getBoolean("longterm");
          }
      }
  }

  return longterm;
}

private List<Integer> getUserCids(Connection conn, int userUid) throws SQLException {
  List<Integer> userCids = new ArrayList<>();

  String sql = "SELECT CID FROM ENROLLMENTS WHERE UID = ?";
  try (PreparedStatement preparedStatement = conn.prepareStatement(sql)) {
      preparedStatement.setInt(1, userUid);

      try (ResultSet resultSet = preparedStatement.executeQuery()) {
          while (resultSet.next()) {
              int userCid = resultSet.getInt("CID");
              userCids.add(userCid);
          }
      }
  }

  return userCids;
}

private String getUserJson(Connection conn, int userUid, boolean shortterm, boolean longterm, List<Integer> userCids) throws SQLException {

  String matchingUserJson = "";

  String sql = "SELECT UID, FIRSTNAME, LASTNAME, GPA, STUDYHABITS FROM USERS " +
	          "WHERE UID <> ? " +
	          "AND shortterm = ? " +
	          "AND longterm = ? " +
	          "AND UID NOT IN (SELECT FUID FROM FRIENDS WHERE UID = ?) " +
	          "AND UID IN (SELECT UID FROM ENROLLMENTS WHERE CID IN (" + getUserCidPlaceholders(userCids.size()) + "))";


  try (PreparedStatement preparedStatement = conn.prepareStatement(sql)) {
      preparedStatement.setInt(1, userUid);
      preparedStatement.setBoolean(2, shortterm);
      preparedStatement.setBoolean(3, longterm);
      preparedStatement.setInt(4, userUid);

      // Set the CIDs as parameters
      int parameterIndex = 5;
      for (int userCid : userCids) {
          preparedStatement.setInt(parameterIndex++, userCid);
      }

      try (ResultSet rs = preparedStatement.executeQuery()) {
          while (rs.next()) {
            String userJson = " {"
            + "\"UID\":" + rs.getInt("UID") + ","
            + "\"firstname\":\"" + rs.getString("firstname") + "\","
            + "\"lastname\":\"" + rs.getString("lastname") + "\","
            + "\"gpa\":" + rs.getDouble("gpa") + ","
            + "\"studyHabits\":\"" + rs.getString("studyHabits") + "\""
            + "} ";

            matchingUserJson += userJson;
            
          }
      }
  }

  return matchingUserJson;
}

private String getUserCidPlaceholders(int count) {
  StringBuilder placeholders = new StringBuilder();
  for (int i = 0; i < count; i++) {
      placeholders.append("?");
      if (i < count - 1) {
          placeholders.append(",");
      }
  }
  return placeholders.toString();
}

}
