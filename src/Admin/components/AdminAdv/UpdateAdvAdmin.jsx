import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../utils/const";

const UpdateAdvAdmin = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const advId = queryParams.get("advId");

  const [advData, setAdvData] = useState({
    channelType: "",
    adType: "",
    requiredViews: 100,
    adLength: 8,
    adCost: 0,
    adArea: [],
    createdBy: "",
    mediaType: "",
    mediaDescription: "",
    status: "pending",
    paymentStatus: "failed",
    adDescription: "",
    adNote: "",
    adminNote: "",
  });

  const [newAdState, setNewAdState] = useState("");
  const [newAdCity, setNewAdCity] = useState("");
  const [isReadOnly, setIsReadOnly] = useState(true);

  const toggleReadOnly = () => {
    setIsReadOnly(!isReadOnly);
  };

  useEffect(() => {
    const fetchAdvData = async () => {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem("adminToken");

        const response = await axios.get(
          `${baseUrl}getSpecificAdvDetailsAdmin`, // Replace with your actual API route
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              advId,
            },
          }
        );
        const data = response.data;
        setAdvData({
          channelType: data.channelType || "",
          adType: data.adType || "",
          requiredViews: data.requiredViews || 100,
          adLength: data.adLength || 8,
          adCost: data.adCost || 0,
          adArea: data.adArea || [],
          createdBy: data.createdBy || "",
          mediaType: data.iinsafMediaDetails?.mediaType || "",
          mediaDescription: data.iinsafMediaDetails?.mediaDescription || "",
          status: data.status || "pending",
          paymentStatus: data.paymentStatus || "failed",
          adDescription: data.adDescription || "",
          adNote: data.adNote || "",
          adminNote: data.adminNote || "Admin Note Goes Here.",
        });
      } catch (error) {
        console.error("Failed to fetch advertisement data:", error);
      }
    };

    if (advId) {
      fetchAdvData();
    }
  }, [advId]);

  const handleChange = (e) => {
    setAdvData({ ...advData, [e.target.name]: e.target.value });
  };

  const handleAddAdArea = () => {
    if (newAdState && newAdCity) {
      setAdvData({
        ...advData,
        adArea: [...advData.adArea, { adState: newAdState, adCity: newAdCity }],
      });
      setNewAdState("");
      setNewAdCity("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get the token from localStorage
      const token = localStorage.getItem("adminToken");

      if (!token) {
        alert("Unauthorized access. Please log in.");
        return;
      }

      await axios.put(
        `${baseUrl}adv/update`, // Replace with your actual API route
        advData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            advId,
          },
        }
      );
      alert("Advertisement updated successfully!");
    } catch (error) {
      console.error("Failed to update advertisement:", error);
      alert("Failed to update advertisement. Please try again.");
    }
  };

  return (
    <div className="p-4  grid-1 lg:grid-cols-2 gap-6 ">
      <h1 className="text-2xl font-bold text-center mb-4">
        Update Advertisement: {advId}
      </h1>
      <button
        onClick={toggleReadOnly}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        {isReadOnly ? "Edit" : "Read-Only"}
      </button>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 grid lg:grid-cols-2 w-full gap-2 rounded-lg shadow-xl space-y-6"
      >
        {/* Ad Configuration */}
        <FormCard title="Ad configuration">
          <label className="block">
            <span className="text-gray-700">Channel Type:</span>
            <input
              type="text"
              name="channelType"
              value={advData.channelType}
              onChange={handleChange}
              className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out hover:shadow-lg"
              placeholder="Enter channel type"
              readOnly={isReadOnly}
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Ad Type:</span>
            <select
              name="adType"
              value={advData.adType}
              onChange={handleChange}
              disabled={isReadOnly}
              className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out hover:shadow-lg"
            >
              <option value="">Select Ad Type</option>
              <option value="bannerAd">Banner Ad</option>
              <option value="videoAd">Video Ad</option>
              <option value="lTypeAd">L-Type Ad</option>
            </select>
          </label>
          <label className="block">
            <span className="text-gray-700">RReach People:</span>
            <input
              type="number"
              name="requiredViews"
              value={advData.requiredViews}
              onChange={handleChange}
              min="100"
              className="mt-1 p-1  block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out hover:shadow-lg"
              readOnly={isReadOnly}
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Ad Length (seconds):</span>
            <input
              type="number"
              name="adLength"
              value={advData.adLength}
              onChange={handleChange}
              min="8"
              max="500"
              className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out hover:shadow-lg"
              readOnly={isReadOnly}
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Ad Cost:</span>
            <input
              type="number"
              name="adCost"
              value={advData.adCost}
              onChange={handleChange}
              min="0"
              className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out hover:shadow-lg"
              readOnly={isReadOnly}
            />
          </label>
          {/* Display current adArea (States and Cities) */}
          <div className="mb-4">
            <span className="text-gray-700">Existing States and Cities:</span>
            <ul>
              {advData.adArea.map((area, index) => (
                <li key={index}>
                  {area.adState}, {area.adCity}
                </li>
              ))}
            </ul>
          </div>

          {/* Input for adding a new state and city */}
          <label className="block">
            <span className="text-gray-700">Ad State:</span>
            <input
              type="text"
              name="adState"
              value={newAdState}
              onChange={(e) => setNewAdState(e.target.value)}
              className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm"
              readOnly={isReadOnly}
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Ad City:</span>
            <input
              type="text"
              name="adCity"
              value={newAdCity}
              onChange={(e) => setNewAdCity(e.target.value)}
              className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm"
              readOnly={isReadOnly}
            />
          </label>
          <button
            type="button"
            onClick={handleAddAdArea}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={isReadOnly}
          >
            Add State and City
          </button>
        </FormCard>

        <FormCard title="Creator Information">
          <label className="block">
            <span className="text-gray-700">Created By:</span>
            <select
              name="createdBy"
              value={advData.createdBy}
              onChange={handleChange}
              disabled={isReadOnly}
              className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out hover:shadow-lg"
            >
              <option value="">Select Creator</option>
              <option value="self">Self</option>
              <option value="iinsaf">iinsaf</option>
            </select>
          </label>

          <label className="block">
            <span className="text-gray-700">Media Type:</span>
            <input
              type="text"
              name="mediaType"
              value={advData.mediaType}
              onChange={handleChange}
              className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out hover:shadow-lg"
              readOnly={isReadOnly}
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Media Description:</span>
            <input
              type="text"
              name="mediaDescription"
              value={advData.mediaDescription}
              onChange={handleChange}
              className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out hover:shadow-lg"
              readOnly={isReadOnly}
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Ad Description:</span>
            <textarea
              name="adDescription"
              value={advData.adDescription}
              onChange={handleChange}
              className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out hover:shadow-lg"
              rows="4"
              placeholder="Enter ad description"
              readOnly={isReadOnly}
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Ad Note:</span>
            <textarea
              name="adNote"
              value={advData.adNote}
              onChange={handleChange}
              className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out hover:shadow-lg"
              rows="4"
              placeholder="Enter ad note"
              readOnly={isReadOnly}
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Admin Note:</span>
            <textarea
              name="adminNote"
              value={advData.adminNote}
              onChange={handleChange}
              className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out hover:shadow-lg"
              rows="4"
              placeholder="Enter admin note"
              readOnly={isReadOnly}
            />
          </label>
        </FormCard>

        <FormCard title="Status">
          <label className="block">
            <span className="text-gray-700">Status:</span>
            <select
              name="status"
              value={advData.status}
              disabled={isReadOnly}
              onChange={handleChange}
              className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out hover:shadow-lg"
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </label>

          <label className="block">
            <span className="text-gray-700">Payment Status:</span>
            <select
              name="paymentStatus"
              value={advData.paymentStatus}
              onChange={handleChange}
              className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out hover:shadow-lg"
              disabled={isReadOnly}
            >
              <option value="failed">Failed</option>
              <option value="success">Successful</option>
            </select>
          </label>
        </FormCard>

        <button
          type="submit"
          className=" w-45 h-10 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md shadow-lg transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          disabled={isReadOnly}
        >
          Update Advertisement
        </button>
      </form>
    </div>
  );
};

const FormCard = ({ title, children }) => (
  <div className="p-4 border rounded-lg shadow-md bg-white space-y-4">
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  </div>
);

export default UpdateAdvAdmin;
