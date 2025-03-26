import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConferences } from '../../../redux/AdminRedux/adminGetAllConferenceSlicer';
import { Link } from 'react-router-dom';

const GetAllConference = () => {
  const dispatch = useDispatch();

  const { conferenceData, freeConferenceData, loading, error } = useSelector(
    (state) => state.adminConferences
  );

  // Fetch conferences when the component is mounted
  useEffect(() => {
    dispatch(fetchConferences());
  }, [dispatch]);

  const handleViewClick = (id) => {
    // You can handle the click event here, like redirecting to a details page
 //   console.log("View clicked for conference ID:", id);
  };

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <h1 className="text-2xl font-bold mb-6">All Conferences</h1>

      {/* Show loading state */}
      {loading && <div>Loading...</div>}

      {/* Show error if there's any */}
      {error && <div className="text-red-600">Error: {error}</div>}

      {/* Display conference data in a table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-left text-sm leading-normal">
              <th className="py-3 px-6">Conference Name</th>
              <th className="py-3 px-6">WhatsApp Number</th>
              <th className="py-3 px-6">Email Address</th>
              <th className="py-3 px-6">Organizer</th>
              <th className="py-3 px-6">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {conferenceData && conferenceData.length > 0 ? (
              conferenceData.map((conference) => (
                <tr key={conference._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6">{conference.conferenceName}</td>
                  <td className="py-3 px-6">{conference.whatsappNumber}</td>
                  <td className="py-3 px-6">{conference.conferenceEmailAddress}</td>
                  <td className="py-3 px-6">{conference.conferenceBy}</td>
                  <td className="py-3 px-6">
                   <Link
                      to={`/admin/updateConference?conferenceId=${conference._id}`}
                      onClick={() => handleViewClick(conference._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-3 px-6 text-center text-gray-500">
                  No conferences found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Free Conferences Section */}
      <h2 className="text-xl font-bold mt-8 mb-4">Free Conferences</h2>
      {freeConferenceData && freeConferenceData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 text-left text-sm leading-normal">
                <th className="py-3 px-6">Free Conference Name</th>
                <th className="py-3 px-6">Description</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {freeConferenceData.map((freeConf) => (
                <tr key={freeConf._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6">{freeConf.name}</td>
                  <td className="py-3 px-6">{freeConf.description}</td>
                  <td className="py-3 px-6">{freeConf.date}</td>
                  <td className="py-3 px-6">
                   <Link
                      to={`/admin/updateConference?freeConfId=${freeConf._id}`}
                      onClick={() => handleViewClick(freeConf._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No free conferences available.</p>
      )}
    </div>
  );
};

export default GetAllConference;
