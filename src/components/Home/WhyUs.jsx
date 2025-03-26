import React from "react";
import {
  FaChartLine,
  FaComments,
  FaStar,
  FaUsers,
  FaCogs,
} from "react-icons/fa";

const WhyUs = () => {
  const leftServicesData = [
    {
      title: "Sample Text - Left 1",
      description: "We have 8 years of experience in Online Marketing",
      bgColor: "bg-blue-100",
      iconBgColor: "bg-blue-600",
      iconColor: "text-blue-600",
      Icon: FaCogs,
    },
    {
      title: "Sample Text - Left 2",
      description:
        "have experience in multiple verticals (e-commerce, lead generation, local business) and multiple industries (children's education, e-commerce, HoReCa, B2B, IT, transport, Retail).",
      bgColor: "bg-orange-100",
      iconBgColor: "bg-orange-500",
      iconColor: "text-orange-600",
      Icon: FaComments,
    },
    {
      title: "Sample Text - Left 3",
      description:
        "We have a solid team consisting of 12 people employed full time, as well as an extensive team of collaborators, specialists in their fields.",
      bgColor: "bg-red-100",
      iconBgColor: "bg-red-500",
      iconColor: "text-red-600",
      Icon: FaStar,
    },
  ];

  const rightServicesData = [
    {
      title: "Sample Text - Right 1",
      description:
        "We adapt to any business and have the necessary experience to choose the strategies that really generate results.",
      bgColor: "bg-green-100",
      iconBgColor: "bg-green-600",
      iconColor: "text-green-600",
      Icon: FaChartLine,
    },
    {
      title: "Sample Text - Right 2",
      description:
        "We love what we do , something that can be seen and felt through the results generated",
      bgColor: "bg-yellow-100",
      iconBgColor: "bg-yellow-500",
      iconColor: "text-yellow-600",
      Icon: FaUsers,
    },
    {
      title: "Sample Text - Right 3",
      description:
        "No matter your primary objective, explore these resources that are best suited to help you accomplish your advertising plans",
      bgColor: "bg-purple-100",
      iconBgColor: "bg-purple-500",
      iconColor: "text-purple-600",
      Icon: FaComments,
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 px-6 lg:px-5 py-10 bg-gray-100">
      {/* Left Column (Full-width on small screens, 5/12 on large screens) */}
      <div className="w-[100%] md:w-[70%] lg:w-5/12 flex flex-col gap-6">
        {leftServicesData.map((service, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 ${
              service.bgColor
            } p-2 w-full rounded-lg shadow-md relative ${
              index === 1
                ? "ml-0 lg:ml-[20px]"
                : index === 2
                ? "ml-0 lg:ml-[50px]"
                : index === 3
                ? "ml-0 lg:ml-0"
                : "ml-[-15px]"
            } rounded-l-full`}
          >
            {/* Text */}
            <div className="pl-5 pr-5 lg:pl-5  h-[72px] sm:h-[48px] lg:pr-10 flex items-center">
              <p className="text-gray-700 text-xs">{service.description}</p>
            </div>

            {/* Icon */}
            <div
              className={`${service.iconBgColor} text-white p-2 rounded-full w-[60px] h-[60px] flex items-center justify-center absolute right-[-20px]`}
            >
              <div className="border-2 border-dashed rounded-full border-white-500 shadow-lg p-3">
                <service.Icon className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Middle Column (2/12) */}
      <div className="w-full lg:w-2/12 flex justify-center mb-8 lg:mb-0">
        {/* Circle */}
        <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-36 lg:h-36 xl:w-48 xl:h-48 relative border-4 border-dotted border-black rounded-full flex justify-center items-center">
          <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-32 lg:h-32 xl:w-44 xl:h-44 bg-blue-800 rounded-full flex items-center justify-center shadow-lg">
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-24 lg:h-24 xl:w-32 xl:h-32 bg-blue-900 rounded-full flex flex-col items-center justify-center text-white text-center">
              <h2 className="text-xs sm:text-sm md:text-sm lg:text-base font-bold">
                Why Us
              </h2>
              <p className="text-xs sm:text-xs md:text-sm lg:text-xs mt-1">
                What Makes Us Stand Out
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column (Full-width on small screens, 5/12 on large screens) */}
      <div className="w-[100%] md:w-[70%] lg:w-5/12 flex flex-col gap-6">
        {rightServicesData.map((service, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 ${
              service.bgColor
            } p-2 w-full rounded-lg shadow-md relative ${
              index === 1
                ? "ml-[-4px] lg:ml-[-20px]"
                : index === 2
                ? "ml-[-6px] lg:ml-[-50px]"
                : index === 3
                ? "ml-[0px] lg:ml-[0px]"
                : "ml-[15px]"
            } rounded-r-full`}
          >
            {/* Icon */}
            <div
              className={`${service.iconBgColor} text-white p-2 rounded-full w-[60px] h-[60px] flex items-center justify-center absolute left-[-20px]`}
            >
              <div className="border-2 border-dashed rounded-full border-white-500 shadow-lg p-3">
                <service.Icon className="w-4 h-4" />
              </div>
            </div>

            {/* Text */}
            <div className="pl-16 pr-0 h-[72px] sm:h-[48px] flex items-center">
              <p className="text-gray-700 text-xs">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyUs;
