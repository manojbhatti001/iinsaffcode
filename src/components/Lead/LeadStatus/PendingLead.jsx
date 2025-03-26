// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUserLeads } from "../../../redux/leadSlicer";
// import { Link } from "react-router-dom";

// const PendingLead = () => {
//   const dispatch = useDispatch();
//   const { pendingLeads, loading, error } = useSelector((state) => state.lead);

//   // State for pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const leadsPerPage = 5; // Number of leads per page

//   useEffect(() => {
//     dispatch(fetchUserLeads("approved"));
//   }, [dispatch]);

//   // Handle view button click
//   const handleViewClick = (id) => {
//  //   console.log("View button clicked for pending lead ID:", id);
//     // Add your view action logic here
//   };

//   return (
//     <div className="container mx-auto p-6 bg-yellow-100 ">
//       <h1 className="text-3xl font-bold text-yellow-700 text-center mb-8">
//         Advertisement Running
//       </h1>

//       {loading && <p className="text-lg text-yellow-700 text-center">Loading...</p>}
//       {error && <p className="text-red-500 text-center">{error}</p>}

//       {!loading && pendingLeads.length === 0 && (
//         <p className="text-lg text-yellow-700 text-center">
//           No pending leads found.
//         </p>
//       )}

//       {pendingLeads.length > 0 && (
//         <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
//           <thead>
//             <tr className="bg-gray-200 text-gray-600 text-left text-sm uppercase tracking-wider">
//               <th className="py-3 px-4 border-b">Lead Id</th>
//               <th className="py-3 px-4 border-b">Channel Type</th>
//               <th className="py-3 px-4 border-b">Ad Type</th>
//               <th className="py-3 px-4 border-b">Required Views</th>
//               <th className="py-3 px-4 border-b">Remaining Views</th>
//               <th className="py-3 px-4 border-b">Status</th>
//               <th className="py-3 px-4 border-b">Action</th>{" "}
//               {/* Add header for the button */}
//             </tr>
//           </thead>
//           <tbody>
//             {pendingLeads.map((lead) => (
//               <tr key={lead._id} className="hover:bg-gray-100">
//                 <td className="py-2 px-4 border-b">{lead._id}</td>
//                 <td className="py-2 px-4 border-b">{lead.channelType}</td>
//                 <td className="py-2 px-4 border-b">{lead.adType}</td>
//                 <td className="py-2 px-4 border-b">{lead.requiredViews}</td>
//                 <td className="py-2 px-4 border-b">{lead.remainingViews}</td>
//                 <td className="py-2 px-4 border-b">{lead.status}</td>
//                 <td className="py-2 px-4 border-b">
//                   <Link
//                     to={`/getSpecificLeadDetails?leadId=${lead._id}`}
//                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
//                     onClick={() => handleViewClick(lead._id)} // Action on button click
//                   >
//                     View
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// const Pagination = ({ leadsPerPage, totalLeads, paginate, currentPage }) => {
//   const pageNumbers = [];

