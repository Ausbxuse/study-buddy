'use client';
import React, { useState, useRef} from 'react';
import Image from 'next/image'
import Nav from '../../components/nav'
import '../globals.css'

export default function createRoom() {
  const [topic, setTopic] = useState('');
  const [capacity, setCapacity] = useState('');

  // create the list of friends to invite

  const inputRef = useRef(null);

  // const handleCreateRoom = (e) => {
  //   e.preventDefault();

  //   if (document.activeElement === inputRef.current) {
  //     return;
  //   }
  //   // handle join room action using the roomCode
  //   const roomName = topic || 'Untitled Room';
  //   console.log('Creating Room with room name:', roomName, ', capacity:', capacity);
  // };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-32 bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
    <Nav></Nav>
    <div
    className="group lg:row-span-4 lg:col-span-5 rounded-lg border border-transparent px-8 py-7 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30"
    target="_blank"
    rel="noopener noreferrer"
  >
    <h2 className={`mb-3 text-3xl font-semibold`}>
      Create Room

    </h2>
    <form onSubmit={(e) => handleCreateRoom(e, topic, capacity)}>
      <label> Enter the topic </label>
      <input
        required
        type="text"
        placeholder="Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <label> Select the capacity</label>
      <select
        required
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
        className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
        <option value="" disabled>Select capacity</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        {/* add more if needed*/}
      </select>
      

    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
      Join an existing study room.
    </p>

    <button
      type="submit"
      className={`mb-3 text-3xl font-semibold cursor-pointer`}
    >
        Create 
      <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
        -&gt;
      </span>
  </button>
  </form>
  </div>
  </main>)
}


function handleCreateRoom(event, topic, capacity){
  console.log('creating room with', topic, ' ', capacity)

  event.preventDefault();
  window.location.href="/chatroom";
  var result = postData("http://localhost:8080/TemporaryServer/joinRoom", {topic, capacity});
}
async function postData(url = "", data = {}) {
    const response = await fetch(url, {
        method: "POST",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {"Content-Type": "application/json",},
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
    });
    const result = await response.json();
    if(result.state == "success"){
      window.location.href = '/chatroom';
    }else{
      alert("Room cannot be created");
    }
}