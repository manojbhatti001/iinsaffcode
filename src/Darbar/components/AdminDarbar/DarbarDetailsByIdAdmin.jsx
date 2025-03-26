import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../utils/const";

const DarbarDetailsByIdAdmin = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const darbarId = queryParams.get("Id");

  const [darbarData, setDarbarData] = useState(null);
  const [darbarStatusData, setDarbarStatusData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingDarbar, setUpdatingDarbar] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [updatedDarbarData, setUpdatedDarbarData] = useState({});
  const [updatedStatusData, setUpdatedStatusData] = useState({});

  useEffect(() => {
    const fetchDarbarData = async () => {
      const adminToken = localStorage.getItem("adminToken");

      try {
        const response = await axios.get(
          `${baseUrl}getDarbarById?id=${darbarId}`,
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );
        setDarbarData(response.data.darbar);
        setDarbarStatusData(response.data.darbarStatus[0]);
        setUpdatedDarbarData(response.data.darbar);
        setUpdatedStatusData(response.data.darbarStatus[0]);
      } catch (err) {
        setError(err.response ? err.response.data.error : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDarbarData();
  }, [darbarId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDarbarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStatusInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedStatusData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDarbarUpdate = async () => {
    const adminToken = localStorage.getItem("adminToken");
    setUpdatingDarbar(true);

    try {
      await axios.put(
        `${baseUrl}updateDarbarAdmin?id=${darbarId}`,
        updatedDarbarData,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      alert("Darbar updated successfully!");
    } catch (err) {
      setError(
        err.response
          ? err.response.data.error
          : "An error occurred during darbar update"
      );
    } finally {
      setUpdatingDarbar(false);
    }
  };

  const handleStatusUpdate = async () => {
    const adminToken = localStorage.getItem("adminToken");
    setUpdatingStatus(true);

    try {
      await axios.put(
        `${baseUrl}updateDarbarStatus?statusId=${darbarStatusData._id}`,
        updatedStatusData,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      alert("Darbar status updated successfully!");
    } catch (err) {
      setError(
        err.response
          ? err.response.data.error
          : "An error occurred during status update"
      );
    } finally {
      setUpdatingStatus(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    // <div className="p-4 max-w-xl mx-auto">
    //   <h1 className="text-2xl font-bold mb-4">Darbar Details</h1>
    //   {darbarData && (
    //     <div className="bg-white shadow-md rounded p-4">
    //       <h2 className="text-xl font-semibold">Darbar Information</h2>
    //       <p><strong>ID:</strong> {darbarData._id}</p>
    //       <p><strong>Date:</strong>
    //         <input
    //           type="date"
    //           name="darbarDate"
    //           value={
    //             updatedDarbarData.darbarDate
    //               ? new Date(updatedDarbarData.darbarDate).toISOString().split("T")[0]
    //               : ""
    //           }
    //           onChange={handleInputChange}
    //           className="border rounded p-1 mx-2"
    //         />
    //       </p>
    //       <p><strong>State:</strong>
    //         <input
    //           type="text"
    //           name="darbarState"
    //           value={updatedDarbarData.darbarState || ""}
    //           onChange={handleInputChange}
    //           className="border rounded p-1 mx-2"
    //         />
    //       </p>
    //       <p><strong>City:</strong>
    //         <input
    //           type="text"
    //           name="darbarCity"
    //           value={updatedDarbarData.darbarCity || ""}
    //           onChange={handleInputChange}
    //           className="border rounded p-1 mx-2"
    //         />
    //       </p>
    //       <p><strong>Area:</strong>
    //         <input
    //           type="text"
    //           name="area"
    //           value={updatedDarbarData.area || ""}
    //           onChange={handleInputChange}
    //           className="border rounded p-1 mx-2"
    //         />
    //       </p>
    //       <p><strong>Village:</strong>
    //         <input
    //           type="text"
    //           name="village"
    //           value={updatedDarbarData.village || ""}
    //           onChange={handleInputChange}
    //           className="border rounded p-1 mx-2"
    //         />
    //       </p>
    //       <p><strong>Purpose:</strong>
    //         <input
    //           type="text"
    //           name="purpose"
    //           value={updatedDarbarData.purpose || ""}
    //           onChange={handleInputChange}
    //           className="border rounded p-1 mx-2"
    //         />
    //       </p>
    //       <p><strong>Reason:</strong>
    //         <input
    //           type="text"
    //           name="darbarReason"
    //           value={updatedDarbarData.darbarReason || ""}
    //           onChange={handleInputChange}
    //           className="border rounded p-1 mx-2"
    //         />
    //       </p>
    //       <p><strong>Pincode:</strong>
    //         <input
    //           type="number"
    //           name="pincode"
    //           value={updatedDarbarData.pincode || ""}
    //           onChange={handleInputChange}
    //           className="border rounded p-1 mx-2"
    //         />
    //       </p>
    //       <p><strong>People Available:</strong>
    //         <input
    //           type="number"
    //           name="peopleAvailable"
    //           value={updatedDarbarData.peopleAvailable || ""}
    //           onChange={handleInputChange}
    //           className="border rounded p-1 mx-2"
    //         />
    //       </p>
    //       <p><strong>People Required:</strong>
    //         <input
    //           type="number"
    //           name="peopleRequired"
    //           value={updatedDarbarData.peopleRequired || ""}
    //           onChange={handleInputChange}
    //           className="border rounded p-1 mx-2"
    //         />
    //       </p>
    //       <p><strong>Type:</strong>
    //         <input
    //           type="text"
    //           name="darbarType"
    //           value={updatedDarbarData.darbarType || ""}
    //           onChange={handleInputChange}
    //           className="border rounded p-1 mx-2"
    //         />
    //       </p>
    //       <p><strong>Status:</strong>
    //         <select
    //           name="darbarStatus"
    //           value={updatedDarbarData.darbarStatus || ""}
    //           onChange={handleInputChange}
    //           className="border rounded p-1 mx-2"
    //         >
    //           <option value="" disabled>Select status</option>
    //           <option value="pending">Pending</option>
    //           <option value="approved">Approved</option>
    //           <option value="rejected">Rejected</option>
    //           <option value="cancelled">Cancelled</option>
    //           <option value="completed">Completed</option>
    //         </select>
    //       </p>
    //       <p><strong>Time Limit:</strong> {darbarData.darbarTimeLimit}</p>
    //       <p><strong>Created At:</strong> {new Date(darbarData.createdAt).toLocaleString()}</p>
    //       <p><strong>Updated At:</strong> {new Date(darbarData.updatedAt).toLocaleString()}</p>

    //       {/* Update button for Darbar data */}
    //       <button
    //         onClick={handleDarbarUpdate}
    //         disabled={updatingDarbar}
    //         className={`mt-4 p-2 bg-blue-500 text-white rounded ${updatingDarbar ? "opacity-50 cursor-not-allowed" : ""}`}
    //       >
    //         {updatingDarbar ? "Updating Darbar..." : "Update Darbar"}
    //       </button>
    //     </div>
    //   )}

    //   {darbarStatusData && (
    //     <div className="bg-white shadow-md rounded p-4 mt-6">
    //       <h2 className="text-xl font-semibold">Darbar Status Information</h2>
    //       <p><strong>Status by Admin:</strong>
    //         <select
    //           name="statusByAdmin"
    //           value={updatedStatusData.statusByAdmin || ""}
    //           onChange={handleStatusInputChange}
    //           className="border rounded p-1 mx-2"
    //         >
    //           <option value="" disabled>Select status</option>
    //           <option value="pending">Pending</option>
    //           {/* <option value="approved">Approved</option>
    //           <option value="rejected">Rejected</option>
    //           <option value="cancelled">Cancelled</option> */}
    //           <option value="completed">Completed</option>
    //         </select>
    //       </p>
    //       <p><strong>Note:</strong>
    //         <input
    //           type="text"
    //           name="note"
    //           value={updatedStatusData.note || ""}
    //           onChange={handleStatusInputChange}
    //           className="border rounded p-1 mx-2"
    //         />
    //       </p>
    //       <p><strong>Video URL:</strong>
    //         <input
    //           type="url"
    //           name="videoUrl"
    //           value={updatedStatusData.videoUrl || ""}
    //           onChange={handleStatusInputChange}
    //           className="border rounded p-1 mx-2"
    //         />
    //       </p>
    //       <p><strong>Previous Views:</strong> {darbarStatusData.previousViews}</p>
    //       <p><strong>Accepted Date:</strong> {new Date(darbarStatusData.acceptedDate).toLocaleString()}</p>
    //       <p><strong>Photo URL:</strong> 
    //         <a href={darbarStatusData.photoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">{darbarStatusData.photoUrl}</a>
    //       </p>

    //       {/* Update button for Darbar Status */}
    //       <button
    //         onClick={handleStatusUpdate}
    //         disabled={updatingStatus}
    //         className={`mt-4 p-2 bg-green-500 text-white rounded ${updatingStatus ? "opacity-50 cursor-not-allowed" : ""}`}
    //       >
    //         {updatingStatus ? "Updating Status..." : "Update Status"}
    //       </button>
    //     </div>
    //   )}
    // </div>
    <div className="p-6 max-w-4xl mx-auto bg-gray-50">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Darbar Details
      </h1>

      {darbarData && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Darbar Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p>
              <strong>ID:</strong> {darbarData._id}
            </p>
            <div>
              <strong>Date:</strong>
              <input
                type="date"
                name="darbarDate"
                value={
                  updatedDarbarData.darbarDate
                    ? new Date(updatedDarbarData.darbarDate).toISOString().split("T")[0]
                    : ""
                }
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <strong>State:</strong>
              <input
                type="text"
                name="darbarState"
                value={updatedDarbarData.darbarState || ""}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <strong>City:</strong>
              <input
                type="text"
                name="darbarCity"
                value={updatedDarbarData.darbarCity || ""}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <strong>Area:</strong>
              <input
                type="text"
                name="area"
                value={updatedDarbarData.area || ""}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <strong>Village:</strong>
              <input
                type="text"
                name="village"
                value={updatedDarbarData.village || ""}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <strong>Purpose:</strong>
              <input
                type="text"
                name="purpose"
                value={updatedDarbarData.purpose || ""}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <strong>Reason:</strong>
              <input
                type="text"
                name="darbarReason"
                value={updatedDarbarData.darbarReason || ""}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <strong>Pincode:</strong>
              <input
                type="number"
                name="pincode"
                value={updatedDarbarData.pincode || ""}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <strong>People Available:</strong>
              <input
                type="number"
                name="peopleAvailable"
                value={updatedDarbarData.peopleAvailable || ""}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <strong>People Required:</strong>
              <input
                type="number"
                name="peopleRequired"
                value={updatedDarbarData.peopleRequired || ""}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <strong>Type:</strong>
              <input
                type="text"
                name="darbarType"
                value={updatedDarbarData.darbarType || ""}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <strong>Status:</strong>
              <select
                name="darbarStatus"
                value={updatedDarbarData.darbarStatus || ""}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select status
                </option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <p>
              <strong>Time Limit:</strong> {darbarData.darbarTimeLimit} days
            </p>
            <p>
              <strong>Created At:</strong> {new Date(darbarData.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Updated At:</strong> {new Date(darbarData.updatedAt).toLocaleString()}
            </p>
          </div>

          <button
            onClick={handleDarbarUpdate}
            disabled={updatingDarbar}
            className={`mt-6 w-full py-2 bg-blue-500 text-white font-semibold rounded shadow-md hover:bg-blue-600 transition ${updatingDarbar ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {updatingDarbar ? "Updating Darbar..." : "Update Darbar"}
          </button>
        </div>
      )}

      {darbarStatusData && (
        <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Darbar Status Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <strong>Status by Admin:</strong>
              <select
                name="statusByAdmin"
                value={updatedStatusData.statusByAdmin || ""}
                onChange={handleStatusInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select status
                </option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <strong>Note:</strong>
              <input
                type="text"
                name="note"
                value={updatedStatusData.note || ""}
                onChange={handleStatusInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <strong>Video URL:</strong>
              <input
                type="url"
                name="videoUrl"
                value={updatedStatusData.videoUrl || ""}
                onChange={handleStatusInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <p>
              <strong>Previous Views:</strong> {darbarStatusData.previousViews}
            </p>
            <p>
              <strong>Accepted Date:</strong> {new Date(darbarStatusData.acceptedDate).toLocaleString()}
            </p>
            <p>
              <strong>Photo URL:</strong>{" "}
              <a
                href={darbarStatusData.photoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {darbarStatusData.photoUrl}
              </a>
            </p>
          </div>

          <button
            onClick={handleStatusUpdate}
            disabled={updatingStatus}
            className={`mt-6 w-full py-2 bg-green-500 text-white font-semibold rounded shadow-md hover:bg-green-600 transition ${updatingStatus ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {updatingStatus ? "Updating Status..." : "Update Status"}
          </button>
        </div>
      )}
    </div>

  );


}

export default DarbarDetailsByIdAdmin;