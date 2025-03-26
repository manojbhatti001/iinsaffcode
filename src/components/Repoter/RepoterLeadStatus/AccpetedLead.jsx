import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../utils/const";
import { Link } from "react-router-dom";
import LeadStatusViewDetails from "../LeadStatusViewDetails";
import { MdClose } from 'react-icons/md';

const AcceptedLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [leadId, setleadId] = useState('');
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    const fetchAcceptedLeads = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get(`${baseUrl}getUserAcceptedLeads`, {
          headers: { Authorization: token },
        });
        setLeads(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load leads");
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedLeads();
  }, []);

  const handleEdit = (leadId) => {
    // You can use this function to navigate to an edit page or open a modal.
    //   console.log("Edit lead with ID:", leadId);
    // Example: navigate(`/edit-lead/${leadId}`);
  };

  const handleEditClick = (id) => {
    setleadId(id);
    setShowModal(true);  // Open the modal
  };

  const handleClose = () => {
    setShowModal(false);  // Close the modal
  };

  return (
    <>
      {/* <div className="container mx-auto p-4 sm:w-full w-screen overflow-scroll">
      <h1 className="text-xl font-bold mb-4">Accepted Leads</h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : leads.length === 0 ? (
          <p className="text-center text-gray-600">No accepted leads found.</p>
        ) : (
          <div className="table-container rounded-lg shadow-lg overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 text-sm sm:text-base">
              <thead className="bg-gray-200 text-gray-600 uppercase text-xs sm:text-sm">
                <tr>
                  <th className="py-3 px-4 text-left">Channel Type</th>
                  <th className="py-3 px-4 text-left">Ad Type</th>
                  <th className="py-3 px-4 text-left">Required Views</th>
                  <th className="py-3 px-4 text-left">Remaining Views</th>
                  <th className="py-3 px-4 text-left">Ad Length</th>
                  <th className="py-3 px-4 text-left"> View Details</th>
                  <th className="py-3 px-4 text-left">Update Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {leads.map((lead, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-4 whitespace-nowrap" data-label="Channel Type">
                      {lead.leadId.channelType}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap" data-label="Ad Type">
                      {lead.leadId.adType}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap" data-label="Required Views">
                      {lead.reqView}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap" data-label="Remaining Views">
                      //  {lead.leadId.remainingViews} 
      {lead.reqView - lead.viewReceived}
    </td >
                    <td className="py-3 px-4 whitespace-nowrap" data-label="Ad Length">
                      {lead.leadId.adLength}
                    </td>
                    <td className="py-3 px-4" data-label="Details">
                      <Link
                        to={`getSpecificLeadDetailsReporter?leadId=${lead.leadId._id}`}
                        onClick={() => handleEdit(lead.leadId._id)}
                        className="bg-blue-500 text-nowrap text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                      >
                        Ads Details
                      </Link>
                    </td>
                    <td className="py-3 px-4" data-label="Edit">
                      <button
                        onClick={() => handleEditClick(lead.leadId._id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                      >
                        Update Work
                      </button>
                    </td>
                  </tr >
                ))}
              </tbody >
            </table >
          </div >
        )}

{
  showModal && (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-11/12 max-w-md">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
        >
          Close
        </button>
        <div className="p-6 h-[90vh] overflow-y-scroll">
          <h2 className="text-lg font-bold mb-4">Lead Status Details</h2>
          <LeadStatusViewDetails leadId={leadId} />
        </div>
      </div>
    </div>
  )
}
      </div > */}

      <div className="container mx-auto p-4 sm:w-full w-screen overflow-scroll">
        <h1 className="text-xl font-bold mb-4">Accepted Leads</h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <div className="table-container rounded-lg shadow-lg overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 text-sm sm:text-base">
              <thead className="bg-gray-200 text-gray-600 uppercase text-xs sm:text-sm">
                <tr>
                  <th className="py-3 px-4 text-left">Channel Type</th>
                  <th className="py-3 px-4 text-left">Ad Type</th>
                  <th className="py-3 px-4 text-left">Reach People</th>
                  <th className="py-3 px-4 text-left">Remaining Views</th>
                  <th className="py-3 px-4 text-left">Ad Length</th>
                  <th className="py-3 px-4 text-left">View Details</th>
                  <th className="py-3 px-4 text-left">Update Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {leads.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-3 px-4 text-gray-600 italic"
                    >
                      No accepted leads found.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-4 whitespace-nowrap" data-label="Channel Type">
                        {lead.leadId?.channelType || "No data available"}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap" data-label="Ad Type">
                        {lead.leadId?.adType || "No data available"}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap" data-label="Reach People">
                        {lead.reqView || "No data available"}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap" data-label="Remaining Views">
                        {lead.reqView
                          ? lead.reqView - lead.viewReceived
                          : "No data available"}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap" data-label="Ad Length">
                        {lead.leadId?.adLength || "No data available"}
                      </td>
                      <td className="py-3 px-4" data-label="Details">
                        {lead.leadId?._id ? (
                          <Link
                            to={`getSpecificLeadDetailsReporter?leadId=${lead.leadId._id}`}
                            onClick={() => handleEdit(lead.leadId._id)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                          >
                            Ads Details
                          </Link>
                        ) : (
                          <span className="text-gray-500 italic">No data available</span>
                        )}
                      </td>
                      <td className="py-3 px-4" data-label="Edit">
                        {lead.leadId?._id ? (
                          <button
                            onClick={() => handleEditClick(lead.leadId._id)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                          >
                            Update Work
                          </button>
                        ) : (
                          <span className="text-gray-500 italic">No action available</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-white rounded-lg shadow-lg w-11/12 max-w-md">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
              >
                Close
              </button>
              <div className="p-6 h-[90vh] overflow-y-scroll">
                <h2 className="text-lg font-bold mb-4">Lead Status Details</h2>
                <LeadStatusViewDetails leadId={leadId} />
              </div>
            </div>
          </div>
        )}
      </div>

    </>
  );
};

export default AcceptedLeads;
