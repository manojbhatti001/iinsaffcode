import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom"; // Import useLocation
import { baseUrl } from "../../utils/const";
import LeadStatusViewDetails from "./LeadStatusViewDetails";
import { toast, ToastContainer } from "react-toastify"; // Importing toast functions
import "react-toastify/dist/ReactToastify.css"; // Importing CSS for the toast
import { AiOutlineCopy } from "react-icons/ai";
import AdvStatusViewDetails from "./AdvStatusViewDetails";

const AdvDetailsReporter = () => {
  const [adv, setAdv] = useState(null); // Changed 'lead' to 'adv'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accepting, setAccepting] = useState(false); // New state for accept button loading
  const [isChecked, setIsChecked] = useState(false); // State for checkbox
  const [advStatus, setAdvStatus] = useState(null); // Add state for adv status

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const advId = queryParams.get("advId"); // Changed leadId to advId

  const [reqView, setReqView] = useState(1000); // To capture the required views for the adv

  useEffect(() => {
    const fetchAdvDetails = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get(`${baseUrl}getSpecificAdvDetails`, {
          params: { advId: advId }, // Changed leadId to advId
          headers: {
            Authorization: token, // Add token to the header
          },
        });
        //   console.log(response);
        setAdv(response.data); // Changed 'lead' to 'adv'
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    const fetchAdvStatus = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get(`${baseUrl}getAdvStatusReporter`, {
          params: { advId: advId },
          headers: {
            Authorization: token,
          },
        });
        setAdvStatus(response.data.advStatus);
      } catch (err) {
        console.error("Error fetching adv status:", err);
      }
    };

    if (advId) {
      fetchAdvDetails();
      fetchAdvStatus();
    }
  }, [advId]); // Changed leadId to advId

  const handleAccept = async () => {
    if (!isChecked) {
      toast.error("Please check the box to accept the lead.");
      return;
    }
    setAccepting(true);
    try {
      const token = localStorage.getItem("userToken");

      const response = await axios.post(
        `${baseUrl}createAdvStatus`,
        { advId, reqView }, // Changed leadId to advId
        {
          headers: {
            Authorization: token, // Add token to the header
          },
        }
      );
      console.log(response)

      //   console.log("Accept response:", response.data);
      toast.success("Adv accepted successfully!"); // Changed "Lead" to "Adv"
    } catch (error) {
      console.error("Error accepting adv:", error); // Changed "lead" to "adv"
      toast.error("Error accepting lead: " + error.response.data.message);
    } finally {
      setAccepting(false); // Reset accepting state after API call
    }
  };

  const handleDownloadImage = async () => {
    try {
      const response = await axios.get(adv.adImageURL, {
        responseType: "blob", // Important: get the response as a Blob
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "adImage.jpg"); // Specify the download file name
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link); // Clean up after download
    } catch (error) {
      toast.error("Error downloading image: " + error.message);
    }
  };

  const handleDownloadVideo = async () => {
    try {
      const response = await axios.get(adv.adVideoURL, {
        responseType: "blob", // Important: get the response as a Blob
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "adVideo.mp4"); // Specify the download file name
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link); // Clean up after download
    } catch (error) {
      toast.error("Error downloading video: " + error.message);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("URL copied to clipboard!"); // Alert the user that the copy was successful
      })
      .catch((err) => {
        console.error("Failed to copy: ", err); // Log an error if the copy fails
      });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-6xl mx-auto my-8">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Advertisement Details
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center p-4">{error}</div>
      ) : adv ? (
        <div className="space-y-8">
          {/* Basic Information */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600"><span className="font-medium">Advertisement ID:</span> {adv._id}</p>
                <p className="text-gray-600"><span className="font-medium">Channel Type:</span> {adv.channelType}</p>
                <p className="text-gray-600"><span className="font-medium">Ad Type:</span> {adv.adType}</p>
              </div>
              <div>
                <p className="text-gray-600"><span className="font-medium">Required Views:</span> {adv.requiredViews}</p>
                <p className="text-gray-600"><span className="font-medium">Ad Length:</span> {adv.adLength} seconds</p>
                <p className="text-gray-600"><span className="font-medium">Status:</span> {adv.status}</p>
              </div>
            </div>
          </div>

          {/* Media Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Advertisement Image</h3>
              {adv.adImageURL ? (
                <div className="space-y-4">
                  <img
                    src={adv.adImageURL}
                    alt="Advertisement"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    onClick={handleDownloadImage}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-200"
                  >
                    Download Image
                  </button>
                </div>
              ) : (
                <p className="text-gray-500">No image available</p>
              )}
            </div>

            {/* Video Section */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Advertisement Video</h3>
              {adv.adVideoURL ? (
                <div className="space-y-4">
                  <video
                    controls
                    className="w-full h-64 object-cover rounded-lg"
                    src={adv.adVideoURL}
                  />
                  <button
                    onClick={handleDownloadVideo}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-200"
                  >
                    Download Video
                  </button>
                </div>
              ) : (
                <p className="text-gray-500">No video available</p>
              )}
            </div>
          </div>

          {/* Description and Notes */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Additional Information</h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-gray-700">Description</p>
                <p className="text-gray-600">{adv.adDescription || "No description available"}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Notes</p>
                <p className="text-gray-600">{adv.adNote || "No notes available"}</p>
              </div>
            </div>
          </div>

          {/* Accept Section */}
          {!advStatus && (
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label className="text-gray-700">
                    I confirm to accept this advertisement and agree to the terms.
                  </label>
                </div>
                <button
                  onClick={handleAccept}
                  disabled={accepting || !isChecked}
                  className={`px-8 py-3 rounded-lg text-white font-medium transition duration-200 ${
                    accepting || !isChecked
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {accepting ? "Accepting..." : "Accept Advertisement"}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center text-gray-500 p-4">No advertisement data found</div>
      )}
    </div>
  );
};

export default AdvDetailsReporter; // Changed 'LeadDetailsReporter' to 'AdvDetailsReporter'
