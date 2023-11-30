'use client';
import { useState } from 'react';
import Image from 'next/image';
import Nav from '../../components/nav';
import '../globals.css';

export default function Signup() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
      <Nav></Nav>
      <div class="w-full max-w-sm">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 center" onsubmit="return signup(this)">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Username
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="username" type="text" placeholder="Username" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
              Email
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" type="email" placeholder="Email" />
          </div>
          <div class="mb-2">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Password
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="password" type="password" placeholder="******************" />
          </div>
          <div class="flex items-center justify-center">
            <div id="error-message" class="text-sm text-red-500" style={{ display: 'block' }}>Error message</div>
          </div>
          <div class="flex items-center justify-between">
            <button type="submit" className="btn bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Sign Up
            </button>
            <a class="inline-block align-baseline font-regular text-xs text-blue-500 hover:text-blue-800" href="/login">
              Already have an account? Login
            </a>
          </div>
        </form>
        <p class="text-center text-gray-500 text-xs">
          &copy;2023 Study Buddy Co. All rights reserved.
        </p>
      </div>
    </main>
  );
}

function signup(form) {
  form.preventDefault();

  const username = form.username.value;
  const email = form.email.value;
  const password = form.password.value;

  postData("http://localhost:8080/BACKENDSERVER/signup", { username, email, password })
    .then(response => {
      if (response.state === "success") {
        window.location.href = '/login';
      } else {
        displayError(response.message);
      }
    })
    .catch(error => {
      console.error('Error during signup:', error);
      displayError('An error occurred during signup. Please try again.');
    });
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
