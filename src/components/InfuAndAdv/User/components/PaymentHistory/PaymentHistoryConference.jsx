import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../../../../utils/const';

const PaymentHistoryConference = () => {
  const [payments, setPayments] = useState([]);

  const getTransactionConference = async () => {
    try {
      const response = await axios.get(`${baseUrl}paymentHistoryConference`, {
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
        Conference Payment History
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
                    className={`w-full border ${
                      payment.paymentStatus === 'success'
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
                    Conference Name
                  </label>
                  <input
                    type="text"
                    value={payment.conferenceId.conferenceName}
                    className="w-full border border-gray-300 rounded-md p-2"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Conference Email
                  </label>
                  <input
                    type="text"
                    value={payment.conferenceId.conferenceEmailAddress}
                    className="w-full border border-gray-300 rounded-md p-2"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Conference Area
                  </label>
                  <input
                    type="text"
                    value={`${payment.conferenceId.conferenceChannelCity}, ${payment.conferenceId.conferenceChannelState}`}
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
                    Purpose
                  </label>
                  <input
                    type="text"
                    value={payment.conferenceId.conferencePurpose}
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentHistoryConference;
