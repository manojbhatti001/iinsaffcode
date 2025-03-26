import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserLeads } from "../../../../../redux/leadSlicer";

const RejectedLead = () => {
  const dispatch = useDispatch();
  const { rejectedLeads, loading, error } = useSelector((state) => state.lead);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 5; // Number of leads per page

  useEffect(() => {
    dispatch(fetchUserLeads("rejected"));
  }, [dispatch]);

  // Calculate the current leads to display
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = rejectedLeads.slice(indexOfFirstLead, indexOfLastLead);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-6 bg-red-100 ">
      <h1 className="text-3xl font-bold text-red-700 text-center mb-8">
        Rejected Leads
      </h1>

      {loading && <p className="text-lg text-red-700 text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && rejectedLeads.length === 0 && (
        <p className="text-lg text-red-700 text-center">
          No rejected leads found.
        </p>
      )}

      {rejectedLeads.length > 0 && (
        <>
          <div className="overflow-x-auto h-96">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead>
                <tr className="bg-red-200 text-red-700 text-sm uppercase tracking-wider text-left">
                  <th className="py-3 px-4 border-b">Lead By</th>
                  <th className="py-3 px-4 border-b">Channel Type</th>
                  <th className="py-3 px-4 border-b">Ad Type</th>
                  <th className="py-3 px-4 border-b">Reach People</th>
                  <th className="py-3 px-4 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentLeads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-red-50">
                    <td className="py-2 px-4 border-b text-red-700 text-left">
                      {lead.leadBy}
                    </td>
                    <td className="py-2 px-4 border-b text-red-700 text-left">
                      {lead.channelType}
                    </td>
                    <td className="py-2 px-4 border-b text-red-700 text-left">
                      {lead.adType}
                    </td>
                    <td className="py-2 px-4 border-b text-red-700 text-left">
                      {lead.requiredViews}
                    </td>
                    <td className="py-2 px-4 border-b text-red-700 text-left">
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
            totalLeads={rejectedLeads.length}
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
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-red-300"
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

export default RejectedLead;
