import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../utils/const";

const GetUserDarbarById = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const darbarId = queryParams.get("Id");

  const [darbarData, setDarbarData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDarbarById = async () => {
      try {
        const response = await axios.get(`${baseUrl}getUserDarbarsStatusById`, {
          params: { id: darbarId },
          headers: {
            Authorization: localStorage.getItem("darbarToken"),
          },
        });
        setDarbarData(response.data);
      } catch (err) {
        setError("An error occurred while fetching the Darbar details.");
      }
    };
    if (darbarId) fetchDarbarById();
  }, [darbarId]);

  return (
    <div className="p-4 md:p-8 lg:p-12 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Darbar Details</h1>
      {error && <p className="text-red-500">Access Denied or The Darbar No Longer Exist .</p>}
      {/* {darbarData ? (
        <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">

        <h2 className="text-xl font-semibold mb-2">Darbar Name: {darbarData.darbar.darbarBy.name}</h2>
            <p className="text-gray-700 mb-2">Email: {darbarData.darbar.darbarBy.email}</p>
            <p className="text-gray-700 mb-2">Date: {new Date(darbarData.darbar.darbarDate).toLocaleDateString()}</p>
            <p className="text-gray-700 mb-2">Location: {darbarData.darbar.village}, {darbarData.darbar.area}, {darbarData.darbar.darbarCity}, {darbarData.darbar.darbarState}</p>
            <p className="text-gray-700 mb-2">Purpose: {darbarData.darbar.purpose}</p>
            <p className="text-gray-700 mb-2">Reason: {darbarData.darbar.darbarReason}</p>
            <p className="text-gray-700 mb-2">Pincode: {darbarData.darbar.pincode}</p>
            <p className="text-gray-700 mb-2">Type: {darbarData.darbar.darbarType}</p>
            <p className="text-gray-700 mb-2">Status: {darbarData.darbar.darbarStatus}</p>
            <p className="text-gray-700 mb-2">Time Limit: {darbarData.darbar.darbarTimeLimit} hours</p>
            <p className="text-gray-700 mb-2">People Available: {darbarData.darbar.peopleAvailable}</p>
            <p className="text-gray-700 mb-4">People Required: {darbarData.darbar.peopleRequired}</p> 



            <h3 className="text-lg font-semibold mt-4">Darbar Status</h3>
            {darbarData.darbarStatus.length > 0 ? (
                <ul className="space-y-4 mt-2">
                    {darbarData.darbarStatus.map((status) => (
                        <li key={status._id} className="border-b py-4">
                            <p className="text-gray-800">Status by Admin: {status.statusByAdmin}</p>
                            <p className="text-gray-800">Name: {status.acceptedByUser.name}</p>
                            <p className="text-gray-800">Email: {status.acceptedByUser.email}</p>
                            <p className="text-gray-800">Accepted Date: {new Date(status.acceptedDate).toLocaleDateString()}</p>
                            <p className="text-gray-800">Video Date: {new Date(status.videoDate).toLocaleDateString()}</p>
                            <p className="text-gray-800">Previous Views: {status.previousViews}</p>
                            <p className="text-gray-800">Note: {status.note}</p>
                            <a 
                                href={status.videoUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                Watch Video
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No accepted statuses found for this Darbar.</p>
            )}
        </div>
    ) : (
        <p>Loading...</p>
    )} */}

      {darbarData ? (
        <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 overflow-scroll">
          {/* Darbar Details */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <label className="w-32 font-semibold">Darbar Name:</label>
              <input
                type="text"
                value={darbarData.darbar.darbarBy.name}
                readOnly
                className="flex-1 p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="w-32 font-semibold">Email:</label>
              <input
                type="email"
                value={darbarData.darbar.darbarBy.email}
                readOnly
                className="flex-1 p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="w-32 font-semibold">Date:</label>
              <input
                type="text"
                value={new Date(darbarData.darbar.darbarDate).toLocaleDateString()}
                readOnly
                className="flex-1 p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="w-32 font-semibold">Location:</label>
              <input
                type="text"
                value={`${darbarData.darbar.village}, ${darbarData.darbar.area}, ${darbarData.darbar.darbarCity}, ${darbarData.darbar.darbarState}`}
                readOnly
                className="flex-1 p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="w-32 font-semibold">Purpose:</label>
              <input
                type="text"
                value={darbarData.darbar.purpose}
                readOnly
                className="flex-1 p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="w-32 font-semibold">Reason:</label>
              <input
                type="text"
                value={darbarData.darbar.darbarReason}
                readOnly
                className="flex-1 p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="w-32 font-semibold">Pincode:</label>
              <input
                type="number"
                value={darbarData.darbar.pincode}
                readOnly
                className="flex-1 p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="w-32 font-semibold">Type:</label>
              <input
                type="text"
                value={darbarData.darbar.darbarType}
                readOnly
                className="flex-1 p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="w-32 font-semibold">Status:</label>
              <input
                type="text"
                value={darbarData.darbar.darbarStatus}
                readOnly
                className="flex-1 p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="w-32 font-semibold">Time Limit:</label>
              <input
                type="text"
                value={`${darbarData.darbar.darbarTimeLimit} hours`}
                readOnly
                className="flex-1 p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="w-32 font-semibold">People Available:</label>
              <input
                type="text"
                value={darbarData.darbar.peopleAvailable}
                readOnly
                className="flex-1 p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="w-32 font-semibold">People Required:</label>
              <input
                type="text"
                value={darbarData.darbar.peopleRequired}
                readOnly
                className="flex-1 p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
          </div>

          {/* Darbar Status Details */}
          <h3 className="text-lg font-semibold mt-4">Darbar Status</h3>
          {darbarData.darbarStatus.length > 0 ? (
            <table className="w-full overflow-scroll table-auto border-collapse mt-2">
              <thead>
                <tr>
                  <th className="px-4 py-2 border border-gray-300">Status by Admin</th>
                  <th className="px-4 py-2 border border-gray-300">Name</th>
                  <th className="px-4 py-2 border border-gray-300">Email</th>
                  <th className="px-4 py-2 border border-gray-300">Accepted Date</th>
                  <th className="px-4 py-2 border border-gray-300">Video Date</th>
                  <th className="px-4 py-2 border border-gray-300">Previous Views</th>
                  <th className="px-4 py-2 border border-gray-300">Note</th>
                  <th className="px-4 py-2 border border-gray-300">Video Link</th>
                </tr>
              </thead>
              <tbody>
                {darbarData.darbarStatus.map((status) => (
                  <tr key={status._id}>
                    <td className="px-4 py-2 border border-gray-300">
                      <input
                        type="text"
                        value={status.statusByAdmin}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                      />
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      <input
                        type="text"
                        value={status.acceptedByUser.name}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                      />
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      <input
                        type="email"
                        value={status.acceptedByUser.email}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                      />
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      <input
                        type="text"
                        value={new Date(status.acceptedDate).toLocaleDateString()}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                      />
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      <input
                        type="text"
                        value={new Date(status.videoDate).toLocaleDateString()}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                      />
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      <input
                        type="number"
                        value={status.previousViews}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                      />
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      <input
                        type="text"
                        value={status.note}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                      />
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      <a
                        href={status.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Watch Video
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="mt-4 w-full overflow-scroll relative">
              <table className="min-w-full table-auto border-collapse mt-2">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border border-gray-300">Status by Admin</th>
                    <th className="px-4 py-2 border border-gray-300">Name</th>
                    <th className="px-4 py-2 border border-gray-300">Email</th>
                    <th className="px-4 py-2 border border-gray-300">Accepted Date</th>
                    <th className="px-4 py-2 border border-gray-300">Video Date</th>
                    <th className="px-4 py-2 border border-gray-300">Previous Views</th>
                    <th className="px-4 py-2 border border-gray-300">Note</th>
                    <th className="px-4 py-2 border border-gray-300">Video Link</th>
                  </tr>
                </thead>
              </table>
              <p className="mt-4 text-center text-gray-700">No one has accepted the darbar yet.</p>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}

    </div>
  );
};

export default GetUserDarbarById;