//   for (let i = 1; i <= Math.ceil(totalLeads / leadsPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <div className="flex justify-center mt-6">
//       <ul className="inline-flex space-x-2">
//         {pageNumbers.map((number) => (
//           <li key={number}>
//             <button
//               onClick={() => paginate(number)}
//               className={`px-4 py-2 rounded ${currentPage === number
//                 ? "bg-yellow-500 text-white"
//                 : "bg-gray-200 text-gray-700 hover:bg-yellow-300"
//                 }`}
//             >
//               {number}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default PendingLead;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserLeads } from "../../../redux/leadSlicer";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../../utils/const";
const PendingLead = () => {
  const dispatch = useDispatch();
  const { pendingLeads, loading, error } = useSelector((state) => state.lead);
  // State for modal visibility and lead data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leadStatus, setLeadStatus] = useState([]);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [leadId, setLeadId] = useState(null); // Track leadId for modal
  const [selectedLead, setSelectedLead] = useState(null); // To store the selected lead
  const [adDescription, setAdDescription] = useState("");
  const [adNote, setAdNote] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    dispatch(fetchUserLeads("approved"));
  }, [dispatch]);

  // Handle view button click
  const handleViewClick = (lead) => {
    setSelectedLead(lead);
    setAdDescription(lead.adDescription || ""); // Ensure adDescription is set
    setAdNote(lead.adNote || ""); // Ensure adNote is set
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("leadId", selectedLead._id); // Use selectedLead instead of lead
    formData.append("adDescription", adDescription);
    formData.append("adNote", adNote);

    if (imageFile) formData.append("image", imageFile);
    if (videoFile) formData.append("video", videoFile);

    setIsUpdating(true);
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.put(`${baseUrl}updateLead-User`, formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message);
      setIsModalOpen(false); // Close modal on success
    } catch (error) {
      toast.error("Error updating lead: " + error.message);
    } finally {
      setIsUpdating(false);
    }
  };
  const handleModalClose = () => {
    setIsModalOpen2(false); // Close modal
    setLeadStatus([]); // Clear lead status data
  };

  const handleModalOpen = async (leadId) => {
    setLeadId(leadId); // Set lead ID
    setIsModalOpen2(true); // Open modal
    await fetchLeadStatusView(leadId); // Fetch status directly on click
  };

  const fetchLeadStatusView = async (leadId) => {
    if (!leadId) return; // Do not proceed if leadId is not provided

    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get(`${baseUrl}viewStatus`, {
        headers: { Authorization: token },
        params: { leadId },
      });

      if (response.data.leadStatusViews) {
        setLeadStatus(response.data.leadStatusViews); // Update state with API response
      } else {
        setLeadStatus([]); // Handle case where no status is returned
      }
    } catch (err) {
      console.error("Failed to fetch lead status:", err);
      // Optional: Display error message to user
    }
  };

  return (
    <div className="w-screen overflow-scroll sm:container mx-auto p-6 bg-yellow-100">
      <h1 className="text-3xl font-bold text-yellow-700 text-center mb-8">
        Advertisement Running
      </h1>

      {loading && (
        <p className="text-lg text-yellow-700 text-center">Loading...</p>
      )}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && pendingLeads.length === 0 && (
        <p className="text-lg text-yellow-700 text-center">
          No pending leads found.
        </p>
      )}

      {pendingLeads.length > 0 && (
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-left text-sm uppercase tracking-wider">
              <th className="py-3 px-4 border-b">Lead Id</th>
              <th className="py-3 px-4 border-b">Channel Type</th>
              <th className="py-3 px-4 border-b">Ad Type</th>
              <th className="py-3 px-4 border-b">Reach People</th>
              <th className="py-3 px-4 border-b">Remaining Views</th>
              <th className="py-3 px-4 border-b">Status</th>
              <th className="py-3 px-4 border-b">Action</th>
              {/* Add header for the button */}
            </tr>
          </thead>
          <tbody>
            {pendingLeads.map((lead) => (
              <tr key={lead._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{lead._id}</td>
                <td className="py-2 px-4 border-b">{lead.channelType}</td>
                <td className="py-2 px-4 border-b">{lead.adType}</td>
                <td className="py-2 px-4 border-b">{lead.requiredViews}</td>
                <td className="py-2 px-4 border-b">{lead.remainingViews}</td>
                <td className="py-2 px-4 border-b">{lead.status}</td>
                <td className="py-2 px-4 border-b flex">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                    onClick={() => handleViewClick(lead)} // Open the modal with the selected lead
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleModalOpen(lead._id)} // Open modal with the clicked lead's ID
                    className="px-4 py-2 bg-blue-600 text-white rounded ml-2"
                  >
                    Running
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal for viewing lead details */}
      {isModalOpen && selectedLead && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-md w-3/4 md:w-1/2 relative">
            <h2 className="text-xl font-bold mb-4 text-center">Lead Details</h2>
            {selectedLead.status !== "rejected" && (
              <p className="text-red-500 text-center mb-4">
                Updates are only allowed for rejected leads.
              </p>
            )}
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Lead ID:
                  </label>
                  <input
                    type="text"
                    value={selectedLead._id}
                    disabled
                    className="border p-2 w-full rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Lead By:
                  </label>
                  <input
                    type="text"
                    value={selectedLead.leadBy}
                    disabled
                    className="border p-2 w-full rounded-md"
                  />
                </div>
                {selectedLead.adImageURL && (
                  <img src={selectedLead.adImageURL} alt="Advertisement" width={300} height={300} />
                )}
                {selectedLead.adVideoURL && (
                  <video src={selectedLead.adVideoURL} controls width={300} height={300} />
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Ad Description:
                  </label>
                  <input
                    type="text"
                    value={adDescription}
                    onChange={(e) => setAdDescription(e.target.value)}
                    className="border p-2 w-full rounded-md"
                    disabled={selectedLead.status !== "rejected"}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Ad Note:
                  </label>
                  <input
                    type="text"
                    value={adNote}
                    onChange={(e) => setAdNote(e.target.value)}
                    className="border p-2 w-full rounded-md"
                    disabled={selectedLead.status !== "rejected"}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Upload Image:
                </label>
                <input
                  type="file"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="border p-2 w-full rounded-md"
                  disabled={selectedLead.status !== "rejected"}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Upload Video:
                </label>
                <input
                  type="file"
                  onChange={(e) => setVideoFile(e.target.files[0])}
                  className="border p-2 w-full rounded-md"
                  disabled={selectedLead.status !== "rejected"}
                />
              </div>
              <button
                type="submit"
                className={`w-full text-white py-2 px-4 rounded ${selectedLead.status === "rejected"
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-300 cursor-not-allowed"
                  }`}
                disabled={selectedLead.status !== "rejected" || isUpdating}
              >
                {isUpdating ? "Updating..." : "Update Lead"}
              </button>
            </form>

            {/* Close button inside modal */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsModalOpen(false)}
            >
              <span className="text-2xl font-bold">×</span>
            </button>
          </div>
        </div>
      )}
      {/* Modal Popup */}
      {isModalOpen2 && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-3/4 max-w-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Lead Status View Details
            </h2>

            {loading ? (
              <div className="text-center text-gray-500">Loading...</div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : Array.isArray(leadStatus) && leadStatus.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 border-b">
                        Lead ID
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 border-b">
                        Accepted By User
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 border-b">
                        Reach People
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 border-b">
                        Views Received
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 border-b">
                        Video URL
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 border-b">
                        Note
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {leadStatus.map((status, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-800 border-b">
                          {status.leadId._id || "-"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-800 border-b">
                          {status.acceptedByUser || "-"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-800 border-b">
                          {status.reqView || "0"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-800 border-b">
                          {status.viewReceived || "0"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-800 border-b">
                          {status.videoUrl ? (
                            <a
                              href={status.videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              View Video
                            </a>
                          ) : (
                            "N/A"
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-800 border-b">
                          {status.note || "No note available"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center text-gray-500 mt-6">
                No lead status available
              </div>
            )}

            <div className="mt-6 text-center">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingLead;
