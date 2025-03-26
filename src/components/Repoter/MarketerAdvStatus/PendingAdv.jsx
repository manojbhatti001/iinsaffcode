import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../utils/const";
import { Link } from "react-router-dom";

const PendingAdv = () => {
  const [pendingAdv, setPendingAdv] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPendingAdv = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get(
          `${baseUrl}getUserAcceptedPendingAdv`,
          {
            headers: { Authorization: token },
          }
        );
        setPendingAdv(response.data);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load pending advertisements."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPendingAdv();
  }, []);

  const handleEdit = (advId) => {
    console.log("Edit advertisement with ID:", advId);
    // Example: Navigate to an edit page or open a modal
    // navigate(`/edit-adv/${advId}`);
  };

  return (
    <>
      {/* {loading ? (
        <p>Loading...</p>
      )  : pendingAdv.length === 0 ? (
        <p>No pending advertisements found.</p>
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
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {pendingAdv.map((adv, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td data-label="CHANNEL TYPE">{adv.advId.channelType}</td>
                  <td data-label="AD TYPE">{adv.advId.adType}</td>
                  <td data-label="REQUIRED VIEWS">{adv.advId.requiredViews}</td>
                  <td data-label="REMAINING VIEWS">{adv.advId.remainingViews}</td>
                  <td data-label="AD LENGTH">{adv.advId.adLength}</td>
                  <td data-label="ACTIONS">
                    <Link
                      to={`/getSpecificAdvDetailsReporter?advId=${adv.advId._id}`}
                      onClick={() => handleEdit(adv.advId._id)}
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition duration-200"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )} */}
      <div className="container mx-auto p-4 w-screen sm:w-full overflow-scroll">
        <h1 className="text-xl font-bold mb-4">Pending Advertisements</h1>
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <div className="table-container rounded-lg shadow overflow-x-auto">
            <table className="w-full bg-white border border-gray-200 text-sm sm:text-base">
              <thead className="bg-gray-200 text-gray-600 uppercase text-xs sm:text-sm">
                <tr>
                  <th className="py-3 px-4 text-left">Channel Type</th>
                  <th className="py-3 px-4 text-left">Ad Type</th>
                  <th className="py-3 px-4 text-left">Reach People</th>
                  <th className="py-3 px-4 text-left">Remaining Views</th>
                  <th className="py-3 px-4 text-left">Ad Length</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {pendingAdv.length > 0 ? (
                  pendingAdv.map((adv, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-4" data-label="Channel Type">
                        {adv.advId.channelType}
                      </td>
                      <td className="py-3 px-4" data-label="Ad Type">
                        {adv.advId.adType}
                      </td>
                      <td className="py-3 px-4" data-label="Reach People">
                        {adv.advId.requiredViews}
                      </td>
                      <td className="py-3 px-4" data-label="Remaining Views">
                        {adv.advId.remainingViews}
                      </td>
                      <td className="py-3 px-4" data-label="Ad Length">
                        {adv.advId.adLength}
                      </td>
                      <td className="py-3 px-4" data-label="Actions">
                        <Link
                          to={`/getSpecificAdvDetailsReporter?advId=${adv.advId._id}`}
                          onClick={() => handleEdit(adv.advId._id)}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-6 text-center text-gray-500">
                      No pending advertisements found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default PendingAdv;
