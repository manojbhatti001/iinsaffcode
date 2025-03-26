import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "../../redux/advertiserDashbordSlicer";

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Advertiser Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User Information */}
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-xl font-semibold mb-2">User Details</h2>
          <p className="text-gray-700">Name: {data?.user?.name}</p>
          <p className="text-gray-700">Email: {data?.user?.email}</p>
        </div>

        {/* Leads Information */}
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-xl font-semibold mb-2">Leads</h2>
          <p className="text-gray-700">Total Leads: {data?.leads?.total}</p>
          <p className="text-gray-700">Pending: {data?.leads?.pending}</p>
          <p className="text-gray-700">Completed: {data?.leads?.completed}</p>
          <p className="text-gray-700">Rejected: {data?.leads?.rejected}</p>
        </div>

        {/* Conferences Information */}
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-xl font-semibold mb-2">Conferences</h2>
          <p className="text-gray-700">Total Conferences: {data?.conferences?.total}</p>
          <p className="text-gray-700">Pending: {data?.conferences?.pending}</p>
          <p className="text-gray-700">Completed: {data?.conferences?.completed}</p>
          <p className="text-gray-700">Rejected: {data?.conferences?.rejected}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
