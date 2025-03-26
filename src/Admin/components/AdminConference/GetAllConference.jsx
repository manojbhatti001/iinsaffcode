import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConferences } from "../../../redux/AdminRedux/adminGetAllConferenceSlicer";
import { Link, useLocation } from "react-router-dom";

const GetAllConference = () => {
  const dispatch = useDispatch();
  const location = useLocation(); // Get the current URL location
  const [statusFilter, setStatusFilter] = useState("all"); // Default filter to "all"
  const [showTodayOnly, setShowTodayOnly] = useState(false); // State for "Today" checkbox
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [conferenceTypeFilter, setConferenceTypeFilter] = useState("all"); // New filter state


  const { conferenceData, loading, error } = useSelector(
    (state) => state.adminConferences
  );

  // Fetch conferences when the component is mounted
  useEffect(() => {
    dispatch(fetchConferences());
  }, [dispatch]);

  // Set filters based on URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const stat = queryParams.get("stat");

    if (stat === "today") {
      setShowTodayOnly(true);
      setStatusFilter("all"); // Ignore status filter if "Today" is selected
    } else if (stat) {
      setShowTodayOnly(false);
      setStatusFilter(stat);
    } else {
      setShowTodayOnly(false);
      setStatusFilter("all"); // Default to "all" if no `stat` is in the URL
    }
  }, [location]);

  const handleConferenceTypeChange = (e) => {
    setConferenceTypeFilter(e.target.value); // Update conference type filter
  };


  // Handle checkbox toggle for "Today" filter
  const handleTodayChange = (e) => {
    setShowTodayOnly(e.target.checked); // Update "Today" filter state
    if (e.target.checked) {
      setStatusFilter("all"); // Reset status filter when "Today" is checked
    }
  };

  // Handle dropdown filter change
  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value); // Update status filter
    setShowTodayOnly(false); // Uncheck "Today" when a status is selected
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase()); // Update search query state
  };

  // Combine and filter both conferenceData and freeConferenceData
  const allConferences = [
    ...(conferenceData || []),
    // ...(freeConferenceData || []),
  ];

  // const filteredConferences = allConferences.filter((conference) => {
  //   const matchesStatus =
  //     statusFilter === "all" || conference.status === statusFilter;
  //   const matchesToday =
  //     !showTodayOnly ||
  //     new Date(conference.createdAt).toDateString() ===
  //     new Date().toDateString();
  //   const matchesSearch =
  //     conference.conferenceName?.toLowerCase().includes(searchQuery) ||
  //     conference.whatsappNumber?.toString().includes(searchQuery) ||
  //     conference.conferenceEmailAddress?.toLowerCase().includes(searchQuery);
  //   return matchesStatus && matchesToday && matchesSearch;
  // });

  const filteredConferences = allConferences.filter((conference) => {
    const matchesStatus =
      statusFilter === "all" || conference.status === statusFilter;
    const matchesToday =
      !showTodayOnly ||
      new Date(conference.createdAt).toDateString() ===
      new Date().toDateString();
    const matchesSearch =
      conference.conferenceName?.toLowerCase().includes(searchQuery) ||
      conference.whatsappNumber?.toString().includes(searchQuery) ||
      conference.conferenceEmailAddress?.toLowerCase().includes(searchQuery);
    const matchesConferenceType =
      conferenceTypeFilter === "all" ||
      conference.conferenceType === conferenceTypeFilter;
    return matchesStatus && matchesToday && matchesSearch && matchesConferenceType;
  });

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <h1 className="text-2xl font-bold mb-6">All Conferences</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, WhatsApp number, or email..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      {/* Status Filter Dropdown */}
      {/* <div className="mb-4">
        <label htmlFor="statusFilter" className="mr-2 font-semibold">
          Filter by Status:
        </label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={handleStatusChange}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="rejected">Rejected</option>
          <option value="cancelled">Cancelled</option>
          <option value="approved">Approved</option>
        </select>

      </div> */}
      {/* Status Filter Dropdown */}
      <div className="mb-4 flex space-x-4">
        <div>
          <label htmlFor="statusFilter" className="mr-2 font-semibold">
            Filter by Status:
          </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={handleStatusChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
            <option value="cancelled">Cancelled</option>
            <option value="approved">Approved</option>
          </select>
        </div>

        {/* Conference Type Filter */}
        <div>
          <label htmlFor="conferenceTypeFilter" className="mr-2 font-semibold">
            Filter by Type:
          </label>
          <select
            id="conferenceTypeFilter"
            value={conferenceTypeFilter}
            onChange={handleConferenceTypeChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="all">All</option>
            <option value="paid">Paid</option>
            <option value="free">Free</option>
          </select>
        </div>
      </div>

      {/* Checkbox for "Today" filter */}
      <label>
        <input
          type="checkbox"
          checked={showTodayOnly}
          onChange={handleTodayChange}
        />
        Show Today's Conferences
      </label>

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
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Conference Type</th>
              <th className="py-3 px-6">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {filteredConferences && filteredConferences.length > 0 ? (
              filteredConferences.map((conference) => (
                <tr
                  key={conference._id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6">{conference.conferenceName}</td>
                  <td className="py-3 px-6">{conference.whatsappNumber}</td>
                  <td className="py-3 px-6">{conference.conferenceEmailAddress}</td>
                  <td className="py-3 px-6">{conference.conferenceBy}</td>
                  <td className="py-3 px-6">{conference.status}</td>
                  <td className="py-3 px-6">{conference.conferenceType}</td>
                  <td className="py-3 px-6">
                    <Link
                      to={`/admin/updateConference?conferenceId=${conference._id}`}
                      className="bg-blue-500 mr-1 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                    >
                      View
                    </Link>
                    <Link
                      to={`/admin/getConferenceStatus?conferenceId=${conference._id}`}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                    >
                      Status
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-3 px-6 text-center text-gray-500">
                  No conferences found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetAllConference;