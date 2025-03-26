// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useLocation } from "react-router-dom";
// import { baseUrl } from "../../utils/const";

// const GetUserConference = () => {
//   const [conferences, setConferences] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [filteredConferences, setFilteredConferences] = useState([]);
//   const [statusFilter, setStatusFilter] = useState("All");
//   const location = useLocation();

//   useEffect(() => {
//     // Parse the `stat` parameter from the URL
//     const params = new URLSearchParams(location.search);
//     const stat = params.get("stat") || "All"; // Default to "All" if not provided
//     setStatusFilter(stat);
//   }, [location]);

//   // Fetch conferences when the component mounts
//   useEffect(() => {
//     const fetchConferences = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const token = localStorage.getItem("userToken");
//         const response = await axios.get(`${baseUrl}getConference`, {
//           headers: {
//             Authorization: token,
//           },
//         });
//         setConferences(response.data);
//       } catch (err) {
//         setError(err.message || "Failed to fetch conferences.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchConferences();
//   }, []);

//   // Update filtered conferences when status changes
//   useEffect(() => {
//     filterConferences();
//   }, [statusFilter, conferences]);

//   const filterConferences = () => {
//     if (statusFilter === "All") {
//       setFilteredConferences(conferences || []); // Fallback to empty array
//     } else {
//       const filtered = (conferences || []).filter((conf) => {
//         const status = conf.status?.toLowerCase() || ""; // Fallback to an empty string
//         return status === statusFilter.toLowerCase();
//       });
//       setFilteredConferences(filtered);
//     }
//   };

//   // Handler for the View button
//   const handleView = (conferenceId) => {
//     console.log("View conference:", conferenceId);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center p-5">
//                 <h2 className="text-2xl font-bold mb-4">Your Conferences</h2>

//     {/* Status Filter Buttons */}
//     <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6 mb-5">
//       {["All", "Completed", "Pending", "Rejected"].map((status) => (
//         <button
//           key={status}
//           onClick={() => setStatusFilter(status)}
//           className={`bg-${status === "Completed"
//             ? "green"
//             : status === "Pending"
//             ? "blue"
//             : status === "Rejected"
//             ? "yellow"
//             : "gray"}-500 hover:bg-${status === "Completed"
//             ? "green"
//             : status === "Pending"
//             ? "blue"
//             : status === "Rejected"
//             ? "yellow"
//             : "gray"}-600 text-white font-bold py-2 px-4 rounded shadow transition duration-200 ease-in-out`}
//         >
//           {status}
//         </button>
//       ))}
//     </div>

//     <div className="w-full">
//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       {filteredConferences.length > 0 ? (
//         <table className="min-w-full table-auto border-collapse border border-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
//                 Conference Name
//               </th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
//                 WhatsApp Number
//               </th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
//                 Email
//               </th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
//                 Number of Reporters
//               </th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
//                 State
//               </th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
//                 City
//               </th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
//                 Area
//               </th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
//                 Pin Code
//               </th>
//               {/* <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
//                 Purpose
//               </th> */}
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
//                 Status
//               </th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {filteredConferences.map((conference) => (
//               <tr key={conference._id}>
//                 <td className="px-4 py-4 text-sm text-gray-900 border-b border-gray-200">
//                   {conference.conferenceName}
//                 </td>
//                 <td className="px-4 py-4 text-sm text-gray-900 border-b border-gray-200">
//                   {conference.whatsappNumber}
//                 </td>
//                 <td className="px-4 py-4 text-sm text-gray-900 border-b border-gray-200">
//                   {conference.conferenceEmailAddress}
//                 </td>
//                 <td className="px-4 py-4 text-sm text-gray-900 border-b border-gray-200">
//                   {conference.numberOfReporters}
//                 </td>
//                 <td className="px-4 py-4 text-sm text-gray-900 border-b border-gray-200">
//                   {conference.conferenceChannelState}
//                 </td>
//                 <td className="px-4 py-4 text-sm text-gray-900 border-b border-gray-200">
//                   {conference.conferenceChannelCity}
//                 </td>
//                 <td className="px-4 py-4 text-sm text-gray-900 border-b border-gray-200">
//                   {conference.conferenceArea}
//                 </td>
//                 <td className="px-4 py-4 text-sm text-gray-900 border-b border-gray-200">
//                   {conference.conferencePinCode}
//                 </td>
//                 {/* <td className="px-4 py-4 text-sm text-gray-900 border-b border-gray-200">
//                   {conference.conferencePurpose}
//                 </td> */}
//                 <td className="px-4 py-4 text-sm text-gray-900 border-b border-gray-200">
//                   {conference.status}
//                 </td>
//                 <td className="px-4 py-4 text-sm text-gray-900 border-b border-gray-200">
//                   <Link
//                     to={`/getSpecificConfrenceDetails?conferenceId=${conference._id}`}
//                     className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                   >
//                     View
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         !loading && <p>No conferences found.</p>
//       )}
//     </div>
//   </div>

//   );
// };

// export default GetUserConference;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { baseUrl } from "../../utils/const";

