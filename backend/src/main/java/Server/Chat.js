var ws;
var chatDiv = document.getElementById("chat");
var roomsDiv = document.getElementById("rooms");
var messageInput = document.getElementById("messageInput");

function joinRoom() {
  var room = document.getElementById("roomInput").value;
  var serverUrl = "ws://localhost:8080/Project-testing/chat/" + room;
  ws = new WebSocket(serverUrl);

  ws.onmessage = function(event) {
    var message = event.data; //the received message
    chatDiv.innerHTML += '<div>' + message + '</div>';
    chatDiv.scrollTop = chatDiv.scrollHeight;
  };

  ws.onopen = function(event) {
    chatDiv.innerHTML = '<div>Connected to room: ' + room + '</div>';
  };

  ws.onclose = function(event) {
    chatDiv.innerHTML += '<div>Disconnected from the room.</div>';
  };

  ws.onerror = function(event) {
    chatDiv.innerHTML += '<div>Error occurred!</div>';
  };
}

function sendMessage() {
  var message = messageInput.value;
  ws.send(message);
  messageInput.value = '';
}


//Not working
function showRooms(event) {
  event.preventDefault();

  var roomsDiv = document.getElementById("rooms");
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:8080/final_proj/RoomServlet", true);
  xhr.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        var data = JSON.parse(this.responseText);
        if (data.length === 0) {
          roomsDiv.innerHTML = 'No chat rooms.';
        } else {
          roomsDiv.innerHTML = '<ul>';
          data.forEach(function(room) {
            roomsDiv.innerHTML += `<li>${room.name} (${room.count} users)</li>`;
          });
          roomsDiv.innerHTML += '</ul>';
        }
      } else {
        console.error('Error fetching rooms:', this.statusText);
      }
    }
  };
  xhr.send();
}
