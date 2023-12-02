package Server;

import javax.websocket.*;
import com.google.gson.Gson;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@ServerEndpoint("/chat/{room}")
public class ChatEndpoint {
    private static Map<String, ConcurrentHashMap<String, Session>> roomSessions = new ConcurrentHashMap<>();

    @OnOpen
    public void onOpen(Session session, @PathParam("room") String room) {
        roomSessions.computeIfAbsent(room, k -> new ConcurrentHashMap<>()).put(session.getId(), session);
        //sendMessageToRoom(room, "User " + session.getId() + " has entered the room " + room);
    }

    @OnClose
    public void onClose(Session session, @PathParam("room") String room) {
        ConcurrentHashMap<String, Session> sessions = roomSessions.get(room);
        if (sessions != null) {
            sessions.remove(session.getId());
            sendMessageToRoom(room, "User " + session.getId() + " has left the room " + room);
        }
    }

    @OnMessage
    public void onMessage(String message, Session session, @PathParam("room") String room) {
        sendMessageToRoom(room, message);
    }


    private void sendMessageToRoom(String room, String message) {
        ConcurrentHashMap<String, Session> sessions = roomSessions.get(room);
        if (sessions != null) {
            Gson gson = new Gson();
            String formattedMessage = gson.toJson(Map.of("message", message));

            sessions.values().forEach(session -> {
                try {
                    session.getBasicRemote().sendText(formattedMessage);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            });
        }
    }

    
    public static Map<String, Integer> getRoomCounts() {
        return roomSessions.entrySet().stream()
                .collect(Collectors.toMap(Map.Entry::getKey, e -> e.getValue().size()));
    }
}