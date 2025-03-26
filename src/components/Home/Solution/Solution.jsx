import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Solution = () => {
  return (
    <div className="bg-gradient-to-r from-purple-800 via-blue-700 to-black flex flex-col items-center justify-center p-4 lg:p-12 w-full">
      {/* Intro Section */}
      <div className="intro-section text-center mb-16">
        <div className="line-decorator mb-5 bg-orange-500 w-20 h-1 mx-auto"></div>
        <h1 className="text-5xl font-bold text-white mb-4">Solutions for every marketing objective</h1>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto">No matter your primary objective, explore these resources that are best suited to help you accomplish your advertising plans.</p>
      </div>

      {/* Objectives Section */}
      <div className="objectives-section w-full max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Reach more customers */}
          <div className="objective-card bg-white p-8 rounded-xl shadow-2xl text-center transform transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:bg-gradient-to-b from-white to-blue-50 border-2 border-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <div className="icon text-6xl text-blue-600 mb-6 transform transition-all duration-500 hover:scale-125 hover:rotate-12 hover:text-red-500">
              <i className="fas fa-users hover:animate-bounce"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Reach more customers</h2>
            <p className="text-base text-gray-600">Connect with your customers at the right time with impactful messages.</p>
          </div>

          {/* Increase sales */}
          <div className="objective-card bg-white p-8 rounded-xl shadow-2xl text-center transform transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:bg-gradient-to-b from-white to-blue-50 border-2 border-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <div className="icon text-6xl text-blue-600 mb-6 transform transition-all duration-500 hover:scale-125 hover:-rotate-12 hover:text-green-500">
              <i className="fas fa-dollar-sign hover:animate-pulse"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Increase sales</h2>
            <p className="text-base text-gray-600">Drive results with powerful insights and strategies.</p>
          </div>

          {/* Increase traffic */}
          <div className="objective-card bg-white p-8 rounded-xl shadow-2xl text-center transform transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:bg-gradient-to-b from-white to-blue-50 border-2 border-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <div className="icon text-6xl text-blue-600 mb-6 transform transition-all duration-500 hover:scale-125 hover:rotate-180 hover:text-yellow-500">
              <i className="fas fa-chart-line hover:animate-pulse"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Increase traffic</h2>
            <p className="text-base text-gray-600">Maximize engagement and grow your audience reach.</p>
          </div>

          {/* Build brand awareness */}
          <div className="objective-card bg-white p-8 rounded-xl shadow-2xl text-center transform transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:bg-gradient-to-b from-white to-blue-50 border-2 border-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <div className="icon text-6xl text-blue-600 mb-6 transform transition-all duration-500 hover:scale-125 hover:rotate-45 hover:text-purple-500">
              <i className="fas fa-lightbulb hover:animate-pulse"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Build brand awareness</h2>
            <p className="text-base text-gray-600">Create memorable brand moments that capture attention.</p>
          </div>

          {/* Improve customer loyalty */}
          <div className="objective-card bg-white p-8 rounded-xl shadow-2xl text-center transform transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:bg-gradient-to-b from-white to-blue-50 border-2 border-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <div className="icon text-6xl text-blue-600 mb-6 transform transition-all duration-500 hover:scale-125 hover:rotate-12 hover:text-pink-500">
              <i className="fas fa-heart hover:animate-bounce"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Improve customer loyalty</h2>
            <p className="text-base text-gray-600">Build lasting relationships with your audience.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Solution;
