// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { baseUrl } from "../../../utils/const";

// const GetRelevantAdv = () => {
//   const [allAdv, setAllAdv] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchRelevantAdv = async () => {
//       const token = localStorage.getItem("userToken");

//       try {
//         const response = await axios.get(`${baseUrl}getRelevantAdv`, {
//           headers: {
//             Authorization: token,
//           },
//         });

//         // Inspecting the response structure
//         console.log(response.data);

//         // Check if 'adv' is an array and assign to state
//         if (Array.isArray(response.data.adv)) {
//           setAllAdv(response.data.adv);  // Use the 'adv' array from the response
//         } else {
//           setError("Data is not an array or 'adv' key is missing");
//         }
//       } catch (err) {
//         setError("Error fetching relevant advertisements");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRelevantAdv();
//   }, []);

//   return (
//     <div className="container mx-auto sm:w-[97%] sm:ml-2 overflow-scroll w-screen">
//       <h1 className="text-xl font-bold mb-4">Relevant Advertisements</h1>
//       <div className="sm:p-4 bg-white rounded-lg shadow">
//         {loading ? (
//           <p className="text-center text-gray-600">Loading...</p>
//         ) : allAdv.length === 0 ? (
//           <p className="text-center text-gray-600">
//             No relevant advertisements found.
//           </p>
//         ) : (
//           <div className="w-screen sm:w-full overflow-x-auto rounded-lg">
//             <table className="w-full border-collapse table-auto text-sm sm:text-base">
//               <thead className="bg-gray-200">
//                 <tr>
//                   <th className="px-4 py-3 border text-left">Adv ID</th>
//                   <th className="px-4 py-3 border text-left">Ad State</th>
//                   <th className="px-4 py-3 border text-left">Ad City</th>
//                   <th className="px-4 py-3 border text-left">Ad Description</th>
//                   <th className="px-4 py-3 border text-left">Ad Length</th>
//                   <th className="px-4 py-3 border text-left">Ad Type</th>
//                   <th className="px-4 py-3 border text-left">Channel Type</th>
//                   <th className="px-4 py-3 border text-left">Required Views</th>
//                   <th className="px-4 py-3 border text-left">Status</th>
//                   <th className="px-4 py-3 border text-left">Payment Status</th>
//                   <th className="px-4 py-3 border text-left">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {allAdv.map((adv) => (
//                   <tr
//                     key={adv._id}
//                     className="hover:bg-gray-100 even:bg-gray-50"
//                   >
//                     <td className="px-4 py-2 border">{adv._id}</td>
//                     <td className="px-4 py-2 border">{adv.adArea[0]?.adState || "N/A"}</td>
//                     <td className="px-4 py-2 border">{adv.adArea[0]?.adCity || "N/A"}</td>
//                     <td className="px-4 py-2 border">{adv.adDescription || "N/A"}</td>
//                     <td className="px-4 py-2 border">{adv.adLength} seconds</td>
//                     <td className="px-4 py-2 border">{adv.adType || "N/A"}</td>
//                     <td className="px-4 py-2 border">{adv.channelType || "N/A"}</td>
//                     <td className="px-4 py-2 border">{adv.requiredViews / 4 || "N/A"}</td>
//                     <td className="px-4 py-2 border">{adv.status || "N/A"}</td>
//                     <td className="px-4 py-2 border">{adv.paymentStatus || "N/A"}</td>
//                     <td className="px-4 py-2 border">
//                       <Link
//                         to={`getSpecificAdvDetailsReporter?advId=${adv._id}`}
//                         className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
//                       >
//                         Edit
//                       </Link>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GetRelevantAdv;


import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../../utils/const";

