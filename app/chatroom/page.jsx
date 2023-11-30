'use client';
import { useState } from 'react';
import Image from 'next/image';
import Nav from '../../components/nav';
import '../globals.css';

export default function ChatRoom() {
  // TODO: retrieve messages from backend
  const [messages, setMessages] = useState([
    { username: 'TheShy', text: 'Nihao!' },
    { username: 'Zeus', text: 'Hi there!' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const currentUser = 'You';

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { username: currentUser, text: newMessage }]);
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
      <Nav></Nav>
      <div className="flex flex-col h-screen p-4">
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


async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  return response.json();
}
