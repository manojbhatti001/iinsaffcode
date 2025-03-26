import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../utils/const";

const UpdateVoiceStatusAdmin = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const voiceId = queryParams.get("id");

  const [voiceData, setVoiceData] = useState(null);
  const [status, setStatus] = useState(""); // To hold the selected status
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false); // To handle update button state

  useEffect(() => {
    // Fetch voice data by ID
    if (voiceId) {
      axios
        .get(`${baseUrl}getVoiceById?id=${voiceId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        })
        .then((response) => {
          setVoiceData(response.data.data);
          setStatus(response.data.data.status); // Set initial status from fetched data
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching voice data:", err);
          setError("Failed to fetch voice data");
          setLoading(false);
        });
    } else {
      setError("Voice ID is not provided in the query parameters");
      setLoading(false);
    }
  }, [voiceId]);

  // Function to handle status update
  const handleStatusUpdate = () => {
    if (!voiceId || !status) return;
    setUpdating(true);

    axios
      .put(
        `${baseUrl}voice/status?id=${voiceId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      )
      .then((response) => {
        setVoiceData(response.data.voice); // Update local state with updated data
        setUpdating(false);
        alert("Status updated successfully"); // Simple alert for feedback
      })
      .catch((err) => {
        console.error("Error updating status:", err);
        setError("Failed to update status");
        setUpdating(false);
      });
  };

  return (
    // <div className="p-4">
    //   {loading ? (
    //     <p>Loading...</p>
    //   ) : error ? (
    //     <p className="text-red-500">{error}</p>
    //   ) : (
    //     <div>
    //       <h2 className="text-xl font-semibold mb-4">Voice Details</h2>
    //       <p><strong>Name:</strong> {voiceData.name}</p>
    //       <p><strong>Email:</strong> {voiceData.email}</p>
    //       <p><strong>Phone Number:</strong> {voiceData.phoneNumber}</p>
    //       <p><strong>Gender:</strong> {voiceData.gender}</p>
    //       <p><strong>Address:</strong> {voiceData.address}</p>
    //       <p><strong>Date of Birth:</strong> {new Date(voiceData.dateOfBirth).toLocaleDateString()}</p>
    //       <p><strong>Occupation:</strong> {voiceData.occupation}</p>
    //       <p><strong>Text Content:</strong> {voiceData.textContent}</p>
          
    //       {/* Status display and update */}
    //       <p>
    //         <strong>Status:</strong>{" "}
    //         <select
    //           value={status}
    //           onChange={(e) => setStatus(e.target.value)}
    //           className="border border-gray-300 rounded p-1 ml-2"
    //           disabled={updating}
    //         >
    //           <option value="pending">Pending</option>
    //           <option value="approved">Approved</option>
    //           <option value="rejected">Rejected</option>
    //           <option value="completed">Completed</option>
    //         </select>
    //       </p>

    //       {/* Display audio and video files as links or embedded media */}
    //       {voiceData.audioFile && (
    //         <div>
    //           <p><strong>Audio File:</strong></p>
    //           <audio controls src={voiceData.audioFile} />
    //         </div>
    //       )}
    //       {voiceData.videoFile && (
    //         <div>
    //           <p><strong>Video File:</strong></p>
    //           <video controls width="300" src={voiceData.videoFile} />
    //         </div>
    //       )}

    //       {/* Update button */}
    //       <div className="mt-4">
    //         <button
    //           onClick={handleStatusUpdate}
    //           disabled={updating}
    //           className={`px-4 py-2 bg-blue-500 text-white rounded ${updating ? 'opacity-50' : ''}`}
    //         >
    //           {updating ? "Updating..." : "Update Status"}
    //         </button>
    //       </div>
    //     </div>
    //   )}
    // </div>
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center mt-2">
  <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl">
    {loading ? (
      <p className="text-center text-lg text-gray-600">Loading...</p>
    ) : error ? (
      <p className="text-red-500 text-center text-lg">{error}</p>
    ) : (
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Voice Details</h2>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-4">
            <label className="w-32 font-medium text-gray-700">Name:</label>
            <input
              type="text"
              value={voiceData.name}
              className="flex-grow border border-gray-300 rounded-lg p-2"
              readOnly
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="w-32 font-medium text-gray-700">Email:</label>
            <input
              type="email"
              value={voiceData.email}
              className="flex-grow border border-gray-300 rounded-lg p-2"
              readOnly
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="w-32 font-medium text-gray-700">Phone:</label>
            <input
              type="tel"
              value={voiceData.phoneNumber}
              className="flex-grow border border-gray-300 rounded-lg p-2"
              readOnly
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="w-32 font-medium text-gray-700">Gender:</label>
            <input
              type="text"
              value={voiceData.gender}
              className="flex-grow border border-gray-300 rounded-lg p-2"
              readOnly
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="w-32 font-medium text-gray-700">Address:</label>
            <input
              type="text"
              value={voiceData.address}
              className="flex-grow border border-gray-300 rounded-lg p-2"
              readOnly
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="w-32 font-medium text-gray-700">DOB:</label>
            <input
              type="text"
              value={new Date(voiceData.dateOfBirth).toLocaleDateString()}
              className="flex-grow border border-gray-300 rounded-lg p-2"
              readOnly
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="w-32 font-medium text-gray-700">Occupation:</label>
            <input
              type="text"
              value={voiceData.occupation}
              className="flex-grow border border-gray-300 rounded-lg p-2"
              readOnly
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="w-32 font-medium text-gray-700">Content:</label>
            <textarea
              value={voiceData.textContent}
              className="flex-grow border border-gray-300 rounded-lg p-2"
              readOnly
              rows="2"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="w-32 font-medium text-gray-700">Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="flex-grow border border-gray-300 rounded-lg p-2"
              disabled={updating}
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Media Files */}
        <div className="mt-6 space-y-4">
          {voiceData.audioFile && (
            <div>
              <p className="font-medium text-gray-700">Audio File:</p>
              <audio controls src={voiceData.audioFile} className="w-full rounded-lg shadow"></audio>
            </div>
          )}
          {voiceData.videoFile && (
            <div>
              <p className="font-medium text-gray-700">Video File:</p>
              <video controls width="100%" src={voiceData.videoFile} className="rounded-lg shadow"></video>
            </div>
          )}
        </div>

        {/* Update Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleStatusUpdate}
            disabled={updating}
            className={`px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md transition ${
              updating ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
          >
            {updating ? "Updating..." : "Update Status"}
          </button>
        </div>
      </div>
    )}
  </div>
</div>

  );
};

export default UpdateVoiceStatusAdmin;
