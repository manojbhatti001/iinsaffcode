import React from "react";
import { Link } from "react-router-dom"; // Adjust based on your routing library
import iinsafwhiteimage from '../../assets/images/iinsaf.png'; // Replace with your logo path

const Footer = () => {
  return (
    <footer className="bg-blue-700 text-white">
      <div className="container mx-auto px-6 py-12">
        

        {/* Footer Main Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {/* Logo and Social Icons */}
          <div>
            <img src={iinsafwhiteimage} alt="Company Logo" className="w-32 mb-4" />
            <p className="font-bold mb-4">
              Iinsaaf is a leading platform dedicated to promoting social justice
              through innovative technological solutions.
            </p>
            <div className="flex space-x-5 ">
              <a href="#" className=  "text-blue-800">
                <i className="fa-brands fa-facebook-f text-xl"></i>
              </a>
              <a href="#" className="text-blue-600">
                <i className="fa-brands fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-blue-900">
                <i className="fa-brands fa-linkedin-in text-xl"></i>
              </a>
              <a href="#" className="text-red-600">
                <i className="fa-brands fa-youtube text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-blue-400">Homepage</Link></li>
              <li><Link to="/about" className="hover:text-blue-400">About Us</Link></li>
              <li><Link to="/faqs" className="hover:text-blue-400">Faqs</Link></li>
              <li><Link to="/register?as=1" className="hover:text-blue-400">Join as Reporter</Link></li>
              <li><Link to="/register?as=2" className="hover:text-blue-400">Join as Advertiser</Link></li>
            </ul>
          </div>

          {/* Privacy Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Privacy Links</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="hover:text-blue-400">Terms and Conditions</Link></li>
              <li><Link to="/privacypolicy" className="hover:text-blue-400">Privacy Policy</Link></li>
              <li><Link to="/refundpolicy" className="hover:text-blue-400">Refund Policy</Link></li>
              <li><Link to="/disclaimer" className="hover:text-blue-400">Disclaimer</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="tel:+919992396623" className="hover:text-blue-400 flex items-center">
                  <i className="fa-solid fa-phone mr-2"></i> +91 99923-96623
                </a>
              </li>
              <li>
                <a href="mailto:email@example.com" className="hover:text-blue-400 flex items-center">
                  <i className="fa-solid fa-envelope mr-2"></i> iinsafgroup@example.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <hr className="border-blue-600" />
      <div className="bg-blue-800 py-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            Copyright © 2024, All rights reserved by{" "}
            <a href="https://www.iinsaf.com" className="hover:text-blue-400">
              www.iinsaf.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
