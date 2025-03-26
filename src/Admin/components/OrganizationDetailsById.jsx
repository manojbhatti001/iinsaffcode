import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../utils/const";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OrganizationDetailsById = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    photoUrl: "",
    documentUrl: "",
    state: "",
    city: "",
    address: "",
    status: "",
    isVerified: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const Id = queryParams.get("id");

  useEffect(() => {
    const fetchEntryDetails = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setError("Unauthorized access. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${baseUrl}getIinsafEntry?id=${Id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const entryData = response.data.data;
        setFormData({ ...entryData });
      } catch (err) {
        console.error("Error fetching entry details:", err);
        setError(
          err.response?.data?.message ||
            "An error occurred while fetching details."
        );
      } finally {
        setLoading(false);
      }
    };

    if (Id) {
      fetchEntryDetails();
    } else {
      setError("Entry ID is missing.");
      setLoading(false);
    }
  }, [Id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateStatus = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        alert("Unauthorized access. Please log in.");
        return;
      }

      const response = await axios.get(
        `${baseUrl}updateEntryStatus?id=${Id}&status=${formData.status}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message); // Show success message
      setFormData({ ...formData, status: response.data.data.status }); // Update status locally
    } catch (err) {
      console.error("Error updating status:", err);
      alert(
        err.response?.data?.message ||
          "An error occurred while updating the status."
      );
    }
  };

  const handleDownloadImage = async () => {
    try {
      const response = await axios.get(formData.photoUrl, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "organization_photo.jpg");

      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Error downloading image: " + error.message);
    }
  };

  const handleDownloadPdf = async () => {
    try {
      const response = await axios.get(formData.documentUrl, {
        responseType: "blob", // Ensure the response is a binary blob
      });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a temporary anchor element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "organization_document.pdf"); // Set a default file name

      // Trigger the download
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      // Revoke the object URL after download
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Error downloading PDF: " + error.message);
    }
  };

  if (loading) {
    return <p>Loading entry details...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-4 max-w-6xl mx-auto bg-white shadow-md rounded-lg">
      <button
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <h1 className="text-2xl font-bold mb-4">Update Entry Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleInputChange}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleInputChange}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Allow only digits
            }}
            name="phone"
            value={formData.phone || ""}
            onChange={handleInputChange}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <input
            type="text"
            name="role"
            value={formData.role || ""}
            onChange={handleInputChange}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Photo
          </label>
          <div className="flex items-center space-x-4 border">
            {formData.photoUrl && (
              <>
                <img
                  src={formData.photoUrl}
                  alt="Organization Photo"
                  className="w-auto h-32 object-cover rounded-md"
                />
                <button
                  onClick={handleDownloadImage}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Download
                </button>
              </>
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Document
          </label>
          <div className="flex items-center space-x-4 border">
            {formData.documentUrl && (
              <>
                <span className="text-blue-500 cursor-pointer">PDF</span>
                <button
                  onClick={handleDownloadPdf}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Download
                </button>
              </>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            State
          </label>
          <input
            type="text"
            name="state"
            value={formData.state || ""}
            onChange={handleInputChange}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            name="city"
            value={formData.city || ""}
            onChange={handleInputChange}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address || ""}
            onChange={handleInputChange}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            value={formData.status || ""}
            onChange={handleInputChange}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Verified
          </label>
          <select
            name="isVerified"
            value={formData.isVerified.toString()}
            onChange={(e) =>
              handleInputChange({
                target: {
                  name: "isVerified",
                  value: e.target.value === "true",
                },
              })
            }
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleUpdateStatus}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        disabled={updating}
      >
        {updating ? "Updating..." : "Update Status"}
      </button>
    </div>
  );
};

export default OrganizationDetailsById;
