import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import {
  FaSearch,
  FaArrowRight,
  FaHome,
  FaUser,
  FaCog,
  FaBriefcase,
  FaSignOutAlt,
  FaUserPlus,
} from "react-icons/fa";
import axios from "axios";
import { baseUrl } from "../../../utils/const";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import CreateProfile from "../CreateProfile";
import PostAdv from "../../Markerter/Advertise/PostAdv";
import ProfileStatus from "../ProfileStatus";
import GetAllAdv from "../../Markerter/Advertise/GetAllAdv";
import MarketerUserProfile from "../MarketerUserProfile";
import SettingMarketer from "../SettingMarketer";
import TransactionsMarketer from "../TransactionsMarketer";

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarRef = useRef(null);

  // Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}getDashboardDetailsMarketer`,
          {
            headers: {
              Authorization: localStorage.getItem("marketerToken"),
            },
          }
        );
        setDashboardData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const cards = dashboardData
    ? [
      {
        title: "Total Adv",
        count: dashboardData.adv.total,
        section: "Dashboard",
        pageLink: "/marketerDashboard/advStatus?stat=all"
      },
      {
        title: "Pending Adv",
        count: dashboardData.adv.pending,
        section: "Dashboard",
        pageLink: "/marketerDashboard/advStatus?stat=pending"
      },
      {
        title: "Completed Adv",
        count: dashboardData.adv.completed,
        section: "Dashboard",
        pageLink: "/marketerDashboard/advStatus?stat=completed"
      },
      {
        title: "Rejected Adv",
        count: dashboardData.adv.rejected,
        section: "Dashboard",
        pageLink: "/marketerDashboard/advStatus?stat=rejected"
      },
    ]
    : [];

  const filteredCards = cards.filter((card) => card.section === activeSection);
  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      route: "/marketerDashboard",
    },
    {
      name: "Create Profile",
      icon: <FaUser />,
      route: "/marketerDashboard/createProfile",
    },
    {
      name: "Profile Status",
      icon: <FaCog />,
      route: "/marketerDashboard/profileStatus",
    },
    {
      name: "Post Adv",
      icon: <FaBriefcase />,
      route: "/marketerDashboard/postAdv",
    },
    {
      name: "Adv Status",
      icon: <FaBriefcase />,
      route: "/marketerDashboard/advStatus",
    },
  ];

  const accountItems = [
    {
      name: "Profile",
      icon: <FaUser />,
      route: "/marketerDashboard/userProfile",
    },
    {
      name: "Change Password",
      icon: <FaCog />,
      route: "/marketerDashboard/marketerSetting",
    },
    {
      name: "Transaction History",
      icon: <FaCog />,
      route: "/marketerDashboard/transactionDetailsMarketer",
    },
  ];

  const handleNavigation = (section, route) => {
    setActiveSection(section);
    navigate(route);
  };

  useEffect(() => {
    const currentRoute = location.pathname;
    const allItems = [...menuItems, ...accountItems];
    const matchedItem = allItems.find((item) => item.route === currentRoute);
    if (matchedItem) {
      setActiveSection(matchedItem.name);
    }
  }, [location.pathname]);

  useEffect(() => {
    const checkToken = async () => {
      const marketerToken = localStorage.getItem("marketerToken");
      if (!marketerToken) {
        navigate("/marketer");
      }
    };

    checkToken();
  }, [navigate]);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        navigate("/marketer");
      }
    });
  };

  const handleReferralClick = () => {
    Swal.fire({
      title: "Your Referral Code",
      html: `
        <input 
          id="referralInput" 
          value="http://localhost:3000/marketer?refTok=${dashboardData?.user?.referral}" 
          class="swal2-input" 
          readonly
        />
        <button id="copyButton" class="swal2-confirm swal2-styled"><i class="fas fa-copy"></i> Copy</button>
      `,
      didOpen: () => {
        const copyButton = document.getElementById("copyButton");
        const referralInput = document.getElementById("referralInput");

        copyButton.addEventListener("click", () => {
          referralInput.select();
          document.execCommand("copy"); // Copy the referral code
          Swal.fire(
            "Copied!",
            "Your referral code has been copied.",
            "success"
          );
        });
      },
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50 pt-2">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-all duration-300 ease-in-out lg:translate-x-0 lg:relative z-10`}
      >
        <div className="p-6 bg-blue-600 text-white font-bold text-lg">
          IINSAF Marketer
        </div>
        <nav className="p-4 space-y-4">
          <div>
            <h3 className="text-gray-500 font-semibold mb-2">OTHER</h3>
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={`hover:bg-blue-100 p-2 rounded-md transition-colors duration-200 ${activeSection === item.name
                    ? "bg-blue-500 text-white"
                    : "text-gray-700"
                    }`}
                >
                  <button
                    className="flex items-center space-x-2"
                    onClick={() => {
                      handleNavigation(item.name, item.route);
                      setSidebarOpen(false);
                    }}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-gray-500 font-semibold mb-2">ACCOUNTS</h3>
            <ul className="space-y-2">
              {accountItems.map((item, index) => (
                <li
                  key={index}
                  className={`hover:bg-blue-100 p-2 rounded-md transition-colors duration-200 ${activeSection === item.name
                    ? "bg-blue-500 text-white"
                    : "text-gray-700"
                    }`}
                >
                  <button
                    className="flex items-center space-x-2"
                    onClick={() => {
                      handleNavigation(item.name, item.route);
                      setSidebarOpen(false);
                    }}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}
              <li
                key={3}
                className={`hover:bg-blue-100 p-2 rounded-md transition-colors duration-200 ${activeSection === "Invite"
                    ? "bg-blue-500 text-white"
                    : "text-gray-700"
                  }`}
              >
                <button
                  className="flex items-center space-x-2"
                  onClick={handleReferralClick}
                >
                  <span>
                    <FaUserPlus />
                  </span>
                  <span>Invite</span>
                </button>
              </li>
              <li
                key={3}
                className={`hover:bg-blue-100 p-2 rounded-md transition-colors duration-200 ${activeSection === "Log out"
                    ? "bg-blue-500 text-white"
                    : "text-gray-700"
                  }`}
              >
                <button
                  className="flex items-center space-x-2"
                  onClick={handleLogout}
                >
                  <span>
                    <FaSignOutAlt />
                  </span>
                  <span>Log out</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      {/* Main content area */}
      <div className="flex-1 w-screen overflow-scroll md:w-full md:overflow-hidden lg:overflow-hidden lg:w-full">
        <div className="shadow-[0_4px_10px_0_rgba(59,130,246,0.5)] p-4">
          <header className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-800">
              Marketer Dashboard
            </h1>
            <Link
              to="/"
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition duration-300"
            >
              Home
            </Link>
            {/* <div className="flex items-center space-x-2 border p-2 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
              <FaSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="outline-none bg-transparent placeholder-gray-500"
              />
            </div> */}
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className={`lg:hidden mb-4 p-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300 ${isSidebarOpen ? "hidden" : ""
                } `}
            >
              ☰
            </button>
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className={`lg:hidden mb-4 p-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300 ${isSidebarOpen ? "" : "hidden"
                } `}
            >
              ☰
            </button>
          </header>
        </div>

        {/* Card Section */}
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCards.map((card, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 duration-300 flex items-center justify-between"
              >
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {card.title}
                  </h2>
                  <p className="text-3xl font-bold text-blue-600">
                    {card.count}
                  </p>
                </div>
                <button
                  onClick={() => navigate(card.pageLink)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">
                  <FaArrowRight />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Nested route rendering */}
        <div className="p-6 w-full overflow-scroll">
          <Routes>
            <Route path="createProfile" element={<CreateProfile />} />
            <Route path="postAdv" element={<PostAdv />} />
            <Route path="profileStatus" element={<ProfileStatus />} />
            <Route path="advStatus" element={<GetAllAdv />} />
            <Route path="userProfile" element={<MarketerUserProfile />} />
            <Route path="marketerSetting" element={<SettingMarketer />} />
            <Route path="transactionDetailsMarketer" element={<TransactionsMarketer />} />
            {/* <Route path="/marketerDashboard" element={<Dashboard />} /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
