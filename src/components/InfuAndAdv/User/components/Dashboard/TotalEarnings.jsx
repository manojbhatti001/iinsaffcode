import React from "react";

const TotalEarnings = () => {
  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg mb-8">
      <h2 className="text-xl sm:text-2xl font-bold">Total Earnings</h2>
      <p className="text-4xl sm:text-5xl font-bold mt-2">
        $24,895 <span className="text-green-500 text-lg sm:text-xl">+10%</span>
      </p>
      <p>Compared to $84,325 last year</p>

      {[
        { category: "Men", details: "Clothing, Footwear", value: "$24,895.65" },
        { category: "Women", details: "Clothing, Handbags, Jewellery", value: "$8,650.20" },
        { category: "Kids", details: "Clothing", value: "$1,245.80" },
      ].map((item, index) => (
        <div key={index} className="mt-4">
          <p className="font-bold text-lg sm:text-xl">{item.category}</p>
          <p className="text-sm sm:text-base">{item.details}</p>
          <p className="text-xl sm:text-2xl font-bold">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default TotalEarnings;
