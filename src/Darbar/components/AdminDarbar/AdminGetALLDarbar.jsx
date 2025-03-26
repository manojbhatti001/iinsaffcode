// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { baseUrl } from "../../../utils/const";
// import { Link } from "react-router-dom";

// const AdminGetAllDarbar = () => {
//   const [darbars, setDarbars] = useState([]);
//   const [filteredDarbars, setFilteredDarbars] = useState([]);
//   const [search, setSearch] = useState("");
//   const [todayOnly, setTodayOnly] = useState(false);
//   const [statusFilter, setStatusFilter] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDarbars = async () => {
//       try {
//         const token = localStorage.getItem("adminToken");

//         const response = await axios.get(`${baseUrl}getAllDarbars`, {
//           headers: {
//             Authorization: `Bearer ${token}`, // Include token in the headers
//           },
//         });
//         setDarbars(response.data.darbars);
//         setFilteredDarbars(response.data.darbars);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchDarbars();
//   }, []);

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearch(value);
//     filterDarbars(value, todayOnly, statusFilter);
//   };

//   const handleTodayOnly = (e) => {
//     const checked = e.target.checked;
//     setTodayOnly(checked);
//     filterDarbars(search, checked, statusFilter);
//   };

//   const handleStatusFilter = (status) => {
//     setStatusFilter(status);
//     filterDarbars(search, todayOnly, status);
//   };

//   const filterDarbars = (searchTerm, today, status) => {
//     const todayDate = new Date().toISOString().split("T")[0];
//     let filtered = darbars.filter((darbar) => {
//       const matchesSearch =
//         darbar?.darbarBy?.name.toLowerCase().includes(searchTerm) ||
//         darbar.darbarCity.toLowerCase().includes(searchTerm) ||
//         darbar.darbarState.toLowerCase().includes(searchTerm);

//       const matchesToday = today
//         ? new Date(darbar.darbarDate).toISOString().split("T")[0] === todayDate
//         : true;

//       const matchesStatus = status ? darbar.darbarStatus === status : true;

//       return matchesSearch && matchesToday && matchesStatus;
//     });
//     setFilteredDarbars(filtered);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">All Darbars</h1>

//       {/* Filters */}
//       <div className="mb-4 flex flex-wrap gap-4 items-center">
//         <input
//           type="text"
//           placeholder="Search by name, city, or state"
//           value={search}
//           onChange={handleSearch}
//           className="border border-gray-300 p-2 rounded w-full sm:w-1/3"
//         />
//         <label className="flex items-center space-x-2">
//           <input
//             type="checkbox"
//             checked={todayOnly}
//             onChange={handleTodayOnly}
//             className="w-4 h-4"
//           />
//           <span>Today's Darbars</span>
//         </label>
//         <button
//           onClick={() => handleStatusFilter("approved")}
//           className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//         >
//           Show Approved
//         </button>
//         <button
//           onClick={() => handleStatusFilter("rejected")}
//           className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//         >
//           Show Rejected
//         </button>
//         <button
//           onClick={() => handleStatusFilter("")}
//           className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//         >
//           Clear Filters
//         </button>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="table-auto w-full border-collapse border border-gray-200">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">City</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">State</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">Purpose</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">People Available</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">People Required</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredDarbars.map((darbar) => (
//               <tr key={darbar._id} className="hover:bg-gray-50">
//                 <td className="border border-gray-300 px-4 py-2">
//                   {darbar?.darbarBy?.name || "Advertiser User"}
//                 </td>
//                 <td className="border border-gray-300 px-4 py-2">
//                   {new Date(darbar.darbarDate).toLocaleDateString()}
//                 </td>
//                 <td className="border border-gray-300 px-4 py-2">{darbar.darbarCity}</td>
//                 <td className="border border-gray-300 px-4 py-2">{darbar.darbarState}</td>
//                 <td className="border border-gray-300 px-4 py-2">{darbar.purpose}</td>
//                 <td className="border border-gray-300 px-4 py-2">{darbar.peopleAvailable}</td>
//                 <td className="border border-gray-300 px-4 py-2">{darbar.peopleRequired}</td>
//                 <td className="border border-gray-300 px-4 py-2">{darbar.darbarStatus}</td>
//                 <td className="border border-gray-300 px-4 py-2">
//                   <Link
//                     to={`/getDarbarById?Id=${darbar._id}`}
//                     className="inline-flex justify-center px-4 py-2 text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring-blue active:bg-blue-700 disabled:opacity-50"
//                   >
//                     View
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminGetAllDarbar;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../utils/const";
import { Link } from "react-router-dom";

