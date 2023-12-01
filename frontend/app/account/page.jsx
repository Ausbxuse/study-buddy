'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Nav from '../../components/nav';
import '../globals.css';

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

async function getData(url = "", params = {}) {
  // Construct query string
  const queryString = new URLSearchParams(params).toString();
  const fullUrl = `${url}?${queryString}`;

  return await fetch(fullUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  // .then(response => response.json());
}

export default function AccountPage() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    preferredName: '',
    statusMessage: '',
    studyHabits: '',
    gpa: '',
    classes: [],
    preferredStudyBuddyType: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    getData("http://localhost:8080/Project-testing/UserServlet", {
      action: "Info",
      uid: getCookie("uid"),
    })
      .then(response => {
        console.log(response)
        return response.json();
      }).then(data => {
        console.log(data)
        setUserInfo(data);
      })
      .catch(error => {
      });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    getData("http://localhost:8080/Project-testing/UserServlet", {
      action: "Info",
      uid: getCookie("uid"),
    })
      .then(response => {
        console.log(response)
        return response.json();
      }).then(data => {
        console.log(data)
        setUserInfo(data);
      })
      .catch(error => {
      });

    const response = getData("http://localhost:8080/Project-testing/UserServlet", {
      action: "Modify",
      uid: getCookie("uid"),
    })

    response.then(response => {
      console.log(response)
      return response.json();
    }).then(data => {
      console.log(data)
      setUserInfo(data);
    })
      .catch(error => {
      });

    if (response.ok) {
      setIsEditing(false);
      fetchUserInfo();
    } else {
    }
  };

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  return (
    <main className="pt-20">
      <Nav></Nav>

      <div className="text-2xl flex items-center justify-between flex-col container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Welcome, {userInfo.preferredName}!</h1>
        <div className="space-y-2">
          {Object.entries(userInfo).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              <label className="font-bold capitalize">{key}:</label>
              {isEditing ? (
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="text-black border border-gray-300 p-1 rounded"
                />
              ) : (
                <span>{value}</span>
              )}
            </div>
          ))}
        </div>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={isEditing ? handleSave : handleEdit}
        >
          {isEditing ? 'Save Changes' : 'Edit'}
        </button>
      </div>
    </main>
  );
}
