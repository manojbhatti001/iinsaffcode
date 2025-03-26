import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { baseUrl } from "../../utils/const";
import { toast, ToastContainer } from "react-toastify"; // Import Toast components
import "react-toastify/dist/ReactToastify.css"; // Import Toast styles

const LeadDetails = () => {
  const [leadStatus, setLeadStatus] = useState(null);
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adArea, setAdArea] = useState({ adState: "", adCity: "" });
  const [adDescription, setAdDescription] = useState("");
  const [adNote, setAdNote] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false); // State for loading during update
  //sushil
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const leadId = queryParams.get("leadId");

  useEffect(() => {
    const fetchLeadDetails = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get(`${baseUrl}getSpecificLeadDetails`, {
          params: { leadId: leadId },
          headers: { Authorization: token },
        });
        setLead(response.data);
        setAdArea({
          adState: response.data.adArea[0].adState,
          adCity: response.data.adArea[0].adCity,
        });
        setAdDescription(response.data.adDescription);
        setAdNote(response.data.adNote);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (leadId) {
      fetchLeadDetails();
    }
  }, [leadId]);

  useEffect(() => {
    const fetchLeadStatusView = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await axios.get(`${baseUrl}viewStatus`, {
          headers: { Authorization: token },
          params: { leadId: leadId }
        });
        //   console.log("lead Status View response => ", response)
        if (response.data.leadStatusViews) {
          setLeadStatus(response.data.leadStatusViews);
        }
      } catch (err) {
        //   console.log("lead Status View error => ", err)
        setError('Failed to fetch lead status details.');
      } finally {
        setLoading(false);
      }
    };

    if (leadId) {
      fetchLeadStatusView();
    }
  }, [leadId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("leadId", leadId);
    formData.append("adDescription", adDescription);
    formData.append("adNote", adNote);
    formData.append("adArea[adState]", adArea.adState);
    formData.append("adArea[adCity]", adArea.adCity);

    if (imageFile) formData.append("image", imageFile);
    if (videoFile) formData.append("video", videoFile);

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
    } catch (error) {
      toast.error("Error updating lead: " + error.message); // Show error toast
    } finally {
      setIsUpdating(false); // Reset loading state
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!lead) return <div>No lead found</div>;

  return (
    <div className="container mx-auto p-4 mt-28">
      <ToastContainer /> {/* Add ToastContainer */}
      <h2 className="text-xl font-bold mb-4 text-center">Lead Details</h2>
      {lead?.status !== "rejected" && (
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
              value={lead._id}
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
              value={lead.leadBy}
              disabled
              className="border p-2 w-full rounded-md"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Ad Description:
            </label>
            <input
              type="text"
              value={adDescription || ""}
              onChange={(e) => setAdDescription(e.target.value)}
              className="border p-2 w-full rounded-md"
              disabled={lead.status !== "rejected"}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Ad Note:
            </label>
            <input
              type="text"
              value={adNote || ""}
              onChange={(e) => setAdNote(e.target.value)}
              className="border p-2 w-full rounded-md"
              disabled={lead.status !== "rejected"}
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
            disabled={lead.status !== "rejected"}
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
            disabled={lead.status !== "rejected"}
          />
        </div>
        <button
          type="submit"
          className={`w-full text-white py-2 px-4 rounded ${lead.status === "rejected" ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300 cursor-not-allowed"
            }`}
          disabled={lead.status !== "rejected" || isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Lead"}
        </button>
      </form>


      <h2 className="text-2xl font-bold mb-6 text-center">Lead Status View Details</h2>
      {Array.isArray(leadStatus) && leadStatus.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 border-b">Lead ID</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 border-b">Accepted By User</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 border-b">Reach People</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 border-b">Views Received</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 border-b">Video URL</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 border-b">Note</th>
              </tr>
            </thead>
            <tbody>
              {leadStatus.map((status, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {/* Lead ID */}
                  <td className="px-4 py-3 text-sm text-gray-800 border-b">{status.leadId._id || "-"}</td>

                  {/* Accepted By User */}
                  <td className="px-4 py-3 text-sm text-gray-800 border-b">{status.acceptedByUser || "-"}</td>

                  {/* Required Views */}
                  <td className="px-4 py-3 text-sm text-gray-800 border-b">{status.reqView || "0"}</td>

                  {/* Views Received */}
                  <td className="px-4 py-3 text-sm text-gray-800 border-b">{status.viewReceived || "0"}</td>

                  {/* Video URL */}
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

                  {/* Note */}
                  <td className="px-4 py-3 text-sm text-gray-800 border-b">{status.note || "No note available"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-6">No lead status available</div>
      )}
    </div>
  );
};

export default LeadDetails;
