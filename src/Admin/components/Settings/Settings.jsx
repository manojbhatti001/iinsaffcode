// import React, { useState } from "react";
// import axios from "axios";
// import { baseUrl } from "../../../utils/const";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Settings = () => {
//   const [email, setEmail] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [reseting, setReseting] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setReseting(true);
//       const response = await axios.post(
//         `${baseUrl}adminReset-password`, // Replace with your API endpoint
//         { email, newPassword },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("adminToken")}`, // Make sure to retrieve token if needed
//           },
//         }
//       );
//       setMessage(response.data.msg);
//       toast.success("Password reset successfully");
//       setError(""); // Clear previous error message
//     } catch (err) {
//       toast.error(
//         err.response?.data?.msg ||
//           "An error occurred while resetting the password."
//       );
//     } finally {
//       setReseting(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
//       <h2 className="text-xl font-bold mb-4">Reset Admin Password</h2>
//       {message && <p className="text-green-600">{message}</p>}
//       {/* {error && <p className="text-red-600">{error}</p>} */}
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label htmlFor="email" className="block text-gray-700">
//             Admin Email:
//           </label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="newPassword" className="block text-gray-700">
//             New Password:
//           </label>
//           <input
//             type="password"
//             id="newPassword"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             required
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           disabled={reseting}
//         >
//           {reseting ? "Processing" : "Reset Password"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Settings;

import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../utils/const";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Settings = () => {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState(""); // New state for the old password
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [reseting, setReseting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setReseting(true);
      const response = await axios.post(
        `${baseUrl}adminReset-password`, // Replace with your API endpoint
        { email, oldPassword, newPassword }, // Include oldPassword in the request
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`, // Make sure to retrieve token if needed
          },
        }
      );
      setMessage(response.data.msg);
      toast.success("Password reset successfully");
      setError(""); // Clear previous error message
    } catch (err) {
      toast.error(
        err.response?.data?.msg ||
          "An error occurred while resetting the password."
      );
    } finally {
      setReseting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Reset Admin Password</h2>
      {message && <p className="text-green-600">{message}</p>}
      {/* {error && <p className="text-red-600">{error}</p>} */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Admin Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="oldPassword" className="block text-gray-700">
            Old Password:
          </label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-gray-700">
            New Password:
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={reseting}
        >
          {reseting ? "Processing" : "Reset Password"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Settings;
