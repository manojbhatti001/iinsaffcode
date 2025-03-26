import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../../../utils/const";

const GetAllAdvs = () => {
  const [advs, setAdvs] = useState([]);
  const [status, setStatus] = useState("loading");
  const [showTodaysAdvs, setShowTodaysAdvs] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAdvs = async () => {
      const token = localStorage.getItem("adminToken");
      try {
        const response = await axios.get(`${baseUrl}getAllUserAdv`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdvs(response.data);
        setStatus("succeeded");
      } catch (error) {
        console.error("Error fetching advertisements:", error);
        setStatus("failed");
      }
    };
    fetchAdvs();
  }, []);

  const handleViewClick = (advId) => {
 //   console.log("View button clicked for advertisement:", advId);
  };

  const paymentStatusStyle = (paymentStatus) => ({
    backgroundColor: paymentStatus === "failed" ? "#ffcccc" : "transparent",
    transition: "background-color 0.3s",
  });

  const generalStatusStyle = (generalStatus) => {
    switch (generalStatus) {
      case "cancelled":
        return {
          backgroundColor: "#ffdead",
          transition: "background-color 0.3s",
        };
      case "completed":
        return {
          backgroundColor: "#98fb98",
          transition: "background-color 0.3s",
        };
      case "rejected":
        return {
          backgroundColor: "#ff6347",
          transition: "background-color 0.3s",
        };
      case "pending":
        return {
          backgroundColor: "#f0e68c",
          transition: "background-color 0.3s",
        };
      case "approved":
        return {
          backgroundColor: "#add8e6",
          transition: "background-color 0.3s",
        };
      default:
        return {
          backgroundColor: "transparent",
          transition: "background-color 0.3s",
        };
    }
  };

  const filteredAdvs = advs.filter((adv) => {
    const isToday =
      new Date(adv.createdDate).toDateString() === new Date().toDateString();
    const statusMatches = statusFilter ? adv.status === statusFilter : true;
    const searchMatches = adv._id
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return (!showTodaysAdvs || isToday) && statusMatches && searchMatches;
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Advertisements</h1>
      {/* Filter Section */}
      <div className="mb-4 flex items-center space-x-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Adv ID"
          className="border rounded-md focus:outline-none focus:ring focus:ring-blue-300 p-2"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showTodaysAdvs}
            onChange={() => setShowTodaysAdvs(!showTodaysAdvs)}
          />
          <span>Today's Advertisements</span>
        </label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="">All Statuses</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
          <option value="rejected">Rejected</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
        </select>
      </div>

      {status === "succeeded" && filteredAdvs.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-3 px-6 text-gray-600 font-bold">Adv Id</th>
                <th className="py-3 px-6 text-gray-600 font-bold">Ad Area</th>
                <th className="py-3 px-6 text-gray-600 font-bold">Ad Cost</th>
                <th className="py-3 px-6 text-gray-600 font-bold">
                  Ad Description
                </th>
                <th className="py-3 px-6 text-gray-600 font-bold">Ad Type</th>
                <th className="py-3 px-6 text-gray-600 font-bold">
                  Channel Type
                </th>
                <th className="py-3 px-6 text-gray-600 font-bold">
                  Payment Status
                </th>
                <th className="py-3 px-6 text-gray-600 font-bold">Status</th>
                <th className="py-3 px-6 text-gray-600 font-bold">
                  Reach People
                </th>
                <th className="py-3 px-6 text-gray-600 font-bold">
                  Admin Note
                </th>
                <th className="py-3 px-6 text-gray-600 font-bold">
                  Created Date
                </th>
                <th className="py-3 px-6 text-gray-600 font-bold text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAdvs.map((adv) => (
                <tr key={adv._id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-6">{adv._id}</td>
                  <td className="py-3 px-6">
                    {adv.adArea.length > 0
                      ? `${adv.adArea[0].adCity}, ${adv.adArea[0].adState}`
                      : "N/A"}
                  </td>
                  <td className="py-3 px-6">{adv.adCost}</td>
                  <td className="py-3 px-6">{adv.adDescription}</td>
                  <td className="py-3 px-6">{adv.adType}</td>
                  <td className="py-3 px-6">{adv.channelType}</td>
                  <td
                    className="py-3 px-6"
                    style={paymentStatusStyle(adv.paymentStatus)}
                  >
                    {adv.paymentStatus}
                  </td>
                  <td
                    className="py-3 px-6"
                    style={generalStatusStyle(adv.status)}
                  >
                    {adv.status}
                  </td>
                  <td className="py-3 px-6">{adv.requiredViews}</td>
                  <td className="py-3 px-6">{adv.adminNote}</td>
                  <td className="py-3 px-6">
                    {new Date(adv.createdDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <Link
                      to={`/admin/updateAdv?advId=${adv._id}`}
                      onClick={() => handleViewClick(adv._id)}
                      className="bg-blue-500 mr-2 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                    >
                      View
                    </Link>
                    <Link
                      to={`/admin/getAdvStatus?advId=${adv._id}`}
                      onClick={() => handleViewClick(adv._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                    >
                      Status
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No advertisements found.</p>
      )}
    </div>
  );
};

export default GetAllAdvs;
