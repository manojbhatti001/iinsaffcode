import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import test from "../../assets/services/test.jpg";
import { FaPlay } from "react-icons/fa";

const Card = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS with a duration of 1000ms
  }, []);

  return (
    <div
      className="mt-10 bgsecondhome mb-10 p-6 md:p-8 lg:p-12 xl:p-16 rounded-xl shadow-lg max-w-6xl mx-auto"
      data-aos="fade-up" // AOS animation trigger for the entire card
      style={{
        backgroundImage: `url(${test})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Section */}
        <div
          className="md:w-[40%] lg:w-[35%] xl:w-[30%] w-full"
          data-aos="fade-right"
        >
          {/* Add any left section content here if needed */}
        </div>

        {/* Right Section with Glass Effect */}
        <div
          className="md:w-[60%] lg:w-[65%] xl:w-[70%] xl:ml-28 w-full glass-effect p-6 md:p-8 rounded-lg"
          data-aos="fade-left"
        >
          <h1 className="text-xl md:text-3xl lg:text-4xl font-semibold text-gray-800 mb-6">
            How to make a perfect gaming website?
          </h1>

          <ol className="space-y-6">
            <li>
              <h2 className="text-base md:text-xl font-semibold text-gray-900">
                1. Select a game website template
              </h2>
              <p className="text-gray-700 text-sm">
                First, log into Renderforest's gaming website creator and choose
                the template that resonates with your audience. Click on the
                template to start customizing it.
              </p>
            </li>
            <li>
              <h2 className="text-base md:text-xl font-semibold text-gray-900">
                2. Customize your template
              </h2>
              <p className="text-gray-700 text-sm">
                Next, you will be redirected to Renderforest's editor where you
                can make your own game website by customizing the design,
                layout, text, and more to reflect your brand.
              </p>
            </li>
            <li>
              <h2 className="text-base md:text-xl font-semibold text-gray-900">
                3. Launch and promote your website
              </h2>
              <p className="text-gray-700 text-sm">
                Now you can launch your website using your custom domain or
                Renderforest's free subdomain. Once it is live, promote it to
                your audience through social media, email marketing, and other
                channels.
              </p>
            </li>
          </ol>
          <div
            className="flex justify-center items-center space-x-4 mt-8"
            data-aos="fade-up"
          >
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 transition duration-300 shadow-lg lg:px-6"
            >
              <FaPlay className="text-white text-lg" />
              Watch Now
            </a>
            <button className="px-3 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition duration-300 shadow-lg lg:px-6">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
