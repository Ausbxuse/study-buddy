'use client';
import { useState } from 'react'
import Image from 'next/image'
import Nav from '../../components/nav'
import '../globals.css'

export default function Login() {
  return (
  <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
    <script src="app/login/login.js"></script>
    <Nav></Nav>
    <div class="w-full max-w-sm">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 center" onsubmit="return login(this)">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
          Username
        </label>
        <input class="shadow appearance-none `border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="username" type="text" placeholder="Username"/>
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="password" type="password" placeholder="******************"/>
      </div>
      <div class="flex items-center justify-between">
        <button type="button" className="btn bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={(e) => {
          login(document.getElementsByName("username").value,document.getElementsByName("password").value)}}>
          Sign In
        </button>
        <a type="button" className="btn bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" href="/signup">
          Register
        </a>
        <a class="inline-block align-baseline font-normal text-xs text-blue-500 hover:text-blue-800" onClick={(e) => {alert("Haha, too bad")}}>
          Forgot Password?
        </a>
        </div>
    </form>
    <p class="text-center text-gray-500 text-xs">
      &copy;2023 Study Buddy Co. All rights reserved.
    </p>
  </div></main>)
}

function login(username, password){
  var result = postData("http://localhost:8080/TemporaryServer/login", {username,password});
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
      setCookie("login", "true", 1);
      setCookie("uid", result.token, 1);
      window.location.href = '/';
      this.setState({login: true});
    }else{
      alert("Incorrect Login information");
    }
}
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}