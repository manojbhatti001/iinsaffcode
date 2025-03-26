import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../../../../utils/const';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);

  const getTransactionConference = async () => {
    try {
      const response = await axios.get(`${baseUrl}paymentHistoryLead`, {
        headers: {
          Authorization: localStorage.getItem('userToken'),
        },
      });
      setPayments(response.data.payments);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTransactionConference();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Lead Payment History
      </h2>
      {payments.length === 0 ? (
        <p className="text-center text-gray-600">Loading transactions...</p>
      ) : (
        <div className="space-y-4">
          {payments.map((payment) => (
            <div
              key={payment._id}
              className="bg-white rounded-lg shadow-md p-4 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Transaction ID
                  </label>
                  <input
                    type="text"
                    value={payment.paymentId}
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
                    value={`₹${payment.paymentAmount}`}
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
                    value={payment.paymentStatus}
                    className={`w-full border ${payment.paymentStatus === 'success'
                        ? 'border-green-500'
                        : 'border-red-500'
                      } rounded-md p-2`}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Payment Date
                  </label>
                  <input
                    type="text"
                    value={new Date(payment.paymentDate).toLocaleString()}
                    className="w-full border border-gray-300 rounded-md p-2"
                    readOnly
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Channel Type
                  </label>
                  <input
                    type="text"
                    value={payment?.leadId?.channelType}
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
                    value={payment?.leadId?.adType}
                    className="w-full border border-gray-300 rounded-md p-2"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Ad Area
                  </label>
                  <input
                    type="text"
                    value={payment?.leadId?.adArea
                      .map((area) => `${area.adCity}, ${area.adState}`)
                      .join(' | ')}
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
                    value={payment.orderId}
                    className="w-full border border-gray-300 rounded-md p-2"
                    readOnly
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <input
                    type="text"
                    value={payment?.leadId?.adDescription || 'No Description'}
                    className="w-full border border-gray-300 rounded-md p-2"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Remarks
                  </label>
                  <input
                    type="text"
                    value={payment.remarks}
                    className="w-full border border-gray-300 rounded-md p-2"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Admin Note
                  </label>
                  <input
                    type="text"
                    value={payment?.leadId?.adminNote || 'No Notes'}
                    className="w-full border border-gray-300 rounded-md p-2"
                    readOnly
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
