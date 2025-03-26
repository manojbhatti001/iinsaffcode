import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import  { fetchUserLeads } from "../../../../../../redux/leadSlicer"

const GetAllUserLeads = () => {
  const dispatch = useDispatch();

  const { allLeads, loading, error } = useSelector((state) => state.lead);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 5; // Number of leads per page

  useEffect(() => {
    dispatch(fetchUserLeads(""));
  }, [dispatch]);

  // Calculate the current leads to display
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = allLeads.slice(indexOfFirstLead, indexOfLastLead);

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-white text-center mb-8">All User Leads</h1>

      {loading && <p className="text-lg text-center">Loading leads...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && allLeads.length === 0 && (
        <p className="text-lg text-center">No leads found.</p>
      )}

      {!loading && allLeads.length > 0 && (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-200 text-gray-600 text-sm uppercase tracking-wider text-left">
                  <th className="py-3 px-4 border-b">Lead By</th>
                  <th className="py-3 px-4 border-b">Channel Type</th>
                  <th className="py-3 px-4 border-b">Ad Type</th>
                  <th className="py-3 px-4 border-b">Reach People</th>
                  <th className="py-3 px-4 border-b">Remaining Views</th>
                  <th className="py-3 px-4 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentLeads.map((lead) => (
                  <tr
                    key={lead._id}
                    className={`hover:bg-gray-100 ${getStatusClass(lead.status)}`}
                  >
                    <td className="py-2 px-4 border-b text-gray-700 text-left">
                      {lead.leadBy}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-700 text-left">
                      {lead.channelType}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-700 text-left">
                      {lead.adType}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-700 text-left">
                      {lead.requiredViews}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-700 text-left">
                      {lead.remainingViews}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-700 text-left">
                      {lead.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>

          {/* Pagination Controls */}
          <Pagination
            leadsPerPage={leadsPerPage}
            totalLeads={allLeads.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  );
};

const Pagination = ({ leadsPerPage, totalLeads, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalLeads / leadsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-6">
      <ul className="inline-flex space-x-2">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-4 py-2 rounded ${currentPage === number
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllUserLeads;
