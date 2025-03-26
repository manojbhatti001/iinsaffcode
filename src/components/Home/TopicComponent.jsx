import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

import reportingimg from "../../assets/icon/reporter.png";
import advartisimg from "../../assets/services/advertiser icon.png";
import influencimg from "../../assets/icon/influencing services (2).png";
import bgImageLeft from "../../assets/backgroundimages/bg5.jpg";
import bgImageRight from "../../assets/backgroundimages/bg4.jpg";
import bgImageTop from "../../assets/backgroundimages/bg3.jpg";
import bgImageBottom from "../../assets/backgroundimages/bg3.jpg";
import advertiserjpg from "../../assets/services/advertiser1.jpg";
import reporterjpg from "../../assets/services/reporting.png";
import inflencerjng from "../../assets/services/infuleuncing.png";
import socialMedia from "../../assets/icon/social-media.png";
import socialMediaimg from "../../assets/services/social media manage.png";
import campaignManagementicon from "../../assets/icon/capaign manager.png";
import campaignManagement from "../../assets/services/campaign.png";
import brandLaunch from "../../assets/services/brand launch (2).png";
import brandLaunchicon from "../../assets/icon/brand launch.png";
import electionCampaign from "../../assets/services/election campaign.png";
import electionCampaignicon from "../../assets/icon/elction.png";
import surveyicon from "../../assets/icon/survey.png";
import survey from "../../assets/services/servey.png";

