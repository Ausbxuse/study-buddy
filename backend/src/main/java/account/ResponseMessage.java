package account;

public class ResponseMessage {
	public String state;
    public String message;
    ResponseMessage(String n, String c) {
    	state = n; 
    	message = c;
    	}
    public String getState() {return state;}
    public String getToken() {return message;}
    public void setState(String s) {state = s;}
    public void setToken(String s) {message = s;}

}
