import React from 'react';
import {
  FaBuilding,
  FaPhone,
  FaFacebook,
  FaTwitter,
  FaGooglePlus,
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa';

const socialLinks = [
  { icon: <FaFacebook />, url: '#', label: 'Facebook' },
  { icon: <FaTwitter />, url: '#', label: 'Twitter' },
  { icon: <FaGooglePlus />, url: '#', label: 'Google Plus' },
  { icon: <FaInstagram />, url: '#', label: 'Instagram' },
  { icon: <FaYoutube />, url: '#', label: 'YouTube' },
];

const SocialLink = ({ icon, url, label }) => (
  <a
    href={url}
    aria-label={label}
    className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow transition duration-300 hover:bg-blue-500 hover:text-white"
  >
    {icon}
  </a>
);

const Header = () => {
  return (
    <header className="flex items-center justify-center bg-white border-b py-2 lg:block sm:block md:block hidden shadow mb-1">
      <div className="container flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto px-4">
        {/* Left Side: Contact Information */}
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-black">
          <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full hover:bg-blue-500 transition duration-300">
              <FaBuilding className="text-blue-500 hover:text-white" />
            </div>
            <a
              href="https://www.google.com/maps/dir/29.1755814,75.7279962/29.1755026,75.727792/@29.1755171,75.7253194,17z/data=!3m1!4b1!4m5!4m4!1m1!4e1!1m1!4e1?entry=ttu&g_ep=EgoyMDI0MDkxOC4xIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-sm hover:text-blue-500"
            >
              <strong>Contact:</strong> IINSAF OFFICE SUNDAR NAGAR MAIN GATE
            </a>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full hover:bg-blue-500 transition duration-300">
              <FaPhone className="text-blue-500 hover:text-white" />
            </div>
            <span className="ml-2 text-sm hover:text-blue-500">
              <strong>Call Us:</strong> +91 99923-96623
            </span>
          </div>
        </div>

        {/* Right Side: Social Media Icons */}
        <div className="flex text-blue-500 items-center space-x-2 mt-2 sm:mt-0">
          {socialLinks.map((link, index) => (
            <SocialLink key={index} icon={link.icon} url={link.url} label={link.label} />
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;