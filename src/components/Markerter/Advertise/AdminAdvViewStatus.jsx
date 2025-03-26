import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../utils/const";

const AdminAdvViewStatus = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [advStatus, setAdvStatus] = useState([]); // State to store fetched adv status
  const [status, setStatus] = useState("idle"); // Track loading status
  const [error, setError] = useState(null); // Track errors
  const [updateData, setUpdateData] = useState({}); // Manage form data for updates

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const advId = queryParams.get("advId");

  const toggleEditable = () => {
    setIsEditable(!isEditable);
  };

  // Fetch adv status function
  const fetchAdvStatus = async (advId) => {
    setStatus("loading");
    try {
      const response = await axios.get(`${baseUrl}getAdvStatusView`, {
        params: { advId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setAdvStatus(response.data); // Update adv status
      setStatus("succeeded");
    } catch (err) {
      setError(err.response?.data || "Error fetching adv status");
      setStatus("failed");
    }
  };

  // Fetch adv status when `advId` changes
  useEffect(() => {
    if (advId) {
      fetchAdvStatus(advId);
    }
  }, [advId]);

  // Initialize `updateData` when `advStatus` changes
  useEffect(() => {
    if (advStatus.length > 0) {
      const initialData = {};
      advStatus.forEach((statusItem) => {
        initialData[statusItem._id] = {
          videoDate: statusItem.videoDate || "",
          videoUrl: statusItem.videoUrl || "",
          reqView: statusItem.reqView || false,
          statusByAdmin: statusItem.statusByAdmin || "",
          note: statusItem.note || "",
        };
      });
      setUpdateData(initialData);
    }
  }, [advStatus]);

  // Handle input change for specific adv status
  const handleInputChange = (e, statusId) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [statusId]: {
        ...prevData[statusId],
        [name]: value,
      },
    }));
  };

  // Handle update for a specific adv status
  const handleUpdate = async (statusId) => {
    const updatedData = updateData[statusId];
    try {
      const response = await axios.put(
        `${baseUrl}updateAdvStatusView`,
        {
          id: statusId,
          videoDate: updatedData.videoDate,
          videoUrl: updatedData.videoUrl,
          reqView: updatedData.reqView,
          statusByAdmin: updatedData.statusByAdmin,
          note: updatedData.note,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      alert("Adv status updated successfully!");
    } catch (err) {
      alert(
        "Error updating adv status: " +
          (err.response?.data?.error || "Something went wrong.")
      );
    }
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Adv Status for ID: {advId}</h1>
      {status === "loading" && <p className="text-gray-500">Loading...</p>}
      {status === "failed" && (
        <p className="text-red-500">
          Error: {error?.message || "Something went wrong."}
        </p>
      )}
      {status === "succeeded" && advStatus.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Video URL",
                  "Timing Of Ad ",
                  "Video Date",
                  "Accepted By User",
                  "Accepted Date",
                  "Created At",
                  "Updated At",
                  "Channel Type",
                  "Ad Type",
                  "Previous Views",
                  "Requested Views",
                  "Views Received",
                  "Adv Status",
                  "Status By Admin",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700 whitespace-nowrap"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {advStatus.map((statusItem) => (
                <tr key={statusItem._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {statusItem.videoUrl ? (
                      <a
                        href={statusItem.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline text-nowrap"
                      >
                        Open Video
                      </a>
                    ) : (
                      <span className="text-gray-500">No URL</span>
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      name="note"
                      value={
                        updateData[statusItem._id]?.note ||
                        statusItem.note ||
                        ""
                      }
                      onChange={(e) => handleInputChange(e, statusItem._id)}
                      className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="datetime-local"
                      name="videoDate"
                      value={
                        statusItem?.videoDate &&
                        !isNaN(Date.parse(statusItem.videoDate))
                          ? new Date(statusItem.videoDate)
                              .toISOString()
                              .slice(0, 16)
                          : ""
                      }
                      readOnly
                      className="w-full p-1 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      name="acceptedByUser"
                      value={statusItem.acceptedByUser || ""}
                      readOnly
                      className="w-full p-1 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="datetime-local"
                      name="acceptedDate"
                      value={new Date(statusItem.acceptedDate)
                        .toISOString()
                        .slice(0, 16)}
                      readOnly
                      className="w-full p-1 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="datetime-local"
                      name="createdAt"
                      value={new Date(statusItem.createdAt)
                        .toISOString()
                        .slice(0, 16)}
                      readOnly
                      className="w-full p-1 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="datetime-local"
                      name="updatedAt"
                      value={
                        statusItem.updatedAt
                          ? new Date(statusItem.updatedAt)
                              .toISOString()
                              .slice(0, 16)
                          : ""
                      }
                      readOnly
                      className="w-full p-1 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      name="advChannelType"
                      value={statusItem.advId.channelType || ""}
                      readOnly
                      className="w-full p-1 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      name="adType"
                      value={statusItem.advId.adType || ""}
                      readOnly
                      className="w-full p-1 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      name="previousViews"
                      value={statusItem.advId.previousViews || ""}
                      readOnly
                      className="w-full p-1 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      name="requestedViews"
                      value={statusItem.advId.requestedViews || ""}
                      readOnly
                      className="w-full p-1 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      name="viewsReceived"
                      value={statusItem.viewsReceived || ""}
                      readOnly
                      className="w-full p-1 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      name="advStatus"
                      value={statusItem.advStatus || ""}
                      readOnly
                      className="w-full p-1 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      name="statusByAdmin"
                      value={
                        updateData[statusItem._id]?.statusByAdmin ||
                        statusItem.statusByAdmin ||
                        ""
                      }
                      onChange={(e) => handleInputChange(e, statusItem._id)}
                      className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      onClick={() => handleUpdate(statusItem._id)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No adv status found.</p>
      )}
    </div>
  );
};

export default AdminAdvViewStatus;
