import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  fetchLeadById,
  updateLead,
} from "../../../redux/AdminRedux/adminGetAllLeadsSlicer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateLeadAdmin = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const leadId = queryParams.get("leadId");
  const { currentLead, status, error } = useSelector(
    (state) => state.adminLeads
  );
  const [isEditable, setIsEditable] = useState(false);

  const toggleEditable = () => {
    setIsEditable(!isEditable);
  };

  const [formData, setFormData] = useState({
    channelType: "",
    adType: "",
    requiredViews: 100,
    adLength: 8,
    adCost: 0,
    // adState: "",
    // adCity: "",
    adArea: [],
    createdBy: "",
    mediaType: "",
    mediaDescription: "",
    status: "",
    paymentStatus: "",
    adDescription: "",
    adNote: "",
    adminNote: "",
    adImageUrl: "",
    adVideoUrl: "",
  });

  const [newAdState, setNewAdState] = useState("");
  const [newAdCity, setNewAdCity] = useState("");

  useEffect(() => {
    if (leadId) {
      dispatch(fetchLeadById(leadId));
    }
  }, [dispatch, leadId]);

  useEffect(() => {
    if (currentLead) {
      setFormData({
        channelType: currentLead.channelType || "",
        adType: currentLead.adType || "",
        requiredViews: currentLead.requiredViews || 100,
        adLength: currentLead.adLength || 8,
        adCost: currentLead.adCost || 0,
        // adState: currentLead.adArea?.[0]?.adState || "",
        // adCity: currentLead.adArea?.[0]?.adCity || "",
        adArea: currentLead.adArea || [],
        createdBy: currentLead.createdBy || "",
        mediaType: currentLead.iinsafMediaDetails?.mediaType || "",
        mediaDescription:
          currentLead.iinsafMediaDetails?.mediaDescription || "",
        status: currentLead.status || "pending",
        paymentStatus: currentLead.paymentStatus || "failed",
        adDescription: currentLead.adDescription || "",
        adNote: currentLead.adNote || "",
        adminNote: currentLead.adminNote || "Admin Note Goes Here .",
        adImageUrl: currentLead.adImageURL || "",
        adVideoUrl: currentLead.adVideoURL || "",
      });
    }
    window.alert(formData.adImageUrl);
  }, [currentLead]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddAdArea = () => {
    if (newAdState && newAdCity) {
      setFormData({
        ...formData,
        adArea: [
          ...formData.adArea,
          { adState: newAdState, adCity: newAdCity },
        ],
      });
      setNewAdState("");
      setNewAdCity("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateLead({ leadId, ...formData }));
      dispatch(fetchLeadById(leadId));
      toast.success("Lead updated successfully!");
    } catch (err) {
      toast.error("Failed to update lead. Please try again.");
    }
  };

  return (
    <div className="p-4  grid-1 lg:grid-cols-2 gap-6 ">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-center mb-4">
        Update Lead: {leadId}
      </h1>
      {status === "loading" && <p className="text-center">Loading...</p>}
      {/* {error && <p className="text-red-500 text-center">{error}</p>} */}

      {currentLead && (
        <>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 grid lg:grid-cols-2 w-full gap-2 rounded-lg shadow-xl space-y-6"
          >
            <FormCard title="Ad configuration">
              <label className="block">
                <span className="text-gray-700">Channel Type:</span>
                <input
                  type="text"
                  name="channelType"
                  value={formData.channelType}
                  onChange={handleChange}
                  className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out hover:shadow-lg"
                  placeholder="Enter channel type"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Ad Type:</span>
                <select
                  name="adType"
                  value={formData.adType}
                  onChange={handleChange}
                  className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out hover:shadow-lg"
                >
                  <option value="">Select Ad Type</option>
                  <option value="bannerAd">Banner Ad</option>
                  <option value="videoAd">Video Ad</option>
                  <option value="lTypeAd">L-Type Ad</option>
                </select>
              </label>
              <label className="block">
                <span className="text-gray-700">Reach People:</span>
                <input
                  type="number"
                  name="requiredViews"
                  value={formData.requiredViews}
                  onChange={handleChange}
                  min="100"
                  className="mt-1 p-1  block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out hover:shadow-lg"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Ad Length (seconds):</span>
                <input
                  type="number"
                  name="adLength"
                  value={formData.adLength}
                  onChange={handleChange}
                  min="8"
                  max="500"
                  className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out hover:shadow-lg"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Ad Cost:</span>
                <input
                  type="number"
                  name="adCost"
                  value={formData.adCost}
                  onChange={handleChange}
                  min="0"
                  className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out hover:shadow-lg"
                />
              </label>
              {/* Display current adArea (States and Cities) */}
              <div className="mb-4">
                <span className="text-gray-700">
                  Existing States and Cities:
                </span>
                <ul>
                  {formData.adArea.map((area, index) => (
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
                />
              </label>
              <button
                type="button"
                onClick={handleAddAdArea}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add State and City
              </button>
            </FormCard>

            <FormCard title="Creator Information">
              <label className="block">
                <span className="text-gray-700">Created By:</span>
                <select
                  name="createdBy"
                  value={formData.createdBy}
                  onChange={handleChange}
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
                  value={formData.mediaType}
                  onChange={handleChange}
                  className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out hover:shadow-lg"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Media Description:</span>
                <input
                  type="text"
                  name="mediaDescription"
                  value={formData.mediaDescription}
                  onChange={handleChange}
                  className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out hover:shadow-lg"
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Ad Description:</span>
                <textarea
                  name="adDescription"
                  value={formData.adDescription}
                  onChange={handleChange}
                  className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out hover:shadow-lg"
                  rows="4"
                  placeholder="Enter ad description"
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Ad Note:</span>
                <textarea
                  name="adNote"
                  value={formData.adNote}
                  onChange={handleChange}
                  className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out hover:shadow-lg"
                  rows="4"
                  placeholder="Enter ad note"
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Admin Note:</span>
                <textarea
                  name="adminNote"
                  value={formData.adminNote}
                  onChange={handleChange}
                  className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out hover:shadow-lg"
                  rows="4"
                  placeholder="Enter admin note"
                />
              </label>
            </FormCard>

            <FormCard title="Status">
              <label className="block">
                <span className="text-gray-700">Status:</span>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out hover:shadow-lg"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </label>

              <label className="block">
                <span className="text-gray-700">Payment Status:</span>
                <select
                  name="paymentStatus"
                  value={formData.paymentStatus}
                  onChange={handleChange}
                  className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out hover:shadow-lg"
                >
                  <option value="failed">Failed</option>
                  <option value="success">Successful</option>
                </select>
              </label>
            </FormCard>
            {formData.adImageUrl && <img src={formData.adImageUrl} alt="No Image" width={300} height={300} />}
            {formData.adVideoUrl && <video width={300} height={300} controls>
              <source src={formData.adVideoUrl} type="video/mp4" />
            </video>
            }
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className=" w-40 h-10 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md shadow-lg transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Update Lead
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};
const FormCard = ({ title, children }) => (
  <div className="p-4 border rounded-lg shadow-md bg-white space-y-4">
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  </div>
);

const InputField = ({ name, type = "text", placeholder, value, onChange }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full p-2 border rounded"
  />
);

export default UpdateLeadAdmin;
