public class Account {
	private String username;
    private String password;
    private String firstname;
    private String lastname;
    private String prefname;
    private String shortterm;
    private String longterm;
    private String gpa;
    private String year;
	
	public Account(String username, String password, String firstname, String lastname, String prefname, String shortterm, String longterm, String gpa, String year) {
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
    public String getShortterm() {
		return shortterm;
	}
    public String getLongterm() {
		return longterm;
	}
    public String getGpa() {
		return gpa;
	}
    public String getYear() {
		return year;
	}
	
}