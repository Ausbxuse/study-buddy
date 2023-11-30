public class Account {
  private String username;
  private String password;
  private String firstname;
  private String lastname;
  private String prefname;
  private boolean shortterm;
  private boolean longterm;
  private Double gpa;
  private Integer year;

  public Account(String username, String password, String firstname, String lastname, String prefname, boolean shortterm, boolean longterm, Double gpa, Integer year) {
    this.username = username;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.prefname = prefname;
    this.shortterm = shortterm;
    this.longterm = longterm;
    this.gpa = gpa;
    this.year = year;
  }

  public String getUsername() {
    return username;
  }
  public String getPassword() {
    return password;
  }
  public String getFirstname() {
    return firstname;
  }
  public String getLastname() {
    return lastname;
  }
  public String getPrefname() {
    return prefname;
  }
  public boolean getShortterm() {
    return shortterm;
  }
  public boolean getLongterm() {
    return longterm;
  }
  public Double getGpa() {
    return gpa;
  }
  public Integer getYear() {
    return year;
  }

}
