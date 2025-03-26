import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/const";
import Advertiser from "./Advertiser";
import Reporter from "./Reporter";
import AllLeads from "./AllLeads";
import AllConference from "./AllConference";
import Infulencer from "./Infulencer";
import GetAllLeads from "./components/AdminLead/GetAllLeads";
import GetAllConference from "./components/AdminConference/GetAllConference";
import AllUsers from "./components/Users/AllUsers";
import UpdateCard from "./components/AdminCards/UpdateCard";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [activeComponent, setActiveComponent] = useState(null); // State to track active component

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${baseUrl}getAdminDashboardDetails`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        // console.log(response);
        if (response.data.success) {
          setDashboardData(response.data.data);
        } else {
          console.error("Failed to fetch dashboard details");
        }
      } catch (error) {
        console.error("Error fetching dashboard details:", error);
      }
    };

    fetchDashboardData();
  }, []);

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  // Function to handle button clicks and set active component
  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  // Render the active component if set
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "Advertiser":
        return <Advertiser />;
      case "Reporter":
        return <Reporter />;
      case "Influencer":
        return <Infulencer />;
      case "Lead":
        return <GetAllLeads />;
      case "Conference":
        return <GetAllConference />;
      case "AllUser":
        return <AllUsers />;
      case "Card":
        return <UpdateCard />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 font-semibold text-gray-700">Metric</th>
              <th className="px-4 py-2 font-semibold text-gray-700">Count</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">Total Advertisers</td>
              <td className="px-4 py-2">{dashboardData.totalAdvertisers}</td>
            </tr>
            <tr className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">Total Admins</td>
              <td className="px-4 py-2">{dashboardData.totalAdmins}</td>
            </tr>
            <tr className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">All Leads</td>
              <td className="px-4 py-2">{dashboardData.allLeads}</td>
            </tr>
            <tr className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">Completed Leads</td>
              <td className="px-4 py-2">{dashboardData.completedLeads}</td>
            </tr>
            <tr className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">Pending Leads</td>
              <td className="px-4 py-2">{dashboardData.pendingLeads}</td>
            </tr>
            <tr className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">Rejected Leads</td>
              <td className="px-4 py-2">{dashboardData.rejectedLeads}</td>
            </tr>
            <tr className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">Total Users</td>
              <td className="px-4 py-2">{dashboardData.totalUsers}</td>
            </tr>
            <tr className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">Today's Leads</td>
              <td className="px-4 py-2">{dashboardData.todaysLead}</td>
            </tr>
            <tr className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">All Conferences</td>
              <td className="px-4 py-2">{dashboardData.allConference}</td>
            </tr>
            <tr className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">Today's Conferences</td>
              <td className="px-4 py-2">{dashboardData.todaysConference}</td>
            </tr>
            <tr className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">Pending Conferences</td>
              <td className="px-4 py-2">{dashboardData.pendingConference}</td>
            </tr>
            <tr className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">Completed Conferences</td>
              <td className="px-4 py-2">{dashboardData.completedConference}</td>
            </tr>
            <tr className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">Rejected Conferences</td>
              <td className="px-4 py-2">{dashboardData.rejectedConference}</td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="px-4 py-2 font-semibold">Total Ad Cost</td>
              <td className="px-4 py-2 font-semibold">{dashboardData.totalAdCost}</td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="px-4 py-2 font-semibold">Total Conference Cost</td>
              <td className="px-4 py-2 font-semibold">{dashboardData.totalConferenceCost}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Buttons to open components */}
      <div className="mt-6 flex justify-around">
        <button
          onClick={() => handleButtonClick("Advertiser")}
          className="bg-blue-500 text-white py-2 px-4 rounded"
          style={{ color: "white", backgroundColor: "#oocecb" }}
        >
          Advertiser
        </button>
        <button
          onClick={() => handleButtonClick("Reporter")}
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Reporter
        </button>
        <button
          onClick={() => handleButtonClick("Influencer")}
          className="bg-yellow-500 text-white py-2 px-4 rounded"
        >
          Influencer
        </button>
        <button
          onClick={() => handleButtonClick("Lead")}
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          AllLead
        </button>
        <button
          onClick={() => handleButtonClick("Conference")}
          className="bg-purple-500 text-white py-2 px-4 rounded"
        >
          AllConference
        </button>
        <button
          onClick={() => handleButtonClick("AllUser")}
          className="bg-purple-500 text-white py-2 px-4 rounded"
        >
          AllUser
        </button>
        <button
          onClick={() => handleButtonClick("Card")}
          className="bg-purple-500 text-white py-2 px-4 rounded"
        >
          Card
        </button>
      </div>

      {/* Render the active component */}
      <div className="mt-6">{renderActiveComponent()}</div>
    </div>
  );
};

export default AdminDashboard;