const AdminGetAllDarbar = () => {
  const [darbars, setDarbars] = useState([]);
  const [filteredDarbars, setFilteredDarbars] = useState([]);
  const [search, setSearch] = useState("");
  const [todayOnly, setTodayOnly] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDarbars = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const response = await axios.get(`${baseUrl}getAllDarbars`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDarbars(response.data.darbars);
        setFilteredDarbars(response.data.darbars);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDarbars();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    filterDarbars(value, todayOnly, statusFilter);
  };

  const handleTodayOnly = (e) => {
    const checked = e.target.checked;
    setTodayOnly(checked);
    filterDarbars(search, checked, statusFilter);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    filterDarbars(search, todayOnly, status);
  };

  const filterDarbars = (searchTerm, today, status) => {
    const todayDate = new Date().toISOString().split("T")[0];
    let filtered = darbars.filter((darbar) => {
      const matchesSearch =
        darbar?.darbarBy?.name.toLowerCase().includes(searchTerm) ||
        darbar.darbarCity.toLowerCase().includes(searchTerm) ||
        darbar.darbarState.toLowerCase().includes(searchTerm);

      const matchesToday = today
        ? new Date(darbar.darbarDate).toISOString().split("T")[0] === todayDate
        : true;

      const matchesStatus = status ? darbar.darbarStatus === status : true;

      return matchesSearch && matchesToday && matchesStatus;
    });
    setFilteredDarbars(filtered);
  };

  const clearFilters = () => {
    setSearch("");
    setTodayOnly(false);
    setStatusFilter("");
    setFilteredDarbars(darbars);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Darbars</h1>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Search by name, city, or state"
          value={search}
          onChange={handleSearch}
          className="border border-gray-300 p-2 rounded w-full sm:w-1/3"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={todayOnly}
            onChange={handleTodayOnly}
            className="w-4 h-4"
          />
          <span>Today's Darbars</span>
        </label>
        <button
          onClick={() => handleStatusFilter("approved")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Show Approved
        </button>
        <button
          onClick={() => handleStatusFilter("rejected")}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Show Rejected
        </button>
        <button
          onClick={clearFilters}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Clear Filters
        </button>
      </div>

      {/* Active Filters */}
      <div className="mb-4 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold mb-2">Active Filters:</h2>
        <div className="flex flex-wrap gap-2">
          {search && (
            <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded">
              Search: {search}
            </span>
          )}
          {todayOnly && (
            <span className="px-3 py-1 bg-green-200 text-green-800 rounded">
              Today's Darbars
            </span>
          )}
          {statusFilter && (
            <span className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded">
              Status: {statusFilter}
            </span>
          )}
          {!search && !todayOnly && !statusFilter && (
            <span className="text-gray-500">No active filters</span>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left">City</th>
              <th className="border border-gray-300 px-4 py-2 text-left">State</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Purpose</th>
              <th className="border border-gray-300 px-4 py-2 text-left">People Available</th>
              <th className="border border-gray-300 px-4 py-2 text-left">People Required</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDarbars.map((darbar) => (
              <tr key={darbar._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {darbar?.darbarBy?.name || "Advertiser User"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(darbar.darbarDate).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">{darbar.darbarCity}</td>
                <td className="border border-gray-300 px-4 py-2">{darbar.darbarState}</td>
                <td className="border border-gray-300 px-4 py-2">{darbar.purpose}</td>
                <td className="border border-gray-300 px-4 py-2">{darbar.peopleAvailable}</td>
                <td className="border border-gray-300 px-4 py-2">{darbar.peopleRequired}</td>
                <td className="border border-gray-300 px-4 py-2">{darbar.darbarStatus}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <Link
                    to={`/admin/getDarbarById?Id=${darbar._id}`}
                    className="inline-flex justify-center px-4 py-2 text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring-blue active:bg-blue-700 disabled:opacity-50"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminGetAllDarbar;
