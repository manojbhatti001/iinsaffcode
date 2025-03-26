import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../utils/const";

const AdStatus = () => {
  const [ads, setAds] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [adDetails, setAdDetails] = useState(null); // To store ad details
  const [showPopup, setShowPopup] = useState(false); // To control the visibility of the popup

  useEffect(() => {
    // Fetch all ads from the API
    axios
      .get(`${baseUrl}getAllAds`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((response) => {
        setAds(response.data.ads);
        setFilteredAds(response.data.ads); // Initially show all ads
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching ads:", error);
        setLoading(false);
      });
  }, []);

  // Handle filter change
  const handleFilterChange = (status) => {
    setFilter(status);
    if (status === "all") {
      setFilteredAds(ads);
    } else {
      setFilteredAds(ads.filter((ad) => ad.status.toLowerCase() === status));
    }
  };

  // Fetch ad by ID and show in the popup
  const handleViewAd = (adId) => {
    axios
      .get(`${baseUrl}getAdsById?adId=${adId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((response) => {
        setAdDetails(response.data.ad);
        setShowPopup(true); // Show the popup with ad details
      })
      .catch((error) => {
        console.error("Error fetching ad details:", error);
      });
  };

  // Close the popup
  const closePopup = () => {
    setShowPopup(false);
    setAdDetails(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <div className="flex space-x-4">
          <button className="btn-filter" onClick={() => handleFilterChange("all")}>
            All Ads
          </button>
          <button className="btn-filter" onClick={() => handleFilterChange("pending")}>
            Pending Ads
          </button>
          <button className="btn-filter" onClick={() => handleFilterChange("completed")}>
            Completed Ads
          </button>
          <button className="btn-filter" onClick={() => handleFilterChange("rejected")}>
            Rejected Ads
          </button>
          <button className="btn-filter" onClick={() => handleFilterChange("accepted")}>
            Accepted Ads
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Ad ID</th>
                <th className="border p-2">Created By</th>
                <th className="border p-2">Channel Type</th>
                <th className="border p-2">Ad Type</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAds.length > 0 ? (
                filteredAds.map((ad) => (
                  <tr key={ad._id}>
                    <td className="border p-2">{ad._id}</td>
                    <td className="border p-2">{ad.freeAdBy._id}</td>
                    <td className="border p-2">{ad.channelType}</td>
                    <td className="border p-2">{ad.adType}</td>
                    <td className="border p-2">{ad.status}</td>
                    <td className="border p-2">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => handleViewAd(ad._id)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    No ads found for the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-3/4">
            <h2 className="text-xl font-bold mb-4">Ad Details</h2>
            <div className="mb-2">
              <strong>Ad ID:</strong> {adDetails._id}
            </div>
            <div className="mb-2">
              <strong>Created By:</strong> {adDetails.freeAdBy.name} ({adDetails.freeAdBy.email})
            </div>
            <div className="mb-2">
              <strong>Channel Type:</strong> {adDetails.channelType}
            </div>
            <div className="mb-2">
              <strong>Ad Type:</strong> {adDetails.adType}
            </div>
            <div className="mb-2">
              <strong>Ad Length:</strong> {adDetails.adLength} mins
            </div>
            <div className="mb-2">
              <strong>Status:</strong> {adDetails.status}
            </div>
            <div className="mb-2">
              <strong>Ad Description:</strong> {adDetails.adDescription}
            </div>
            <div className="mb-2">
              <strong>Admin Note:</strong> {adDetails.adminNote}
            </div>

            <div className="mt-4 flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={closePopup}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdStatus;
