import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaPhone, FaUserShield, FaShieldAlt } from "react-icons/fa"; // Import necessary icons
import { baseUrl } from "../../../utils/const";

const Profile = () => {
  const [adminData, setAdminData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(`${baseUrl}adminProfile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`, // Adjust the token retrieval as needed
          },
        });
        setAdminData(response.data);
      } catch (err) {
        setError("Failed to fetch admin data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8 border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Admin Profile
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProfileField
          icon={<FaUser className="text-blue-500" />}
          label="Name"
          value={adminData.name}
        />
        <ProfileField
          icon={<FaEnvelope className="text-blue-500" />}
          label="Email"
          value={adminData.email}
        />
        <ProfileField
          icon={<FaPhone className="text-blue-500" />}
          label="Mobile"
          value={adminData.mobile}
        />
        <ProfileField
          icon={<FaUserShield className="text-blue-500" />}
          label="Role"
          value={adminData.role}
        />
        <ProfilePermissionsField
          label="Permissions"
          permissions={adminData.permissions}
        />
        <ProfileField
          icon={<FaUser className="text-blue-500" />}
          label="Verified"
          value={adminData.isVerified ? "Yes" : "No"}
        />
        <ProfileField
          icon={<FaUser className="text-blue-500" />}
          label="Created At"
          value={new Date(adminData.createdAt).toLocaleString()}
        />
      </div>
    </div>
  );
};

const ProfileField = ({ icon, label, value }) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center p-2">
      <div className="md:w-1/3 flex items-center">
        <span className="mr-2">{icon}</span>
        <p className="font-semibold">{label}:</p>
      </div>
      <div className="md:w-2/3 w-full">
        <span className="text-gray-700">{value || "Not provided"}</span>
      </div>
    </div>
  );
};

const ProfilePermissionsField = ({ label, permissions }) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center p-2">
      <div className="md:w-1/3 flex items-center">
        <FaShieldAlt className="text-blue-500 mr-2" /> {/* Permissions icon */}
        <p className="font-semibold">{label}:</p>
      </div>
      <div className="md:w-2/3 w-full">
        <div className="border border-gray-300 p-2 rounded bg-gray-100 cursor-default">
          {permissions && permissions.length > 0
            ? permissions.join(", ") // Join permissions with a comma
            : "No permissions assigned"}
        </div>
      </div>
    </div>
  );
};

export default Profile;
