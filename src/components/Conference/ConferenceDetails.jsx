import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  fetchConferenceById,
  updateConference,
} from "../../redux/conferenceSlicer";
import ConferenceStatusAd from "./ConferenceStatusAd";

const ConferenceDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const conferenceId = queryParams.get("conferenceId");

  const { conference, loading, error } = useSelector(
    (state) => state.conference
  );

  const [formData, setFormData] = useState({
    conferenceArea: "",
    conferenceBy: "",
    conferenceChannelCity: "",
    conferenceChannelState: "",
    conferenceCost: "",
    conferenceEmailAddress: "",
    conferenceName: "",
    conferencePinCode: "",
    conferencePurpose: "",
    numberOfReporters: "",
    paymentStatus: "",
    status: "",
    whatsappNumber: "",
  });

  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (conferenceId) {
      dispatch(fetchConferenceById(conferenceId));
    }
  }, [dispatch, conferenceId]);

  useEffect(() => {
    if (conference) {
      setFormData({
        conferenceArea: conference.conferenceArea,
        conferenceBy: conference.conferenceBy,
        conferenceChannelCity: conference.conferenceChannelCity,
        conferenceChannelState: conference.conferenceChannelState,
        conferenceCost: conference.conferenceCost,
        conferenceEmailAddress: conference.conferenceEmailAddress,
        conferenceName: conference.conferenceName,
        conferencePinCode: conference.conferencePinCode,
        conferencePurpose: conference.conferencePurpose,
        numberOfReporters: conference.numberOfReporters,
        paymentStatus: conference.paymentStatus,
        status: conference.status,
        whatsappNumber: conference.whatsappNumber,
      });
    }
  }, [conference]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await dispatch(
        updateConference({ conferenceId, conferenceData: formData })
      );
      alert("Conference updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update conference.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Conference Details
      </h1>
      {conference?.status !== "rejected" && (
        <p className="text-red-500 text-center mb-4">
          Updates are only allowed for rejected conference.
        </p>
      )}
      {conference && (
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Conference Name : {conference.conferenceName}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.keys(formData).map((key) => (
                <div key={key}>
                  <label
                    htmlFor={key}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </label>
                  <input
                    type="text"
                    id={key}
                    name={key}
                    value={formData[key]}
                    disabled={
                      key !== "conferenceArea" &&
                      key !== "conferencePurpose" &&
                      key !== "conferenceName"
                    }
                    onChange={handleChange}
                    placeholder={`Enter ${key}`}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-50 focus:outline-none focus:ring focus:ring-blue-200"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className={`w-full text-white py-2 px-4 rounded ${
                  conference.status === "rejected"
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                disabled={conference.status !== "rejected" || updating}
              >
                {updating ? "Updating..." : "Update Conference"}
              </button>
            </div>
          </form>
          <ConferenceStatusAd conferenceId={conferenceId} />
        </div>
      )}
    </div>
  );
};

export default ConferenceDetails;
