import React from "react";

const StatisticsCard = ({ title, value, change }) => {
  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg mb-8">
      <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
      <p className="text-3xl sm:text-4xl font-bold mt-2">{value}</p>
      <p className="text-lg sm:text-xl">{change}</p>
    </div>
  );
};

export default StatisticsCard;
