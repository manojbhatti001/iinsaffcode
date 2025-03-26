import React, { useState } from "react";
import CompletedLead from "./CompletedLead";
import PendingLead from "./PendingLead";
import RejectedLead from "./RejectedLead";
import CancelledLead from "./CancelledLead";
import GetAllUserLeads from "./GetAllUserLeads";

const LeadStatus = () => {
  const [currentStatus, setCurrentStatus] = useState("all");

  const handleButtonClick = (status) => {
    setCurrentStatus(status);
  };
  return (
    <div className="flex flex-col items-center justify-center p-5">
      <h2 className="text-2xl text-white font-bold mb-4">Lead Status</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6 mb-5">
        <button
          onClick={() => handleButtonClick("all")}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded shadow transition duration-200 ease-in-out"
        >
          All Leads
        </button>
        <button
          onClick={() => handleButtonClick("completed")}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow transition duration-200 ease-in-out"
        >
          Completed Leads
        </button>
        <button
          onClick={() => handleButtonClick("cancelled")}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow transition duration-200 ease-in-out"
        >
          Cancelled Leads
        </button>
        <button
          onClick={() => handleButtonClick("rejected")}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded shadow transition duration-200 ease-in-out"
        >
          Rejected Leads
        </button>
        <button
          onClick={() => handleButtonClick("pending")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow transition duration-200 ease-in-out"
        >
          Pending Leads
        </button>
      </div>
      <div className="w-full">
        {currentStatus === "all" && <GetAllUserLeads />}
        {currentStatus === "completed" && <CompletedLead />}
        {currentStatus === "cancelled" && <CancelledLead />}
        {currentStatus === "rejected" && <RejectedLead />}
        {currentStatus === "pending" && <PendingLead />}
      </div>
    </div>
  );
};

export default LeadStatus;
