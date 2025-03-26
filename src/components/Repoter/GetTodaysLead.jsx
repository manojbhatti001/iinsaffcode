import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../utils/const";

const GetTodaysLead = () => {
    const [allLeads, setAllLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const response = await axios.get(`${baseUrl}getLeadsToday-user`, {
                    headers: {
                        Authorization: localStorage.getItem("userToken"),
                    },
                });
                setAllLeads(response.data.todaysLead || []); // Assuming 'todaysLead' is the property in the response
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchLeads();
    }, []);

    const handleEdit = (leadId) => {
        // Add logic to handle edit action
     //   console.log("Edit lead:", leadId);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Today's Leads</h1>
            {loading ? (
                <p className="text-center text-gray-600">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-600">Error: {error}</p>
            ) : allLeads.length === 0 ? (
                <p className="text-center text-gray-600">No relevant leads found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 border">Lead ID</th>
                                <th className="px-4 py-2 border">Ad State</th>
                                <th className="px-4 py-2 border">Ad City</th>
                                <th className="px-4 py-2 border">Ad Description</th>
                                <th className="px-4 py-2 border">Ad Length</th>
                                <th className="px-4 py-2 border">Ad Type</th>
                                <th className="px-4 py-2 border">Channel Type</th>
                                <th className="px-4 py-2 border">Reach People</th>
                                <th className="px-4 py-2 border">Status</th>
                                <th className="px-4 py-2 border">Payment Status</th>
                                <th className="px-4 py-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allLeads.map((lead) => (
                                <tr key={lead._id} className="hover:bg-gray-100">
                                    <td className="px-4 py-2 border">{lead._id}</td>
                                    <td className="px-4 py-2 border">
                                        {lead.adArea[0]?.adState}
                                    </td>
                                    <td className="px-4 py-2 border">{lead.adArea[0]?.adCity}</td>
                                    <td className="px-4 py-2 border">{lead.adDescription}</td>
                                    <td className="px-4 py-2 border">{lead.adLength} seconds</td>
                                    <td className="px-4 py-2 border">{lead.adType}</td>
                                    <td className="px-4 py-2 border">{lead.channelType}</td>
                                    <td className="px-4 py-2 border">{lead.requiredViews / 4}</td>
                                    <td className="px-4 py-2 border">{lead.status}</td>
                                    <td className="px-4 py-2 border">{lead.paymentStatus}</td>
                                    <td className="px-4 py-2 border">
                                        <Link
                                            to={`/getSpecificLeadDetailsReporter?leadId=${lead._id}`}
                                            className="bg-green-500 text-white px-4 py-1 rounded"
                                            onClick={() => handleEdit(lead._id)}
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default GetTodaysLead;