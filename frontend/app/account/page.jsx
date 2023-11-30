'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Nav from '../../components/nav';
import '../globals.css';

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
    // fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    const response = await fetch('http://localhost:8080/api/user');
    const data = await response.json();
    setUserInfo(data);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const response = await fetch('http://localhost:8080/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (response.ok) {
      setIsEditing(false);
      fetchUserInfo();
    } else {
      // TODO: handle errors
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
