import React from 'react';
import { 
  FaHome, 
  FaTable, 
  FaCreditCard, 
  FaVrCardboard, 
  FaUserAlt, 
  FaSignInAlt, 
  FaSignOutAlt, 
  FaTimes 
} from 'react-icons/fa';
import { MdLanguage } from 'react-icons/md';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 mt-10 ml-2 z-30 rounded-t-3xl left-0 h-full w-64 bg-white p-5 shadow-lg transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0`}
    >
      {/* Close Icon in the top-right corner */}
      <div className="flex justify-end">
        <FaTimes
          className="text-gray-500 lg:hidden hover:text-red-500 cursor-pointer w-6 h-6"
          onClick={toggleSidebar}
        />
      </div>

      <h3 className="text-xl font-bold mb-6">Welcome Admin</h3>

      <ul className="space-y-4">
        <li className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 cursor-pointer">
          <FaHome className="w-5 h-5" />
          <span>Dashboard</span>
        </li>
        <li className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 cursor-pointer">
          <FaTable className="w-5 h-5" />
          <span>Tables</span>
        </li>
        <li className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 cursor-pointer">
          <FaCreditCard className="w-5 h-5" />
          <span>Billing</span>
        </li>
        <li className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 cursor-pointer">
          <FaVrCardboard className="w-5 h-5" />
          <span>Virtual Reality</span>
        </li>
        <li className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 cursor-pointer">
          <MdLanguage className="w-5 h-5" />
          <span>RTL</span>
        </li>
        <li className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 cursor-pointer">
          <FaUserAlt className="w-5 h-5" />
          <span>Profile</span>
        </li>
        <li className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 cursor-pointer">
          <FaSignInAlt className="w-5 h-5" />
          <span>Sign In</span>
        </li>
        <li className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 cursor-pointer">
          <FaSignOutAlt className="w-5 h-5" />
          <span>Sign Up</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
