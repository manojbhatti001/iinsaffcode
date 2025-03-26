import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "../../../redux/AdminRedux/adminGetAllLeadsSlicer";
import { Link } from "react-router-dom";

const GetAllLeads = () => {
  const dispatch = useDispatch();
  const { leads, status } = useSelector((state) => state.adminLeads);

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  const handleViewClick = (leadId) => {
    // Action when the View button is clicked, you can navigate to a detailed page or open a modal
 //   console.log("View button clicked for lead:", leadId);
    // Add your view logic here
  };

  return (
    <div className="container mx-auto p-4">
      {status === "succeeded" && leads.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-3 px-6 text-gray-600 font-bold">Lead By</th>
                <th className="py-3 px-6 text-gray-600 font-bold">Ad Area</th>
                <th className="py-3 px-6 text-gray-600 font-bold">Ad Cost</th>
                <th className="py-3 px-6 text-gray-600 font-bold">
                  Ad Description
                </th>
                <th className="py-3 px-6 text-gray-600 font-bold">Ad Type</th>
                <th className="py-3 px-6 text-gray-600 font-bold">
                  Channel Type
                </th>
                <th className="py-3 px-6 text-gray-600 font-bold">
                  Payment Status
                </th>
                <th className="py-3 px-6 text-gray-600 font-bold">Status</th>
                <th className="py-3 px-6 text-gray-600 font-bold">
                Reach People
                </th>
                <th className="py-3 px-6 text-gray-600 font-bold">
                  Admin Note
                </th>
                <th className="py-3 px-6 text-gray-600 font-bold">
                  Created Date
                </th>
                <th className="py-3 px-6 text-gray-600 font-bold text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-6">{lead.leadBy}</td>
                  <td className="py-3 px-6">
                    {lead.adArea.length > 0
                      ? `${lead.adArea[0].adCity}, ${lead.adArea[0].adState}`
                      : "N/A"}
                  </td>
                  <td className="py-3 px-6">{lead.adCost}</td>
                  <td className="py-3 px-6">{lead.adDescription}</td>
                  <td className="py-3 px-6">{lead.adType}</td>
                  <td className="py-3 px-6">{lead.channelType}</td>
                  <td className="py-3 px-6">{lead.paymentStatus}</td>
                  <td className="py-3 px-6">{lead.status}</td>
                  <td className="py-3 px-6">{lead.requiredViews}</td>
                  <td className="py-3 px-6">{lead.adminNote}</td>
                  <td className="py-3 px-6">
                    {new Date(lead.createdDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <Link
                      to={`/admin/updateLeads?leadId=${lead._id}`}
                      onClick={() => handleViewClick(lead._id)}
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
        <p className="text-center text-gray-500">No leads found.</p>
      )}
    </div>
  );
};

export default GetAllLeads;
