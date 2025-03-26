import React, { useState } from 'react';
import bgimg from '../../assets/backgroundimages/backgroundimageserivicesection.webp';
import { Navigate, useNavigate } from 'react-router-dom';

const ServicesSection = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center relative"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      {/* Main Menu Button - Positioned on the center-left */}
         <div className="h-96 w-96 rotated-half-circle">
      {/* Optional content can go here */}
    </div>

      {/* Sub-Buttons in a Circular Pattern to the Right */}
      <div
        className={`absolute left-10 top-1/2 transform -translate-y-1/2 transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
      >
        <button
          onClick={() => handleNavigation('/rise-your-voice')}
          className="menu-item w-40 h-10 bg-red-500 text-white rounded-full shadow-md absolute transition-transform duration-500 ease-in-out"
          style={{
            transform: isOpen
              ? `translate(20px, -300px) rotate(-30deg)`
              : `translate(0, 0) rotate(-25deg)`, // Rotate along with translate
          }}
        >
          Rise Your Voice
        </button>

        <button
          onClick={() => handleNavigation('/marketer')}
          className="menu-item w-40 h-10 bg-green-500 text-white rounded-full shadow-md absolute transition-transform duration-500 ease-in-out"
          style={{
            transform: isOpen
              ? `translate(100px, -170px) rotate(-20deg)`
              : `translate(0, 0) rotate(-5deg)`, // Rotate along with translate
          }}
        >
          Marketer
        </button>

        <button
          onClick={() => handleNavigation('/login')}
          className="menu-item w-40 h-10 bg-yellow-500 text-white rounded-full shadow-md absolute transition-transform duration-500 ease-in-out"
          style={{
            transform: isOpen
              ? `translate(110px, -10px) `
              : `translate(0, 0)`, // Rotate along with translate
          }}
        >
          Advertiser
        </button>

        <button
          onClick={() => handleNavigation('/login')}
          className="menu-item w-40 h-10 bg-purple-500 text-white rounded-full shadow-md absolute transition-transform duration-500 ease-in-out"
          style={{
            transform: isOpen
              ? `translate(90px, 150px) rotate(20deg)`
              : `translate(0, 0) rotate(-25deg)`, // Rotate along with translate
          }}
        >
          Reporter
        </button>

        <button
          onClick={() => handleNavigation('/login')}
          className="menu-item w-40 h-10 bg-teal-500 text-white rounded-full shadow-md absolute transition-transform duration-500 ease-in-out"
          style={{
            transform: isOpen
              ? `translate(0px, 270px) rotate(30deg)`
              : `translate(0, 0) rotate(-25deg)`, // Rotate along with translate
          }}
        >
          Influencer
        </button>
      </div>
    </div>
  );
};

export default ServicesSection;
