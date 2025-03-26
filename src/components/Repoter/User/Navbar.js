import React, { useState, useEffect } from "react";
import { FaBars, FaUserCircle, FaWallet } from "react-icons/fa";
import axios from "axios";
import PageHeader from "./PageHeader";
import { baseUrl } from "../../../utils/const";
import { Link } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const [walletBalance, setWalletBalance] = useState(0); // State to manage wallet balance
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${baseUrl}user`, {
          headers: {
            Authorization: localStorage.getItem("userToken"),
          },
        });

        console.log("API Response:", response.data); // Debug: Log the response

        if (response.data && typeof response.data.wallet === "number") {
          setWalletBalance(response.data.wallet); // Update state with wallet balance
        }

        // Assuming the user data structure includes a photo field
        setUserData(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []); // Runs only once on component mount

  return (
    <div className="sticky top-0 z-20 flex items-center justify-between  px-4 py-4 bg-cyan-500">
      {/* Left Section: Breadcrumb */}
      <div className="flex  justify-between items-center space-x-4">
        <div className="text-black text-sm font-medium">
          <PageHeader />
        </div>
      </div>

      {/* Center Section: Search Box */}
      {/* <div className="flex-grow max-w-lg mx-4">
        <input
          type="text"
          placeholder="Type here..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div> */}

      {/* Right Section: Wallet Balance and User Icon */}
      <div className="flex items-center space-x-2">
        <Link
          to="/"
          className="px-2 py-0 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition duration-300"
        >
          Home
        </Link>
        <FaWallet className="text-2xl text-white" />
        <span className="text-white font-semibold">₹ {walletBalance}</span>
        <div className="flex items-center">
          {loading ? (
            <span className="text-gray-500">Loading...</span>
          ) : error ? (
            <span className="text-red-500">Error</span>
          ) : userData?.photo ? (
            <img
              src={userData.photo}
              alt="User"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="text-black">
              <FaUserCircle className="w-8 h-8" />
            </div>
          )}
        </div>

        {/* Toggle Button */}
        <button className="text-white lg:hidden" onClick={toggleSidebar}>
          <FaBars className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
