import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../utils/const";

const PaymentHistory = () => {
  const [data, setData] = useState({ leads: [], conference: [], marketer: [] });
  const [selectedType, setSelectedType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showToday, setShowToday] = useState(false);

  const getTransactionAdmin = async () => {
    try {
      const response = await axios.get(`${baseUrl}adminGetAllPaymentHistory`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      });
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTransactionAdmin();
  }, []);

  const filterData = (sectionData) => {
    const today = new Date().toISOString().split("T")[0];
    return sectionData.filter((item) => {
      const transactionDate = new Date(item.paymentDate).toISOString().split("T")[0];
      const { paymentId, orderId, paymentAmount } = item;

      const companyName =
        item.leadId?.companyName ||
        item.conferenceId?.conferenceName ||
        item.advId?.companyName ||
        "";

      const matchesSearch =
        paymentId.includes(searchQuery) ||
        orderId.includes(searchQuery) ||
        companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(paymentAmount).includes(searchQuery);

      const matchesToday = showToday ? transactionDate === today : true;

      return matchesSearch && matchesToday;
    });
  };

  const renderDetails = (items, type) => {
    return items.map((item) => (
      <div
        key={item._id}
        className="bg-white rounded-lg shadow-md p-4 space-y-4 mt-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Transaction ID
            </label>
            <input
              type="text"
              value={item.paymentId}
              className="w-full border border-gray-300 rounded-md p-2"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Order ID
            </label>
            <input
              type="text"
              value={item.orderId}
              className="w-full border border-gray-300 rounded-md p-2"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Payment Amount
            </label>
            <input
              type="text"
              value={`₹${item.paymentAmount}`}
              className="w-full border border-gray-300 rounded-md p-2"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Payment Status
            </label>
            <input
              type="text"
              value={item.paymentStatus}
              className={`w-full border ${item.paymentStatus === "success"
                ? "border-green-500"
                : "border-red-500"
                } rounded-md p-2`}
              readOnly
            />
          </div>
        </div>
        {type === "conference" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Conference Name
              </label>
              <input
                type="text"
                value={item.conferenceId.conferenceName}
                className="w-full border border-gray-300 rounded-md p-2"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Conference Cost
              </label>
              <input
                type="text"
                value={`₹${item.conferenceId.conferenceCost}`}
                className="w-full border border-gray-300 rounded-md p-2"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Conference Purpose
              </label>
              <input
                type="text"
                value={item.conferenceId.conferencePurpose}
                className="w-full border border-gray-300 rounded-md p-2"
                readOnly
              />
            </div>
          </>
        )}
        {type === "leads" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Channel Type
              </label>
              <input
                type="text"
                value={item?.leadId?.channelType}
                className="w-full border border-gray-300 rounded-md p-2"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ad Type
              </label>
              <input
                type="text"
                value={item.leadId?.adType}
                className="w-full border border-gray-300 rounded-md p-2"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Required Views
              </label>
              <input
                type="text"
                value={item.leadId?.requiredViews}
                className="w-full border border-gray-300 rounded-md p-2"
                readOnly
              />
            </div>
          </>
        )}
        {type === "marketer" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                value={item.advId.companyName}
                className="w-full border border-gray-300 rounded-md p-2"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ad Cost
              </label>
              <input
                type="text"
                value={`₹${item.advId.adCost}`}
                className="w-full border border-gray-300 rounded-md p-2"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Channel Type
              </label>
              <input
                type="text"
                value={item.advId.channelType}
                className="w-full border border-gray-300 rounded-md p-2"
                readOnly
              />
            </div>
          </>
        )}
      </div>
    ));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Payment History
      </h2>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="all">All</option>
          <option value="leads">Leads</option>
          <option value="conference">Conference</option>
          <option value="marketer">Marketer</option>
        </select>
        <input
          type="text"
          placeholder="Search by Transaction ID, Order ID, Company Name, or Ad Cost"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-md p-2 flex-1"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showToday}
            onChange={(e) => setShowToday(e.target.checked)}
            className="h-4 w-4"
          />
          Show Today's Transactions
        </label>
      </div>

      {selectedType === "all" || selectedType === "conference" ? (
        <section>
          <h3 className="text-xl font-bold mb-4 text-gray-700 mt-7">Conferences</h3>
          {renderDetails(filterData(data.conference), "conference")}
        </section>
      ) : null}

      {selectedType === "all" || selectedType === "leads" ? (
        <section>
          <h3 className="text-xl font-bold mb-4 text-gray-700  mt-7">Leads</h3>
          {renderDetails(filterData(data.leads), "leads")}
        </section>
      ) : null}

      {selectedType === "all" || selectedType === "marketer" ? (
        <section>
          <h3 className="text-xl font-bold mb-4 text-gray-700 mt-7">Marketers</h3>
          {renderDetails(filterData(data.marketer), "marketer")}
        </section>
      ) : null}
    </div>
  );
};

export default PaymentHistory;
