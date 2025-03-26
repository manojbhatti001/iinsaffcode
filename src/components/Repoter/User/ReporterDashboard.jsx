import React, { useEffect, useState } from "react";
import { useLocation, Routes, Route, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Import Components and Icons
import Dashboard from "./components/Dashboard/Dashboard";
import Advertisers from "./components/Advertisers/Advertisers";
import Leads from "./components/Leads/Lead";
import LeadStatus from "./components/Leads/LeadStatus/LeadStatus";
import PaymentHistory from "./components/PaymentHistory/PaymentHistory";
import WithdrawalRequests from "./components/WithdrawalRequests/WithdrawalRequests";

import Profile from "./components/Profile/Profile";
import Settings from "./components/Settings/Settings";

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
import AcceptedLeads from "../RepoterLeadStatus/AccpetedLead";
import CompletedLead from "../RepoterLeadStatus/CompletedLead";
import PendingLead from "../RepoterLeadStatus/PendingLead";
import GetRelevantLeads from "../../Lead/LeadStatus/GetRelevantLeads";
import ApplyForCard from "../ApplyForCard";
import ReporterConference from "../ReporterConference";
import GetUserAcceptedPendingConference from "../GetUserAcceptedPendingConference";
import GetUserAcceptedCompletedConference from "../GetUserAcceptedCompletedConference";
import GetUserAcceptedConference from "../GetUserAcceptedConference";
import LeadDetails from "../../Lead/LeadDetails";
import LeadDetailsReporter from "../LeadDetailsReporter";
import GetRelevantDarbar from "../../../Darbar/components/ReporterDarbar/GetRelevantDarbar";
import AcceptedDarbarStatus from "../../../Darbar/components/ReporterDarbar/AcceptedDarbarStatus";
import GetRelevantAdv from "../../Lead/LeadStatus/GetRelevantAdv";
import AdvDetailsReporter from "../AdvDetailsReporter";
import AcceptedAdv from "../MarketerAdvStatus/AccpetedAdv";
import CompletedAdv from "../MarketerAdvStatus/CompletedAdv";
import PendingAdv from "../MarketerAdvStatus/PendingAdv";
import UserApprovedCards from "../UserApprovedCards";

const ReporterDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [activeLink, setActiveLink] = useState(""); // State to track active link

  const hideNavbar =
    location.pathname === "/adminlogin" ||
    location.pathname === "/adminregister";

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleNavigation = (path) => {
    setActiveLink(path); // Set the active link when clicked

    navigate(`/ReporterDashboard/${path}`);
    setSidebarOpen(false);
  };

  useEffect(() => {
    const currentPath = location.pathname.split("/ReporterDashboard/")[1];
    setActiveLink(currentPath);
    setRole(localStorage.getItem("userRole"));
  }, [location.pathname]);

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

  return (
    <>
      <div className="relative w-full overflow-hidden">
        {/* Fixed Cyan Background */}
        <div className="fixed top-20 left-0 w-full h-[450px] -z-10"></div>

        {!hideNavbar && <Navbar toggleSidebar={toggleSidebar} />}

        <div className="flex min-h-screen">
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
              className={`lg:relative fixed inset-y-0 left-0 z-50 w-72 overflow-scroll bg-white shadow-lg rounded-tl-3xl rounded-bl-3xl lg:border-r-2 transform transition-transform duration-300 lg:translate-x-0 lg:h-[128vh] h-[100vh] sm:h-screen ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              } lg:translate-x-0 lg:sticky lg:top-20 lg:ml-10 shadow-2xl min-w-72`}
            >
              <div className="flex items-center justify-between px-4 py-4 text-black">
                <h1 className="text-2xl font-semibold">iinsaf {role}</h1>
                <button className="md:block lg:hidden" onClick={toggleSidebar}>
                  ✕
                </button>
              </div>

              <nav className="space-y-1 px-4">
                <SidebarOption
                  label="Dashboard"
                  imgSrc={dashboradicon}
                  isActive={activeLink === ""}
                  onClick={() => handleNavigation("")}
                />
                <h2 className="text-black font-bold uppercase text-sm tracking-wide mt-1">
                  Advertiser Leads
                </h2>
                <SidebarOption
                  label="New Advertisement"
                  isActive={activeLink === "relevant-status"}
                  imgSrc={leadicon}
                  onClick={() => handleNavigation("relevant-status")}
                />
                <SidebarOption
                  label="Accepeted Leads"
                  isActive={activeLink === "accepeted-status"}
                  imgSrc={leadicon}
                  onClick={() => handleNavigation("accepeted-status")}
                />
                <SidebarOption
                  label="Completed Leads"
                  isActive={activeLink === "completed-status"}
                  imgSrc={leadicon}
                  onClick={() => handleNavigation("completed-status")}
                />
                <SidebarOption
                  label="Pending Leads"
                  isActive={activeLink === "pending-status"}
                  imgSrc={leadicon}
                  onClick={() => handleNavigation("pending-status")}
                />
                <h2 className="text-black font-bold uppercase text-sm tracking-wide mt-1">
                  Marketer Leads
                </h2>
                <SidebarOption
                  label="Marketer Advertisement"
                  isActive={activeLink === "relevant-statusAdv"}
                  imgSrc={leadicon}
                  onClick={() => handleNavigation("relevant-statusAdv")}
                />
                <SidebarOption
                  label="Accepeted Adv"
                  isActive={activeLink === "accepeted-statusAdv"}
                  imgSrc={leadicon}
                  onClick={() => handleNavigation("accepeted-statusAdv")}
                />
                <SidebarOption
                  label="Completed Adv"
                  isActive={activeLink === "completed-statusAdv"}
                  imgSrc={leadicon}
                  onClick={() => handleNavigation("completed-statusAdv")}
                />
                <SidebarOption
                  label="Pending Adv"
                  isActive={activeLink === "pending-statusAdv"}
                  imgSrc={leadicon}
                  onClick={() => handleNavigation("pending-statusAdv")}
                />
                <h2 className="text-black font-bold uppercase text-sm tracking-wide mt-1">
                  Conferences
                </h2>
                <SidebarOption
                  label=" New Conferences"
                  isActive={activeLink === "conferences"}
                  imgSrc={confranceicon}
                  onClick={() => handleNavigation("conferences")}
                />
                <SidebarOption
                  label="Conferences Accepted"
                  isActive={activeLink === "accepted-con"}
                  imgSrc={confranceicon}
                  onClick={() => handleNavigation("accepted-con")}
                />
                <SidebarOption
                  label="Conferences Completed"
                  isActive={activeLink === "completed-con"}
                  imgSrc={confranceicon}
                  onClick={() => handleNavigation("completed-con")}
                />
                <SidebarOption
                  label="Conferences Pending"
                  isActive={activeLink === "pending-con"}
                  imgSrc={confranceicon}
                  onClick={() => handleNavigation("pending-con")}
                />
                <h2 className="text-black font-bold uppercase text-sm tracking-wide mt-1">
                  Darbar
                </h2>
                <SidebarOption
                  label="New Darbar"
                  isActive={activeLink === "relevant-darbar"}
                  imgSrc={confranceicon}
                  onClick={() => handleNavigation("relevant-darbar")}
                />
                <SidebarOption
                  label="Darbar Status"
                  isActive={activeLink === "Accept-darbar"}
                  imgSrc={confranceicon}
                  onClick={() => handleNavigation("Accept-darbar")}
                />
                <h2 className="text-black font-bold uppercase text-sm tracking-wide mt-1">
                  Payments
                </h2>
                <SidebarOption
                  label="Payment History"
                  isActive={activeLink === "payment-history"}
                  imgSrc={paymenthistoryicon}
                  onClick={() => handleNavigation("payment-history")}
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

                <h2 className="text-black font-bold uppercase text-sm tracking-wide mt-1">
                  Cards
                </h2>
                <SidebarOption
                  label="Apply Id-Card"
                  isActive={activeLink === "card-requests"}
                  imgSrc={cardrequestsicon}
                  onClick={() => handleNavigation("card-requests")}
                />
                <SidebarOption
                  label="Download Id-Card"
                  isActive={activeLink === "approvedCard"}
                  imgSrc={cardrequestsicon}
                  onClick={() => handleNavigation("approvedCard")}
                />

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
            className={`flex-1 sm:pl-3 rounded-lg min-h-full overflow-scroll ${
              hideNavbar ? "w-full" : ""
            }`}
          >
            <Routes>
              <Route
                path="/"
                element={<Dashboard handleNavigation={handleNavigation} />}
              />
              <Route path="advertisers" element={<Advertisers />} />
              {/* <Route path="leads" element={<Leads />} /> */}
              {/* <Route path="leads-status" element={<LeadStatus/>} /> */}
              <Route path="relevant-status" element={<GetRelevantLeads />} />
              <Route path="relevant-statusAdv" element={<GetRelevantAdv />} />
              <Route
                path="relevant-status/getSpecificLeadDetailsReporter"
                element={<LeadDetailsReporter />}
              />
              <Route
                path="accepeted-status/getSpecificLeadDetailsReporter"
                element={<LeadDetailsReporter />}
              />
              <Route
                path="accepeted-statusAdv/getSpecificAdvDetailsReporter"
                element={<AdvDetailsReporter />}
              />
              <Route
                path="relevant-statusAdv/getSpecificAdvDetailsReporter"
                element={<AdvDetailsReporter />}
              />
              <Route
                path="completed-statusAdv/getSpecificAdvDetailsReporter"
                element={<AdvDetailsReporter />}
              />
              <Route path="accepeted-status" element={<AcceptedLeads />} />
              <Route path="accepeted-statusAdv" element={<AcceptedAdv />} />
              <Route path="completed-statusAdv" element={<CompletedAdv />} />
              <Route path="pending-statusAdv" element={<PendingAdv />} />
              <Route path="completed-status" element={<CompletedLead />} />
              <Route path="pending-status" element={<PendingLead />} />
              <Route path="payment-history" element={<PaymentHistory />} />
              <Route path="card-requests" element={<ApplyForCard />} />
              <Route path="approvedCard" element={<UserApprovedCards />} />
              <Route path="conferences" element={<ReporterConference />} />
              <Route
                path="accepted-con"
                element={<GetUserAcceptedConference />}
              />
              <Route
                path="completed-con"
                element={<GetUserAcceptedCompletedConference />}
              />
              <Route
                path="pending-con"
                element={<GetUserAcceptedPendingConference />}
              />
              <Route path="relevant-darbar" element={<GetRelevantDarbar />} />
              <Route path="Accept-darbar" element={<AcceptedDarbarStatus />} />
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
    className={`flex items-center rounded-full px-4 py-2 text-black hover:bg-blue-700 w-full transition duration-150 ease-in-out ${
      isActive ? "bg-blue-300" : ""
    }`}
  >
    <img src={imgSrc} alt={label} className="w-6 h-6 mr-3" />
    <span className="truncate">{label}</span>
  </button>
);

export default ReporterDashboard;
