import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../utils/const";

const ConferenceStatusAd = ({ conferenceId }) => {
  const [conferenceStatuses, setConferenceStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchConferenceStatus = async () => {
    try {
      const token = localStorage.getItem("userToken");
   //   console.log("Conference ID:", conferenceId);

      const response = await axios.get(
        `${baseUrl}getUserCreatedConferenceStatus`,
        {
          headers: { Authorization: token },
          params: { conferenceId },
        }
      );
   //   console.log(response);

      if (response.data.conferenceStatuses) {
        setConferenceStatuses(response.data.conferenceStatuses);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch conference status details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (conferenceId) {
      fetchConferenceStatus();
    }
  }, [conferenceId]);

  return (
    <div className="p-6">
      {loading && <p className="text-blue-500 text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {conferenceStatuses.length > 0 ? (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 text-center">Conference Status</h3>
          {conferenceStatuses.map((status, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-5 border border-gray-200"
            >
              <p className="text-lg font-medium text-gray-700">
                <span className="font-semibold">Conference By:</span> {status.conferenceId.conferenceBy}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Accepted Date:</span> {new Date(status.acceptedDate).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Accepted By User:</span> {status.acceptedByUser}
              </p>

              {status.videoDate && (
                <p className="text-gray-600">
                  <span className="font-semibold">Video Date:</span> {new Date(status.videoDate).toLocaleDateString()}
                </p>
              )}

              {status.videoUrl && (
                <p className="text-gray-600">
                  <span className="font-semibold">Video URL:</span>{" "}
                  <a
                    href={status.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Watch Video
                  </a>
                </p>
              )}

              <p className="text-gray-600">
                <span className="font-semibold">Status:</span> {status.status}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Status by Admin:</span> {status.statusByAdmin}
              </p>

              {status.note && (
                <p className="text-gray-600">
                  <span className="font-semibold">Note:</span> {status.note}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="text-gray-500 text-center">No conference statuses available.</p>
      )}
    </div>

  );
};

export default ConferenceStatusAd;