const TopicsComponent = ({ activeTopic, setActiveTopic }) => {
  const [activeTopicLocal, setActiveTopicLocal] = useState(activeTopic);
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with animation duration
  }, []);

  useEffect(() => {
    setActiveTopicLocal(activeTopic);
  }, [activeTopic]);

  const handleTopicClick = (key) => {
    setActiveTopicLocal(key); // Update local state
    setActiveTopic(key); // Update global state
  };

  const topics = {
    reporting: {
      title: "Reporting",
      description:
        "Track and generate detailed reports on social media campaigns and engagements with real-time analytics Track and generate detailed reports on social media campaigns and engagements with real-time analytics Track and generate detailed reports on social media campaigns and engagements with real-time analytics Track and generate detailed reports on social media campaigns and engagements with real-time analytics  .",
      icon: reportingimg,
      image: reporterjpg,
    },
    advertising: {
      title: "Advertising",
      description:
        "Track and generate detailed reports on social media campaigns and engagements with real-time analytics Track and generate detailed reports on social media campaigns and engagements with real-time analytics Track and generate detailed reports on social media campaigns and engagements with real-time analytics Track and generate detailed reports on social media campaigns and engagements with real-time analytics  .",
      icon: advartisimg,
      image: advertiserjpg,
    },
    influencing: {
      title: "Influencing",
      description:
        "Track and generate detailed reports on social media campaigns and engagements with real-time analytics Track and generate detailed reports on social media campaigns and engagements with real-time analytics Track and generate detailed reports on social media campaigns and engagements with real-time analytics Track and generate detailed reports on social media campaigns and engagements with real-time analytics  .",
      icon: influencimg,
      image: inflencerjng,
    },
    socialMedia: {
      title: "Social Media Management",
      description:
        "Track and generate detailed reports on social media campaigns and engagements with real-time analytics Track and generate detailed reports on social media campaigns and engagements with real-time analytics Track and generate detailed reports on social media campaigns and engagements with real-time analytics Track and generate detailed reports on social media campaigns and engagements with real-time analytics  .",
      icon: socialMedia,
      image: socialMediaimg,
    },
    campaignManagement: {
      title: "Campaign",
      description:
        "Track and generate detailed reports on social media campaigns and engagements with real-time analytics Track and generate detailed reports on social media campaigns and engagements with real-time analytics Track and generate detailed reports on social media campaigns and engagements with real-time analytics Track and generate detailed reports on social media campaigns and engagements with real-time analytics  .",
      icon: campaignManagementicon,
      image: campaignManagement,
    },
    brandLaunch: {
      title: "Brand Launch",
      description:
        "Track and generate detailed reports on social media campaigns and engagements with real-time analytics Track and generate detailed reports on social media campaigns and engagements with real-time analytics Track and generate detailed reports on social media campaigns and engagements with real-time analytics Track and generate detailed reports on social media campaigns and engagements with real-time analytics  .",
      icon: brandLaunchicon,
      image: brandLaunch,
    },
    electionCampaign: {
      title: "Election Campaign",
      description:
        "Track and generate detailed reports on social media campaigns and engagements with real-time analytics Track and generate detailed reports on social media campaigns and engagements with real-time analytics Track and generate detailed reports on social media campaigns and engagements with real-time analytics Track and generate detailed reports on social media campaigns and engagements with real-time analytics  .",
      icon: electionCampaignicon,
      image: electionCampaign,
    },
    survey: {
      title: "Survey",
      description:
        "Track and generate detailed reports on social media campaigns and engagements with real-time analytics Track and generate detailed reports on social media campaigns and engagements with real-time analytics Track and generate detailed reports on social media campaigns and engagements with real-time analytics Track and generate detailed reports on social media campaigns and engagements with real-time analytics  .",
      icon: surveyicon,
      image: survey,
    },
  };

  return (
    <div
      id="services"
      className="relative  flex flex-col items-center justify-center bg-white overflow-hidden"
    >
      {/* Absolute Div for Background Images */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${bgImageLeft}), url(${bgImageRight}), url(${bgImageTop}), url(${bgImageBottom})`,
          backgroundPosition: "left, right center, top center, bottom center",
          backgroundSize: "contain, contain, contain, contain",
          backgroundRepeat: "no-repeat, no-repeat, no-repeat, no-repeat",
        }}
      />

      {/* Main Content Wrapper */}
      <div className="relative container rounded-lg mx-auto px-6 py-12 z-10 flex flex-col items-center">
        <p className="font-bold text-blue-300 mb-1 text-center">OUR SERVICES</p>
        {/* Header */}
        <h2
          className="text-center text-3xl font-bold mb-6"
          data-aos="fade-down"
        >
          What Our Agency <span className="text-blue-500">Provides</span>
        </h2>

        {/* Topic Icons */}
        <div
          className="flex flex-wrap gap-6 mt-10 items-center justify-around mb-8 w-full "
          data-aos="zoom-in"
        >
          {Object.keys(topics).map((key) => (
            <div
              key={key}
              className="flex flex-col w-[110px] space-y-3 items-center justify-center text-center"
            >
              <div
                onClick={() => handleTopicClick(key)}
                className={`cursor-pointer flex items-center justify-center h-24 w-24 rounded-full shadow-lg border-2 transition-all ${
                  activeTopicLocal === key
                    ? "border-blue-500 bg-blue-100"
                    : "border-transparent bg-white"
                }`}
              >
                <img
                  className="h-14 w-14 object-contain rounded-[20px"
                  src={topics[key].icon}
                  alt={key}
                />
              </div>
              <p
                className={`text-lg mt-2 font-semibold ${
                  activeTopicLocal === key ? "text-blue-500" : "text-black"
                }`}
              >
                {topics[key].title}
              </p>
            </div>
          ))}
        </div>
        <div
          className="border p-8 md:p-20 rounded-lg shadow-lg bg-white"
          data-aos="fade-up"
        >
          {/* Content Section Wrapper with Background */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Section - Description */}
            <div className="flex flex-col justify-center lg:pl-10 lg:pr-10">
              {/* Added padding-left on lg screens */}
              <h3 className="text-2xl font-bold text-blue-500 mb-4">
                {topics[activeTopicLocal].title}
              </h3>
              <p className="text-gray-700 text-lg mb-6">
                {topics[activeTopicLocal].description}
              </p>
              <button className="bg-blue-500 text-white px-6 py-2 w-44 items-center rounded-md hover:bg-blue-700">
                Get Started
              </button>
            </div>

            {/* Right Section - Image */}
            <div className="flex items-center justify-center">
              <img
                src={topics[activeTopicLocal].image}
                alt={topics[activeTopicLocal].title}
                className="max-w-full max-h-[400px] object-contain rounded-md"
                data-aos="zoom-in"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicsComponent;
