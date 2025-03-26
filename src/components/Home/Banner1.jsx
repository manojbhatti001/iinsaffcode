import React, { useState } from "react";
import radarOne from "../../assets/new animation/radar-1.png";
import iinsafHome from "../../assets/images/iinsaf-home.jpeg";
import iinsafHome2 from "../../assets/images/iinsaf_2.jpg";
import homeiinsaf from "../../assets/images/homeiinsaf.png";
import "./Banner1.css";
import { useNavigate } from "react-router-dom";

const Banner1 = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const navigation = useNavigate();

  // Handle navigation between slides
  const navigate = (direction) => {
    let newSlide = currentSlide + direction;
    if (newSlide < 1) newSlide = 2; // Loop back to the last slide
    if (newSlide > 2) newSlide = 1; // Loop back to the first slide
    setCurrentSlide(newSlide);
  };

  return (
    <div id="home" className="w-[99vw] h-[86vh] bg-gray-100 overflow-hidden relative flex items-center justify-center">
      {/* Desktop Images (Left & Right) */}
      <div className="absolute left-0 top-0 h-full w-1/2 hidden lg:block">
        <img
          src={iinsafHome2}
          alt="IINSAF Home Left"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-100/90"></div>
      </div>

      <div className="absolute right-0 top-0 h-full w-1/2 hidden lg:block">
        <img
          src={iinsafHome}
          alt="IINSAF Home Right"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-gray-100/90"></div>
      </div>

      {/* Mobile Image (Single Image) */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center lg:hidden">
        <img
          src={iinsafHome}
          alt="IINSAF Home"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-100/80"></div>
      </div>

      <img
        src={radarOne}
        alt="Radar Animation"
        className="radar-image animate-rotate-reverse absolute"
        style={{
          animation: "spin-reverse 10s linear infinite",
        }}
      />
      <div className="gradient-shade"></div>

      {/* Slide Content */}
      <div className="slider-content absolute z-10 flex flex-col items-center text-center w-4/5">
        {currentSlide === 1 && (
          <div className="content animate-fade-in transform transition-all duration-700 ease-in-out">
            <img
              src={homeiinsaf}
              alt="IINSAF Logo"
              className="mx-auto mb-8 w-64 h-auto hover:scale-105 transition-transform duration-300"
            />
            <h1 className="text-xl sm:text-4xl font-bold mb-4 text-black animate-slide-up">
              Welcome to <span className="text-red-600">II</span>NSAF
            </h1>
            <p className="text-sm sm:text-lg mt-4 animate-slide-up delay-100">
              <span className="text-red-600 font-semibold">International Influencing </span> 
              News Social Media Advertisement Federation
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8 animate-slide-up delay-200">
              <button
                className="quote-btn1 px-6 py-3 text-white font-bold rounded-lg bg-red-800 hover:bg-red-600 transform hover:scale-105 transition-all duration-300"
                onClick={() => navigation("/voice")}
              >
                Raise Your Voice
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4 animate-slide-up delay-200">
              <button
                className="quote-btn px-6 py-3 text-white bg-green-700 hover:bg-green-900 font-bold rounded-lg transform hover:scale-105 transition-all duration-300"
                onClick={() => navigation("/darbarRegister")}
              >
                जनसेवा दरबार
              </button>
              <button
                className="quote-btn px-6 py-3 text-white bg-blue-950 hover:bg-blue-700 font-bold rounded-lg transform hover:scale-105 transition-all duration-300"
                onClick={() => navigation("/register?role=Advertiser")}
              >
                Press Conference
              </button>
              <button
                onClick={() => navigation("/podcast")}
                className="quote-btn px-6 py-3 text-white bg-pink-500 hover:bg-pink-600 font-bold rounded-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
                Podcast
              </button>
            </div>
          </div>
        )}
        {currentSlide === 2 && (
          <div className="content animate-fade-in transform transition-all duration-700 ease-in-out">
            <img
              src={homeiinsaf}
              alt="IINSAF Logo"
              className="mx-auto mb-8 w-64 h-auto hover:scale-105 transition-transform duration-300"
            />
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-red-800 animate-slide-up">
              Digital Innovation Hub
            </h1>
            <p className="text-sm sm:text-lg mt-4 animate-slide-up delay-100">
              Helping your brand thrive in the digital era with innovative solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8 animate-slide-up delay-200">
              <button
                className="quote-btn px-6 py-3 text-white bg-black hover:bg-gray-900 font-bold rounded-lg transform hover:scale-105 transition-all duration-300"
                onClick={() => navigation("/darbarRegister")}
              >
                जनसेवा दरबार
              </button>
              <button
                className="quote-btn1 px-6 py-3 text-white font-bold rounded-lg bg-red-800 hover:bg-red-600 transform hover:scale-105 transition-all duration-300"
                onClick={() => navigation("/voice")}
              >
                Raise Your Voice
              </button>
              <button
                onClick={() => navigation("/podcast")}
                className="quote-btn px-6 py-3 text-white bg-pink-500 hover:bg-pink-600 font-bold rounded-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
                Podcast
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      {/* <div className="hidden sm:flex absolute bottom-24 right-16 navigation justify-center gap-4 opacity-100 z-50">
        <div className="arrow-container cursor-pointer hover:scale-110 transition-transform duration-300" onClick={() => navigate(-1)}>
          <span className="arrow-icon text-3xl text-red-800">&#8701;</span>
        </div>
        <div className="arrow-container cursor-pointer hover:scale-110 transition-transform duration-300" onClick={() => navigate(1)}>
          <span className="arrow-icon text-3xl text-red-800">&#8702;</span>
        </div>
      </div> */}

      {/* Serial Numbers and Headings */}
      {/* <div className="hidden sm:flex absolute bottom-12 left-[20%] transform z-40 -translate-x-1/2 items-center justify-center gap-8">
        <div
          className="animated-line"
          style={{
            position: "absolute",
            top: "-10px",
            width: "150px",
            height: "4px",
            backgroundColor: "#dc2626",
            borderRadius: "2px",
            transition: "all 0.5s ease",
            transform: `translateX(${currentSlide === 1 ? "-100px" : "100px"})`,
          }}
        ></div>

        <div
          className={`serial-number text-center cursor-pointer transition-all duration-300 hover:scale-105 ${
            currentSlide === 1 ? "active text-red-800" : ""
          }`}
          onClick={() => setCurrentSlide(1)}
        >
          <span className="number text-2xl sm:text-3xl font-bold">1</span>
          <p className="heading mt-2 text-sm sm:text-base font-medium">
            Welcome to IINSAF
          </p>
        </div>
        <div
          className={`serial-number text-center cursor-pointer transition-all duration-300 hover:scale-105 ${
            currentSlide === 2 ? "active text-red-800" : ""
          }`}
          onClick={() => setCurrentSlide(2)}
        >
          <span className="number text-2xl sm:text-3xl font-bold">2</span>
          <p className="heading mt-2 text-sm sm:text-base font-medium">
            Digital Innovation
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default Banner1;




