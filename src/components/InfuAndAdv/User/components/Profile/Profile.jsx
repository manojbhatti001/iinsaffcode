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
} from "react-icons/fa"; // Import necessary icons
import { baseUrl } from "../../../../../utils/const";
import ProfilePhotoUpdater from "../../../../Repoter/User/components/Profile/ProfilePhotoUpdater";

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
        Advertiser Information
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
        <ProfileFieldRole
          icon={<FaUserShield className="text-blue-500" />}
          label="Role"
          name="role"
          value={userData.role}
          isEditing={isEditing} // Role field is not editable
        />
        <ProfileFieldRole
          icon={<FaEnvelope className="text-blue-500" />}
          label="Email"
          name="email"
          value={userData.email}
          isEditing={isEditing}
          // onChange={handleInputChange}
        />
        <ProfileFieldRole
          icon={<FaMapMarkedAlt className="text-blue-500" />}
          label="State"
          name="state"
          value={userData.state}
          isEditing={isEditing}
          // onChange={handleInputChange}
        />
        <ProfileFieldRole
          icon={<FaCity className="text-blue-500" />}
          label="City"
          name="city"
          value={userData.city}
          isEditing={isEditing}
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
        <ProfileFieldRole
          icon={<FaPhone className="text-blue-500" />}
          label="Mobile"
          name="mobile"
          value={userData.mobile}
          isEditing={isEditing}
          // onChange={handleInputChange}
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
          icon={<FaLink className="text-blue-500" />}
          label="WhatsApp"
          name="whatsapp"
          value={userData.whatsapp}
          isEditing={isEditing}
          onChange={handleInputChange}
        />
        <ProfileFieldForLinks
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
        <ProfileFieldForLinks
          icon={<FaLink className="text-blue-500" />}
          label="YouTube Channel URL"
          name="youtubeChannelUrl"
          value={userData.youtubeChannelUrl}
          isEditing={isEditing}
          onChange={handleInputChange}
        />
        <ProfileFieldForLinks
          icon={<FaLink className="text-blue-500" />}
          label="Facebook Page URL"
          name="facebookPageUrl"
          value={userData.facebookPageUrl}
          isEditing={isEditing}
          onChange={handleInputChange}
        />
        <ProfileFieldForLinks
          icon={<FaLink className="text-blue-500" />}
          label="Instagram Page URL"
          name="instagramPageUrl"
          value={userData.instagramPageUrl}
          isEditing={isEditing}
          onChange={handleInputChange}
        />
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

// const ProfileField = ({ icon, label, name, value, isEditing, onChange }) => {
//   return (
//     <div className="border rounded-xl">
//       <div className="">
//         <div className="">
//           <span className="mr-2">{icon}</span>
//           <p className="font-semibold text-nowrap">{label}:</p>
//         </div>
//         <div className="">
//           {isEditing ? (
//             <input
//               type="text"
//               name={name}
//               value={value || ""}
//               onChange={onChange}
//               className="border border-gray-300 rounded "
//               placeholder={`${label.toLowerCase()}`}
//             />
//           ) : (
//             <span className="text-gray-700 text-nowrap">{value || "Not provided"}</span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

const ProfileField = ({ icon, label, name, value, isEditing, onChange }) => {
  return (
    <div className="p-2 border rounded-xl flex items-center gap-4">
      {/* Icon and Label Section */}
      <div className="flex items-center gap-2 min-w-[100px]">
        <span>{icon}</span>
        <p className="font-semibold whitespace-nowrap">{label}:</p>
      </div>

      {/* Input or Value Section */}
      <div className="flex-1">
        {isEditing ? (
          <input
            type={name === "mobile" ? "tel" : "text"}
            name={name}
            value={value || ""}
            onChange={onChange}
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring focus:ring-blue-300"
            placeholder={`${label.toLowerCase()}`}
          />
        ) : (
          <span className="text-gray-700">{value || "Not provided"}</span>
        )}
      </div>
    </div>
  );
};


const ProfileFieldRole = ({
  icon,
  label,
  name,
  value,
  isEditing,
  onChange,
}) => {
  return (
    <div className="p-2 border rounded-xl flex items-center gap-4">
      {/* Icon and Label Section */}
      <div className="flex items-center gap-2 min-w-[100px]">
        <span>{icon}</span>
        <p className="font-semibold whitespace-nowrap">{label}:</p>
      </div>

      {/* Input or Value Section */}
      <div className="flex-1">
        {isEditing ? (
          <input
            type="text"
            name={name}
            value={value || ""}
            onChange={onChange}
            className="border border-gray-300 p-2 bg-gray-300 rounded w-full focus:outline-none focus:ring focus:ring-blue-300"
            placeholder={`${label.toLowerCase()}`}
            readOnly
          />
        ) : (
          <span className="text-gray-700">{value || "Not provided"}</span>
        )}
      </div>
    </div>
  );
};


// const ProfileFieldForLinks = ({ icon, label, name, value, isEditing, onChange }) => {
//   return (
//     <div className="flex flex-col md:flex-row items-start md:items-center p-2 border rounded-xl">
//       <div className="md:w-1/3 flex gap-1 items-center ">
//         <span className="mr-2">{icon}</span>
//         <p className="font-semibold text-nowrap">{label}:</p>

//         <div className="md:w-2/3 w-full ml-4">
//           {isEditing ? (
//             <input
//               type="text"
//               name={name}
//               value={value || ""}
//               onChange={onChange}
//               className="border border-gray-300 p-2 rounded w-40 focus:outline-none focus:ring focus:ring-blue-300"
//               placeholder={`Channel Url`}
//             />
//           ) : (
//             <span className="text-gray-700 text-nowrap">{value || "Not provided"}</span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

const ProfileFieldForLinks = ({
  icon,
  label,
  name,
  value,
  isEditing,
  onChange,
}) => {
  return (
    <div className="p-2 border rounded-xl flex items-center gap-4">
      {/* Icon and Label Section */}
      <div className="flex items-center gap-2 min-w-[100px]">
        <span>{icon}</span>
        <p className="font-semibold whitespace-nowrap">{label}:</p>
      </div>

      {/* Input or Value Section */}
      <div className="flex-1">
        {isEditing ? (
          <input
            type="text"
            name={name}
            value={value || ""}
            onChange={onChange}
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Channel Url"
          />
        ) : (
          <span className="text-gray-700">{value || "Not provided"}</span>
        )}
      </div>
    </div>
  );
};


export default Profile;
