'use client';
import { useState } from 'react'
import Image from 'next/image'
import Nav from '../../components/nav'
import '../globals.css'

export default function discoverPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  if(users.length == 0){
    postData("http://localhost:8080/TemporaryServer/fetchDiscover").then(
    (out) => {
      console.log(out);
      setUsers(out);
      console.log(users);
      setLoading(false);
    }
  );
  }

  const renderUsers = () => {
    if(loading){
      return (<div>Loading...</div>);
    }else{
      return users.map(({ uid, fName, lName, gpa, studyHabits }) => {
        return <tr key={uid} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <td class="px-6 py- text-lg">{fName}</td>
        <td class="px-6 py- text-lg">{lName}</td>
        <td class="px-6 py-4 text-lg">{gpa}</td>
        <td class="px-6 py-4 text-lg">{studyHabits}</td>
        <td class="px-6 py-4 text-lg">
          <button type="button" onClick={(e) => {
            requestButton({uid})}} class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" value={uid}>Request</button>
        </td>
      </tr>
      })
    }
  }
  
  const renderTable = () => {
    return (
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <th scope="col" class="px-6 py-3 text-lg">First Name</th>
          <th scope="col" class="px-6 py-3 text-lg">Last Name</th>
          <th scope="col" class="px-6 py-3 text-lg">GPA</th>
          <th scope="col" class="px-6 py-3 text-lg">Study Habits</th>
          <th class="px-6 py-3"></th>
        </thead>
        <tbody>{renderUsers()}</tbody>
      </table>
    )
  }
  return (<main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
    <Nav></Nav><div class="relative overflow-x-auto">{renderTable()}</div></main>)
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
      console.log(result.token);
      return result.token;
    }else{
      alert("Cannot fetch");
    }
}

async function requestButton(uid) {
  postData("http://localhost:8080/TemporaryServer/friendRequest", uid);
}