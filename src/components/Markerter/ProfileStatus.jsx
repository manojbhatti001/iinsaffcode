import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../utils/const";

const ProfileStatus = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(""); // Optional: Handle status filter

  // Fetch token from localStorage
  const token = localStorage.getItem("marketerToken");

  // Function to fetch profiles
  const fetchProfiles = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${baseUrl}getAllProfile`, {
        headers: {
          Authorization: token,
        },
      });
      setProfiles(response.data.profiles);
    } catch (err) {
      setError("Error fetching profiles: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Run fetchProfiles when the component mounts or status changes
  useEffect(() => {
    fetchProfiles();
  }, [status]);

  // Filter profiles based on the selected status
  const filteredProfiles = status
    ? profiles.filter((profile) => profile.status === status)
    : profiles;

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12">
      <h2 className="text-2xl font-semibold text-center mb-6">Profile Status</h2>

      {/* Filter Status Buttons */}
      <div className="mb-4 flex justify-center space-x-4">
        <button
          onClick={() => setStatus("approved")}
          className={`px-4 py-2 rounded-md ${status === "approved" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"} hover:${status === "approved" ? "bg-green-600" : "bg-gray-300"}`}
        >
          Approved
        </button>
        <button
          onClick={() => setStatus("rejected")}
          className={`px-4 py-2 rounded-md ${status === "rejected" ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"} hover:${status === "rejected" ? "bg-red-600" : "bg-gray-300"}`}
        >
          Rejected
        </button>
        <button
          onClick={() => setStatus("pending")}
          className={`px-4 py-2 rounded-md ${status === "pending" ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-800"} hover:${status === "pending" ? "bg-yellow-600" : "bg-gray-300"}`}
        >
          Pending
        </button>
        <button
          onClick={() => setStatus("")}
          className={`px-4 py-2 rounded-md ${status === "" ? "bg-gray-500 text-white" : "bg-gray-200 text-gray-800"} hover:${status === "" ? "bg-gray-600" : "bg-gray-300"}`}
        >
          All
        </button>
      </div>

      {/* Display Error */}
      {/* {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded-md mb-4">
          {error}
        </div>
      )} */}

      {/* Loading Indicator */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <table className="min-w-full border-collapse border border-gray-300 bg-white rounded-lg shadow-md">
            {/* Table Header */}
            <thead className="bg-gray-200 text-gray-700 text-sm sm:text-base">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Marketer Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Mobile</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Company Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Company Address</th>
                <th className="border border-gray-300 px-4 py-2 text-left">GST Number</th>
                <th className="border border-gray-300 px-4 py-2 text-left">PAN Number</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Company Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Street</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Locality</th>
                <th className="border border-gray-300 px-4 py-2 text-left">City</th>
                <th className="border border-gray-300 px-4 py-2 text-left">State</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Pincode</th>
                <th className="border border-gray-300 px-4 py-2 text-left">First Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Last Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">GST Answer</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Note</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Discount</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {filteredProfiles.length === 0 ? (
                // Show this row if no profiles are found
                <tr>
                  <td colSpan="18" className="text-center text-gray-500 py-4">
                    No profiles found
                  </td>
                </tr>
              ) : (
                filteredProfiles.map((profile) => (
                  <tr
                    key={profile._id}
                    className="hover:bg-gray-100 transition-all duration-200"
                  >
                    <td className="border border-gray-300 px-4 py-2">{profile.marketerUser.name || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{profile.mobile || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{profile.marketerUser.email || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{profile.companyName || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{profile.companyAddress || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{profile.gstNumber || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{profile.panCardNumber || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{profile.companyType || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{profile.street || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{profile.locality || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{profile.city || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{profile.state || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{profile.pincode || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{profile.firstName || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{profile.lastName || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{profile.gstAnswer || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{profile.status || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{profile.note || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{profile.discount || "N/A"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProfileStatus;
