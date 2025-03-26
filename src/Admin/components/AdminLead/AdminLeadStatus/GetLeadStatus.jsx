import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../../utils/const";

const GetLeadStatus = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [leadStatus, setLeadStatus] = useState([]); // State to store fetched lead status
  const [status, setStatus] = useState("idle"); // Track loading status
  const [error, setError] = useState(null); // Track errors
  const [updateData, setUpdateData] = useState({}); // Manage form data for updates

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const leadId = queryParams.get("leadId");

  const toggleEditable = () => {
    setIsEditable(!isEditable);
  };

  // Fetch lead status function
  const fetchLeadStatus = async (leadId) => {
    setStatus("loading");
    try {
      const response = await axios.get(`${baseUrl}getLeadStatusView`, { 
        params: { leadId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setLeadStatus(response.data); // Update lead status
      setStatus("succeeded");
    } catch (err) {
      setError(err.response?.data || "Error fetching lead status");
      setStatus("failed");
    }
  };

  // Fetch lead status when `leadId` changes
  useEffect(() => {
    if (leadId) {
      fetchLeadStatus(leadId);
    }
  }, [leadId]);

  // Initialize `updateData` when `leadStatus` changes
  useEffect(() => {
    if (leadStatus.length > 0) {
      const initialData = {};
      leadStatus.forEach((statusItem) => {
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
  }, [leadStatus]);

  // Handle input change for specific lead status
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

  // Handle update for a specific lead status
  const handleUpdate = async (statusId) => {
    const updatedData = updateData[statusId];
    try {
      const response = await axios.put(
        `${baseUrl}updateLeadStatusView`,
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
      alert("Lead status updated successfully!");
    } catch (err) {
      alert(
        "Error updating lead status: " +
        (err.response?.data?.error || "Something went wrong.")
      );
    }
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    // <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
    //   <h1 className="text-2xl font-bold mb-4">Lead Status for ID: {leadId}</h1>
    //   {status === "loading" && <p className="text-gray-500">Loading...</p>}
    //   {status === "failed" && (
    //     <p className="text-red-500">
    //       Error: {error?.message || "Something went wrong."}
    //     </p>
    //   )}

    //   {status === "succeeded" && leadStatus.length > 0 ? (
    //     leadStatus.map((statusItem) => (
    //       <div
    //         key={statusItem._id}
    //         className="mb-6 p-4 border rounded-lg shadow-sm bg-gray-50"
    //       >
    //         <h2 className="text-xl font-semibold mb-2">
    //           Update Lead Status - ID: {statusItem._id}
    //         </h2>
    //         <div className="grid grid-cols-1 gap-4">

    //           <label className="font-medium">Video URL:</label>
    //           <input
    //             type="text"
    //             name="videoUrl"
    //             placeholder="Video URL"
    //             value={updateData[statusItem._id]?.videoUrl || statusItem.videoUrl || ""}
    //             onChange={(e) => handleInputChange(e, statusItem._id)}
    //             className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    //           />

    //           <label className="font-medium">Note:</label>
    //           <input
    //             type="text"
    //             name="note"
    //             placeholder="Note"
    //             value={updateData[statusItem._id]?.note || statusItem.note || ""}
    //             onChange={(e) => handleInputChange(e, statusItem._id)}
    //             className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    //           />

    //           <label className="font-medium">Video Date:</label>
    //           <input
    //             type="datetime-local"
    //             name="videoDate"
    //             value={
    //               statusItem?.videoDate && !isNaN(Date.parse(statusItem.videoDate))
    //                 ? new Date(statusItem.videoDate).toISOString().slice(0, 16)
    //                 : ""
    //             }
    //             readOnly
    //             className="p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
    //           />

    //           <label className="font-medium">Accepted By User:</label>
    //           <input
    //             type="text"
    //             name="acceptedByUser"
    //             placeholder="Accepted By User"
    //             value={statusItem.acceptedByUser || ""}
    //             readOnly
    //             className="p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
    //           />

    //           <label className="font-medium">Accepted Date:</label>
    //           <input
    //             type="datetime-local"
    //             name="acceptedDate"
    //             value={new Date(statusItem.acceptedDate).toISOString().slice(0, 16)}
    //             readOnly
    //             className="p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
    //           />

    //           <label className="font-medium">Created At:</label>
    //           <input
    //             type="datetime-local"
    //             name="createdAt"
    //             value={new Date(statusItem.createdAt).toISOString().slice(0, 16)}
    //             readOnly
    //             className="p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
    //           />

    //           <label className="font-medium">Updated At:</label>
    //           <input
    //             type="datetime-local"
    //             name="updatedAt"
    //             value={
    //               statusItem.updatedAt
    //                 ? new Date(statusItem.updatedAt).toISOString().slice(0, 16)
    //                 : ""
    //             }

    //             readOnly
    //             className="p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
    //           />

    //           <label className="font-medium">Channel Type:</label>
    //           <input
    //             type="text"
    //             name="leadChannelType"
    //             placeholder="Channel Type"
    //             value={statusItem.leadId.channelType || ""}
    //             readOnly
    //             className="p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
    //           />

    //           <label className="font-medium">Ad Type:</label>
    //           <input
    //             type="text"
    //             name="adType"
    //             placeholder="Ad Type"
    //             value={statusItem.leadId.adType || ""}
    //             readOnly
    //             className="p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
    //           />

    //           <label className="font-medium">Previous Views:</label>
    //           <input
    //             type="number"
    //             name="previousViews"
    //             placeholder="Previous Views"
    //             value={statusItem.previousViews || 0}
    //             readOnly
    //             className="p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
    //           />

    //           <label className="font-medium">Requested Views:</label>
    //           <input
    //             type="number"
    //             name="reqView"
    //             placeholder="Requested Views"
    //             value={statusItem.reqView || 0}
    //             readOnly
    //             className="p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
    //           />

    //           <label className="font-medium">Views Received:</label>
    //           <input
    //             type="number"
    //             name="viewReceived"
    //             placeholder="View Received"
    //             value={statusItem.viewReceived || 0}
    //             readOnly
    //             className="p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
    //           />
    //           <label className="font-medium">Lead Status:</label>
    //           <input
    //             type="text"
    //             name="status"
    //             placeholder="View Received"
    //             value={statusItem.status || 0}
    //             readOnly
    //             className="p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
    //           />

    //           <label className="font-medium">Status By Admin:</label>
    //           <select
    //             name="statusByAdmin"
    //             value={updateData[statusItem._id]?.statusByAdmin || statusItem.statusByAdmin || ""}
    //             onChange={(e) => handleInputChange(e, statusItem._id)}
    //             className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    //           >
    //             <option value="pending">Pending</option>
    //             <option value="completed">Completed</option>
    //           </select>

    //           <button
    //             onClick={() => handleUpdate(statusItem._id)}
    //             className="mt-2 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
    //           >
    //             Update
    //           </button>
    //         </div>
    //       </div>
    //     ))
    //   ) : (
    //     <p className="text-gray-500">No lead status found.</p>
    //   )}

    // </div>

    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Lead Status for ID: {leadId}</h1>
      {status === "loading" && <p className="text-gray-500">Loading...</p>}
      {status === "failed" && (
        <p className="text-red-500">
          Error: {error?.message || "Something went wrong."}
        </p>
      )}
      {status === "succeeded" && leadStatus.length > 0 ? (
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
                  "Lead Status",
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
              {leadStatus.map((statusItem) => (
                <tr key={statusItem._id} className="hover:bg-gray-50">
                  {/* <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      name="videoUrl"
                      value={updateData[statusItem._id]?.videoUrl || statusItem.videoUrl || ""}
                      onChange={(e) => handleInputChange(e, statusItem._id)}
                      className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td> */}
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
                      value={updateData[statusItem._id]?.note || statusItem.note || ""}
                      onChange={(e) => handleInputChange(e, statusItem._id)}
                      className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="datetime-local"
                      name="videoDate"
                      value={
                        statusItem?.videoDate && !isNaN(Date.parse(statusItem.videoDate))
                          ? new Date(statusItem.videoDate).toISOString().slice(0, 16)
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
                      value={new Date(statusItem.acceptedDate).toISOString().slice(0, 16)}
                      readOnly
                      className="w-full p-1 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="datetime-local"
                      name="createdAt"
                      value={new Date(statusItem.createdAt).toISOString().slice(0, 16)}
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
                          ? new Date(statusItem.updatedAt).toISOString().slice(0, 16)
                          : ""
                      }
                      readOnly
                      className="w-full p-1 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      name="leadChannelType"
                      value={statusItem.leadId.channelType || ""}
                      readOnly
                      className="w-full p-1 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      name="adType"
                      value={statusItem.leadId.adType || ""}
                      readOnly
                      className="w-full p-1 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      name="previousViews"
                      value={statusItem.previousViews || 0}
                      readOnly
                      className="w-full p-1 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      name="reqView"
                      value={statusItem.reqView || 0}
                      readOnly
                      className="w-full p-1 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      name="viewReceived"
                      value={statusItem.viewReceived || 0}
                      readOnly
                      className="w-full p-1 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      name="status"
                      value={statusItem.status || ""}
                      readOnly
                      className="w-full p-1 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <select
                      name="statusByAdmin"
                      value={updateData[statusItem._id]?.statusByAdmin || statusItem.statusByAdmin || ""}
                      onChange={(e) => handleInputChange(e, statusItem._id)}
                      className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => handleUpdate(statusItem._id)}
                      className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
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
        <p className="text-gray-500">No lead status found.</p>
      )}
    </div>
  );
};

export default GetLeadStatus;
