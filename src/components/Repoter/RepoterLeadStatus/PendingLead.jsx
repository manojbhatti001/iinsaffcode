import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../utils/const";
import { Link } from "react-router-dom";

const PendingLead = () => {
  const [pendingLeads, setPendingLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPendingLeads = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get(
          `${baseUrl}getUserAcceptedPendingLeads`,
          {
            headers: { Authorization: token },
          }
        );
        setPendingLeads(response.data);
      } catch (error) {
        setError(
          error.response?.data?.message || "Failed to load pending leads"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPendingLeads();
  }, []);

  const handleEdit = (leadId) => {
    //   console.log("Edit lead with ID:", leadId);
    // Example: Navigate to an edit page or open a modal
    // navigate(`/edit-lead/${leadId}`);
  };

  return (
    <>
      {/* <div className="container mx-auto p-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-container rounded-2xl overflow-x-auto">
          <table className="scrollable-table min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Channel Type</th>
                <th className="py-3 px-6 text-left">Ad Type</th>
                <th className="py-3 px-6 text-left">Required Views</th>
                <th className="py-3 px-6 text-left">Remaining Views</th>
                <th className="py-3 px-6 text-left">Ad Length</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {pendingLeads.length > 0 ? (
                pendingLeads.map((lead, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td data-label="CHANNEL TYPE">{lead.leadId.channelType}</td>
                    <td data-label="AD TYPE">{lead.leadId.adType}</td>
                    <td data-label="REQUIRED VIEWS">{lead.leadId.requiredViews}</td>
                    <td data-label="REMAINING VIEW">{lead.leadId.remainingViews}</td>
                    <td data-label="AD LENGTH">{lead.leadId.adLength}</td>
                    <td data-label="ACTIONS">
                      <Link
                        to={`/getSpecificLeadDetailsReporter?leadId=${lead.leadId._id}`}
                        onClick={() => handleEdit(lead.leadId._id)}
                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition duration-200"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-4 px-6 text-center text-gray-500">
                    No pending leads found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div> */}
      <div className="container mx-auto p-4 w-screen sm:w-full overflow-scroll">
      <h1 className="text-xl font-bold mb-4">Pending Leads</h1>
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <div className="table-container rounded-lg shadow-lg overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 text-sm sm:text-base">
              <thead className="bg-gray-200 text-gray-600 uppercase text-xs sm:text-sm">
                <tr>
                  <th className="py-3 px-6 text-left whitespace-nowrap">Channel Type</th>
                  <th className="py-3 px-6 text-left whitespace-nowrap">Ad Type</th>
                  <th className="py-3 px-6 text-left whitespace-nowrap">Reach People</th>
                  <th className="py-3 px-6 text-left whitespace-nowrap">Remaining Views</th>
                  <th className="py-3 px-6 text-left whitespace-nowrap">Ad Length</th>
                  <th className="py-3 px-6 text-left whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {pendingLeads.length > 0 ? (
                  pendingLeads.map((lead, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6 whitespace-nowrap" data-label="Channel Type">
                        {lead.leadId.channelType}
                      </td>
                      <td className="py-3 px-6 whitespace-nowrap" data-label="Ad Type">
                        {lead.leadId.adType}
                      </td>
                      <td className="py-3 px-6 whitespace-nowrap" data-label="Reach People">
                        {lead.leadId.requiredViews}
                      </td>
                      <td className="py-3 px-6 whitespace-nowrap" data-label="Remaining Views">
                        {lead.leadId.remainingViews}
                      </td>
                      <td className="py-3 px-6 whitespace-nowrap" data-label="Ad Length">
                        {lead.leadId.adLength}
                      </td>
                      <td className="py-3 px-6 whitespace-nowrap" data-label="Actions">
                        <Link
                          to={`/ReporterDashboard/relevant-status/getSpecificLeadDetailsReporter?leadId=${lead.leadId._id}`}
                          onClick={() => handleEdit(lead.leadId._id)}
                          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition duration-200"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-4 px-6 text-center text-gray-500">
                      No pending leads found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default PendingLead;
