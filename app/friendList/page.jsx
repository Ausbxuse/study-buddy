'use client';
import { useState } from 'react'
import Image from 'next/image'
import Nav from '../../components/nav'
import '../globals.css'

export default function Table() {
  const data = [
    { cId: 1, cName: 'CSCI201 Study Hall', cCreator: "Jeremy", cCount: 5, cCap: 20 },
    { cId: 2, cName: 'CSCI103 Study Hall', cCreator: "John", cCount: 1, cCap: 5 },
    { cId: 3, cName: 'CSCI104 Study Hall', cCreator: "Joseph", cCount: 3, cCap: 10 },
    { cId: 4, cName: 'CSCI170 Study Hall', cCreator: "Jonathan", cCount: 7, cCap: 20 },
    { cId: 5, cName: 'CSCI270 Study Hall', cCreator: "Jennifer", cCount: 1, cCap: 15 },
    { cId: 6, cName: 'CSCI102 Study Hall', cCreator: "Jack", cCount: 10, cCap: 10 },
    { cId: 1, cName: 'CSCI201 Study Hall', cCreator: "Jeremy", cCount: 5, cCap: 20 },
    { cId: 2, cName: 'CSCI103 Study Hall', cCreator: "John", cCount: 1, cCap: 5 },
    { cId: 3, cName: 'CSCI104 Study Hall', cCreator: "Joseph", cCount: 3, cCap: 10 },
    { cId: 4, cName: 'CSCI170 Study Hall', cCreator: "Jonathan", cCount: 7, cCap: 20 },
    { cId: 5, cName: 'CSCI270 Study Hall', cCreator: "Jennifer", cCount: 1, cCap: 15 },
    { cId: 6, cName: 'CSCI102 Study Hall', cCreator: "Jack", cCount: 10, cCap: 10 },
    { cId: 1, cName: 'CSCI201 Study Hall', cCreator: "Jeremy", cCount: 5, cCap: 20 },
    { cId: 2, cName: 'CSCI103 Study Hall', cCreator: "John", cCount: 1, cCap: 5 },
    { cId: 3, cName: 'CSCI104 Study Hall', cCreator: "Joseph", cCount: 3, cCap: 10 },
    { cId: 4, cName: 'CSCI170 Study Hall', cCreator: "Jonathan", cCount: 7, cCap: 20 },
    { cId: 5, cName: 'CSCI270 Study Hall', cCreator: "Jennifer", cCount: 1, cCap: 15 },
    { cId: 6, cName: 'CSCI102 Study Hall', cCreator: "Jack", cCount: 10, cCap: 10 },
  ]
  const [users, setUsers] = useState(data)

  const renderUsers = () => {
    return users.map(({ cId, cName, cCreator, cCount, cCap }) => {
      return <tr key={cId} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-lg">{cName}</td>
      <td class="px-6 py- text-lg">{cCreator}</td>
      <td class="px-6 py-4 text-lg">{cCount}/{cCap}</td>
      <td class="px-6 py-4 text-lg">{joinButton({cId}, {cCount} == {cCap})}</td>
    </tr>
    })
  }
  
  const renderTable = () => {
    return (
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <th scope="col" class="px-6 py-3 text-lg">Room Name</th>
          <th scope="col" class="px-6 py-3 text-lg">Room Creator</th>
          <th scope="col" class="px-6 py-3 text-lg">Capacity</th>
          <th class="px-6 py-3"></th>
        </thead>
        <tbody>
          {renderUsers()}
        </tbody>
      </table>
    )
  }
  return (<main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
    <Nav></Nav><div class="relative overflow-x-auto">{renderTable()}</div></main>)
}

function joinButton(id, full){
  return full ? 
  (<button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" disabled value={id}>Join</button>) : 
  (<button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" value={id}>Join</button>)
}