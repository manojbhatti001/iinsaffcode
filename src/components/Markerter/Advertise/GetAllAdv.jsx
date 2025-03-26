import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../utils/const';
import { toast } from "react-toastify";
import { useLocation } from 'react-router-dom';

const GetAllAdv = () => {
  const [allAds, setAllAds] = useState([]); // Store all leads fetched from the API
  const [ads, setAds] = useState([]); // Filtered advertisements to display
  const [filter, setFilter] = useState('all'); // Current filter
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const location = useLocation();

  // Fetch all advertisements once
  const fetchAllAds = async () => {
    setLoading(true);
    const token = localStorage.getItem('marketerToken');
    try {
      const response = await axios.get(`${baseUrl}getAdv-user`, {
        headers: {
          Authorization: token,
        },
      });
      setAllAds(response.data); // Store all advertisements
      setAds(response.data); // Initially show all advertisements
    } catch (error) {
      console.error('Error fetching advertisements:', error);
    } finally {
      setLoading(false);
    }
  };

  // Apply filter on the fetched advertisements
  const applyFilter = (status) => {
    if (status === 'all') {
      setAds(allAds); // Show all ads
    } else {
      setAds(allAds.filter((ad) => ad.status === status)); // Filter ads by status
    }
  };

  // Set filter based on the `stat` query parameter on initial render
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const stat = queryParams.get('stat');
    if (stat && ['all', 'pending', 'rejected', 'completed', 'approved', 'cancelled'].includes(stat)) {
      setFilter(stat); // Update the filter state
    } else {
      setFilter('all'); // Default to 'all' if no valid stat parameter is found
    }
  }, [location.search]);

  // Fetch all advertisements on component mount
  useEffect(() => {
    fetchAllAds();
  }, []);

  // Reapply filter whenever the `filter` state changes
  useEffect(() => {
    applyFilter(filter);
  }, [filter, allAds]);

  const handleViewClick = (ad) => {
    setSelectedAd(ad);
    setIsModalOpen(true);
  };

  const handleEditClick = (ad) => {
    // Implement edit functionality here
    console.log('Edit button clicked:', ad);
  };

  const handleDownload = (url, type) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `advertisement_${type}.${type === 'image' ? 'jpg' : 'mp4'}`;
    link.click();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAd(null);
  };

  return (
    <div className="p-4 w-[174vw] md:w-full sm:max-w-7xl mx-auto">
      <div className="flex justify-center space-x-4 mb-6">
        {['all', 'pending', 'rejected', 'completed', 'approved', 'cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded ${filter === status ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
          >
            {`${status.charAt(0).toUpperCase()}${status.slice(1)} Adv`}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center">Loading advertisements...</p>
      ) : ads.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Company Name</th>
                <th className="py-3 px-6 text-left">Channel Type</th>
                <th className="py-3 px-6 text-left">Ad Type</th>
                <th className="py-3 px-6 text-left">Required Views</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {ads.map((ad) => (
                <tr key={ad._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6">{ad._id}</td>
                  <td className="py-3 px-6">{ad.companyName}</td>
                  <td className="py-3 px-6">{ad.channelType}</td>
                  <td className="py-3 px-6">{ad.adType}</td>
                  <td className="py-3 px-6">{ad.requiredViews}</td>
                  <td className="py-3 px-6">{ad.status}</td>
                  <td className="py-3 px-6 text-center">
                    <button
                      onClick={() => handleViewClick(ad)}
                      className="bg-blue-500 text-white px-4 py-1.5 rounded hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">No advertisements found.</p>
      )}

      {isModalOpen && selectedAd && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-11/12 md:w-3/4 lg:w-2/3 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Advertisement Details</h2>
                <button 
                  onClick={closeModal} 
                  className="text-white hover:bg-blue-700 rounded-full p-2 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className={`p-4 rounded-lg ${selectedAd.status === 'approved' ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full ${selectedAd.status === 'approved' ? 'bg-green-100' : 'bg-yellow-100'} mr-3`}>
                      <svg className={`w-6 h-6 ${selectedAd.status === 'approved' ? 'text-green-500' : 'text-yellow-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Status</p>
                      <p className={`text-lg font-semibold ${selectedAd.status === 'approved' ? 'text-green-600' : 'text-yellow-600'}`}>
                        {selectedAd.status.charAt(0).toUpperCase() + selectedAd.status.slice(1)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-blue-100 mr-3">
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Payment Status</p>
                      <p className="text-lg font-semibold text-blue-600">
                        {selectedAd.paymentStatus.charAt(0).toUpperCase() + selectedAd.paymentStatus.slice(1)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Company Name</p>
                      <p className="text-base text-gray-900">{selectedAd.companyName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Channel Type</p>
                      <p className="text-base text-gray-900">{selectedAd.channelType}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Ad Type</p>
                      <p className="text-base text-gray-900">{selectedAd.adType}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Campaign Details</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Reach People</p>
                      <p className="text-base text-gray-900">{selectedAd.requiredViews.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Ad Length</p>
                      <p className="text-base text-gray-900">{selectedAd.adLength} hours</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Ad Cost</p>
                      <p className="text-base text-gray-900">₹{selectedAd.adCost.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location and Description */}
              <div className="grid grid-cols-1 gap-6 mb-6">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Location & Description</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Ad Area</p>
                      <p className="text-base text-gray-900">{selectedAd.adArea.map(area => `${area.adCity}, ${area.adState}`).join('; ')}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Description</p>
                      <p className="text-base text-gray-900">{selectedAd.adDescription || "No description available"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Notes</p>
                      <p className="text-base text-gray-900">{selectedAd.adNote || "No notes available"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Media Preview */}
              {(selectedAd.adImageURL || selectedAd.adVideoURL) && (
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Media Preview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedAd.adImageURL && (
                      <div className="relative">
                        <p className="text-sm font-medium text-gray-500 mb-2">Advertisement Image</p>
                        <div className="relative rounded-lg overflow-hidden bg-white shadow-sm border border-gray-200">
                          <img
                            src={selectedAd.adImageURL}
                            alt="Advertisement"
                            className="w-full h-48 object-contain"
                          />
                          <button 
                            onClick={() => handleDownload(selectedAd.adImageURL, 'image')}
                            className="absolute bottom-2 right-2 bg-white px-3 py-2 rounded-full shadow-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors duration-200 flex items-center"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Download
                          </button>
                        </div>
                      </div>
                    )}

                    {selectedAd.adVideoURL && (
                      <div className="relative">
                        <p className="text-sm font-medium text-gray-500 mb-2">Advertisement Video</p>
                        <div className="relative rounded-lg overflow-hidden bg-white shadow-sm border border-gray-200">
                          <video 
                            src={selectedAd.adVideoURL}
                            controls
                            className="w-full h-48 object-contain"
                          />
                          <button 
                            onClick={() => handleDownload(selectedAd.adVideoURL, 'video')}
                            className="absolute bottom-2 right-2 bg-white px-3 py-2 rounded-full shadow-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors duration-200 flex items-center"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Download
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="flex justify-end mt-6">
                <button
                  onClick={closeModal}
                  className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetAllAdv;
