import React, { useEffect, useState } from "react";
import InfoCards from "./InfoCards";
import axios from "axios";
import { baseUrl } from "../../../../../utils/const";
import totalleadsicon from '../../assets/icons/leads.png'
import { useNavigate } from "react-router-dom";
import SalesOverviewChart from "./SalesOverviewChart";
import CountrySalesTable from "./CountrySalesTable";

const Dashboard = ({ handleNavigation }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${baseUrl}getDashboardDetailsReporter`, {
          headers: {
            Authorization: localStorage.getItem("userToken"),
          },
        });
        //   console.log(response)
        setDashboardData(response.data);
        if (response.data.success) {
          setDashboardData(response.data.data);
        } else {
          console.error("Failed to fetch dashboard details");
        }
      } catch (error) {
        //   console.log(error)
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
    { title: "Total Advertisement", value: dashboardData.totalLeads.length, img: totalleadsicon, link: "relevant-status" },
    { title: "Relevent Conference", value: dashboardData.relevantConferences.length, img: totalleadsicon, link: "conferences" },
    { title: "Todays Conference", value: dashboardData.todaysConference.length, img: totalleadsicon, link: "conferences?stat=today" },
    { title: "Today Leads", value: dashboardData.todaysLead.length, img: totalleadsicon, link: "relevant-status?stat=today" },
    { title: "Completed Conference", value: dashboardData.userAcceptedCompletedConference.length, img: totalleadsicon, link: "completed-con" },
    { title: "Completed Leads", value: dashboardData.userAcceptedCompletedLeads.length, img: totalleadsicon, link: "completed-status" },
    { title: "Accepted Leads", value: dashboardData.userAcceptedLeads.length, img: totalleadsicon, link: "accepeted-status" },
    { title: "Pending Conference", value: dashboardData.userAcceptedPendingConference.length, img: totalleadsicon, link: "pending-con" },
    { title: "Darbars", value: dashboardData.darbars.length, img: totalleadsicon, link: "relevant-darbar" },
    { title: "User Darbars", value: dashboardData.userDarbars.length, img: totalleadsicon, link: "Accept-darbar" },

  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-wrap items-center justify-center">
        <InfoCards cards={cards} handleNavigation={handleNavigation} />
      </div>
      {/* <SalesOverviewChart/> */}
      {/* <CountrySalesTable/> */}
    </div>
  );
};

export default Dashboard;
