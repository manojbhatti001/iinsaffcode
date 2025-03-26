import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../utils/const";
import { toast, ToastContainer } from "react-toastify"; // Import Toast components
import "react-toastify/dist/ReactToastify.css"; // Import Toast styles

const ConferenceStatusViewDetails = ({ conferenceId }) => {
  const [conferenceStatus, setConferenceStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false); // State for update loading
  const [isChecked, setIsChecked] = useState(false); // State for checkbox

  useEffect(() => {
    const fetchConferenceStatus = async () => {
      try {
        const token = localStorage.getItem("userToken");
     //   console.log("Conference ID:", conferenceId); // Log conferenceId to check its value
        const response = await axios.get(
          `${baseUrl}getConferenceStatusReporter`,
          {
            headers: { Authorization: token },
            params: { conferenceId },
          }
        );
     //   console.log(response)

        if (response.data.conferenceStatus) {
          setConferenceStatus(response.data.conferenceStatus);
        }
      } catch (err) {
     //   console.log(err)
        setError("Failed to fetch conference status details.");
      } finally {
        setLoading(false);
      }
    };

    if (conferenceId) fetchConferenceStatus();
  }, [conferenceId]);

  const handleUpdate = async () => {
    if (!isChecked) {
      toast.error("Please check the box to proceed with the update."); // Show error toast
      return;
    }
    setUpdating(true); // Set updating state to true
    try {
      const token = localStorage.getItem("userToken");
      const updatedData = {
        conferenceId,
        videoUrl: conferenceStatus.videoUrl,
        note: conferenceStatus.note,
      };

      const response = await axios.put(
        `${baseUrl}updateConferenceStatus`,
        updatedData,
        {
          headers: { Authorization: token },
        }
      );

      if (response.status === 200) {
        toast.success("Conference Status updated successfully!"); // Show success toast
        setConferenceStatus(response.data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update conference status."); // Show error toast
    } finally {
      setUpdating(false); // Reset updating state
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!conferenceStatus) return <div>No conference status found.</div>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <ToastContainer /> {/* Add ToastContainer to display toasts */}
      <h2 className="text-xl font-semibold mb-4 text-blue-600">
        Conference Status View Details
      </h2>
      <form className="space-y-4">
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Conference ID</label>
          <input
            type="text"
            value={conferenceStatus.conferenceId}
            readOnly
            className="mt-1 p-2 bg-gray-100 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Accepted By User</label>
          <input
            type="text"
            value={conferenceStatus.acceptedByUser}
            readOnly
            className="mt-1 p-2 bg-gray-100 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Video URL</label>
          <input
            type="text"
            value={conferenceStatus.videoUrl || ""}
            onChange={(e) =>
              setConferenceStatus({
                ...conferenceStatus,
                videoUrl: e.target.value,
              })
            }
            readOnly={!!conferenceStatus.videoUrl}
            className={`mt-1 p-2 border border-gray-300 rounded-md ${
              conferenceStatus.videoUrl ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Note</label>
          <textarea
            value={conferenceStatus.note || ""}
            onChange={(e) =>
              setConferenceStatus({ ...conferenceStatus, note: e.target.value })
            }
            className="mt-1 p-2 border border-gray-300 rounded-md"
            rows="3"
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
          className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
          disabled={
            updating || (!!conferenceStatus.videoUrl && !conferenceStatus.note)
          }
        >
          {updating ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default ConferenceStatusViewDetails;
