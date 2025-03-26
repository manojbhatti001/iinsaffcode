import { useState, useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PageHeader from "./PageHeader";

const NavbarNew = ({ toggleSidebar }) => {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null); // Ref to track dropdown element
  const navigate = useNavigate();

  const handellogout = () => {
    localStorage.removeItem("adminToken");
    navigate('/adminlogin');
  };

  const handleProfileClick = (event) => {
    event.stopPropagation(); // Prevent the event from bubbling up
    setDropdown((prev) => !prev); // Toggle the dropdown
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between rounded-tr-3xl items-center p-6 bg-[#f4f4f6] z-[2] sticky top-0">
      {/* <h1 className="lg:ml-20 text-4xl font-semibold">Analytics</h1> */}
      <PageHeader/>

      <div className="relative flex items-center space-x-4">
        {/* Profile Image */}
        <img
          src="https://randomuser.me/api/portraits/women/79.jpg"
          alt="User"
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={handleProfileClick}
        />

        {/* Custom Dropdown */}
        {dropdown && (
          <div
            ref={dropdownRef}
            className="absolute right-0 mt-48 w-48 bg-white rounded-lg shadow-lg"
          >
            <ul className="py-2">
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setDropdown(false);
                  navigate("/admin/profile");
                }}
              >
                Profile
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setDropdown(false);
                  navigate("/admin/settings");
                }}
              >
                Settings
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                onClick={() => {
                  setDropdown(false);
                  handellogout();
                }}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Sidebar Toggle Button */}
      <button className="lg:hidden p-2 text-xl" onClick={toggleSidebar}>
        <FaBars />
      </button>
    </div>
  );
};

export default NavbarNew;
