package account;

public class ResponseContent {
    public String state;
    public String token;
    public ResponseContent(String n, String c) {state = n; token = c;}
    public String getState() {return state;}
    public String getToken() {return token;}
    public void setState(String s) {state = s;}
    public void setToken(String s) {token = s;}
}