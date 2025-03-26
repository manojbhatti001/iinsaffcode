// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { baseUrl } from "../../utils/const";
// import { Link } from "react-router-dom";

// const GetAllOrganization = () => {
//   const [entries, setEntries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredEntries, setFilteredEntries] = useState([]);
//   const [roleCounts, setRoleCounts] = useState({});
//   const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);

//   useEffect(() => {
//     const fetchEntries = async () => {
//       try {
//         const token = localStorage.getItem("adminToken");
//         if (!token) {
//           setError("Admin token not found.");
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get(`${baseUrl}getAllIinsafEnteries`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = response.data.data || [];
//         setEntries(data);
//         setFilteredEntries(data);
//         calculateRoleCounts(data);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch entries.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEntries();
//   }, []);

//   const calculateRoleCounts = (data) => {
//     const counts = data.reduce((acc, entry) => {
//       acc[entry.role] = (acc[entry.role] || 0) + 1;
//       return acc;
//     }, {});
//     setRoleCounts(counts);
//   };

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);

//     const filtered = entries.filter(
//       (entry) =>
//         entry.name?.toLowerCase().includes(value) ||
//         entry.email?.toLowerCase().includes(value) ||
//         entry.phone?.toLowerCase().includes(value) ||
//         entry.role?.toLowerCase().includes(value)
//     );

//     setFilteredEntries(showVerifiedOnly ? filtered.filter((e) => e.isVerified) : filtered);
//   };

//   const toggleVerifiedFilter = () => {
//     if (showVerifiedOnly) {
//       setFilteredEntries(entries.filter((entry) => entry.name?.toLowerCase().includes(searchTerm)));
//     } else {
//       setFilteredEntries(filteredEntries.filter((entry) => entry.isVerified));
//     }
//     setShowVerifiedOnly(!showVerifiedOnly);
//   };

//   return (
//     <div className="p-4 md:p-8 lg:p-12 bg-gray-100 min-h-screen">
//       <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-6">
//         All Iinsaf Entries
//       </h1>

//       {loading ? (
//         <p className="text-center text-gray-600">Loading...</p>
//       ) : error ? (
//         <p className="text-center text-red-500">{error}</p>
//       ) : (
//         <>
//           {/* Role Counts */}
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold mb-2">User Counts by Role:</h2>
//             <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
//               {[
//                 "Doctor",
//                 "Advocate",
//                 "NGO",
//                 "Organization",
//                 "Partner",
//                 "Company",
//               ].map((role) => (
//                 <li key={role} className="bg-white p-4 rounded shadow-md">
//                   <span className="font-semibold">{role}:</span>{" "}
//                   {roleCounts[role] || 0}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Search Bar */}
//           <div className="mb-6 flex items-center gap-4">
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={handleSearch}
//               placeholder="Search by name, email, phone, or role"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <button
//               onClick={toggleVerifiedFilter}
//               className={`px-6 py-3 text-white font-semibold rounded-lg ${showVerifiedOnly
//                   ? "bg-green-500 hover:bg-green-600"
//                   : "bg-blue-500 hover:bg-blue-600"
//                 }`}
//             >
//               {showVerifiedOnly ? "Show All" : "Show Verified Only"}
//             </button>
//           </div>

//           {/* Entries Table */}
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//               <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
//                 <tr>
//                   <th className="py-3 px-6 text-left">Name</th>
//                   <th className="py-3 px-6 text-left">Email</th>
//                   <th className="py-3 px-6 text-left">Phone</th>
//                   <th className="py-3 px-6 text-left">Role</th>
//                   <th className="py-3 px-6 text-left">State</th>
//                   <th className="py-3 px-6 text-left">City</th>
//                   <th className="py-3 px-6 text-left">Status</th>
//                   <th className="py-3 px-6 text-left">Verified</th>
//                   <th className="py-3 px-6 text-left">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="text-gray-600 text-sm">
//                 {filteredEntries.length > 0 ? (
//                   filteredEntries.map((entry) => (
//                     <tr
//                       key={entry._id}
//                       className="border-b border-gray-200 hover:bg-gray-100"
//                     >
//                       <td className="py-3 px-6">{entry.name || "Unnamed"}</td>
//                       <td className="py-3 px-6">{entry.email || "N/A"}</td>
//                       <td className="py-3 px-6">{entry.phone || "N/A"}</td>
//                       <td className="py-3 px-6">{entry.role || "N/A"}</td>
//                       <td className="py-3 px-6">{entry.state || "N/A"}</td>
//                       <td className="py-3 px-6">{entry.city || "N/A"}</td>
//                       <td className="py-3 px-6">{entry.status || "N/A"}</td>
//                       <td className="py-3 px-6">
//                         {entry.isVerified ? "Yes" : "No"}
//                       </td>
//                       <td className="py-3 px-6">
//                         <Link
//                           to={`/admin/organization-details?id=${entry._id}`}
//                           className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded hover:bg-blue-600 transition"
//                         >
//                           View
//                         </Link>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan="9"
//                       className="text-center py-4 text-gray-500"
//                     >
//                       No matching entries found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default GetAllOrganization;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../utils/const";
import { Link } from "react-router-dom";

