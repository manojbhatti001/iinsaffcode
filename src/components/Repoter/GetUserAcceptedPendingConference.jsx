import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../utils/const";
import { Link } from "react-router-dom";

const GetUserAcceptedPendingConference = () => {
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserAcceptedConferences = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}getUserAcceptedPendingConference`,
          {
            headers: {
              Authorization: localStorage.getItem("userToken"),
            },
          }
        );
        //   console.log(response);
        setConferences(response.data); // Set fetched conference data
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserAcceptedConferences();
  }, []);
  const handleEditClick = (conferenceId) => {
    //   console.log(conferenceId);
  };

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen  w-screen sm:w-full overflow-scroll">
      <h1 className="text-3xl font-bold text-center mb-6">
        Pending Conferences
      </h1>
      {/* {conferences.length === 0 ? (
        <p className="text-center text-lg text-gray-600">
          No accepted conferences found for this user.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {conferences.map((conference) => (
            <div
              key={conference._id}
              className="p-6 bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                Conference ID:{" "}
                <span className="text-gray-600">{conference._id}</span>
              </h2>
              <div className="text-gray-700 space-y-1">
                <p>
                  <span className="font-medium">Accepted By User:</span>{" "}
                  {conference.acceptedByUser}
                </p>
                <p>
                  <span className="font-medium">Accepted Date:</span>{" "}
                  {new Date(conference.acceptedDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  {conference.status}
                </p>
                <p>
                  <span className="font-medium">Admin Status:</span>{" "}
                  {conference.statusByAdmin}
                </p>
                <p>
                  <span className="font-medium">Video Date:</span>{" "}
                  {new Date(conference.videoDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Note:</span> {conference.note}
                </p>
              </div>
              <a
                href={conference.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4 text-blue-500 hover:text-blue-600 underline text-sm font-medium"
              >
                Watch Video
              </a>
              <Link
                to={`/getSpecificConferenceDetailsReporterById?conferenceId=${conference.conferenceId._id}`}
                // onClick={() => handleEditClick(conference.conference._id)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Edit
              </Link>
            </div>
          ))}
        </div>
      )} */}
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
                  <td className="px-4 py-2 text-sm text-gray-800">{conference.acceptedByUser || "N/A"}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {new Date(conference.acceptedDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">{conference.status || "N/A"}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{conference.statusByAdmin || "N/A"}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {new Date(conference.videoDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">{conference.note || "No additional notes"}</td>
                  <td className="px-4 py-2 text-sm">
                    <a
                      href={conference.videoUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 underline"
                    >
                      Watch Video
                    </a>
                    <Link
                      to={`/getSpecificConferenceDetailsReporterById?conferenceId=${conference.conferenceId._id}`}
                      className="mt-2 block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-center"
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
    </div>
  );
};

export default GetUserAcceptedPendingConference;
