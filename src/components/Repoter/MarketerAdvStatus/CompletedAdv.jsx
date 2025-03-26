import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../utils/const";
import { Link } from "react-router-dom";

const CompletedAdv = () => {
  const [completedAdvs, setCompletedAdvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompletedAdvs = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get(
          `${baseUrl}getUserAcceptedCompletedAdv`,
          {
            headers: { Authorization: token },
          }
        );
        setCompletedAdvs(response.data);
      } catch (error) {
        setError(
          error.response?.data?.message || "Failed to load completed ads"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedAdvs();
  }, []);

  const handleEdit = (advId) => {
    //   console.log("Edit ad with ID:", advId);
    // Example: Navigate to an edit page or open a modal
    // navigate(`/edit-adv/${advId}`);
  };

  return (
    <div className="container mx-auto p-4 sm:w-full w-screen overflow-scroll">
      {/* {loading ? (
        <p>Loading...</p>
      ) : completedAdvs.length === 0 ? (
        <p>No completed ads found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
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
              {completedAdvs.map((adv, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-3 px-6 text-left">
                    {adv.advId.channelType}
                  </td>
                  <td className="py-3 px-6 text-left">{adv.advId.adType}</td>
                  <td className="py-3 px-6 text-left">
                    {adv.advId.requiredViews}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {adv.advId.remainingViews}
                  </td>
                  <td className="py-3 px-6 text-left">{adv.advId.adLength}</td>
                  <td className="py-3 px-6 text-left">
                    <Link
                      to={`getSpecificAdvDetailsReporter?advId=${adv.advId._id}`}
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
      <h1 className="text-xl font-bold mb-4">Completed Advertisements</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Channel Type</th>
                <th className="py-3 px-6 text-left">Ad Type</th>
                <th className="py-3 px-6 text-left">Reach People</th>
                <th className="py-3 px-6 text-left">Remaining Views</th>
                <th className="py-3 px-6 text-left">Ad Length</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {completedAdvs.length > 0 ? (
                completedAdvs.map((adv, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-3 px-6 text-left">
                      {adv.advId.channelType}
                    </td>
                    <td className="py-3 px-6 text-left">{adv.advId.adType}</td>
                    <td className="py-3 px-6 text-left">
                      {adv.advId.requiredViews}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {adv.advId.remainingViews}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {adv.advId.adLength}
                    </td>
                    <td className="py-3 px-6 text-left">
                      <Link
                        to={`getSpecificAdvDetailsReporter?advId=${adv.advId._id}`}
                        onClick={() => handleEdit(adv.advId._id)}
                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition duration-200"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-6 text-center text-gray-500">
                    No completed ads found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CompletedAdv;
