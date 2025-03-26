import React from "react";
import reporte from "../../../assets/services/reporting.png";
import { useNavigate } from "react-router-dom";

const ReporterService = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      {/* Top Heading */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Reporter Career</h1>
      </div>

      {/* Content Container */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-end gap-6">
        {/* Image Div */}
        <div className="w-full lg:w-1/2 flex justify-end">
          <img
            src={reporte}
            alt="Reporter Service"
            className="w-full max-w-md h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ReporterService;
