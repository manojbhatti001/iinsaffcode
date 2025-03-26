import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../utils/const";
import { Link } from "react-router-dom";
import AdvStatusViewDetails from "../AdvStatusViewDetails"; // Assuming a similar component for adv
import { MdClose } from 'react-icons/md';

const AcceptedAdv = () => {
  const [adv, setAdv] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [advId, setAdvId] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAcceptedAdv = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get(`${baseUrl}getUserAcceptedAdv`, {
          headers: { Authorization: token },
        });
        setAdv(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load adv.");
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedAdv();
  }, []);

  const handleEditClick = (id) => {
    setAdvId(id);
    setShowModal(true); // Open the modal
  };

  const handleClose = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <>
      {/* {loading ? (
        <p>Loading...</p>
      ) : adv.length === 0 ? (
        <p>No accepted adv found.</p>
      ) : (
        <div className="table-container rounded-2xl overflow-x-auto">
          <table className="scrollable-table min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Channel Type</th>
                <th className="py-3 px-6 text-left">Ad Type</th>
                <th className="py-3 px-6 text-left">Required Views</th>
                <th className="py-3 px-6 text-left">Remaining Views</th>
                <th className="py-3 px-6 text-left">Ad Length</th>
                <th className="py-3 px-6 text-left">Details</th>
                <th className="py-3 px-6 text-left">Edit</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {adv.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td data-label="CHANNEL TYPE">{item.advId.channelType}</td>
                  <td data-label="AD TYPE">{item.advId.adType}</td>
                  <td data-label="REQUIRED VIEWS">{item.advId.requiredViews}</td>
                  <td data-label="REMAINING VIEWS">{item.advId.remainingViews}</td>
                  <td data-label="AD LENGTH">{item.advId.adLength}</td>
                  <td data-label="DETAILS">
                    <Link
                      to={`getSpecificAdvDetailsReporter?advId=${item.advId._id}`}
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition duration-200"
                    >
                      View Details
                    </Link>
                  </td>
                  <td data-label="EDIT">
                    <button
                      onClick={() => handleEditClick(item.advId._id)}
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition duration-200"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showModal && (
            <div className="absolute top-0 left-0 w-full h-full lg:mt-0 mt-40 bg-gray-900 bg-opacity-50 flex justify-center items-center">
              <button
                onClick={handleClose}
                className="absolute right-1 top-20 mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200 flex items-center justify-center"
              >
                <MdClose className="mr-2" /> Close
              </button>
              <div className="bg-white p-5 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Adv Status Details</h2>
                <AdvStatusViewDetails advId={advId} />
                <button
                  onClick={handleClose}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )} */}
      <div className="container mx-auto py-6 sm:w-full w-screen overflow-scroll">
      <h1 className="text-xl font-bold mb-4">Accepeted Advertisements</h1>
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="sm:w-full w-screen overflow-scroll bg-white border border-gray-200 text-sm sm:text-base">
              <thead className="bg-gray-200 text-gray-600 uppercase text-xs sm:text-sm">
                <tr>
                  <th className="py-3 px-4 text-left">Channel Type</th>
                  <th className="py-3 px-4 text-left">Ad Type</th>
                  <th className="py-3 px-4 text-left">Reach People</th>
                  <th className="py-3 px-4 text-left">Remaining Views</th>
                  <th className="py-3 px-4 text-left">Ad Length</th>
                  <th className="py-3 px-4 text-left">Details</th>
                  <th className="py-3 px-4 text-left">Edit</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {adv.length > 0 ? (
                  adv.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-4 whitespace-nowrap">
                        {item.advId.channelType}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        {item.advId.adType}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        {item.advId.requiredViews}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        {item.advId.remainingViews}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        {item.advId.adLength}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <Link
                          to={`getSpecificAdvDetailsReporter?advId=${item.advId._id}`}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                        >
                          View Details
                        </Link>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <button
                          onClick={() => handleEditClick(item.advId._id)}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-6 text-center text-gray-500">
                      No accepted ads found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg relative w-11/12 max-w-md">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
              >
                Close
              </button>
              <h2 className="text-lg font-bold mb-4">Adv Status Details</h2>
              <AdvStatusViewDetails advId={advId} />
            </div>
          </div>
        )}
      </div>

    </>
  );
};

export default AcceptedAdv;
