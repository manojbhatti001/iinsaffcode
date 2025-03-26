// Admin.js
import React from "react";

// Import Components
import InfoCards from "./InfoCards";
import SalesOverviewChart from "./SalesOverviewChart";
import CountrySalesTable from "./CountrySalesTable";
import Categories from "./Categories";

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

const Admin = () => {
  // Chart Data
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Users",
        data: [100, 200, 150, 400, 300, 250, 500],
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen  p-6">
      {/* Upper Components */}
      <InfoCards />
      <SalesOverviewChart />
      <CountrySalesTable />
      <Categories />

      {/* Main Dashboard Content */}
      <div className="container-fluid mt-6">
        <div className="row">
          <div className="col-12 col-md-6 mb-4">
            <div className="card bg-primary text-white">
              <div className="card-body text-center">26K Users</div>
            </div>
          </div>
          <div className="col-12 col-md-6 mb-4">
            <div className="card bg-info text-white">
              <div className="card-body text-center">$6,200 Income</div>
            </div>
          </div>
        </div>

        {/* Traffic Chart */}
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">Traffic (January - July)</div>
              <div className="card-body">
                <div
                  className="chart-wrapper"
                  style={{ position: "relative", height: "60vh", width: "100%" }}
                >
                  <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
