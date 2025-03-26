import React, { useEffect, useState } from "react";
import { FaBars, FaUserCircle } from "react-icons/fa";
import PageHeader from "./PageHeader";
import axios from "axios";
import { baseUrl } from "../../../utils/const";
import { Link } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
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
        setUserData(response.data);
      } catch (err) {
        setError("Failed to fetch user data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
  return (
    <div className="sticky  top-0 z-20 flex items-center justify-between px-6 py-4  bg-white">
      {/* Left Section: Breadcrumb */}
      <div className="flex lg:ml-96 items-center space-x-4 ">
        <div className="text-black text-sm font-medium ">
          <PageHeader />
        </div>
      </div>

      {/* Center Section: Search Box
    <div className="flex-grow max-w-lg mx-4">
      <input
        type="text"
        placeholder="Type here..."
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
    </div> */}

      {/* Right Section: Sign In Icon + Toggle Button */}
      <div className="flex items-center space-x-4">
        <Link
          to="/"
          className="px-4 py-0 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition duration-300"
        >
          Home
        </Link>
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
              <FaBars className="w-6 h-6" />
            </div>
          )}
        </div>

        {/* Toggle Button */}
        <button className="text-black lg:hidden" onClick={toggleSidebar}>
          <FaBars className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
