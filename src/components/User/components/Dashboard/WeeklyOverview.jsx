import React from "react";

const WeeklyOverview = () => {
  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg mb-8">
      <h2 className="text-xl sm:text-2xl font-bold">Weekly Overview</h2>

      {/* Placeholder for Chart */}
      <div className="bg-purple-700 h-32 sm:h-40 lg:h-48 mt-4 rounded-lg"></div>

      <p className="mt-4 text-sm sm:text-base">
        Your sales performance is 45% better compared to last month 🎉
      </p>

      <button className="bg-purple-500 text-white px-6 py-2 mt-4 rounded hover:bg-purple-600 transition">
        Details
      </button>
    </div>
  );
};

export default WeeklyOverview;
