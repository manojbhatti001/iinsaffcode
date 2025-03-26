// src/components/DashboardHome.js
import React from 'react';

const DashboardHome = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Dashboard Overview</h2>
      <p className="text-gray-600">Here is an overview of your dashboard metrics.</p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold">Total Orders</h3>
          <p className="text-4xl font-semibold">1,245</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold">Completed Orders</h3>
          <p className="text-4xl font-semibold">1,211</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
