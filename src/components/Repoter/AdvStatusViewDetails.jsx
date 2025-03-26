import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../utils/const";
import { toast, ToastContainer } from "react-toastify"; // Import Toast components
import "react-toastify/dist/ReactToastify.css";

const AdvStatusViewDetails = ({ advId }) => {
  // Replace 'leadId' with 'advId'
  const [advStatus, setAdvStatus] = useState(null); // Replace 'leadStatus' with 'advStatus'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false); // New state for update button loading
  const [isChecked, setIsChecked] = useState(false); // State for checkbox

  useEffect(() => {
    const fetchAdvStatusView = async () => {
      // Replace 'lead' with 'adv'
      try {
        const token = localStorage.getItem("userToken"); // Get token from local storage
        const response = await axios.get(`${baseUrl}getAdvStatusReporter`, {
          // Update endpoint
          headers: {
            Authorization: token, // Send token in the Authorization header
          },
          params: {
            advId: advId, // Use 'advId' instead of 'leadId'
          },
        });

        if (response.data.advStatus) {
          // Replace 'leadStatus' with 'advStatus'
          setAdvStatus(response.data.advStatus); // Update state with 'advStatus'
        }
      } catch (err) {
        setError("Failed to fetch adv status details.");
      } finally {
        setLoading(false);
      }
    };

    if (advId) {
      fetchAdvStatusView(); // Use 'advId' instead of 'leadId'
    }
  }, [advId]); // Dependency updated to 'advId'

  const handleUpdate = async () => {
    if (!isChecked) {
      toast.error("Please check the box to proceed with the update."); // Show error toast
      return;
    }
    setUpdating(true);
    try {
      const token = localStorage.getItem("userToken"); // Get token from local storage
      const updatedData = {
        advId: advId, // Use 'advId' instead of 'leadId'
        videoUrl: advStatus.videoUrl, // Replace 'leadStatus' with 'advStatus'
        note: advStatus.note, // Replace 'leadStatus' with 'advStatus'
      };

      const response = await axios.put(
        `${baseUrl}updateAdvStatus`,
        updatedData,
        {
          // Update endpoint
          headers: {
            Authorization: token, // Send token in the Authorization header
          },
        }
      );

      if (response.status === 200) {
        toast.success("Adv Status View updated successfully!"); // Show success toast
        setAdvStatus(response.data); // Update state with new response data
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update adv status view."); // Show error toast
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

  if (!advStatus) {
    // Replace 'leadStatus' with 'advStatus'
    return <div>No adv status found.</div>; // Update message
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <ToastContainer /> {/* Add ToastContainer to display toast messages */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Adv Status View Details
      </h2>{" "}
      {/* Update heading */}
      <form className="space-y-4">
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Adv ID:</label>{" "}
          {/* Update label */}
          <input
            type="text"
            value={advStatus.advId}
            readOnly
            className="mt-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
          />{" "}
          {/* Update value */}
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Accepted By User:</label>
          <input
            type="text"
            value={advStatus.acceptedByUser}
            readOnly
            className="mt-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Reach People:</label>
          <input
            type="number"
            value={advStatus.reqView}
            readOnly
            className="mt-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Video URL:</label>
          <input
            type="text"
            value={advStatus.videoUrl || ""}
            onChange={(e) =>
              setAdvStatus({ ...advStatus, videoUrl: e.target.value })
            }
            className="mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md"
          />
          <a
            href={`${advStatus.videoUrl || ""}`}
            target="_blank"
            rel="noopener noreferrer"
          ></a>
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Note:</label>
          <textarea
            value={advStatus.note || ""}
            onChange={(e) =>
              setAdvStatus({ ...advStatus, note: e.target.value })
            }
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

export default AdvStatusViewDetails; // Update component name
