'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Nav from '../../components/nav';
import '../globals.css';

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export default function ChatRoom() {
  const [messages, setMessages] = useState([
    { username: 'TheShy', text: 'Nihao!' },
    { username: 'Zeus', text: 'Hi there!' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const ws = useRef(null);

  useEffect(() => {
    const serverUrl = `ws://localhost:8080/Project-testing/chat/1`;
    ws.current = new WebSocket(serverUrl);

    ws.current.onopen = () => {
    };


    ws.current.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        if (parsedData && parsedData.message) {
          const innerMessage = JSON.parse(parsedData.message);
          console.log("Inner message:", innerMessage);
          setMessages((prevMessages) => [...prevMessages, innerMessage]);
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    };


    return () => {
      ws.current.close();
    };
  }, []);

  // const currentUser = 'You';
  const currentUser = getCookie("uid");

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      const messageData = { username: currentUser, text: newMessage };
      ws.current.send(JSON.stringify(messageData));
      setNewMessage('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && newMessage.trim() !== '') {
      sendMessage();
      event.preventDefault();
    }
  };

  return (
    <main className="pt-14">
      <Nav />
      <div className="flex flex-col h-screen p-4">
        <div className="flex flex-col flex-grow overflow-auto bg-white rounded-lg shadow border border-gray-200 p-4 space-y-2"></div>
        <div className="flex flex-col flex-grow overflow-auto bg-white rounded-lg shadow border border-gray-200 p-4 space-y-2">
          {messages.map((message, index) => (
            <div key={index} className={`rounded-lg max-w-xs p-2 ${message.username === currentUser ? 'ml-auto bg-blue-500 text-white' : 'mr-auto bg-gray-100 text-gray-800'}`}>
              <span className="font-bold">{message.username}: </span>{message.text}
            </div>
          ))}
        </div>
        <div className="flex mt-4 gap-2">
          <textarea
            className="text-black flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300 resize-none"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={1}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}
