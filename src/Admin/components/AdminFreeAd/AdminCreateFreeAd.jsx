import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../utils/const";

const AdminCreateFreeAd = () => {
  const [formData, setFormData] = useState({
    channelType: "",
    adType: "",
    adLength: "",
    adState: "",  // Now directly using adState and adCity
    adCity: "",   // Same for adCity
    adDescription: "",
    adNote: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const adminToken = localStorage.getItem("adminToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!adminToken) {
      setError("Admin token is missing.");
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      const adArea = [{ adState: formData.adState, adCity: formData.adCity }]; // Wrap state and city into adArea array
  
      const response = await axios.post(
        `${baseUrl}createFreeAd`,
        { 
          ...formData, 
          adArea // pass adArea with structured data
        },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            "Content-Type": "application/json"
          }
        }
      );
  
      console.log("Ad Created:", response.data);
      alert("Free Ad created successfully!");
  
    } catch (err) {
      console.error("Error creating free ad:", err);
      setError(err.response ? err.response.data.message : "An error occurred.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Create Free Ad</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Channel Type</label>
          <input
            type="text"
            value={formData.channelType}
            onChange={(e) => setFormData({ ...formData, channelType: e.target.value })}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter channel type"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Ad Type</label>
          <input
            type="text"
            value={formData.adType}
            onChange={(e) => setFormData({ ...formData, adType: e.target.value })}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter ad type"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Ad Description</label>
          <textarea
            value={formData.adDescription}
            onChange={(e) => setFormData({ ...formData, adDescription: e.target.value })}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter ad description"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Ad Note</label>
          <textarea
            value={formData.adNote}
            onChange={(e) => setFormData({ ...formData, adNote: e.target.value })}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter ad note"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Ad Area</label>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <input
                type="text"
                value={formData.adState}
                onChange={(e) => setFormData({ ...formData, adState: e.target.value })}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                placeholder="Enter state"
              />
            </div>
            <div className="w-1/2">
              <input
                type="text"
                value={formData.adCity}
                onChange={(e) => setFormData({ ...formData, adCity: e.target.value })}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                placeholder="Enter city"
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Ad Length</label>
          <input
            type="number"
            value={formData.adLength}
            onChange={(e) => setFormData({ ...formData, adLength: e.target.value })}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter ad length"
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 bg-blue-500 text-white rounded-md ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Creating..." : "Create Ad"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminCreateFreeAd;
