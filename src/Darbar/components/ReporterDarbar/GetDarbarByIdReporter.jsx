import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../utils/const";

const GetDarbarByIdReporter = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const darbarId = queryParams.get("Id");
  const [darbar, setDarbar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchDarbar = async () => {
      try {
        const token = localStorage.getItem("userToken"); // Get the token from local storage
        const response = await axios.get(
          `${baseUrl}getDarbarByIdReporter?id=${darbarId}`,
          {
            headers: {
              Authorization: token, // Include the token in the headers
            },
          }
        );
        setDarbar(response.data.darbar);
      } catch (err) {
        setError(err.response ? err.response.data.error : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDarbar();
  }, [darbarId]);

  // Function to handle accept action
  const handleAccept = async () => {
    try {
      const token = localStorage.getItem("userToken"); // Get the token from local storage
      await axios.post(
        `${baseUrl}createDarbarStatus`, // Change to your actual endpoint for accepting the darbar
        {}, // Empty object since we're using query parameters
        {
          headers: {
            Authorization: token, // Include the token in the headers
          },
          params: {
            darbarId: darbarId, // Query parameter
          },
        }
      );

      alert("Darbar accepted successfully!");
      navigate("/ReporterDashboard/Accept-darbar")
      // Optionally, you can redirect or refresh the data here
    } catch (err) {
      console.log(err)
      alert(err.response.data.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!darbar) return <div>No Darbar found</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen mt-28">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Darbar Details
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Darbar ID: {darbar._id}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Organized By:
            </label>
            <input
              type="text"
              value={`${darbar.darbarBy.name} (${darbar.darbarBy.email})`}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Date:
            </label>
            <input
              type="text"
              value={new Date(darbar.darbarDate).toLocaleDateString()}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              State:
            </label>
            <input
              type="text"
              value={darbar.darbarState}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              City:
            </label>
            <input
              type="text"
              value={darbar.darbarCity}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Area:
            </label>
            <input
              type="text"
              value={darbar.area}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Village:
            </label>
            <input
              type="text"
              value={darbar.village}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Purpose:
            </label>
            <input
              type="text"
              value={darbar.purpose}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Reason:
            </label>
            <input
              type="text"
              value={darbar.darbarReason}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Pincode:
            </label>
            <input
              type="text"
              value={darbar.pincode}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              People Available:
            </label>
            <input
              type="number"
              value={darbar.peopleAvailable}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              People Required:
            </label>
            <input
              type="number"
              value={darbar.peopleRequired}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Type:
            </label>
            <input
              type="text"
              value={darbar.darbarType}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Status:
            </label>
            <input
              type="text"
              value={darbar.darbarStatus}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Time Limit (hours):
            </label>
            <input
              type="text"
              value={darbar.darbarTimeLimit}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Created At:
            </label>
            <input
              type="text"
              value={new Date(darbar.createdAt).toLocaleString()}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Updated At:
            </label>
            <input
              type="text"
              value={new Date(darbar.updatedAt).toLocaleString()}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Accept Button */}
        <button
          onClick={handleAccept}
          className="mt-6 w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default GetDarbarByIdReporter;
