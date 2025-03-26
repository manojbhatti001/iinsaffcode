import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../utils/const";
import { Link } from "react-router-dom";

const GetUserAcceptedConference = () => {
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserAcceptedConferences = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}getUserAcceptedConference`,
          {
            headers: {
              Authorization: localStorage.getItem("userToken"),
            },
          }
        );
        //   console.log("Fetched Data:", response);
        setConferences(response.data); // Set fetched conference data
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserAcceptedConferences();
  }, []);

  const handleEditClick = (id) => {
    //   console.log(id);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {/* <div className="p-4 md:p-8 bg-gray-100 min-h-screen w-screen sm:w-full overflow-scroll">
      <h1 className="text-3xl font-bold text-center mb-6">
        Accepted Conferences
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Conference ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Accepted By User</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Accepted Date</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Admin Status</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Video Date</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Note</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {conferences.length > 0 ? (
              conferences.map((conference) => (
                <tr key={conference._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-800">{conference._id}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{conference.acceptedByUser}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {new Date(conference.acceptedDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">{conference.status}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{conference.statusByAdmin}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {new Date(conference.videoDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">{conference.note}</td>
                  <td className="px-4 py-2 text-sm text-blue-500">
                    <a
                      href={conference.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:underline"
                    >
                      Watch Video
                    </a>
                    <Link
                      to={`/getSpecificConferenceDetailsReporterById?conferenceId=${conference.conferenceId._id}`}
                      className="mt-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition block text-center"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-4 py-2 text-center text-sm text-gray-600">
                  No accepted conferences found for this user.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div> */}
      <div className="p-4 md:p-8 bg-gray-100 min-h-screen w-screen sm:w-full overflow-scroll">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Accepted Conferences
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead className="bg-gray-100 border-b border-gray-300">
              <tr>
                <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">
                  Conference ID
                </th>
                <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">
                  Accepted By User
                </th>
                <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">
                  Accepted Date
                </th>
                <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">
                  Admin Status
                </th>
                <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">
                  Video Date
                </th>
                <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">
                  Note
                </th>
                <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {conferences.length > 0 ? (
                conferences.map((conference) => (
                  <tr key={conference._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-800 whitespace-nowrap">
                      {conference._id}
                    </td>
                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-800 whitespace-nowrap">
                      {conference.acceptedByUser}
                    </td>
                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-800 whitespace-nowrap">
                      {new Date(conference.acceptedDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-800 whitespace-nowrap">
                      {conference.status}
                    </td>
                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-800 whitespace-nowrap">
                      {conference.statusByAdmin}
                    </td>
                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-800 whitespace-nowrap">
                      {new Date(conference.videoDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-800 whitespace-nowrap">
                      {conference.note}
                    </td>
                    <td className="px-4 py-2 text-xs sm:text-sm text-blue-500 whitespace-nowrap">
                      <a
                        href={conference.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:underline"
                      >
                        Watch Video
                      </a>
                      <Link
                        to={`/getSpecificConferenceDetailsReporterById?conferenceId=${conference.conferenceId._id}`}
                        className="mt-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition block text-center"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-4 py-2 text-center text-xs sm:text-sm text-gray-600"
                  >
                    No accepted conferences found for this user.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default GetUserAcceptedConference;
