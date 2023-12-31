'use client';
import { useState } from 'react';
import Image from 'next/image';
import Nav from '../../components/nav';
import '../globals.css';

export default function Signup() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
      <Nav></Nav>
      <div className="w-full max-w-sm">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 center" onSubmit={signup}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="username" type="text" placeholder="Username" />
          </div>
          {/*

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" type="email" placeholder="Email" />
          </div>


          */}
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstname">
              First Name
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="firstname" type="text" placeholder="First Name" />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">
              Last Name
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="lastname" type="text" placeholder="Last Name" />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prefname">
              Preferred Name
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="prefname" type="text" placeholder="Preferred Name" />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gpa">
              gpa
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="gpa" type="text" placeholder="gpa" />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="year">
              year
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="year" type="text" placeholder="year" />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shortterm">
              Shortterm
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="shortterm" type="text" placeholder="Preferred Name" />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="longterm">
              longterm
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="longterm" type="text" placeholder="Longterm" />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="password" type="password" placeholder="Password" />
          </div>
          <div className="flex items-center justify-center">
            <div id="error-message" className="text-sm text-red-500" style={{ display: 'block' }}>Error message</div>
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="btn bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onSubmit={signup}>
              Sign Up
            </button>
            <a className="inline-block align-baseline font-regular text-xs text-blue-500 hover:text-blue-800" href="/login">
              Already have an account? Login
            </a>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2023 Study Buddy Co. All rights reserved.
        </p>
      </div>
    </main>
  );
}

function signup(event) {
  event.preventDefault();

  const form = event.currentTarget;

  const my_username = form.username.value;
  // const my_email = form.email.value;
  const my_password = form.password.value;
  const my_firstname = form.firstname.value;
  const my_lastname = form.lastname.value;
  const my_prefname = form.prefname.value;
  const my_shortterm = form.shortterm.value;
  const my_longterm = form.longterm.value;
  const my_gpa = form.gpa.value;
  const my_year = form.year.value;

  // postData("http://localhost:8080/Project-testing/UserServlet", { username, password, firstname, lastname, prefname, shortterm, longterm, gpa, year })
  // postData("http://localhost:8080/Project-testing/UserServlet&action=Register", { username: "username", password: "password", firstname: "firstname", lastname: "lastname", prefname: "prefname", shortterm: "shorterm", longterm: "longtermdf", gpa: "gpa", year: "year" })
  //   .then(response => {
  //     if (response.state === "success") {
  //       window.location.href = '/login';
  //     } else {
  //       displayError(response.message);
  //     }
  //   })
  //   .catch(error => {
  //     console.error('Error during signup:', error);
  //     displayError('An error occurred during signup. Please try again.');
  //   });
  getData("http://localhost:8080/Project-testing/UserServlet", {
    action: "Register",
    username: my_username,
    password: my_password,
    firstname: my_firstname,
    lastname: my_lastname,
    prefname: my_prefname,
    shortterm: my_shortterm,
    longterm: my_longterm,
    gpa: my_gpa,
    year: my_year
  })
    .then(response => {
      console.log(response)
    }).then(data => {
      console.log(data)
    })
    .catch(error => {
    });
}

// async function postData(url = "", data = {}) {
//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(data)
//   });
//   return response.json();
// }

async function getData(url = "", params = {}) {
  // Construct query string
  const queryString = new URLSearchParams(params).toString();
  const fullUrl = `${url}?${queryString}`;

  return fetch(fullUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  // .then(response => response.json());
}


function displayError(message) {
  var errorDiv = document.getElementById('error-message');
  if (!errorDiv) {
    var newErrorDiv = document.createElement('div');
    newErrorDiv.id = 'error-message';
    document.body.appendChild(newErrorDiv);
    errorDiv = newErrorDiv;
  }
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
}
