import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/images/iinsaf.png";
import iifra from "../../assets/icon/iifra logo.png";
import mehartech from "../../assets/icon/meharetech.png";
import bloodlife from "../../assets/icon/blood logo.png";
import gju from "../../assets/icon/gju.png";
import saveplant from "../../assets/icon/save plant.png";
import election from "../../assets/icon/election party.png";
import reporting from "../../assets/icon/reporting.png";
import advertising from "../../assets/icon/add service.png";
import infuleuncing from "../../assets/icon/influencing services (2).png";
import socialMedia from "../../assets/icon/social-media.png";
import campaign from "../../assets/icon/capaign manager.png";
import brandLaunch from "../../assets/icon/brand launch.png";
import electioni from "../../assets/icon/elction.png";
import reporter from "../../assets/icon/reporter.png";
import advertiser from "../../assets/icon/ads-career.png";
import influcencer from "../../assets/icon/influencer career.png";
import marketer from "../../assets/icon/marketer.png";
import drLaw from "../../assets/icon/doctor.png";
import survey from "../../assets/icon/survey.png";
import customer from "../../assets/icon/customer-review.png";
import employee from "../../assets/icon/employee.png";
import student from "../../assets/icon/students review.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ activeTopic, setActiveTopic, activeCareer, setActiveCareer }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const sidebarRef = useRef(null);
  
  // Add these new state variables
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  // Add the handleScroll function here
  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    
    // Close mobile menu when scrolling
    if (isOpen) {
      setIsOpen(false);
    }

    // Existing scroll hide/show logic
    const visible = currentScrollPos < 10 || currentScrollPos < prevScrollPos;
    setVisible(visible);
    setPrevScrollPos(currentScrollPos);
  };

  // Add this useEffect for scroll listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, visible, isOpen]);

  // Rest of your component code...

  // Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  const closeNavAndNavigate = () => {
    setIsOpen(false); // Close the navigation
  };
  

  const goToProfile = () => {
    if (localStorage.getItem("userRole") === "Reporter" || localStorage.getItem("userRole") === "Influencer") {
      navigate("/ReporterDashboard/profile");
    } else if (localStorage.getItem("userRole") === "Advertiser") {
      navigate("/InAd/profile");
    }
    else if (localStorage.getItem("marketerToken")) {
      navigate("/marketerDashboard/userProfile");
    }
  }

  // Modify the dropdown handling
  const handleMouseEnter = (dropdown) => {
    setOpenDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  return (
    <nav
      className="fixed top-8 left-0 w-full z-[999]"
      ref={sidebarRef}
    >
      <div className="w-[70%] md:w-[85%] mr-auto ml-[10%] py-2">
        <div className="px-6 py-3 rounded-2xl border border-gray-200 shadow-sm bg-white/95">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <Link to="/" className="flex items-center">
              <img src={logo} alt="IINSAF Logo" className="h-10 w-auto" />
            </Link>

            {/* Combined Navigation and Auth Section */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Navigation Items */}
              <Link to="/#home" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-base font-medium">
                Home
              </Link>

              {/* Services Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => handleMouseEnter('services')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200 text-base font-medium"
                >
                  <span>Services</span>
                  <FontAwesomeIcon
                    icon={openDropdown === 'services' ? faChevronUp : faChevronDown}
                    className="h-4 w-4 ml-1"
                  />
                </button>
                {openDropdown === 'services' && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl py-2 animate-fadeIn border border-gray-100">
                    <div className="max-h-[80vh] overflow-y-auto">
                      <ul className="grid grid-cols-1 gap-1 p-2">
                        {/* Reporting */}
                        <li
                          onClick={() => setActiveTopic("reporting")}
                          className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg transition-all duration-200"
                        >
                          <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <img
                              src={reporting}
                              alt="Reporting Logo"
                              className="h-8 w-8"
                            />
                          </div>
                          <span className="text-lg font-medium">
                            <a href="#services">Reporting</a>
                          </span>
                        </li>
                        {/* Advertising */}
                        <li
                          onClick={() => setActiveTopic("advertising")}
                          className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg transition-all duration-200"
                        >
                          <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <img
                              src={advertising}
                              alt="Advertising Logo"
                              className="h-8 w-8"
                            />
                          </div>
                          <span className="text-lg font-medium">
                            <a href="#services">Advertising</a>
                          </span>
                        </li>
                        {/* Influencing */}
                        <li
                          onClick={() => setActiveTopic("influencing")}
                          className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg transition-all duration-200"
                        >
                          <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <img
                              src={infuleuncing}
                              alt="Influencing Logo"
                              className="h-8 w-8"
                            />
                          </div>
                          <span className="text-lg font-medium">
                            <a href="#services">Influencing</a>
                          </span>
                        </li>
                        {/* Social Media Marketing */}
                        <li
                          onClick={() => setActiveTopic("socialMedia")}
                          className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg transition-all duration-200"
                        >
                          <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <img
                              src={socialMedia}
                              alt="Social Media Marketing Logo"
                              className="h-8 w-8"
                            />
                          </div>
                          <span className="text-lg font-medium">
                            <a href="#services">Social Media Marketing</a>
                          </span>
                        </li>
                        {/* Campaign Management */}
                        <li
                          onClick={() => setActiveTopic("campaignManagement")}
                          className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg transition-all duration-200"
                        >
                          <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <img
                              src={campaign}
                              alt="Campaign Management Logo"
                              className="h-8 w-8"
                            />
                          </div>
                          <span className="text-lg font-medium">
                            <a href="#services">Campaign Management</a>
                          </span>
                        </li>
                        {/* Brand Launch */}
                        <li
                          onClick={() => setActiveTopic("brandLaunch")}
                          className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg transition-all duration-200"
                        >
                          <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <img
                              src={brandLaunch}
                              alt="Brand Launch Logo"
                              className="h-8 w-8"
                            />
                          </div>
                          <span className="text-lg font-medium">
                            <a href="#services">Brand Launch</a>
                          </span>
                        </li>
                        {/* Election Campaign Management */}
                        <li
                          onClick={() => setActiveTopic("electionCampaign")}
                          className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg transition-all duration-200"
                        >
                          <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <img
                              src={electioni}
                              alt="Election Campaign Management Logo"
                              className="h-8 w-8"
                            />
                          </div>
                          <span className="text-lg font-medium">
                            <a href="#services">Election Campaign Management</a>
                          </span>
                        </li>
                        {/* Survey */}
                        <li
                          onClick={() => setActiveTopic("survey")}
                          className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg transition-all duration-200"
                        >
                          <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <img
                              src={survey}
                              alt="Survey Logo"
                              className="h-8 w-8"
                            />
                          </div>
                          <span className="text-lg font-medium">
                            <a href="#services">Survey</a>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Careers Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => handleMouseEnter('careers')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200 text-base font-medium"
                >
                  <span>Careers</span>
                  <FontAwesomeIcon
                    icon={openDropdown === 'careers' ? faChevronUp : faChevronDown}
                    className="h-4 w-4 ml-1"
                  />
                </button>
                {openDropdown === 'careers' && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl py-2 animate-fadeIn border border-gray-100">
                    <div className="max-h-[80vh] overflow-y-auto">
                      <ul className="flex flex-col p-2 space-y-2">
                        <li
                          onClick={() => setActiveCareer("Reporter")}
                          className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg transition-all duration-200"
                        >
                          <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <img
                              src={reporter}
                              alt="Election Campaign Management Logo"
                              className="h-8 w-8"
                            />
                          </div>
                          <span className="text-lg font-medium">
                            <a href="/register?role=Reporter">Reporter</a>
                          </span>
                        </li>
                        <li
                          onClick={() => setActiveCareer("Advertiser")}
                          className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg transition-all duration-200"
                        >
                          <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <img
                              src={advertiser}
                              alt="Election Campaign Management Logo"
                              className="h-8 w-8"
                            />
                          </div>
                          <span className="text-lg font-medium">
                            <a href="/register?role=Advertiser">Advertiser</a>
                          </span>
                        </li>
                        <li
                          onClick={() => setActiveCareer("Marketer")}
                          className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg transition-all duration-200"
                        >
                          <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <img
                              src={marketer}
                              alt="Election Campaign Management Logo"
                              className="h-8 w-8"
                            />
                          </div>
                          <span className="text-lg font-medium">
                            <a href="/marketer">Marketer</a>
                          </span>
                        </li>
                        <li
                          onClick={() => setActiveCareer("Influencer")}
                          className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg transition-all duration-200"
                        >
                          <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <img
                              src={influcencer}
                              alt="Election Campaign Management Logo"
                              className="h-8 w-8"
                            />
                          </div>
                          <span className="text-lg font-medium">
                            <a href="/register?role=Influencer">Influencer</a>
                          </span>
                        </li>
                        <li
                          onClick={() => setActiveCareer("Dr, Lawyer")}
                          className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg transition-all duration-200"
                        >
                          <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <img
                              src={drLaw}
                              alt="Election Campaign Management Logo"
                              className="h-8 w-8"
                            />
                          </div>
                          <span className="text-lg font-medium">
                            <a href="/JoinIinsaf">Dr, Lawyer</a>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Auth Buttons */}
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={goToProfile}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 shadow-md"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleLogin}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 shadow-md"
                  >
                    Login
                  </button>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 shadow-sm"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="w-5 h-0.5 bg-gray-600 mb-1"></div>
              <div className="w-5 h-0.5 bg-gray-600 mb-1"></div>
              <div className="w-5 h-0.5 bg-gray-600"></div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden fixed top-[0rem] left-0 w-[55%] h-[calc(100vh-4rem)] bg-white/95 backdrop-blur-lg overflow-y-auto z-50">
            {/* Auth Buttons for Mobile - Shown at top */}
            <div className="px-3 py-2 border-b border-gray-200">
              {isLoggedIn ? (
                <div className="flex flex-col space-y-1">
                  <button
                    onClick={goToProfile}
                    className="w-full px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-blue-600 bg-gray-50 rounded-lg transition-colors duration-200"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-1">
                  <button
                    onClick={handleLogin}
                    className="w-[200px] px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                  >
                    Login
                  </button>
                  <Link
                    to="/register"
                    className="w-[200px] px-3 py-1.5 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 text-center transition-colors duration-200"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Navigation Links */}
            <div className="px-2 py-1 space-y-1 ">
              {/* Home */}
              <Link 
                to="/#home" 
                className="block py-1.5 px-2 text-gray-700 hover:text-blue-600 text-sm"
                onClick={closeNavAndNavigate}
              >
                Home
              </Link>

              {/* Services Dropdown */}
              <div>
                <button
                  onClick={() => toggleDropdown('mobileServices')}
                  className="flex items-center justify-between w-full py-1.5 px-2 text-gray-700 text-sm"
                >
                  <span>Services</span>
                  <FontAwesomeIcon
                    icon={openDropdown === 'mobileServices' ? faChevronUp : faChevronDown}
                    className="h-3 w-3"
                  />
                </button>
                {openDropdown === 'mobileServices' && (
                  <div className="pl-4 py-1 space-y-1">
                    <a href="#services" onClick={() => { setActiveTopic("reporting"); closeNavAndNavigate(); }} className="block py-1.5 text-sm text-gray-600 hover:text-blue-600">Reporting</a>
                    <a href="#services" onClick={() => { setActiveTopic("advertising"); closeNavAndNavigate(); }} className="block py-1.5 text-sm text-gray-600 hover:text-blue-600">Advertising</a>
                    <a href="#services" onClick={() => { setActiveTopic("influencing"); closeNavAndNavigate(); }} className="block py-1.5 text-sm text-gray-600 hover:text-blue-600">Influencing</a>
                    <a href="#services" onClick={() => { setActiveTopic("socialMedia"); closeNavAndNavigate(); }} className="block py-1.5 text-sm text-gray-600 hover:text-blue-600">Social Media Marketing</a>
                    <a href="#services" onClick={() => { setActiveTopic("campaignManagement"); closeNavAndNavigate(); }} className="block py-1.5 text-sm text-gray-600 hover:text-blue-600">Campaign Management</a>
                    <a href="#services" onClick={() => { setActiveTopic("brandLaunch"); closeNavAndNavigate(); }} className="block py-1.5 text-sm text-gray-600 hover:text-blue-600">Brand Launch</a>
                    <a href="#services" onClick={() => { setActiveTopic("electionCampaign"); closeNavAndNavigate(); }} className="block py-1.5 text-sm text-gray-600 hover:text-blue-600">Election Campaign</a>
                    <a href="#services" onClick={() => { setActiveTopic("survey"); closeNavAndNavigate(); }} className="block py-1.5 text-sm text-gray-600 hover:text-blue-600">Survey</a>
                  </div>
                )}
              </div>

              {/* Careers Dropdown */}
              <div>
                <button
                  onClick={() => toggleDropdown('mobileCareers')}
                  className="flex items-center justify-between w-full py-1.5 px-2 text-gray-700 text-sm"
                >
                  <span>Careers</span>
                  <FontAwesomeIcon
                    icon={openDropdown === 'mobileCareers' ? faChevronUp : faChevronDown}
                    className="h-3 w-3"
                  />
                </button>
                {openDropdown === 'mobileCareers' && (
                  <div className="pl-4 py-1 space-y-1">
                    <a href="/register?role=Reporter" onClick={() => { setActiveCareer("Reporter"); closeNavAndNavigate(); }} className="block py-1.5 text-sm text-gray-600 hover:text-blue-600">Reporter</a>
                    <a href="/register?role=Advertiser" onClick={() => { setActiveCareer("Advertiser"); closeNavAndNavigate(); }} className="block py-1.5 text-sm text-gray-600 hover:text-blue-600">Advertiser</a>
                    <a href="/marketer" onClick={() => { setActiveCareer("Marketer"); closeNavAndNavigate(); }} className="block py-1.5 text-sm text-gray-600 hover:text-blue-600">Marketer</a>
                    <a href="/register?role=Influencer" onClick={() => { setActiveCareer("Influencer"); closeNavAndNavigate(); }} className="block py-1.5 text-sm text-gray-600 hover:text-blue-600">Influencer</a>
                    <a href="/JoinIinsaf" onClick={() => { setActiveCareer("Dr, Lawyer"); closeNavAndNavigate(); }} className="block py-1.5 text-sm text-gray-600 hover:text-blue-600">Dr, Lawyer</a>
                  </div>
                )}
              </div>

              {/* About and Contact
              <Link 
                to="/about" 
                className="block py-1.5 px-2 text-gray-700 hover:text-blue-600 text-sm"
                onClick={closeNavAndNavigate}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="block py-1.5 px-2 text-gray-700 hover:text-blue-600 text-sm"
                onClick={closeNavAndNavigate}
              >
                Contact */}
              {/* </Link> */}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
