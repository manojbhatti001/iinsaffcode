import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../../../utils/const";

const ProfilePhotoUpdater = ({ userPhoto }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(userPhoto); // URL of the profile photo
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      setUploading(true);
      setMessage("");

      const response = await axios.post(
        `${baseUrl}updateProfilePhoto`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("userToken"),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedPhotoUrl = response.data.user.photo;
      setProfilePhoto(updatedPhotoUrl);
      setMessage("Profile photo updated successfully!");
    } catch (error) {
      console.error("Error updating profile photo:", error);
      setMessage("Failed to update profile photo.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-3 max-w-xl mx-auto bg-white rounded-lg shadow-md mb-2">
      <h2 className="text-sm font-semibold mb-3 text-center text-gray-700">
        Update Profile Photo
      </h2>

      <div className="flex flex-col md:flex-row items-center md:items-start space-y-3 md:space-y-0 md:space-x-3">
        {/* Current Profile Photo */}
        <div className="flex-shrink-0">
          <img
            src={profilePhoto || "https://via.placeholder.com/80"}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover border border-gray-200"
          />
        </div>

        {/* File Upload Form */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="space-y-3">
            <label className="block text-xs">
              {/* <span className="text-xs font-medium text-gray-700">
                Choose a new profile photo:
              </span> */}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-2 block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </label>

            <button
              type="submit"
              className={`w-28 px-3 py-1 text-white text-sm rounded-md transition ${
                uploading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Update Photo"}
            </button>
          </form>

          {/* Status Message */}
          {message && (
            <p
              className={`mt-2 text-xs text-center ${
                message.includes("successfully")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePhotoUpdater;
