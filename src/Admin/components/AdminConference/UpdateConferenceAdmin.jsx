import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  fetchConferenceById,
  updateConference,
} from "../../../redux/AdminRedux/adminGetAllConferenceSlicer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateConferenceAdmin = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const conferenceId = queryParams.get("conferenceId");
  const { currentConference, status, error } = useSelector(
    (state) => state.adminConferences
  );

  const [formData, setFormData] = useState({
    conferenceName: "",
    whatsappNumber: "",
    conferenceEmailAddress: "",
    status: "",
    paymentStatus: "",
    conferenceArea: "",
    conferenceChannelCity: "",
    conferenceChannelState: "",
    conferenceCost: 0,
    conferencePinCode: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(true);

  const toggleReadOnly = () => {
    setIsReadOnly(!isReadOnly);
  };

  useEffect(() => {
    if (conferenceId) {
      dispatch(fetchConferenceById(conferenceId));
    }
  }, [dispatch, conferenceId]);

  useEffect(() => {
    if (currentConference) {
      setFormData({
        conferenceName: currentConference.conferenceName || "",
        whatsappNumber: currentConference.whatsappNumber || "",
        conferenceEmailAddress: currentConference.conferenceEmailAddress || "",
        status: currentConference.status || "pending",
        paymentStatus: currentConference.paymentStatus || "failed",
        conferenceArea: currentConference.conferenceArea || "",
        conferenceChannelCity: currentConference.conferenceChannelCity || "",
        conferenceChannelState: currentConference.conferenceChannelState || "",
        conferenceCost: currentConference.conferenceCost || 0,
        conferencePinCode: currentConference.conferencePinCode || "",
      });
    }
    //   console.log(currentConference);
  }, [currentConference]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await dispatch(updateConference({ conferenceId, ...formData }));
      toast.success("Conference updated successfully!");
    } catch (err) {
      toast.error("Failed to update conference.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (


    <div className="max-w-3xl mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-center mb-6">
        Update Conference: {conferenceId}
      </h1>
      <button
        onClick={toggleReadOnly}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        {isReadOnly ? "Edit" : "Read-Only"}
      </button>

      {status === "loading" && <p className="text-center">Loading...</p>}

      {currentConference && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-xl space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex flex-col">
              <span className="text-gray-700 font-medium">Conference Name</span>
              <input
                type="text"
                name="conferenceName"
                value={formData.conferenceName}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter conference name"
                readOnly={isReadOnly}
              />
            </label>

            <label className="flex flex-col">
              <span className="text-gray-700 font-medium">WhatsApp Number</span>
              <input
                type="tel"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ""))}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter WhatsApp number"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-gray-700 font-medium">Conference Email Address</span>
              <input
                type="email"
                name="conferenceEmailAddress"
                value={formData.conferenceEmailAddress}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter conference email"
                readOnly={isReadOnly}
              />
            </label>

            <label className="flex flex-col">
              <span className="text-gray-700 font-medium">Conference Area</span>
              <input
                type="text"
                name="conferenceArea"
                value={formData.conferenceArea}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter conference area"
                readOnly={isReadOnly}
              />
            </label>

            <label className="flex flex-col">
              <span className="text-gray-700 font-medium">Conference Channel City</span>
              <input
                type="text"
                name="conferenceChannelCity"
                value={formData.conferenceChannelCity}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter channel city"
                readOnly={isReadOnly}
              />
            </label>

            <label className="flex flex-col">
              <span className="text-gray-700 font-medium">Conference Channel State</span>
              <input
                type="text"
                name="conferenceChannelState"
                value={formData.conferenceChannelState}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter channel state"
                readOnly={isReadOnly}
              />
            </label>

            <label className="flex flex-col">
              <span className="text-gray-700 font-medium">Conference Cost</span>
              <input
                type="number"
                name="conferenceCost"
                value={formData.conferenceCost}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter conference cost"
                readOnly={isReadOnly}
              />
            </label>

            <label className="flex flex-col">
              <span className="text-gray-700 font-medium">Conference Pin Code</span>
              <input
                type="number"
                name="conferencePinCode"
                value={formData.conferencePinCode}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter conference pin code"
                readOnly={isReadOnly}
              />
            </label>

            <label className="flex flex-col">
              <span className="text-gray-700 font-medium">Status</span>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                disabled={isReadOnly}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </label>

            <label className="flex flex-col">
              <span className="text-gray-700 font-medium">Payment Status</span>
              <select
                name="paymentStatus"
                value={formData.paymentStatus}
                onChange={handleChange}
                disabled={isReadOnly}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="failed">Failed</option>
                <option value="success">Successful</option>
              </select>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md shadow-lg transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={isUpdating || isReadOnly}
          >
            {isUpdating ? "Updating..." : "Update Conference"}
          </button>
        </form>
      )}
    </div>

  );
};

export default UpdateConferenceAdmin;
