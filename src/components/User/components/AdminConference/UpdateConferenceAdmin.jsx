import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchConferenceById, updateConference } from "../../../redux/AdminRedux/adminGetAllConferenceSlicer";

const UpdateConferenceAdmin = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const conferenceId = queryParams.get("conferenceId");
  const { currentConference, status, error } = useSelector((state) => state.adminConferences);

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
 //   console.log(currentConference)
  }, [currentConference]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateConference({ conferenceId, ...formData }));
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Update Conference: {conferenceId}</h1>
      {status === "loading" && <p className="text-center">Loading...</p>}
      {/* {error && <p className="text-red-500 text-center">{error}</p>} */}

      {currentConference && (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl space-y-6">
          <label className="block">
            <span className="text-gray-700">Conference Name:</span>
            <input
              type="text"
              name="conferenceName"
              value={formData.conferenceName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out hover:shadow-lg"
              placeholder="Enter conference name"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">WhatsApp Number:</span>
            <input
              type="tel"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Allow only digits
              }}
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out hover:shadow-lg"
              placeholder="Enter WhatsApp number"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Conference Email Address:</span>
            <input
              type="email"
              name="conferenceEmailAddress"
              value={formData.conferenceEmailAddress}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out hover:shadow-lg"
              placeholder="Enter conference email"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Conference Area:</span>
            <input
              type="text"
              name="conferenceArea"
              value={formData.conferenceArea}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out hover:shadow-lg"
              placeholder="Enter conference area"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Conference Channel City:</span>
            <input
              type="text"
              name="conferenceChannelCity"
              value={formData.conferenceChannelCity}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out hover:shadow-lg"
              placeholder="Enter channel city"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Conference Channel State:</span>
            <input
              type="text"
              name="conferenceChannelState"
              value={formData.conferenceChannelState}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out hover:shadow-lg"
              placeholder="Enter channel state"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Conference Cost:</span>
            <input
              type="number"
              name="conferenceCost"
              value={formData.conferenceCost}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out hover:shadow-lg"
              placeholder="Enter conference cost"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Conference Pin Code:</span>
            <input
              type="number"
              name="conferencePinCode"
              value={formData.conferencePinCode}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out hover:shadow-lg"
              placeholder="Enter conference pin code"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Status:</span>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out hover:shadow-lg"
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
              value={formData.paymentStatus}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out hover:shadow-lg"
            >
              <option value="failed">Failed</option>
              <option value="success">Successful</option>
            </select>
          </label>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md shadow-lg transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Update Conference
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateConferenceAdmin;