const GetRelevantAdv = () => {
  const [allAdv, setAllAdv] = useState([]);
  const [filteredAdv, setFilteredAdv] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [todayOnly, setTodayOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRelevantAdv = async () => {
      const token = localStorage.getItem("userToken");

      try {
        const response = await axios.get(`${baseUrl}getRelevantAdv`, {
          headers: {
            Authorization: token,
          },
        });

        if (Array.isArray(response.data.adv)) {
          setAllAdv(response.data.adv); // Use the 'adv' array from the response
          setFilteredAdv(response.data.adv); // Initialize filtered data
        } else {
          setError("Data is not an array or 'adv' key is missing");
        }
      } catch (err) {
        setError("Error fetching relevant advertisements");
      } finally {
        setLoading(false);
      }
    };

    fetchRelevantAdv();
  }, []);

  useEffect(() => {
    filterAdvertisements();
  }, [todayOnly, searchTerm, allAdv]);

  const filterAdvertisements = () => {
    let filtered = [...allAdv];

    // Filter for today's advertisements
    if (todayOnly) {
      const todayDate = new Date().toISOString().split("T")[0];
      filtered = filtered.filter(
        (adv) => new Date(adv.createdDate).toISOString().split("T")[0] === todayDate
      );
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (adv) =>
          adv.adLength.toString().includes(term) ||
          (adv.adType && adv.adType.toLowerCase().includes(term)) ||
          (adv.channelType && adv.channelType.toLowerCase().includes(term)) ||
          adv.requiredViews.toString().includes(term)
      );
    }

    setFilteredAdv(filtered);
  };

  return (
    <div className="container mx-auto sm:w-[97%] sm:ml-2 overflow-scroll w-screen">
      <h1 className="text-xl font-bold mb-4">Relevant Advertisements</h1>

      <div className="flex justify-between mb-4">
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={todayOnly}
              onChange={(e) => setTodayOnly(e.target.checked)}
              className="form-checkbox"
            />
            <span>Show Today&apos;s Advertisements</span>
          </label>
        </div>
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Ad Length, Ad Type, Channel Type, Reach People"
            className="border px-4 py-2 rounded w-full"
          />
        </div>
      </div>

      <div className="sm:p-4 bg-white rounded-lg shadow">
        <div className="w-screen sm:w-full overflow-x-auto rounded-lg">
          <table className="w-full border-collapse table-auto text-sm sm:text-base">
            <thead className="bg-gray-200 sticky top-0">
              <tr>
                <th className="px-4 py-3 border text-left">Adv ID</th>
                <th className="px-4 py-3 border text-left">Ad State</th>
                <th className="px-4 py-3 border text-left">Ad City</th>
                <th className="px-4 py-3 border text-left">Ad Description</th>
                <th className="px-4 py-3 border text-left">Ad Length</th>
                <th className="px-4 py-3 border text-left">Ad Type</th>
                <th className="px-4 py-3 border text-left">Channel Type</th>
                <th className="px-4 py-3 border text-left">Reach People</th>
                <th className="px-4 py-3 border text-left">Status</th>
                <th className="px-4 py-3 border text-left">Payment Status</th>
                <th className="px-4 py-3 border text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="11"
                    className="text-center px-4 py-3 border text-gray-600"
                  >
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan="11"
                    className="text-center px-4 py-3 border text-red-600"
                  >
                    {error}
                  </td>
                </tr>
              ) : filteredAdv.length === 0 ? (
                <tr>
                  <td
                    colSpan="11"
                    className="text-center px-4 py-3 border text-gray-600"
                  >
                    No relevant advertisements found.
                  </td>
                </tr>
              ) : (
                filteredAdv.map((adv) => (
                  <tr
                    key={adv._id}
                    className="hover:bg-gray-100 even:bg-gray-50"
                  >
                    <td className="px-4 py-2 border">{adv._id}</td>
                    <td className="px-4 py-2 border">
                      {adv.adArea[0]?.adState || "N/A"}
                    </td>
                    <td className="px-4 py-2 border">
                      {adv.adArea[0]?.adCity || "N/A"}
                    </td>
                    <td className="px-4 py-2 border">
                      {adv.adDescription || "N/A"}
                    </td>
                    <td className="px-4 py-2 border">{adv.adLength} seconds</td>
                    <td className="px-4 py-2 border">{adv.adType || "N/A"}</td>
                    <td className="px-4 py-2 border">
                      {adv.channelType || "N/A"}
                    </td>
                    <td className="px-4 py-2 border">
                      {1000 || "N/A"}
                    </td>
                    <td className="px-4 py-2 border">{adv.status || "N/A"}</td>
                    <td className="px-4 py-2 border">
                      {adv.paymentStatus || "N/A"}
                    </td>
                    <td className="px-4 py-2 border">
                      <Link
                        to={`getSpecificAdvDetailsReporter?advId=${adv._id}`}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GetRelevantAdv;