import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkedAlt,
  FaCity,
  FaUserTag,
  FaLink,
  FaUserShield,
  FaWallet,
  FaWhatsapp,
  FaYoutube,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa"; // Import necessary icons
import { baseUrl } from "../../../../../utils/const";
import ProfilePhotoUpdater from "./ProfilePhotoUpdater";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${baseUrl}user`, {
          headers: {
            Authorization: localStorage.getItem("userToken"),
          },
        });
        setUserData(response.data);
      } catch (err) {
        setError("Failed to fetch user data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`${baseUrl}updateUser`, userData, {
        headers: {
          Authorization: localStorage.getItem("userToken"),
        },
      });
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update user data", err);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8 border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Reporter Inforamtion
      </h2>
      <ProfilePhotoUpdater userPhoto={userData.photo} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/** Profile Fields */}
        <ProfileField
          icon={<FaUser className="text-blue-500" />}
          label="Name"
          name="name"
          value={userData.name}
          isEditing={isEditing}
          onChange={handleInputChange}
        />
        <ProfileField
          icon={<FaUserShield className="text-blue-500" />}
          label="Role"
          name="role"
          value={userData.role}
          isEditing={false} // Role field is not editable
        />
        <ProfileField
          icon={<FaEnvelope className="text-blue-500" />}
          label="Email"
          name="email"
          value={userData.email}
          isEditing={false}
          // onChange={handleInputChange}
        />
        <ProfileField
          icon={<FaMapMarkedAlt className="text-blue-500" />}
          label="State"
          name="state"
          value={userData.state}
          isEditing={false}
          // onChange={handleInputChange}
        />
        <ProfileField
          icon={<FaCity className="text-blue-500" />}
          label="City"
          name="city"
          value={userData.city}
          isEditing={false}
          // onChange={handleInputChange}
        />
        <ProfileField
          icon={<FaUserTag className="text-blue-500" />}
          label="Address"
          name="areaDetails"
          value={userData.areaDetails}
          isEditing={isEditing}
          onChange={handleInputChange}
        />
        <ProfileField
          icon={<FaLink className="text-blue-500" />}
          label="Pincode"
          name="pincode"
          value={userData.pincode}
          isEditing={isEditing}
          onChange={handleInputChange}
        />
        <ProfileField
          icon={<FaPhone className="text-blue-500" />}
          label="Mobile"
          name="mobile"
          value={userData.mobile}
          isEditing={false}
          onChange={handleInputChange}
        />
        <ProfileField
          icon={<FaPhone className="text-blue-500" />}
          label="Secondary Phone"
          name="secondaryPhone"
          value={userData.secondaryPhone}
          isEditing={isEditing}
          onChange={handleInputChange}
        />
        <ProfileField
          icon={<FaWhatsapp className="text-blue-500" />}
          label="WhatsApp Number"
          name="whatsapp"
          value={userData.whatsapp}
          isEditing={isEditing}
          onChange={handleInputChange}
        />
        <ProfileField
          icon={<FaLink className="text-blue-500" />}
          label="Website"
          name="website"
          value={userData.website}
          isEditing={isEditing}
          onChange={handleInputChange}
        />
        <ProfileField
          icon={<FaUser className="text-blue-500" />}
          label="Channel Name"
          name="channelName"
          value={userData.channelName}
          isEditing={isEditing}
          onChange={handleInputChange}
        />
        <ProfileField
          icon={<FaYoutube className="text-blue-500" />}
          label="YouTube Channel URL"
          name="youtubeChannelUrl"
          value={userData.youtubeChannelUrl}
          isEditing={isEditing}
          onChange={handleInputChange}
        />
        <ProfileField
          icon={<FaFacebook className="text-blue-500" />}
          label="Facebook Page URL"
          name="facebookPageUrl"
          value={userData.facebookPageUrl}
          isEditing={isEditing}
          onChange={handleInputChange}
        />
        <ProfileField
          icon={<FaInstagram className="text-blue-500" />}
          label="Instagram Page URL"
          name="instagramPageUrl"
          value={userData.instagramPageUrl}
          isEditing={isEditing}
          onChange={handleInputChange}
        />
        <div className="flex flex-col md:flex-row items-start md:items-center p-2">
          <div className="md:w-1/3 flex items-center">
            <span className="mr-2">
            <FaWallet className="text-2xl text-blue-500" />
            </span>
            <p className="font-semibold">Wallet:</p>
          </div>
          <div className="md:w-2/3 w-full">
            <input
              type="text"
              name="wallet"
              value={
                userData.wallet !== undefined && userData.wallet !== null
                  ? userData.wallet
                  : "Not provided"
              }
              readOnly
              className="border border-gray-300 p-2 rounded w-full bg-gray-100 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Save Changes
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

const ProfileField = ({ icon, label, name, value, isEditing, onChange }) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center p-2">
      <div className="md:w-1/3 flex items-center">
        <span className="mr-2">{icon}</span>
        <p className="font-semibold">{label}:</p>
      </div>
      <div className="md:w-2/3 w-full">
        {isEditing ? (
          <input
            type={name === "mobile" ? "tel" : "text"}
            name={name}
            value={value || ""}
            onChange={onChange}
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring focus:ring-blue-300"
            placeholder={`Enter your ${label.toLowerCase()}`}
          />
        ) : (
          <input
            type="text"
            name={name}
            value={value || "Not provided"}
            readOnly
            className="border border-gray-300 p-2 rounded w-full bg-gray-100 focus:outline-none"
          />
        )}
      </div>
    </div>
  );
};


export default Profile;