const GetUserConference = () => {
  const [conferences, setConferences] = useState([]);
  const [conferenceStatuses, setConferenceStatuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredConferences, setFilteredConferences] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedConference, setSelectedConference] = useState(null);
  const [formData, setFormData] = useState({});
  const [updating, setUpdating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false); // For handling modal visibility
  const [conferenceId, setConferenceId] = useState("");
  const location = useLocation();

  useEffect(() => {
    // Parse the `stat` parameter from the URL
    const params = new URLSearchParams(location.search);
    const stat = params.get("stat") || "All"; // Default to "All" if not provided
    setStatusFilter(stat);
  }, [location]);

  useEffect(() => {
    const fetchConferences = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get(`${baseUrl}getConference`, {
          headers: {
            Authorization: token,
          },
        });
        setConferences(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch conferences.");
      } finally {
        setLoading(false);
      }
    };

    fetchConferences();
  }, []);

  useEffect(() => {
    filterConferences();
  }, [statusFilter, conferences]);

  const filterConferences = () => {
    if (statusFilter === "All") {
      setFilteredConferences(conferences || []);
    } else {
      const filtered = (conferences || []).filter((conf) => {
        const status = conf.status?.toLowerCase() || "";
        return status === statusFilter.toLowerCase();
      });
      setFilteredConferences(filtered);
    }
  };

  // Function to open the modal and fetch conference details
  const handleView = (conferenceId) => {
    setConferenceId(conferenceId); // Set the selected conference ID
    setIsModalOpen(true); // Open the modal
    fetchConferenceDetails(conferenceId); // Fetch data for the selected conference
  };

  // Function to close the modal and clear errors
  const closeModal = () => {
    setIsModalOpen(false);
    // setSelectedConference(null);
    setError("");
  };

  // Function to fetch conference details
  const fetchConferenceDetails = async (conferenceId) => {
    try {
      setLoading(true); // Set loading state to true while fetching data
      const token = localStorage.getItem("userToken");

      // Check if the token exists
      if (!token) {
        setError("User not authenticated.");
        return;
      }

      // Make the API request with the Authorization header
      const response = await axios.get(
        `${baseUrl}getSpecificeConferenceDetails`,
        {
          headers: {
            Authorization: token,
          },
          params: {
            conferenceId: conferenceId, // Pass the conferenceId as a parameter
          },
        }
      );

      // Handle the response (example: set data or state)
      if (response.data && response.data.conference) {
        setSelectedConference(response.data.conference);
        setFormData(response.data.conference); // Populate form data
      } else {
        setError("No conference details found.");
      }
    } catch (err) {
      console.error("Error fetching conference details:", err);
      setError("Failed to fetch conference details.");
    } finally {
      setLoading(false); // Set loading state to false once the request is done
    }
  };

  // Function to fetch conference statuses
  const fetchConferenceStatus = async (id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("userToken");

      const response = await axios.get(
        `${baseUrl}getUserCreatedConferenceStatus`,
        {
          headers: { Authorization: token },
          params: { conferenceId: id },
        }
      );

      if (response.data.conferenceStatuses) {
        setConferenceStatuses(response.data.conferenceStatuses);
      } else {
        setConferenceStatuses([]);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch conference status details.");
    } finally {
      setLoading(false);
    }
  };

  // Function to open the modal and fetch conference data
  const handleOpenModal = (id) => {
    setConferenceId(id); // Set the selected conference ID
    setIsModalOpen2(true);
    fetchConferenceStatus(id); // Fetch data for the selected conference
  };

  // Function to close the modal and clear errors
  const handleCloseModal = () => {
    setIsModalOpen2(false);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.put(
        `${baseUrl}updateConferenceDetails`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Conference updated successfully!");
    } catch (err) {
      setError("Error updating conference details.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center sm:p-5">
      <h2 className="text-2xl font-bold mb-4">Your Conferences</h2>

      {/* Status Filter Buttons */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6 mb-5">
        {["All", "Completed", "Pending", "Rejected"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`bg-${status === "Completed"
              ? "green"
              : status === "Pending"
                ? "blue"
                : status === "Rejected"
                  ? "yellow"
                  : "gray"
              }-500 hover:bg-${status === "Completed"
                ? "green"
                : status === "Pending"
                  ? "blue"
                  : status === "Rejected"
                    ? "yellow"
                    : "gray"
              }-600 text-white font-bold py-2 px-4 rounded shadow transition duration-200 ease-in-out`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="sm:w-full w-screen overflow-scroll">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {filteredConferences.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 text-gray-600 text-left text-sm uppercase tracking-wider">
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Conference Name
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  WhatsApp Number
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Email
                </th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Number of Reporters
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  State
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  City
                </th>
                {/* <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                Area
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                Pin Code
              </th> */}
                {/* <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                Purpose
              </th> */}
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredConferences.map((conference) => (
                <tr key={conference._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">
                    {conference.conferenceName}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {conference.whatsappNumber}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {conference.conferenceEmailAddress}
                  </td>
                  <td className="py-2 px-2 border-b">
                    {conference.numberOfReporters}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {conference.conferenceChannelState}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {conference.conferenceChannelCity}
                  </td>
                  {/* <td className="px-4 py-4 text-sm text-gray-900 border-b border-gray-200">
                  {conference.conferenceArea}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900 border-b border-gray-200">
                  {conference.conferencePinCode}
                </td> */}
                  {/* <td className="px-4 py-4 text-sm text-gray-900 border-b border-gray-200">
                  {conference.conferencePurpose}
                </td> */}
                  <td className="py-2 px-4 border-b">
                    {conference.status}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleView(conference._id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleOpenModal(conference._id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Running
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && <p>No conferences found.</p>
        )}
      </div>

      {isModalOpen && selectedConference && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-md w-3/4 md:w-1/2 relative">
            <h3 className="text-xl font-bold mb-4 text-center">
              Conference Details
            </h3>

            {selectedConference?.status !== "rejected" && (
              <p className="text-red-500 text-center mb-4">
                Updates are only allowed for rejected conferences.
              </p>
            )}

            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <p className="text-blue-500">Loading...</p>
                </div>
              ) : error ? (
                <div className="text-red-500 text-center">
                  <p>{error}</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Conference ID
                      </label>
                      <input
                        type="text"
                        value={formData.conferenceId || selectedConference._id} // Use _id as Conference ID
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            conferenceId: e.target.value,
                          })
                        }
                        className="border p-2 w-full rounded-md"
                        disabled={selectedConference?.status !== "Rejected"} // Disable if status is not "Rejected"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Conference By (Creator ID)
                      </label>
                      <input
                        type="text"
                        value={
                          formData.conferenceBy ||
                          selectedConference.conferenceBy
                        } // Display conferenceBy (Creator ID)
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            conferenceBy: e.target.value,
                          })
                        }
                        className="border p-2 w-full rounded-md"
                        disabled={selectedConference?.status !== "Rejected"} // Disable if status is not "Rejected"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Conference Purpose
                      </label>
                      <input
                        type="text"
                        value={
                          formData.conferencePurpose ||
                          selectedConference.conferencePurpose
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            conferencePurpose: e.target.value,
                          })
                        }
                        className="border p-2 w-full rounded-md"
                        disabled={selectedConference?.status !== "Rejected"}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Conference Status
                      </label>
                      <input
                        type="text"
                        value={formData.status || selectedConference.status}
                        onChange={(e) =>
                          setFormData({ ...formData, status: e.target.value })
                        }
                        className="border p-2 w-full rounded-md"
                        disabled={selectedConference?.status !== "Rejected"}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        WhatsApp Number
                      </label>
                      <input
                        type="text"
                        value={
                          formData.whatsappNumber ||
                          selectedConference.whatsappNumber
                        } // Display whatsappNumber
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            whatsappNumber: e.target.value,
                          })
                        }
                        className="border p-2 w-full rounded-md"
                        disabled={selectedConference?.status !== "Rejected"}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Conference Cost
                      </label>
                      <input
                        type="number"
                        value={
                          formData.conferenceCost ||
                          selectedConference.conferenceCost
                        } // Display conferenceCost
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            conferenceCost: e.target.value,
                          })
                        }
                        className="border p-2 w-full rounded-md"
                        disabled={selectedConference?.status !== "Rejected"}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="submit"
                      disabled={updating}
                      className={`px-6 py-2 rounded ${updating
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-gray-300 cursor-not-allowed"
                        }`}
                    >
                      {updating ? "Updating..." : "Update"}
                    </button>
                  </div>
                </>
              )}
            </form>

            {/* Close button inside modal */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              <span className="text-2xl font-bold">×</span>
            </button>
          </div>
        </div>
      )}

      {isModalOpen2 && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full md:w-3/4 lg:w-2/3 xl:w-1/2 p-6 relative max-w-full">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>
            {loading ? (
              <p className="text-blue-500 text-center">Loading...</p>
            ) : error ? (
              <p className="text-red-500 text-center">{error}</p>
            ) : conferenceStatuses.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">
                        Conference By
                      </th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">
                        Accepted Date
                      </th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">
                        Accepted By User
                      </th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">
                        Video Date
                      </th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">
                        Video URL
                      </th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">
                        Status by Admin
                      </th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">
                        Note
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {conferenceStatuses.map((status, index) => (
                      <tr key={index} className="border-t border-gray-200">
                        <td className="px-4 py-2 text-gray-700">
                          {status.conferenceId.conferenceBy}
                        </td>
                        <td className="px-4 py-2 text-gray-600">
                          {new Date(status.acceptedDate).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2 text-gray-600">
                          {status.acceptedByUser}
                        </td>
                        <td className="px-4 py-2 text-gray-600">
                          {status.videoDate
                            ? new Date(status.videoDate).toLocaleDateString()
                            : "-"}
                        </td>
                        <td className="px-4 py-2 text-gray-600">
                          {status.videoUrl ? (
                            <a
                              href={status.videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              Watch Video
                            </a>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="px-4 py-2 text-gray-600">
                          {status.status}
                        </td>
                        <td className="px-4 py-2 text-gray-600">
                          {status.statusByAdmin}
                        </td>
                        <td className="px-4 py-2 text-gray-600">
                          {status.note || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center">
                No conference statuses available.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GetUserConference;
