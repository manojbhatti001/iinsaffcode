import React from "react";

const MonthlyOverview = () => {
  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg mb-8">
      <h2 className="text-xl sm:text-2xl font-bold">Monthly Overview</h2>
      <p>Total 48.5% growth 😎 this month</p>

      <div className="flex flex-wrap mt-4">
        {[
          { title: "Sales", value: "245k", bg: "bg-purple-700" },
          { title: "Customers", value: "12.5k", bg: "bg-green-700" },
          { title: "Products", value: "1.54k", bg: "bg-orange-700" },
          { title: "Revenue", value: "$88k", bg: "bg-blue-700" },
        ].map((item, index) => (
          <div key={index} className="w-1/2 md:w-1/4 p-2">
            <div className={`${item.bg} p-4 rounded`}>
              <p>{item.title}</p>
              <p className="text-xl lg:text-2xl font-bold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyOverview;
