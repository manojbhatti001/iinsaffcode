import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../utils/const";
import Advertiser from "../../Advertiser";
import Reporter from "../../Reporter";
import AllLeads from "../../AllLeads";
import AllConference from "../../AllConference";
import Infulencer from "../../Infulencer";
import GetAllLeads from "../AdminLead/GetAllLeads";
import GetAllConference from "../AdminConference/GetAllConference";
// Import Components
import InfoCards from "./InfoCards";
import SalesOverviewChart from "./SalesOverviewChart";
import CountrySalesTable from "./CountrySalesTable";
import Categories from "./Categories";
import testicon from '../../assets/icons/advertisers.png'

import advertisersicon from '../../assets/icons/advertisers.png'
import leadicon from '../../assets/icons/leads.png';
import totoalconfrance from '../../assets/icons/conferences.png'
import todaysconfrance from '../../assets/icons/todayConfo.png'
import pandingconfrance from '../../assets/icons/pendingConferences.png'
import completedconfrance from '../../assets/icons/completeconfo.png'
import rejectedconfrance from '../../assets/icons/cancel_confo.png'
import completedlead from '../../assets/icons/clead.png'
import pendinglead from '../../assets/icons/pending.png'
import rejectedlead from '../../assets/icons/cancell.png'
import todaydlead from '../../assets/icons/today.png'
import totalUsers from '../../assets/icons/profile.png';
import totaladicon from '../../assets/icons/conference-budget.png'
import cardrequestsicon from '../../assets/icons/applied_card.png';
import pandingcardicon from '../../assets/icons/pending_card.png';
import rejectedcardicon from '../../assets/icons/rejected_card.png';
import confranceicon from '../../assets/icons/conferences.png'

// Import Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Navigate, useNavigate } from "react-router-dom";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = ({ handleNavigation }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/admin/login");
    }
  })

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${baseUrl}getAdminDashboardDetails`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        //   console.log(response);
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

  const cards = [
    { title: "Total Advertisers", value: dashboardData.totalAdvertisers, img: advertisersicon, link: "advertisers" },
    { title: "Total Admin", value: dashboardData.totalAdmins, img: totalUsers, link: "AllAdmin" },
    { title: "All Leads", value: dashboardData.allLeads, img: leadicon, link: "getallleads" },
    { title: "Completed Leads", value: dashboardData.completedLeads, img: completedlead, link: "getallleads?stat=completed" },
    { title: "Pending Leads", value: dashboardData.pendingLeads, img: pendinglead, link: "getallleads?stat=pending" },
    { title: "Rejected Leads", value: dashboardData.rejectedLeads, img: rejectedlead, link: "getallleads?stat=rejected" },
    { title: "Today's Leads", value: dashboardData.todaysLead, img: todaydlead, link: "getallleads?stat=today" },
    { title: "All Conferences", value: dashboardData.allConference, img: totoalconfrance, link: "allconfrences" },
    { title: "Today's Conferences", value: dashboardData.todaysConference, img: todaysconfrance, link: "allconfrences?stat=today" },
    { title: "Pending Conferences", value: dashboardData.pendingConference, img: pandingconfrance, link: "allconfrences?stat=pending" },
    { title: "Completed Conferences", value: dashboardData.completedConference, img: completedconfrance, link: "allconfrences?stat=completed" },
    { title: "Rejected Conferences", value: dashboardData.rejectedConference, img: rejectedconfrance, link: "allconfrences?stat=rejected" },
    { title: "Total Ad Cost", value: dashboardData.totalAdCost, img: totaladicon, link: "" },
    { title: "Pending Ad Amount", value: dashboardData.pending, img: totaladicon, link: "" },
    { title: "Approved Ad Amount", value: dashboardData.approved, img: totaladicon, link: "" },
    { title: "Cancelled Ad Amount", value: dashboardData.cancelled, img: totaladicon, link: "" },
    { title: "Completed Ad Amount", value: dashboardData.completed, img: totaladicon, link: "" },
    { title: "Rejected Ad Amount", value: dashboardData.rejected, img: totaladicon, link: "" },
    { title: "Total Conference Cost", value: dashboardData.totalConferenceCost, img: totaladicon, link: "" },
  ];


  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Upper Components */}
      <div className="flex flex-wrap items-center justify-center">
        <InfoCards cards={cards} handleNavigation={handleNavigation} />

      </div>

      <div className="mt-6 flex flex-wrap space-y-1 justify-around">
        <button
          onClick={() => handleNavigation('advertisers')}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Advertiser
        </button>
        <button
          onClick={() => handleNavigation("Reporter")}
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Reporter
        </button>
        <button
          onClick={() => handleNavigation("Influencer")}
          className="bg-yellow-500 text-white py-2 px-4 rounded"
        >
          Influencer
        </button>
        <button
          onClick={() => handleNavigation("getallleads")}
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          AllLead
        </button>
        <button
          onClick={() => handleNavigation("allconfrences")}
          className="bg-purple-500 text-white py-2 px-4 rounded"
        >
          AllConference
        </button>
        <button
          onClick={() => handleNavigation("AllUser")}
          className="bg-purple-500 text-white py-2 px-4 rounded"
        >
          AllUser
        </button>
        <button
          onClick={() => handleNavigation("card-requests")}
          className="bg-purple-500 text-white py-2 px-4 rounded"
        >
          Card
        </button>
      </div>
      {/* Main Dashboard Content */}
      <div className="flex flex-col mb-10 md:flex-row w-full mt-6 space-y-4 md:space-y-0 md:space-x-4">
        <SalesOverviewChart />
        <CountrySalesTable />
      </div>
      <Categories />

    </div>
  );
};

export default Dashboard;
