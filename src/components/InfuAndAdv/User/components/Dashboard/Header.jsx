import React from "react";

const Header = () => {
  return (
    <div className="bg-purple-800 text-white p-6 rounded-lg mb-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Welcome to iinsaf</h1>
      <p className="text-lg sm:text-xl">Congratulations 🎉</p>
      <p className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-2">420.8k</p>
      <button className="bg-purple-500 text-white px-6 py-2 mt-4 rounded hover:bg-purple-600 transition">
        View Sales
      </button>
    </div>
  );
};

export default Header;
