import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { baseUrl } from "../../utils/const";
import ConferenceStatusView from "./ConferenceStatusView";
import { toast, ToastContainer } from "react-toastify"; // Import Toast components
import "react-toastify/dist/ReactToastify.css"; // Import Toast styles

const ConferenceDetailsReporter = () => {
  const [conference, setConference] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState(null); // State for status messages
  const [accepting, setAccepting] = useState(false); // State for accept loading
  const [isChecked, setIsChecked] = useState(false); // State for checkbox

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const conferenceId = queryParams.get("conferenceId"); // Get conferenceId from query parameters

  useEffect(() => {
    const fetchConference = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get(
          `${baseUrl}getSpecificeConferenceDetails`,
          {
            params: {
              conferenceId: conferenceId,
            },
            headers: {
              authorization: token,
            },
          }
        ); // Adjust the endpoint as needed
        //   console.log(" ==>", response);
        setConference(response.data.conference);
      } catch (err) {
        setError(
          err.response ? err.response.data.message : "Error fetching conference"
        );
        //   console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchConference();
  }, [conferenceId]);

  const handleAccept = async () => {
    if (!isChecked) {
      toast.error("Please check the box to accept the lead.");
      return;
    }
    setAccepting(true); // Set accepting state to true
    try {
      const token = localStorage.getItem("userToken");
      //   console.log("accept token is this =>", token, conferenceId);

      const response = await axios.post(
        `${baseUrl}createConferenceStatus`,
        {},
        {
          params: { conferenceId: conferenceId }, // Send the conferenceId as query param
          headers: {
            Authorization: token, // Send the token in Authorization header
          },
        }
      );

      toast.success(
        "Conference status created successfully! See it in the ACCEPTED panel to upload its Video!"
      ); // Show success toast
      //   console.log(response.data); // Log the response for debugging
    } catch (err) {
      //   console.log(err);
      toast.error(
        err.response
          ? err.response.data.message
          : "Error creating conference status"
      ); // Show error toast
    } finally {
      setAccepting(false); // Reset accepting state
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!conference) {
    return <div>No conference found.</div>;
  }

  return (
    // <div className="conference-details max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
    //   <ToastContainer />
    //   <h2 className="text-2xl font-semibold text-blue-600 mb-4">
    //     {conference.conferenceName}
    //   </h2>
    //   <p className="mb-2">
    //     <strong className="text-gray-700">Organizer:</strong>{" "}
    //     {conference.conferenceBy}
    //   </p>
    //   <p className="mb-2">
    //     <strong className="text-gray-700">WhatsApp Number:</strong>{" "}
    //     {conference.whatsappNumber}
    //   </p>
    //   <p className="mb-2">
    //     <strong className="text-gray-700">Email Address:</strong>{" "}
    //     {conference.conferenceEmailAddress}
    //   </p>
    //   <p className="mb-2">
    //     <strong className="text-gray-700">Number of Reporters:</strong>{" "}
    //     {conference.numberOfReporters}
    //   </p>
    //   <p className="mb-2">
    //     <strong className="text-gray-700">Cost:</strong>₹
    //     {conference.conferenceCost}
    //   </p>
    //   <p className="mb-2">
    //     <strong className="text-gray-700">Date:</strong>{" "}
    //     {new Date(conference.conferenceDate).toLocaleDateString()}
    //   </p>
    //   <p className="mb-2">
    //     <strong className="text-gray-700">Channel State:</strong>{" "}
    //     {conference.conferenceChannelState}
    //   </p>
    //   <p className="mb-2">
    //     <strong className="text-gray-700">Channel City:</strong>{" "}
    //     {conference.conferenceChannelCity}
    //   </p>
    //   <p className="mb-2">
    //     <strong className="text-gray-700">Area:</strong>{" "}
    //     {conference.conferenceArea}
    //   </p>
    //   <p className="mb-2">
    //     <strong className="text-gray-700">Pin Code:</strong>{" "}
    //     {conference.conferencePinCode}
    //   </p>
    //   <p className="mb-2">
    //     <strong className="text-gray-700">Purpose:</strong>{" "}
    //     {conference.conferencePurpose}
    //   </p>
    //   <p className="mb-2">
    //     <strong className="text-gray-700">Status:</strong> {conference.status}
    //   </p>
    //   <p className="mb-2">
    //     <strong className="text-gray-700">Payment Status:</strong>{" "}
    //     {conference.paymentStatus}
    //   </p>
    //   <p className="mb-2">
    //     <strong className="text-gray-700">Created At:</strong>{" "}
    //     {new Date(conference.createdAt).toLocaleDateString()}
    //   </p>
    //   <p className="mb-2">
    //     <strong className="text-gray-700">Updated At:</strong>{" "}
    //     {new Date(conference.updatedAt).toLocaleDateString()}
    //   </p>

    //   <button
    //     onClick={handleAccept}
    //     className={`mt-4 px-6 py-2 ${
    //       accepting ? "bg-gray-500" : "bg-green-500"
    //     } text-white font-semibold rounded hover:bg-green-600 transition duration-200`}
    //     disabled={accepting} // Disable button while accepting
    //   >
    //     {accepting ? "Accepting..." : "Accept"}
    //   </button>

    //   {statusMessage && (
    //     <div className="mt-4 p-4 bg-blue-100 text-blue-800 rounded border border-blue-300">
    //       {statusMessage}
    //     </div>
    //   )}

    //   {/* <ConferenceStatusView conferenceId={conferenceId} /> */}
    // </div>
    <div className="conference-details mt-32 max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg border border-gray-300">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        {conference.conferenceName}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <p>
          <strong className="text-gray-600">Organizer:</strong> {conference.conferenceBy}
        </p>
        <p>
          <strong className="text-gray-600">WhatsApp Number:</strong> {conference.whatsappNumber}
        </p>
        <p>
          <strong className="text-gray-600">Email Address:</strong> {conference.conferenceEmailAddress}
        </p>
        <p>
          <strong className="text-gray-600">Number of Reporters:</strong> {conference.numberOfReporters}
        </p>
        <p>
          <strong className="text-gray-600">Cost:</strong> ₹{conference.conferenceCost}
        </p>
        <p>
          <strong className="text-gray-600">Date:</strong>{" "}
          {new Date(conference.conferenceDate).toLocaleDateString()}
        </p>
        <p>
          <strong className="text-gray-600">Channel State:</strong> {conference.conferenceChannelState}
        </p>
        <p>
          <strong className="text-gray-600">Channel City:</strong> {conference.conferenceChannelCity}
        </p>
        <p>
          <strong className="text-gray-600">Area:</strong> {conference.conferenceArea}
        </p>
        <p>
          <strong className="text-gray-600">Pin Code:</strong> {conference.conferencePinCode}
        </p>
        <p>
          <strong className="text-gray-600">Purpose:</strong> {conference.conferencePurpose}
        </p>
        <p>
          <strong className="text-gray-600">Status:</strong> {conference.status}
        </p>
        <p>
          <strong className="text-gray-600">Payment Status:</strong> {conference.paymentStatus}
        </p>
        <p>
          <strong className="text-gray-600">Created At:</strong>{" "}
          {new Date(conference.createdAt).toLocaleDateString()}
        </p>
        <p>
          <strong className="text-gray-600">Updated At:</strong>{" "}
          {new Date(conference.updatedAt).toLocaleDateString()}
        </p>
      </div>
      <div className="flex items-center mt-4">
        <input
          id="accept-checkbox"
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="accept-checkbox" className="text-sm text-gray-700">
          I confirm to accept the lead and agree to the terms.
        </label>
      </div>
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleAccept}
          className={`px-8 py-3 rounded font-medium text-white transition duration-200 ${accepting ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
            }`}
          disabled={accepting}
        >
          {accepting ? "Accepting..." : "Accept"}
        </button>
      </div>
      {statusMessage && (
        <div className="mt-4 p-4 bg-blue-50 text-blue-700 rounded-lg border border-blue-300">
          {statusMessage}
        </div>
      )}
    </div>
  );
};

export default ConferenceDetailsReporter;
