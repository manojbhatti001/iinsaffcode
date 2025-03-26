import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../utils/const';

const GetUserAcceptedCompletedConference = () => {
    const [conferences, setConferences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserAcceptedConferences = async () => {
            try {
                const response = await axios.get(`${baseUrl}getUserAcceptedCompletedConference`, {
                    headers: {
                        Authorization: localStorage.getItem("userToken")
                    },
                });
                //   console.log(response);
                setConferences(response.data);
                setLoading(false);
            } catch (err) {
                //   console.log(err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUserAcceptedConferences();
    }, []);

    const formatDate = (date) => date ? new Date(date).toLocaleDateString() : 'N/A';

    if (loading) return <p className="text-center text-xl">Loading...</p>;

    return (
        <div className="p-4 md:p-8 bg-gray-100 min-h-screen w-screen sm:w-full overflow-scroll">
            <h1 className="text-3xl font-bold text-center mb-6">Completed Conferences</h1>
            {/* {conferences.length === 0 ? (
                <p className="text-center text-lg text-gray-600">No accepted conferences found for this user.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {conferences.map((conference) => (
                        <div
                            key={conference._id}
                            className="p-6 bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                        >
                            <h2 className="text-xl font-semibold mb-2 text-gray-800">
                                Conference ID: <span className="text-gray-600">{conference._id}</span>
                            </h2>
                            <div className="text-gray-700 space-y-1">
                                <p><span className="font-medium">Accepted By User:</span> {conference.acceptedByUser || 'N/A'}</p>
                                <p><span className="font-medium">Accepted Date:</span> {formatDate(conference.acceptedDate)}</p>
                                <p><span className="font-medium">Status:</span> {conference.status || 'N/A'}</p>
                                <p><span className="font-medium">Admin Status:</span> {conference.statusByAdmin || 'N/A'}</p>
                                <p><span className="font-medium">Video Date:</span> {formatDate(conference.videoDate)}</p>
                                <p><span className="font-medium">Note:</span> {conference.note || 'No additional notes'}</p>
                            </div>
                            <a 
                                href={conference.videoUrl || '#'} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="block mt-4 text-blue-500 hover:text-blue-600 underline text-sm font-medium"
                            >
                                Watch Video
                            </a>
                        </div>
                    ))}
                </div>
            )} */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 border-b border-gray-300">
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Conference ID</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Accepted By User</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Accepted Date</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Admin Status</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Video Date</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Note</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {conferences.length > 0 ? (
                            conferences.map((conference) => (
                                <tr key={conference._id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-2 text-sm text-gray-800">{conference._id}</td>
                                    <td className="px-4 py-2 text-sm text-gray-800">{conference.acceptedByUser || 'N/A'}</td>
                                    <td className="px-4 py-2 text-sm text-gray-800">{formatDate(conference.acceptedDate)}</td>
                                    <td className="px-4 py-2 text-sm text-gray-800">{conference.status || 'N/A'}</td>
                                    <td className="px-4 py-2 text-sm text-gray-800">{conference.statusByAdmin || 'N/A'}</td>
                                    <td className="px-4 py-2 text-sm text-gray-800">{formatDate(conference.videoDate)}</td>
                                    <td className="px-4 py-2 text-sm text-gray-800">{conference.note || 'No additional notes'}</td>
                                    <td className="px-4 py-2 text-sm text-blue-500">
                                        <a
                                            href={conference.videoUrl || '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block hover:underline"
                                        >
                                            Watch Video
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="px-4 py-2 text-center text-sm text-gray-600">
                                    No accepted conferences found for this user.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GetUserAcceptedCompletedConference;
