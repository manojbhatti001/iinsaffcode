import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import reporteIcon from "../../../assets/icon/reporter.png";
import advertiserIcon from "../../../assets/icon/ads-career.png";
import marketerIcon from "../../../assets/icon/marketer.png";
import infuIcon from "../../../assets/icon/influencer career.png";
import lawIcon from "../../../assets/icon/lawyer.png";
import ReporterService from "./ReporterService";
import AdvertiserService from "./AdvertiserServices";
import InfluencersService from "./InfluencersServices";
import DrLawyer from "./DrLawyer";
import MarketerService from "./MarketerService";

const Services = ({ activeCareer, setActiveCareer }) => {
  const navigate = useNavigate();
  const [activeService, setActiveService] = useState(activeCareer);

  // Synchronize activeService with activeCareer when the parent prop changes
  useEffect(() => {
    setActiveService(activeCareer);
  }, [activeCareer]);

  // Function to handle service click and update both states
  const handleServiceClick = (service) => {
    setActiveService(service.title); // Update local state
    if (setActiveCareer) {
      setActiveCareer(service.title); // Update parent state
    }
    // Navigate to the service link if it's not "#"
    if (service.link && service.link !== "#") {
      navigate(service.link);
    }
  };

  const servicesData = [
    {
      title: "Reporter",
      description:
        "",
      bgColor: "bg-blue-100",
      iconBgColor: "bg-blue-600",
      iconColor: "text-blue-600",
      image: reporteIcon,
      link: "/register?role=Reporter"
    },
    {
      title: "Advertiser",
      description:
        "",
      bgColor: "bg-orange-100",
      iconBgColor: "bg-orange-500",
      iconColor: "text-orange-600",
      image: advertiserIcon,
      link: "/register?role=Advertiser"
    },
    {
      title: "Marketer",
      description:
        "",
      bgColor: "bg-red-100",
      iconBgColor: "bg-red-500",
      iconColor: "text-red-600",
      image: marketerIcon,
      link: "/marketer"
    },
    
    {
      title: "Influencer",
      description:
        "",
      bgColor: "bg-blue-100",
      iconBgColor: "bg-blue-600",
      iconColor: "text-blue-600",
      image: infuIcon,
      link: "/register?role=Influencer"
    },
    {
      title: "Join Organization ",
      description:
        "",
      bgColor: "bg-yellow-100",
      iconBgColor: "bg-yellow-500",
      iconColor: "text-yellow-600",
      image: lawIcon,
      link: "/JoinIinsaf"
    },
    {
      title: "Newspaper",
      description:
        "",
      bgColor: "bg-red-100",
      iconBgColor: "bg-red-500",
      iconColor: "text-red-600",
      image: marketerIcon,
      link: "/Newspaper"
    },

    //website
    {
      title: "Website",
      description:
        "",
      bgColor: "bg-red-100",
      iconBgColor: "bg-red-500",
      iconColor: "text-red-600",
      image: marketerIcon,
      link: "/"
    },
  ];

  const getServiceComponent = () => {
    switch (activeService) {
      case "Reporter":
        return <ReporterService />;
      case "Advertiser":
        return <AdvertiserService />;
      case "Marketer":
        return <MarketerService />;
      case "Influencer":
        return <InfluencersService />;
      case "Dr, Lawyer":
        return <DrLawyer />;
      default:
        return null;
    }
  };

  const getActiveServiceIcon = () => {
    switch (activeService) {
      case "Reporter":
        return reporteIcon;
      case "Advertiser":
        return advertiserIcon;
      case "Marketer":
        return marketerIcon;
      case "Influencer":
        return infuIcon;
      case "Dr, Lawyer":
        return lawIcon;
      default:
        return null;
    }
  };

  return (
    <>
    <div id="career" className="flex flex-col lg:flex-row items-center gap-8 px-6 lg:px-16 py-10 bg-gray-100 relative">
      {/* Active Service Icon */}
      <div className="flex-shrink-0 relative mb-8 lg:mb-0">
        <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-48 lg:h-44 relative border-r-4 border-dotted border-black rounded-full flex justify-center items-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-32 lg:h-32 bg-blue-800 rounded-full flex items-center justify-center shadow-lg relative">
            <div className="absolute">
              <img
                className="w-20 h-20 rounded-[20px]"
                src={getActiveServiceIcon()}
                alt={activeService}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Service List */}
      <div className="flex flex-col gap-4 lg:gap-6 lg:ml-6 lg:w-2/4 relative">
        {servicesData.map((service, index) => (
          <div
            key={index}
            className={`
              flex items-center gap-3 
              ${service.bgColor} 
              p-2 w-full 
              rounded-lg shadow-md 
              relative 
              transition-all
              duration-300
              hover:scale-105
              ${
                index === 0
                  ? "-ml-32"
                  : index === 1
                  ? "ml-0 lg:-ml-12"
                  : index === 2
                  ? "ml-0 lg:ml-4"
                  : index === 3
                  ? "ml-0 lg:ml-14"
                  : index === 4
                  ? "ml-0 lg:ml-4"
                  : index === 5
                  ? "ml-0 lg:-ml-12"
                  : index === 6  
                  ? "ml-0 lg:-ml-32"
                  : "ml-0"
              } 
              rounded-r-full 
              cursor-pointer 
              ${
                activeService === service.title
                  ? "border-2 border-blue-600"
                  : "border-transparent"
              }
            `}
            onClick={() => handleServiceClick(service)}
          >
            <div
              className={`
                ${service.iconBgColor} 
                text-white p-2 
                rounded-full 
                absolute 
                w-[60px] h-[60px] 
                flex items-center justify-center 
                left-[-20px] 
                border-2 border-dotted 
                ${service.iconColor}
                transition-transform
                duration-300
                hover:rotate-12
              `}
            >
              <div className="border-2 border-dashed rounded-full border-white-500 shadow-lg p-1">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-8 h-8"
                />
              </div>
            </div>
            <div className="pl-[48px] w-full">
              <h3 className={`${service.iconColor} font-bold text-xl text-center`}>
                {service.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Service Component */}
      <div>{getServiceComponent()}</div>
    </div>
    </>
  );
};

export default Services;
