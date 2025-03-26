import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../../../utils/const';

const Settings = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    // Check if new passwords match
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    const token = localStorage.getItem('userToken');
    if (!token) {
      setError('User not authenticated.');
      return;
    }

    try {
      const response = await axios.put(
        `${baseUrl}changePassword`,
        {
          oldPassword,
          newPassword
        },
        {
          headers: {
            'Authorization': token, // Include the token in the request header
          },
        }
      );
      window.alert("Password Changed Successfully .");
      setMessage(response.data.msg);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setError('');
    } catch (err) {
      console.error(err);
      setError(err.response ? err.response.data.msg : 'Server error occurred.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Change Password</h1>
      <form onSubmit={handlePasswordChange} className="max-w-sm mx-auto">
        {/* {error && <div className="text-red-500 mb-4">{error}</div>} */}
        {message && <div className="text-green-500 mb-4">{message}</div>}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Old Password</label>
          <input
            type="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
          <input
            type="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default Settings;
