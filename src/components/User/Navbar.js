import React from 'react';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import PageHeader from './PageHeader';

const Navbar = ({ toggleSidebar }) => (
  <div className="sticky  top-0 z-20 flex items-center justify-between px-6 py-4 bg-cyan-500 ">
    {/* Left Section: Breadcrumb */}
    <div className="flex lg:ml-96 items-center space-x-4">
      <div className="text-white text-sm font-medium">
        <PageHeader/>
      </div>
    </div>

    {/* Center Section: Search Box */}
    <div className="flex-grow max-w-lg mx-4">
      <input
        type="text"
        placeholder="Type here..."
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
    </div>

    {/* Right Section: Sign In Icon + Toggle Button */}
    <div className="flex items-center space-x-4">
      <button className="text-white flex items-center space-x-2">
        <FaUserCircle className="w-5 h-5" />
      </button>

      {/* Toggle Button */}
      <button className="text-white lg:hidden" onClick={toggleSidebar}>
        <FaBars className="w-6 h-6" />
      </button>
    </div>
  </div>
);

export default Navbar;
