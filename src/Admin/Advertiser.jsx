import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure axios is installed
import { baseUrl } from '../utils/const';

const Advertiser = () => {
  const [advertisers, setAdvertisers] = useState([]); // State to hold advertisers
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchAdvertisers = async () => {
      try {
        const response = await axios.get(`${baseUrl}users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`
          },
          params: { role: 'Advertiser' }, // Send role as a query parameter
        });
        setAdvertisers(response.data); // Set the state with the fetched advertisers
      } catch (err) {
        setError(err.message); // Set error message in case of failure
        console.error("Error fetching advertisers:", err);
      } finally {
        setLoading(false); // Set loading to false after the fetch
      }
    };

    fetchAdvertisers(); // Call the function to fetch advertisers
  }, []); // Empty dependency array to run once on mount

  if (loading) return <p>Loading...</p>; // Loading state
  if (error) return <p>Error: {error}</p>; // Error handling

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Advertisers</h1>
      {advertisers.length === 0 ? (
        <p>No advertisers found.</p>
      ) : (
        <div className="space-y-4">
          {advertisers.map((advertiser) => (
            <div key={advertiser._id} className="p-4 border rounded shadow-sm">
              <p><strong>Name:</strong> {advertiser.name}</p>
              <p><strong>Mobile:</strong> {advertiser.mobile}</p>
              <p><strong>Email:</strong> {advertiser.email}</p>
              <p><strong>Role:</strong> {advertiser.role}</p>
              <p><strong>Channel Genre:</strong> {advertiser.channelGenre}</p>
              <p><strong>Wallet:</strong> {advertiser.wallet}</p>
              <p><strong>State:</strong> {advertiser.state}</p>
              <p><strong>City:</strong> {advertiser.city}</p>
              <p><strong>Area Details:</strong> {advertiser.areaDetails}</p>
              <p><strong>Pincode:</strong> {advertiser.pincode}</p>
              <p><strong>Secondary Phone:</strong> {advertiser.secondaryPhone}</p>
              <p><strong>Gender:</strong> {advertiser.gender}</p>
              <p><strong>WhatsApp:</strong> {advertiser.whatsapp}</p>
              <p><strong>Website:</strong> {advertiser.website}</p>
              <p><strong>Admin Verified:</strong> {advertiser.adminVerified ? "Yes" : "No"}</p>
              <p><strong>Channel Name:</strong> {advertiser.channelName}</p>
              <p><strong>YouTube Channel URL:</strong> {advertiser.youtubeChannelUrl}</p>
              <p><strong>Facebook Page URL:</strong> {advertiser.facebookPageUrl}</p>
              <p><strong>Instagram Page URL:</strong> {advertiser.instagramPageUrl}</p>
              <p><strong>OTP:</strong> {advertiser.otp}</p>
              <p><strong>OTP Expiry:</strong> {advertiser.otpExpiry}</p>
              <p><strong>Mobile OTP:</strong> {advertiser.mobileOtp}</p>
              <p><strong>Email OTP:</strong> {advertiser.emailOtp}</p>
              <p><strong>Verified:</strong> {advertiser.isVerified ? "Yes" : "No"}</p>
              <p><strong>Account Created:</strong> {new Date(advertiser.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Advertiser;
