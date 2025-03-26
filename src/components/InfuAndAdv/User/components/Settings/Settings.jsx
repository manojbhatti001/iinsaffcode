import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../../../utils/const";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toast

const Settings = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [changing, setChanging] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    // Check if new passwords match
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      toast.error("New passwords do not match."); // Display error toast
      return;
    }
    const token = localStorage.getItem("userToken");
    if (!token) {
      setError("User not authenticated.");
      toast.error("User not authenticated.");
      return;
    }

    try {
      setChanging(true);
      const response = await axios.put(
        `${baseUrl}changePassword`,
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: token, // Include the token in the request header
          },
        }
      );
      toast.success("Password Changed Successfully.");
      setMessage(response.data.msg);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setError("");
    } catch (err) {
      console.error(err);
      setError(err.response ? err.response.data.msg : "Server error occurred.");
      toast.error(
        err.response ? err.response.data.msg : "Server error occurred."
      );
    }
    setChanging(false);
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Change Password</h1>
      <form onSubmit={handlePasswordChange} className="max-w-sm mx-auto">
        {/* {error && <div className="text-red-500 mb-4">{error}</div>} */}
        {message && <div className="text-green-500 mb-4">{message}</div>}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Old Password
          </label>
          <input
            type="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
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
          disabled={changing}
        >
          {changing ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default Settings;
