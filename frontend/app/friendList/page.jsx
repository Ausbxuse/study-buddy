'use client';
import { useState } from 'react'
import Image from 'next/image'
import Nav from '../../components/nav'
import '../globals.css'

export default function friendList() {
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  if (users.length == 0) {
    postData("http://localhost:8080/TemporaryServer/fetchFriends").then(
      (out) => {
        console.log(out);
        setUsers(out);
        console.log(users);
        setLoading(false);
      }
    );
  }
  if (requests.length == 0) {
    postData("http://localhost:8080/TemporaryServer/fetchFriendRequests").then(
      (out) => {
        console.log(out);
        setRequests(out);
        console.log(users);
        setLoading2(false);
      }
    );
  }

  const renderUsers = () => {
    if (loading) {
      return (<div>Loading...</div>);
    } else {
      return users.map(({ uid, fName, lName, status }) => {
        return <tr key={uid} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <td class="px-6 py- text-lg">{fName} {lName}</td>
          <td class="px-6 py- text-lg">{status}</td>
        </tr>
      })
    }
  }
  const renderUsers2 = () => {
    if (loading) {
      return (<div>Loading...</div>);
    } else {
      return users.map(({ uid, fName, lName }) => {
        return <tr key={uid} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <td class="px-6 py- text-lg">{fName} {lName}</td>
          <td class="px-6 py-4 text-lg">
            <button type="button" onClick={(e) => {
              acceptButton({ uid })
            }} class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" value={uid}>Accept</button>
          </td>
        </tr>
      })
    }
  }

  const renderTable = () => {
    return (
      <>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <th scope="col" class="px-6 py-3 text-lg">Name</th>
            <th scope="col" class="px-6 py-3 text-lg">Status</th>
          </thead>
          <tbody>{renderUsers()}</tbody>
        </table>
      </>
    )
  }

  const renderTable2 = () => {
    return (
      <>
        <h2 class=" text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 px-6 py-3 text-lg">Incoming Friend Requests</h2>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <th scope="col" class="px-6 py-3 text-lg">Name</th>
            <th scope="col" class="px-6 py-3 text-lg">Accept?</th>
          </thead>
          <tbody>{renderUsers2()}</tbody>
        </table>
      </>
    )
  }
  return (<main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
    <Nav></Nav>
    <div class="relative overflow-x-auto grid grid-cols-2">
      <div>{renderTable()}</div>
      <div>{renderTable2()}</div>
    </div></main>)
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
    console.log(result.token);
    return result.token;
  } else {
    alert("Cannot fetch");
  }
}

async function acceptButton(uid) {
  postData("http://localhost:8080/TemporaryServer/acceptRequest", uid);
}
