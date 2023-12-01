'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image'
import Nav from '../components/nav'

export default function Home() {
  const [roomCode, setRoomCode] = useState('');
  const inputRef = useRef(null);
  const authSection = () => {
    if (getCookie("login") == "true") {
      return <>
        <a
          // href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          href="discover"
          className="group lg:col-span-2 lg:row-span-2 rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800 dark:bg-opacity-30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-3xl font-semibold`}>
            Discover{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Discover potential study partners.
          </p>
        </a>

        <a
          // href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          href="/friendList"
          className="group lg:row-span-2 rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Friend list{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            View your friends
          </p>
        </a>

        <a
          href="/createRoom"
          className="group lg:row-span-2 lg:col-span-2 rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-3xl font-semibold`}>
            Create room{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Create your own study room.
          </p>
        </a>
      </>;
    } else {
      return;
    }
  }
  // const handleJoinRoom = (e) => {
  //   e.preventDefault();

  //   if (document.activeElement === inputRef.current) {
  //     return;
  //   }
  //   // handle join room action using the roomCode
  //   console.log('Joining room with code:', roomCode);

  // };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-32 bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
      <Nav></Nav>

      <div className="mb-32 p-6 gap-8 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-5 lg:text-left">
        <a
          // href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          href="/studyHall"
          className="group lg:col-span-3 lg:row-span-2 rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800 dark:bg-opacity-30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-5xl font-semibold`}>
            Study Hall{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-base opacity-50`}>
            Look through chatrooms for each class.
          </p>
        </a>

        <a
          onClick={(e) => handleJoinRoom(e, roomCode)}

          className="group lg:row-span-2 lg:col-span-2 rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-3xl font-semibold`}>
            Join room
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <form>
            <input
              required
              type="text"
              placeholder="Enter room code"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </form>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Join an existing study room.
          </p>
        </a>

        {authSection()}

      </div>
    </main>
  )
}

function handleJoinRoom(event, roomCode) {
  event.preventDefault(); // Prevent the default behavior of the link

  if (roomCode != "") {
    window.location.href = "/chatroom";
  } else {
    var result = postData("http://localhost:8080/TemporaryServer/joinRoom", { roomCode });
  }
}

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    cache: "no-cache",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json", },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (result.state == "success") {
    window.location.href = '/chatroom';
  } else {
    alert("Incorrect room code information");
  }
}

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
