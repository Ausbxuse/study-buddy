'use client';
import { useState } from 'react'
import Image from 'next/image'
import Nav from '../../components/nav'
import '../globals.css'

export default function discoverPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  if(users.length == 0){
    doGet("http://localhost:8080/TemporaryServer/fetchDiscover?userId="+getCookie("uid")).then(
    (out) => {
      console.log(out);
      setUsers(out.token);
      console.log(users);
      setLoading(false);
    }
  );
  }

  const renderUsers = () => {
    if(loading){
      return (<div>Loading...</div>);
    }else{
      return users.map(({ UID, FIRSTNAME, LASTNAME, GPA }) => {
        return <tr key={UID} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <td class="px-6 py- text-lg">{FIRSTNAME}</td>
        <td class="px-6 py- text-lg">{LASTNAME}</td>
        <td class="px-6 py-4 text-lg">{GPA}</td>
        <td class="px-6 py-4 text-lg">
          <button type="button" onClick={(e) => {
            requestButton({UID})}} class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" value={UID}>Request</button>
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
          <th class="px-6 py-3"></th>
        </thead>
        <tbody>{renderUsers()}</tbody>
      </table>
    )
  }
  return (<main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
    <Nav></Nav><div class="relative overflow-x-auto">{renderTable()}</div></main>)
}

async function requestButton(uid) {
  doGet("http://localhost:8080/TemporaryServer/friendRequest?userId="+getCookie("uid")+"&fuid="+uid);
}

async function doGet(url = ""){
  var response = await fetch(url, {method:"GET"});
  const result = await response.json();
  return result;
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