/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../utils/const';
import { useLocation } from 'react-router-dom';

const IdCardDetails = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const cardId = queryParams.get("cardId");

    const [reporterDetails, setReporterDetails] = useState(null);
    const [error, setError] = useState(null);

    const getUserIdCardByCardId = async () => {
        try {
            if (!cardId) {
                console.error("No cardId provided in the query string.");
                return;
            }

            const response = await axios.get(`${baseUrl}reporterIdCard?reporterIdCardId=${cardId}`);
            setReporterDetails(response.data.reporter);
        } catch (err) {
            setError(err?.response?.data?.message || "Error fetching reporter details.");
            console.error("Error fetching reporter ID card:", err);
        }
    };

    useEffect(() => {
        getUserIdCardByCardId();
    }, [cardId]);

    if (error) {
        return <div className="text-red-500 text-center mt-10">{error}</div>;
    }

    if (!reporterDetails) {
        return <div className="text-center mt-10">Loading reporter details...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-sm bg-white shadow-lg rounded-lg overflow-hidden border">
                {/* Front Side */}
                <div className="relative p-4 bg-blue-600 text-white text-center">
                    <h1 className="text-lg font-semibold">Reporter ID Card</h1>
                    <p className="text-sm mt-1">Authorized by iinsaf News Agency</p>
                    <div className="mt-4">
                        <img
                            src={reporterDetails.photoUrl || '/placeholder.jpg'}
                            alt="Reporter Photo"
                            className="w-24 h-24 mx-auto rounded-full border-4 border-white"
                        />
                    </div>
                    <h2 className="mt-4 text-xl font-bold">{reporterDetails.name}</h2>
                    <p className="text-sm">{reporterDetails.designation}</p>
                </div>
                <div className="p-4 space-y-2">
                    <p><strong>Contact:</strong> {reporterDetails.mobile}</p>
                    <p><strong>Email:</strong> {reporterDetails.cardForId.email}</p>
                    <p><strong>City:</strong> {reporterDetails.cardForId.city}</p>
                    <p><strong>State:</strong> {reporterDetails.cardForId.state}</p>
                </div>
            </div>

            {/* Back Side */}
            <div className="w-full max-w-sm mt-4 bg-white shadow-lg rounded-lg overflow-hidden border">
                <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-700 text-center">Personal & Professional Details</h2>
                    <div className="mt-4">
                        <p><strong>Father's Name:</strong> {reporterDetails.fatherName}</p>
                        <p><strong>Gender:</strong> {reporterDetails.cardForId.gender}</p>
                        <p><strong>Blood Group:</strong> {reporterDetails.bloodGroup}</p>
                        <p><strong>Aadhar Card:</strong> {reporterDetails.aadharCardNumber}</p>
                        <p><strong>Status:</strong>
                            <span className={`ml-2 px-2 py-1 text-sm font-medium rounded 
                        ${reporterDetails.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                {reporterDetails.status}
                            </span>
                        </p>
                        <p><strong>Role:</strong> {reporterDetails.cardForId.role}</p>
                        <p><strong>Registered On:</strong> {new Date(reporterDetails.cardForId.date).toLocaleDateString()}</p>
                        <p><strong>Verified:</strong> {reporterDetails.cardForId.isVerified ? 'Yes' : 'No'}</p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default IdCardDetails;
