public class ChatroomThread implements Runnable {
    private String roomName;

    public ChatroomThread(String roomName) {
        this.roomName = roomName;
}


	@Override
    public void run() {
        // Implement the chat room functionality here based on your requirements
        System.out.println("Chat room thread started for: " + roomName);
    }
}
