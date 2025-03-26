import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../../utils/const';
import UserCard from '../../UserCard';

const Influencers = () => {
  const [advertisers, setAdvertisers] = useState([]); // State to hold influencers
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling
  const [viewDetailsId, setViewDetailsId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input

  useEffect(() => {
    const fetchAdvertisers = async () => {
      try {
        const response = await axios.get(`${baseUrl}users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`
          },
          params: { role: 'Influencer' }, // Send role as a query parameter
        });
        setAdvertisers(response.data); // Set the state with the fetched influencers
      } catch (err) {
        setError(err.message); // Set error message in case of failure
        console.error("Error fetching influencers:", err);
      } finally {
        setLoading(false); // Set loading to false after the fetch
      }
    };

    fetchAdvertisers(); // Call the function to fetch influencers
  }, []); // Empty dependency array to run once on mount

  const toggleViewDetails = (id) => {
    // Toggle the visibility of details for a specific influencer
    setViewDetailsId(viewDetailsId === id ? null : id);
  };

  const filteredAdvertisers = advertisers.filter((advertiser) =>
    (advertiser.name && advertiser.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (advertiser.email && advertiser.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (advertiser.mobile && String(advertiser.mobile).includes(searchTerm))
  );

  if (loading) return <p>Loading...</p>; // Loading state
  if (error) return <p>Error: {error}</p>; // Error handling

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Influencers</h1>
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by name, email, or mobile"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[50%] p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      {filteredAdvertisers.length === 0 ? (
        <p>No influencers found.</p>
      ) : (
        <UserCard advertisers={filteredAdvertisers} />
      )}
    </div>
  );
};

export default Influencers;
