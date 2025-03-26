import React from "react";
import infuIcon from "../../../assets/services/infuleuncing.png";
import { useNavigate } from "react-router-dom";

const InfluencersServices = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      {/* Top Heading */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Influencers Career
        </h1>
      </div>

      {/* Content Container */}
      <div className=" flex sm:flex flex-col lg:flex-col xl:flex-row xl:flex items-center justify-center gap-6">
        {/* Image Div */}
        <div className="w-[60%] lg:w-[50%] flex justify-center">
          <img
            src={infuIcon} // Replace with your image URL
            alt="Influencers Service"
            className="w-full max-w-md h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Paragraph Div */}
        {/* <div className="w-[80%] lg:w-[50%]  xl:w-[30%] text-center">
          <p className="text-gray-700 text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
            risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
            nec, ultricies sed, dolor. Cras elementum ultrices diam.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default InfluencersServices;