const GetAllOrganization = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [roleCounts, setRoleCounts] = useState({});
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [showApprovedOnly, setShowApprovedOnly] = useState(false);
  const [showRejectedOnly, setShowRejectedOnly] = useState(false);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          setError("Admin token not found.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${baseUrl}getAllIinsafEnteries`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data.data || [];
        setEntries(data);
        setFilteredEntries(data);
        calculateRoleCounts(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch entries.");
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  const calculateRoleCounts = (data) => {
    const counts = data.reduce((acc, entry) => {
      acc[entry.role] = (acc[entry.role] || 0) + 1;
      return acc;
    }, {});
    setRoleCounts(counts);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    let filtered = entries.filter(
      (entry) =>
        entry.name?.toLowerCase().includes(value) ||
        entry.email?.toLowerCase().includes(value) ||
        entry.phone?.toLowerCase().includes(value) ||
        entry.role?.toLowerCase().includes(value)
    );

    if (showVerifiedOnly) {
      filtered = filtered.filter((e) => e.isVerified);
    }
    if (showApprovedOnly) {
      filtered = filtered.filter((e) => e.status === "Approved");
    }
    if (showRejectedOnly) {
      filtered = filtered.filter((e) => e.status === "Rejected");
    }

    setFilteredEntries(filtered);
  };

  const toggleVerifiedFilter = () => {
    setShowVerifiedOnly(!showVerifiedOnly);
    setShowApprovedOnly(false);
    setShowRejectedOnly(false);
    const filtered = !showVerifiedOnly
      ? entries.filter((entry) => entry.isVerified)
      : entries.filter((entry) =>
          entry.name?.toLowerCase().includes(searchTerm)
        );
    setFilteredEntries(filtered);
  };

  const toggleApprovedFilter = () => {
    setShowApprovedOnly(!showApprovedOnly);
    setShowVerifiedOnly(false);
    setShowRejectedOnly(false);
    const filtered = !showApprovedOnly
      ? entries.filter((entry) => entry.status === "Approved")
      : entries.filter((entry) =>
          entry.name?.toLowerCase().includes(searchTerm)
        );
    setFilteredEntries(filtered);
  };

  const toggleRejectedFilter = () => {
    setShowRejectedOnly(!showRejectedOnly);
    setShowVerifiedOnly(false);
    setShowApprovedOnly(false);
    const filtered = !showRejectedOnly
      ? entries.filter((entry) => entry.status === "Rejected")
      : entries.filter((entry) =>
          entry.name?.toLowerCase().includes(searchTerm)
        );
    setFilteredEntries(filtered);
  };

  return (
    <div className="p-4 md:p-8 lg:p-12 bg-gray-100 min-h-screen">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-6">
        All iinsaf Entries
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          {/* Role Counts */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">User Counts by Role:</h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Doctor",
                "Advocate",
                "NGO",
                "Organization",
                "Partner",
                "Company",
              ].map((role) => (
                <li key={role} className="bg-white p-4 rounded shadow-md">
                  <span className="font-semibold">{role}:</span>{" "}
                  {roleCounts[role] || 0}
                </li>
              ))}
            </ul>
          </div>

          {/* Search Bar and Filters */}
          <div className="mb-6 flex flex-wrap gap-4">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search by name, email, phone, or role"
              className="w-full md:flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={toggleVerifiedFilter}
              className={`px-6 py-3 text-white font-semibold rounded-lg ${
                showVerifiedOnly
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {showVerifiedOnly ? "Show All" : "Show Verified Only"}
            </button>
            <button
              onClick={toggleApprovedFilter}
              className={`px-6 py-3 text-white font-semibold rounded-lg ${
                showApprovedOnly
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {showApprovedOnly ? "Show All" : "Show Approved Only"}
            </button>
            <button
              onClick={toggleRejectedFilter}
              className={`px-6 py-3 text-white font-semibold rounded-lg ${
                showRejectedOnly
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {showRejectedOnly ? "Show All" : "Show Rejected Only"}
            </button>
          </div>

          {/* Entries Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                <tr>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Phone</th>
                  <th className="py-3 px-6 text-left">Role</th>
                  <th className="py-3 px-6 text-left">State</th>
                  <th className="py-3 px-6 text-left">City</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Verified</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {filteredEntries.length > 0 ? (
                  filteredEntries.map((entry) => (
                    <tr
                      key={entry._id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6">{entry.name || "Unnamed"}</td>
                      <td className="py-3 px-6">{entry.email || "N/A"}</td>
                      <td className="py-3 px-6">{entry.phone || "N/A"}</td>
                      <td className="py-3 px-6">{entry.role || "N/A"}</td>
                      <td className="py-3 px-6">{entry.state || "N/A"}</td>
                      <td className="py-3 px-6">{entry.city || "N/A"}</td>
                      <td className="py-3 px-6">{entry.status || "N/A"}</td>
                      <td className="py-3 px-6">
                        {entry.isVerified ? "Yes" : "No"}
                      </td>
                      <td className="py-3 px-6">
                        <Link
                          to={`/admin/organization-details?id=${entry._id}`}
                          className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded hover:bg-blue-600 transition"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      className="text-center py-4 text-gray-500"
                    >
                      No matching entries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default GetAllOrganization;
