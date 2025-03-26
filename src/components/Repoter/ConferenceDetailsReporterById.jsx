import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { baseUrl } from '../../utils/const';
import ConferenceStatusViewDetails from './ConferenceStatusView';

const ConferenceDetailsReporterById = () => {
    const [conference, setConference] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const conferenceId = queryParams.get("conferenceId");

    useEffect(() => {
        const fetchConference = async () => {
            try {
                const token = localStorage.getItem("userToken");
             //   console.log("Conference ID:", conferenceId);
                const response = await axios.get(`${baseUrl}getSpecificeConferenceDetails`, {
                    params: { conferenceId },
                    headers: { authorization: token }
                });
             //   console.log(response)
                setConference(response.data.conference);
            } catch (err) {
             //   console.log(err)
                setError(err.response ? err.response.data.message : 'Error fetching conference');
            } finally {
                setLoading(false);
            }
        };

        fetchConference();
    }, [conferenceId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!conference) return <div>No conference found.</div>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-blue-600 mb-6">{conference.conferenceName}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <p><strong className="text-gray-700">Organizer:</strong> {conference.conferenceBy}</p>
                <p><strong className="text-gray-700">WhatsApp Number:</strong> {conference.whatsappNumber}</p>
                <p><strong className="text-gray-700">Email Address:</strong> {conference.conferenceEmailAddress}</p>
                <p><strong className="text-gray-700">Number of Reporters:</strong> {conference.numberOfReporters}</p>
                <p><strong className="text-gray-700">Cost:</strong> ${conference.conferenceCost}</p>
                <p><strong className="text-gray-700">Date:</strong> {new Date(conference.conferenceDate).toLocaleDateString()}</p>
                <p><strong className="text-gray-700">Channel State:</strong> {conference.conferenceChannelState}</p>
                <p><strong className="text-gray-700">Channel City:</strong> {conference.conferenceChannelCity}</p>
                <p><strong className="text-gray-700">Area:</strong> {conference.conferenceArea}</p>
                <p><strong className="text-gray-700">Pin Code:</strong> {conference.conferencePinCode}</p>
                <p><strong className="text-gray-700">Purpose:</strong> {conference.conferencePurpose}</p>
                <p><strong className="text-gray-700">Status:</strong> {conference.status}</p>
                <p><strong className="text-gray-700">Payment Status:</strong> {conference.paymentStatus}</p>
                <p><strong className="text-gray-700">Created At:</strong> {new Date(conference.createdAt).toLocaleDateString()}</p>
                <p><strong className="text-gray-700">Updated At:</strong> {new Date(conference.updatedAt).toLocaleDateString()}</p>
            </div>
            <ConferenceStatusViewDetails conferenceId={conferenceId} />
        </div>
    );
};

export default ConferenceDetailsReporterById;
