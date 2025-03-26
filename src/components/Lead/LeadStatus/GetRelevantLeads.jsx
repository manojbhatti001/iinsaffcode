import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRelevantLeads } from "../../../redux/leadSlicer";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../utils/const";

const GetRelevantLeads = () => {
  const dispatch = useDispatch();
  const { allLeads, loading, error } = useSelector((state) => state.lead);
  const location = useLocation();
  const [todayOnly, setTodayOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [priceData, setPriceData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken")
    if (!token) {
      localStorage.clear()
      window.location.href = '/login'
    } else {
      dispatch(fetchRelevantLeads());
    }
  }, [dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("stat") === "today") {
      setTodayOnly(true);
    }
  }, [location]);

  useEffect(() => {
    filterLeads();
  }, [todayOnly, searchTerm, allLeads]);

  useEffect(() => {
    const getPriceData = async () => {
      const response = await axios.get(`${baseUrl}getPricing`);
      setPriceData(response.data)
    }

    getPriceData();
  }, [])

  const filterLeads = () => {
    let leads = [...allLeads];

    // Filter by today's date
    if (todayOnly) {
      const todayDate = new Date().toISOString().split("T")[0];
      leads = leads.filter(
        (lead) => new Date(lead.createdDate).toISOString().split("T")[0] === todayDate
      );
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      leads = leads.filter(
        (lead) =>
          lead.adLength.toString().includes(term) ||
          lead.adType.toLowerCase().includes(term) ||
          lead.channelType.toLowerCase().includes(term) ||
          lead.requiredViews.toString().includes(term)
      );
    }

    setFilteredLeads(leads);
  };

  const handleEdit = (leadId) => {
    // Add logic to handle edit action
    // console.log("Edit lead:", leadId);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Relevant Leads</h1>
      <div className="flex justify-between mb-4">
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={todayOnly}
              onChange={(e) => setTodayOnly(e.target.checked)}
              className="form-checkbox"
            />
            <span>Show Today&apos;s Entries</span>
          </label>
        </div>
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Ad Length, Ad Type, Channel Type "
            className="border px-4 py-2 rounded w-full"
          />
        </div>
      </div>
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-600">Error: {error}</p>
      ) : filteredLeads.length === 0 ? (
        <p className="text-center text-gray-600">No relevant leads found.</p>
      ) : (
        <div className="table-container rounded-2xl overflow-x-auto">
          <table className="scrollable-table min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-3 border">Lead ID</th>
                <th className="px-4 py-3 border">Ad State</th>
                <th className="px-4 py-3 border">Ad City</th>
                <th className="px-4 py-3 border">Ad Description</th>
                <th className="px-4 py-3 border">Ad Length</th>
                <th className="px-4 py-3 border">Ad Type</th>
                <th className="px-4 py-3 border">Channel Type</th>
                <th className="px-4 py-3 border">Reach People</th>
                <th className="px-4 py-3 border">Your Reach Amount</th>
                <th className="px-4 py-3 border">Profit</th>
                <th className="px-4 py-3 border">Status</th>
                <th className="px-4 py-2 border">Update Status</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredLeads.map((lead) => (
                <tr key={lead._id}>
                  <td className="border px-4 py-2">{lead._id}</td>
                  <td>{lead.adArea[0]?.adState}</td>
                  <td>{lead.adArea[0]?.adCity}</td>
                  <td>{lead.adDescription}</td>
                  <td>{lead.adLength} seconds</td>
                  <td>{lead.adType}</td>
                  <td>{lead.channelType}</td>
                  <td>{lead.requiredViews}</td>
                  <td>{1000}</td>
                  <td>{(priceData.reporterPricePerRequestedView * 1000) + (priceData.reporterPriceAdLength * lead.adLength)}</td>
                  <td>{lead.status}</td>
                  <td>
                    <Link
                      to={`getSpecificLeadDetailsReporter?leadId=${lead._id}`}
                      className="bg-green-500 text-white px-4 py-1 rounded"
                    >
                      Accept/Reject
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

export default GetRelevantLeads;