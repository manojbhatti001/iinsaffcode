import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../utils/const";
import { toast, ToastContainer } from "react-toastify"; // Import Toast components
import "react-toastify/dist/ReactToastify.css";

const LeadStatusViewDetails = ({ leadId }) => {
  const [leadStatus, setLeadStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false); // New state for update button loading
  const [isChecked, setIsChecked] = useState(false); // State for checkbox

  useEffect(() => {
    const fetchLeadStatusView = async () => {
      try {
        const token = localStorage.getItem("userToken"); // Get token from local storage
        const response = await axios.get(`${baseUrl}getLeadStatusReporter`, {
          headers: {
            Authorization: token, // Send token in the Authorization header
          },
          params: {
            leadId: leadId,
          },
        });

        if (response.data.leadStatus) {
          setLeadStatus(response.data.leadStatus);
        }
      } catch (err) {
        setError("Failed to fetch lead status details.");
      } finally {
        setLoading(false);
      }
    };

    if (leadId) {
      fetchLeadStatusView();
    }
  }, [leadId]);

  const handleUpdate = async () => {
    if (!isChecked) {
      toast.error("Please check the box to proceed with the update."); // Show error toast
      return;
    }
    setUpdating(true);
    try {
      const token = localStorage.getItem("userToken"); // Get token from local storage
      const updatedData = {
        leadId: leadId,
        videoUrl: leadStatus.videoUrl,
        note: leadStatus.note,
      };

      const response = await axios.put(`${baseUrl}updateStatus`, updatedData, {
        headers: {
          Authorization: token, // Send token in the Authorization header
        },
      });

      if (response.status === 200) {
        toast.success('Lead Status View updated successfully!'); // Show success toast
        setLeadStatus(response.data);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to update lead status view.'); // Show error toast
    } finally {
      setUpdating(false); // Reset updating state after API call
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  if (!leadStatus) {
    return <div>No lead status found.</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <ToastContainer /> {/* Add ToastContainer to display toast messages */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Lead Status View Details</h2>
      <form className="space-y-4">
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Lead ID:</label>
          <input type="text" value={leadStatus.leadId} readOnly className="mt-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md" />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Accepted By User:</label>
          <input type="text" value={leadStatus.acceptedByUser} readOnly className="mt-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md" />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Reach People:</label>
          <input
            type="number"
            value={leadStatus.reqView}
            readOnly // This could be editable if you want users to change it
            className="mt-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Video URL:</label>
          <input
            type="text"
            value={leadStatus.videoUrl || ""}
            onChange={(e) => setLeadStatus({ ...leadStatus, videoUrl: e.target.value })}
            className="mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md"
          />
          <a href={`${leadStatus.videoUrl || ""}`} target="_blank" rel="noopener noreferrer"></a>
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Advertisement Time</label>
          <textarea
            value={leadStatus.note || ""}
            onChange={(e) => setLeadStatus({ ...leadStatus, note: e.target.value })}
            className="mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md h-32"
          />
        </div>
        <div className="flex items-center">
    <input
      type="checkbox"
      id="confirmationCheckbox"
      checked={isChecked}
      onChange={(e) => setIsChecked(e.target.checked)}
      className="mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
    />
    <label htmlFor="confirmationCheckbox" className="text-gray-700">
      I confirm the details are correct.
    </label>
  </div>
        <button
          type="button"
          onClick={handleUpdate}
          disabled={updating} // Disable button when updating
          className="inline-flex justify-center px-4 py-2 text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring-blue active:bg-blue-700 disabled:opacity-50"
        >
          {updating ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default LeadStatusViewDetails;
