// Admin.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "../../../../../redux/advertiserDashbordSlicer";
// Import Components
import InfoCards from "./InfoCards";
import SalesOverviewChart from "./SalesOverviewChart";
import CountrySalesTable from "./CountrySalesTable";
import Categories from "./Categories";
import totalleads from '../../assets/icons/advertisers.png'
import pandingleads from '../../assets/icons/pending_card.png'
import completedleadicon from '../../assets/icons/clead.png'
import cancelledleadicon from '../../assets/icons/cancell.png'
import conferenceicon from '../../assets/icons/conferences.png'
import pendingconicon from '../../assets/icons/pendingConferences.png'
import completedconicon from '../../assets/icons/completeconfo.png'
import rejectedconf from '../../assets/icons/cancel_confo.png'
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

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.advertiserDashboard
  );

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;



  const cardData = [
    {
      section: 'Advertisement',
      items: [
        { title: 'Total Leads', value: data?.leads?.total, link: 'leads-Status?stat=all', img: totalleads },
        { title: 'Pending', value: data?.leads?.pending, link: 'leads-Status?stat=approved', img: pandingleads },
        { title: 'Completed', value: data?.leads?.completed, link: 'leads-Status?stat=completed', img: completedleadicon },
        { title: 'Rejected', value: data?.leads?.rejected, link: 'leads-Status?stat=rejected', img: cancelledleadicon },
      ]
    },
    {
      section: 'Conferences',
      items: [
        { title: 'Total Conferences', value: data?.conferences?.total, link: 'get-user-conferences?stat=All', img: conferenceicon },
        { title: 'Pending', value: data?.conferences?.pending, link: 'get-user-conferences?stat=Pending', img: pendingconicon },
        { title: 'Completed', value: data?.conferences?.completed, link: 'get-user-conferences?stat=Completed', img: completedconicon },
        { title: 'Rejected', value: data?.conferences?.rejected, link: 'get-user-conferences?stat=Rejected', img: rejectedconf }
      ]
    }
  ];


  // This array is now ready to be passed to a component that will render it.


  return (
    <div className="flex flex-col min-h-screen  p-6">
      {/* Upper Components */}
      <InfoCards data={cardData} />
      {/* <SalesOverviewChart /> */}
      {/* <CountrySalesTable /> */}
      {/* <Categories /> */}

    </div>
  );
};

export default Dashboard;
