import React, { useEffect, useState } from "react";
import { useLocation, Routes, Route, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Import Components and Icons
import Dashboard from "./components/Dashboard/Dashboard";
import Advertisers from "./components/Advertisers/Advertisers";
import Leads from "../../Lead/Lead";
import LeadStatus from "../../Lead/LeadStatus/LeadStatus";
import PaymentHistory from "./components/PaymentHistory/PaymentHistory";
import WithdrawalRequests from "./components/WithdrawalRequests/WithdrawalRequests";

import Profile from "./components/Profile/Profile";
import Settings from "./components/Settings/Settings";
import PostConference from "../../Conference/PostConference";
import GetUserConference from "../../Conference/GetUserConference";

import Navbar from "./Navbar";

import dashboradicon from "./assets/icons/dashboard.png";
import influencericon from "./assets/icons/influncer.png";
import advertisersicon from "./assets/icons/advertisers.png";
import leadicon from "./assets/icons/leads.png";
import confranceicon from "./assets/icons/conferences.png";
import paymenthistoryicon from "./assets/icons/mhistory.png";
import withdrawalhistoryicon from "./assets/icons/mhistory.png";
import withdrawalicon from "./assets/icons/money-withdrawal.png";
import cardrequestsicon from "./assets/icons/applied_card.png";
import pandingcardicon from "./assets/icons/pending_card.png";
import rejectedcardicon from "./assets/icons/rejected_card.png";
import profileicon from "./assets/icons/profile.png";
import settingsicon from "./assets/icons/setting.png";
import logouticon from "./assets/icons/switch.png";
import ConferenceDetails from "../../Conference/ConferenceDetails";
import PaymentHistoryConference from "./components/PaymentHistory/PaymentHistoryConference";

const InAdDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(""); // State to track active link

  const hideNavbar =
    location.pathname === "/adminlogin" ||
    location.pathname === "/adminregister";

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleNavigation = (path) => {
    setActiveLink(path); // Set the active link when clicked
    navigate(`/InAd/${path}`);
    setSidebarOpen(false);
  };
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("userToken");
        navigate("/login");
        Swal.fire("Logged Out", "You have been logged out.", "success");
      }
    });
  };

  // Set active link based on the current path
  useEffect(() => {
    const currentPath = location.pathname.split("/InAd/")[1];
    setActiveLink(currentPath);
  }, [location.pathname]);

  return (
    <>
      <div className="relative z-[999] bg-white">
        {/* Fixed Cyan Background */}
        <div className="fixed top-20 left-0 w-full h-[450px] -z-10 bg-white"></div>

        {!hideNavbar && <Navbar toggleSidebar={toggleSidebar} />}

        <div className="flex min-h-screen bg-white">
          {!hideNavbar && (
            <button
              className="fixed top-24 left-4 z-10 text-black p-2 rounded-full bg-gray-200 hidden"
              onClick={toggleSidebar}
            >
              ☰
            </button>
          )}

          {/* Sidebar */}
          {!hideNavbar && (
            <div
              className={`fixed inset-y-0  lg:mt-[-80px] md:mt-36 mt-24 left-0 bg-white rounded-t-2xl ml-1 transform z-40 w-80 transition-transform duration-300 ease-in-out overflow-y-auto h-screen ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0 lg:sticky lg:top-20 lg:ml-10 shadow-2xl`}
            >
              <div className="flex items-center justify-between px-4 py-4 text-black">
                <h1 className="text-2xl font-semibold">iinsaf Advertiser</h1>
                <button className="md:block lg:hidden" onClick={toggleSidebar}>
                  ✕
                </button>
              </div>

              <nav className="space-y-1 px-4 h-full overflow-hidden">
                <SidebarOption
                  label="Dashboard"
                  imgSrc={dashboradicon}
                  isActive={activeLink === ""}
                  onClick={() => handleNavigation("")}
                />
                <h2 className="text-black font-bold uppercase text-sm tracking-wide mt-1">
                  Advertisement Details
                </h2>
                <SidebarOption
                  label="Post Advertisement"
                  isActive={activeLink === "leads"}
                  imgSrc={leadicon}
                  onClick={() => handleNavigation("leads")}
                />
                <SidebarOption
                  label="Advertisement Status"
                  isActive={activeLink === "leads-Status"}
                  imgSrc={leadicon}
                  onClick={() => handleNavigation("leads-Status")}
                />
                <h2 className="text-black font-bold uppercase text-sm tracking-wide mt-1">
                  Conference Details
                </h2>
                <SidebarOption
                  label=" Create Conferences"
                  isActive={activeLink === "conferences"}
                  imgSrc={confranceicon}
                  onClick={() => handleNavigation("conferences")}
                />
                <SidebarOption
                  label="Conference Status"
                  isActive={activeLink === "get-user-conferences"}
                  imgSrc={confranceicon}
                  onClick={() => handleNavigation("get-user-conferences")}
                />

                <h2 className="text-black font-bold uppercase text-sm tracking-wide mt-1">
                  Payment Details
                </h2>
                <SidebarOption
                  label="Payment History"
                  isActive={activeLink === "payment-history"}
                  imgSrc={paymenthistoryicon}
                  onClick={() => handleNavigation("payment-history")}
                />
                <SidebarOption
                  label="Payment History Conference"
                  isActive={activeLink === "payment-historyConference"}
                  imgSrc={paymenthistoryicon}
                  onClick={() => handleNavigation("payment-historyConference")}
                />
                <SidebarOption
                  label="Withdrawal History"
                  isActive={activeLink === "withdrawal-history"}
                  imgSrc={withdrawalhistoryicon}
                  onClick={() => handleNavigation("withdrawal-history")}
                />
                <SidebarOption
                  label="Withdrawal Requests"
                  isActive={activeLink === "withdrawal-requests"}
                  imgSrc={withdrawalicon}
                  onClick={() => handleNavigation("withdrawal-requests")}
                />

                {/* <h2 className="text-black font-bold uppercase text-sm tracking-wide mt-1">Cards</h2> */}
                {/* <SidebarOption label="Card Requests" isActive={activeLink === "card-requests"} imgSrc={cardrequestsicon} onClick={() => handleNavigation("card-requests")} /> */}

                <h2 className="text-black font-bold uppercase text-sm tracking-wide mt-4">
                  Accounts
                </h2>
                <SidebarOption
                  label="Profile"
                  isActive={activeLink === "profile"}
                  imgSrc={profileicon}
                  onClick={() => handleNavigation("profile")}
                />
                <SidebarOption
                  label="Change Password"
                  isActive={activeLink === "settings"}
                  imgSrc={settingsicon}
                  onClick={() => handleNavigation("settings")}
                />
                <SidebarOption
                  label="Log Out"
                  imgSrc={logouticon}
                  onClick={handleLogout}
                />
              </nav>
            </div>
          )}
          {/* Main Content */}
          <div
            className={`flex-1 rounded-lg ${hideNavbar ? "w-full" : ""} ${location.pathname === "/InAd/get-user-conferences" || "/InAd/leads-Status" ? "" : "pl-3"
              }`}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="advertisers" element={<Advertisers />} />
              <Route path="leads" element={<Leads />} />
              <Route path="leads-status" element={<LeadStatus />} />
              <Route path="conferences" element={<PostConference />} />
              <Route
                path="get-user-conferences"
                element={<GetUserConference />}
              />
              {/* <Route
                path="getSpecificConfrenceDetails"
                element={<ConferenceDetails />}
              /> */}
              <Route path="payment-history" element={<PaymentHistory />} />
              <Route path="payment-historyConference" element={<PaymentHistoryConference />} />
              <Route
                path="withdrawal-requests"
                element={<WithdrawalRequests />}
              />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
        <button
          onClick={() => navigate("/help")}
          className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full px-6 py-3 shadow-lg hover:bg-blue-700 transition duration-150 ease-in-out"
        >
          Help Support
        </button>
      </div>
    </>
  );
};

// Sidebar Option Component
const SidebarOption = ({ label, imgSrc, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center rounded-lg px-4 py-2 text-black hover:bg-blue-700 w-full transition duration-150 ease-in-out ${isActive ? "bg-blue-300" : ""
      }`}
  >
    <img src={imgSrc} alt={label} className="w-6 h-6 mr-3" />
    <span className="truncate">{label}</span>
  </button>
);

export default InAdDashboard;
