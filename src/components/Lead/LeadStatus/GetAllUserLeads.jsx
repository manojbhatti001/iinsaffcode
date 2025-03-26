import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserLeads } from "../../../redux/leadSlicer"; // Import the fetchUserLeads action
import axios from "axios";
import { toast } from "react-toastify"; // Import toast for notifications
import { baseUrl } from "../../../utils/const";

const GetAllUserLeads = () => {
  const dispatch = useDispatch();
  const { allLeads, loading, error } = useSelector((state) => state.lead);

  // State for modal visibility and selected lead details
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leadStatus, setLeadStatus] = useState([]);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [leadId, setLeadId] = useState(null); // Track leadId for modal
  const [selectedLead, setSelectedLead] = useState(null);

  // State for managing file uploads
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // State for handling loading during update
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    dispatch(fetchUserLeads("")); // Fetch all leads
  }, [dispatch]);

  // Handle view button click
  const handleViewClick = (lead) => {
    setSelectedLead(lead); // Set the selected lead data
    setIsModalOpen(true); // Open the modal
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image")) {
      setSelectedImage(URL.createObjectURL(file));
    } else {
      alert("Please select an image file.");
    }
  };

  // Handle video selection
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video")) {
      setSelectedVideo(URL.createObjectURL(file));
    } else {
      alert("Please select a video file.");
    }
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLead(null); // Clear the selected lead when modal is closed
    setSelectedImage(null); // Clear selected image
    setSelectedVideo(null); // Clear selected video
  };

  // Handle lead update
  const handleUpdateLead = async () => {
    if (!selectedLead) return; // Ensure a lead is selected

    const formData = new FormData();
    formData.append("leadId", selectedLead._id);
    formData.append("adDescription", selectedLead.adDescription); // Add other fields as required
    formData.append("adNote", selectedLead.adNote);
    formData.append("adArea[adState]", selectedLead.adArea.adState);
    formData.append("adArea[adCity]", selectedLead.adArea.adCity);

    if (selectedImage) formData.append("image", selectedImage);
    if (selectedVideo) formData.append("video", selectedVideo);

    setIsUpdating(true); // Set loading state to true
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.put(`${baseUrl}updateLead-User`, formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message); // Show success toast
      closeModal(); // Close the modal after successful update
    } catch (error) {
      toast.error("Error updating lead: " + error.message); // Show error toast
    } finally {
      setIsUpdating(false); // Reset loading state
    }
  };

  // // Toggle modal visibility
  // const handleModalOpen = (leadId) => {
  //   setLeadId(leadId);
  //   setIsModalOpen2(true); // Open modal
  //   fetchLeadStatusView(leadId);

  // };

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
    <div className="w-screen overflow-scroll sm:container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">All User Leads</h1>

      {loading && <p className="text-lg text-center">Loading leads...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && allLeads.length === 0 && (
        <p className="text-lg text-center">No leads found.</p>
      )}

      {!loading && allLeads.length > 0 && (
        <div className="overflow-x-auto">
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
              </tr>
            </thead>
            <tbody>
              {allLeads?.map((lead) => (
                <tr key={lead._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{lead._id}</td>
                  <td className="py-2 px-4 border-b">{lead.channelType}</td>
                  <td className="py-2 px-4 border-b">{lead.adType}</td>
                  <td className="py-2 px-4 border-b">{lead.requiredViews}</td>
                  <td className="py-2 px-4 border-b">{lead.remainingViews}</td>
                  <td className="py-2 px-4 border-b">{lead.status}</td>
                  <td className="py-2 px-4 border-b flex">
                    <button
                      onClick={() => handleViewClick(lead)} // Trigger modal on button click
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
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
        </div>
      )}
      {/* Modal for displaying and editing lead details */}
      {isModalOpen && selectedLead && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-96">
            <h2 className="text-2xl font-bold mb-4">Edit Lead Details</h2>

            {/* Editable fields */}
            <div className="mb-4">
              <label
                htmlFor="leadId"
                className="block text-sm font-medium text-gray-700"
              >
                Lead ID
              </label>
              <input
                id="leadId"
                type="text"
                value={selectedLead._id}
                disabled
                className="w-full p-2 mt-1 border border-gray-300 rounded-md text-gray-700"
              />
            </div>

            {/* New fields in one row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="leadBy"
                  className="block text-sm font-medium text-gray-700"
                >
                  Lead By
                </label>
                <input
                  id="leadBy"
                  type="text"
                  value={selectedLead.leadBy}
                  onChange={(e) =>
                    setSelectedLead({ ...selectedLead, leadBy: e.target.value })
                  }
                  disabled={selectedLead.status !== "rejected"}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md text-gray-700"
                />
              </div>

              <div>
                <label
                  htmlFor="adNote"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ad Note
                </label>
                <input
                  id="adNote"
                  type="text"
                  value={selectedLead.adNote}
                  onChange={(e) =>
                    setSelectedLead({ ...selectedLead, adNote: e.target.value })
                  }
                  disabled={selectedLead.status !== "rejected"}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md text-gray-700"
                />
              </div>
              {selectedLead.adImageURL && (
                <img src={selectedLead.adImageURL} alt="Advertisement" width={300} height={300} />
              )}
              {selectedLead.adVideoURL && (
                <video src={selectedLead.adVideoURL} controls width={300} height={300} />
              )}

            </div>

            {/* Ad Description */}
            <div className="mb-4">
              <label
                htmlFor="adDescription"
                className="block text-sm font-medium text-gray-700"
              >
                Ad Description
              </label>
              <textarea
                id="adDescription"
                value={selectedLead.adDescription}
                onChange={(e) =>
                  setSelectedLead({
                    ...selectedLead,
                    adDescription: e.target.value,
                  })
                }
                disabled={selectedLead.status !== "rejected"}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md text-gray-700"
              />
            </div>

            {/* Conditional message if the status is not "rejected" */}
            {selectedLead.status !== "rejected" && (
              <p className="text-red-500 text-center mb-4">
                Updates are only allowed for rejected leads.
              </p>
            )}

            {/* Image Upload */}
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={selectedLead.status !== "rejected"}
                className="block w-full text-sm text-gray-700 file:py-2 file:px-4 file:border file:border-gray-300 file:bg-gray-100 file:rounded-md"
              />
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="mt-4 w-full h-auto"
                />
              )}
            </div>

            {/* Video Upload */}
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Upload Video
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                disabled={selectedLead.status !== "rejected"}
                className="block w-full text-sm text-gray-700 file:py-2 file:px-4 file:border file:border-gray-300 file:bg-gray-100 file:rounded-md"
              />
              {selectedVideo && (
                <video controls className="mt-4 w-full h-auto">
                  <source src={selectedVideo} type="video/mp4" />
                </video>
              )}
            </div>

            <div className="mt-4 flex justify-between">
              <button
                onClick={handleUpdateLead}
                className={`w-full text-white py-2 px-4 rounded ${selectedLead.status === "rejected"
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-300 cursor-not-allowed"
                  }`}
                disabled={selectedLead.status !== "rejected" || isUpdating}
              >
                {isUpdating ? "Updating..." : "Update Lead"}
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
              >
                Close
              </button>
            </div>
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

export default GetAllUserLeads;
