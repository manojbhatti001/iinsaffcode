import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation
import { baseUrl } from "../../utils/const";
import LeadStatusViewDetails from "./LeadStatusViewDetails";
import { toast, ToastContainer } from "react-toastify"; // Importing toast functions
import "react-toastify/dist/ReactToastify.css"; // Importing CSS for the toast
import { AiOutlineCopy } from "react-icons/ai";

const LeadDetailsReporter = () => {
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accepting, setAccepting] = useState(false); // New state for accept button loading
  const [isChecked, setIsChecked] = useState(false); // State for checkbox
  const [leadStatus, setLeadStatus] = useState(null); // Add state for lead status

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const leadId = queryParams.get("leadId"); // Get leadId from query parameters

  const [reqView, setReqView] = useState(""); // To capture the required views for the lead

  useEffect(() => {
    const fetchLeadDetails = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get(`${baseUrl}getSpecificLeadDetails`, {
          params: { leadId: leadId },
          headers: {
            Authorization: token, // Add token to the header
          },
        });
        //   console.log(response);
        setLead(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    const fetchLeadStatus = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get(`${baseUrl}getLeadStatusReporter`, {
          params: { leadId: leadId },
          headers: {
            Authorization: token,
          },
        });
        setLeadStatus(response.data.leadStatus);
      } catch (err) {
        console.error("Error fetching lead status:", err);
      }
    };

    if (leadId) {
      fetchLeadDetails();
      fetchLeadStatus();
    }
  }, [leadId]);

  const handleAccept = async () => {
    if (!isChecked) {
      toast.error("Please check the box to accept the lead.");
      return;
    }

    setAccepting(true);
    try {
      const token = localStorage.getItem("userToken");

      const response = await axios.post(
        `${baseUrl}createStatus`,
        { leadId, reqView }, // Send the required fields to the API
        {
          headers: {
            Authorization: token, // Add token to the header
          },
        }
      );

      //   console.log("Accept response:", response.data);
      toast.success("Lead accepted successfully!");
      setTimeout(() => {
        navigate("/ReporterDashboard");
      }, 2000);
    } catch (error) {
      console.error("Error accepting lead:", error);
      toast.error("Error accepting lead: " + error.response.data.message);
    } finally {
      setAccepting(false); // Reset accepting state after API call
    }
  };

  const handleDownloadImage = async () => {
    try {
      const response = await axios.get(lead.adImageURL, {
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
      const response = await axios.get(lead.adVideoURL, {
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!lead) return <div>No lead found</div>;
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
    <div className="bg-white shadow flex flex-col items-center rounded-lg p-6 h-[120vh] overflow-y-scroll">
      <ToastContainer /> {/* Render the toast container */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Lead Details
      </h2>
      {/* Grid layout for structured box-like sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-4/6 gap-6">
        {/* Basic Information Section */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Basic Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Lead ID
              </label>
              <input
                type="text"
                value={lead._id}
                readOnly
                className="w-full px-3 py-2 border rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Lead By
              </label>
              <input
                type="text"
                value={lead.leadBy}
                readOnly
                className="w-full px-3 py-2 border rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Channel Type
              </label>
              <input
                type="text"
                value={lead.channelType}
                readOnly
                className="w-full px-3 py-2 border rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ad Type
              </label>
              <input
                type="text"
                value={lead.adType}
                readOnly
                className="w-full px-3 py-2 border rounded-md bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* Advertisement Details Section */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Advertisement Details
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
              Reach People
              </label>
              <input
                type="text"
                value={lead.requiredViews}
                readOnly
                className="w-full px-3 py-2 border rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Remaining Views
              </label>
              <input
                type="text"
                value={lead.remainingViews}
                readOnly
                className="w-full px-3 py-2 border rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ad Length
              </label>
              <input
                type="text"
                value={lead.adLength}
                readOnly
                className="w-full px-3 py-2 border rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ad Cost
              </label>
              <input
                type="text"
                value={lead.adCost}
                readOnly
                className="w-full px-3 py-2 border rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ad Description
              </label>
              <textarea
                value={lead.adDescription || "N/A"}
                readOnly
                className="w-full px-3 py-2 border rounded-md bg-gray-50"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ad Note
              </label>
              <textarea
                value={lead.adNote || "N/A"}
                readOnly
                className="w-full px-3 py-2 border rounded-md bg-gray-50"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Ad Media Section */}
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Media</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ad Image
              </label>
              {lead.adImageURL ? (
                <div className="mt-2">
                  <img
                    src={lead.adImageURL}
                    alt="Ad"
                    className="w-[100px] h-auto rounded-md border"
                  />
                  <button
                    onClick={handleDownloadImage}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Download Image
                  </button>
                </div>
              ) : (
                <p className="text-gray-500">No Image Available</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ad Video
              </label>
              {lead.adVideoURL ? (
                <div className="mt-2">
                  <video
                    controls
                    src={lead.adVideoURL}
                    className="w-full h-auto rounded-md border"
                  ></video>
                  <button
                    onClick={handleDownloadVideo}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Download Video
                  </button>
                </div>
              ) : (
                <p className="text-gray-500">No Video Available</p>
              )}
            </div>
          </div>
        </div>

        {/* Location Details Section */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Location Details
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                value={lead.adArea[0]?.adState || "N/A"}
                readOnly
                className="w-full px-3 py-2 border rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                value={lead.adArea[0]?.adCity || "N/A"}
                readOnly
                className="w-full px-3 py-2 border rounded-md bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* Status Section */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Status and Administration
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <input
                type="text"
                value={lead.status}
                readOnly
                className="w-full px-3 py-2 border rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Payment Status
              </label>
              <input
                type="text"
                value={lead.paymentStatus}
                readOnly
                className="w-full px-3 py-2 border rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Created Date
              </label>
              <input
                type="text"
                value={new Date(lead.createdDate).toLocaleDateString()}
                readOnly
                className="w-full px-3 py-2 border rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Admin Note
              </label>
              <textarea
                value={lead.adminNote || "N/A"}
                readOnly
                className="w-full px-3 py-2 border rounded-md bg-gray-50"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      {/* Accept Button Section */}
      {!leadStatus && (
        <div className="flex flex-col items-center justify-center mt-4">
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="mr-2"
            />
            <label>I confirm to accept the lead and agree to the terms.</label>
          </div>
          <button
            onClick={handleAccept}
            disabled={accepting || !isChecked}
            className={`px-4 py-2 rounded ${
              accepting || !isChecked
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
          >
            {accepting ? "Accepting..." : "Accept"}
          </button>
        </div>
      )}
    </div>
  );
};

export default LeadDetailsReporter;
