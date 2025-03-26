import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../utils/const';
import UserCard from '../../UserCard';

const Advertisers = () => {
  const [advertisers, setAdvertisers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewDetailsId, setViewDetailsId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  const toggleViewDetails = (id) => {
    if (viewDetailsId === id) {
      setViewDetailsId(null);
    } else {
      setViewDetailsId(id);
    }
  };

  useEffect(() => {
    const fetchAdvertisers = async () => {
      try {
        const response = await axios.get(`${baseUrl}users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`
          },
          params: { role: 'Advertiser' },
        });
        setAdvertisers(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching advertisers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvertisers();
  }, []);

  const filteredAdvertisers = advertisers.filter((advertiser) =>
    (advertiser.name && advertiser.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (advertiser.email && advertiser.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (advertiser.mobile && String(advertiser.mobile).includes(searchTerm))
  );

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Advertisers</h1>

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
        <div className="text-center">No advertisers found.</div>
      ) : (
        <UserCard advertisers={filteredAdvertisers} />
      )}
    </div>
  );
};

export default Advertisers;
