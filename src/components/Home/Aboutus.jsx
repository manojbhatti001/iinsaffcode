import React from "react";
import img1 from "../../assets/services/about -us-2.png";
import img2 from "../../assets/services/about us banner.jpg";

const AboutUs = () => {
  return (
    <div
      id="about"
      className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 py-24 px-4 sm:px-6 lg:px-0"
    >
      {/* Enhanced Decorative Elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-blue-100 rounded-full opacity-30 blur-2xl -translate-x-16 -translate-y-16 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-100 rounded-full opacity-30 blur-2xl translate-x-16 translate-y-16 animate-pulse"></div>

      {/* Content Wrapper */}
      <div className="max-w-7xl mx-auto">
        <div className="w-full lg:w-[90%] mx-auto flex flex-col lg:flex-row gap-20 items-center">
          {/* Left Section */}
          <div className="lg:w-1/2 flex flex-col justify-between space-y-10">
            <div>
              <div className="inline-block">
                <h3 className="text-blue-600 font-bold text-[32px] relative group">
                  About Us
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 transform scale-x-50 origin-left group-hover:scale-x-100 transition-transform duration-300"></div>
                </h3>
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 leading-tight mt-6 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                Meet our company unless miss the opportunity
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10">
                <div className="transform hover:scale-105 transition-all duration-300 hover:-translate-y-2">
                  <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-lg hover:shadow-xl border border-gray-50">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl rotate-3 hover:rotate-6 transition-transform">
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-4.02-.49-7.17-3.83-7.64-7.93h2.1c.45 3.31 3.31 5.87 6.73 5.87 3.41 0 6.27-2.56 6.73-5.87h2.1c-.47 4.1-3.62 7.44-7.64 7.93V13h2l-3-3-3 3h2v6.93z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800">Business Consulting</h4>
                    </div>
                  </div>
                </div>

                <div className="transform hover:scale-105 transition-all duration-300 hover:-translate-y-2">
                  <div className="flex items-start space-x-4 bg-white p-4 rounded-xl shadow-lg hover:shadow-xl border border-gray-50">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-xl -rotate-3 hover:-rotate-6 transition-transform">
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-4.02-.49-7.17-3.83-7.64-7.93h2.1c.45 3.31 3.31 5.87 6.73 5.87 3.41 0 6.27-2.56 6.73-5.87h2.1c-.47 4.1-3.62 7.44-7.64 7.93V13h2l-3-3-3 3h2v6.93z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800">Years Of Expertise</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-10 rounded-full hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-semibold text-lg">
                Discover Now
              </button>

              {/* Enhanced Subscribe Now Section */}
              <div className="bg-white shadow-lg rounded-2xl p-2 hover:shadow-xl transition-shadow">
                <div className="text-center mb-4">
                  <span className="text-xs text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full">
                    For IT Company
                  </span>
                  <h2 className="font-bold text-xl mt-2">
                    Join IT Solution Our Community
                  </h2>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 rounded-full border focus:ring-1 focus:ring-blue-300 text-sm"
                  />
                  <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition-all text-sm font-medium">
                    Subscribe Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Adjusted for medium-sized images */}
          <div className="lg:w-1/2 grid grid-rows-2 gap-10">
            <div className="transform hover:scale-102 transition-transform duration-500 rounded-3xl overflow-hidden shadow-xl group">
              <img
                src={img1}
                className="w-full h-[250px] object-cover transform group-hover:scale-110 transition-transform duration-700"
                alt="About Us 1"
              />
            </div>
            <div className="transform hover:scale-102 transition-transform duration-500 rounded-3xl overflow-hidden shadow-xl group">
              <img
                src={img2}
                className="w-full h-[250px] object-cover transform group-hover:scale-110 transition-transform duration-700"
                alt="About Us 2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;



