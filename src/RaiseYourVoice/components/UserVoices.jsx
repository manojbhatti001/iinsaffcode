import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../utils/const';

const UserVoices = () => {
    const location = useLocation();
    const [userVoices, setUserVoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Access the phoneNumber from the location state
    const { phoneNumber } = location.state || {};

    useEffect(() => {
        // If phoneNumber is not available, handle the case
        if (!phoneNumber) {
            setError('Phone number is missing!');
            setLoading(false);
            return;
        }

        // Fetch user voices based on phoneNumber
        const fetchUserVoices = async () => {
            try {
                const response = await axios.get(`${baseUrl}getUserVoices?phoneNumber=${phoneNumber}`);
                setUserVoices(response.data.data);  // Assuming response contains the user voices in `data`
                setLoading(false);
            } catch (err) {
                setError('Error fetching user voices');
                setLoading(false);
            }
        };

        fetchUserVoices();
    }, [phoneNumber]);

    return (
        <div className='mt-36'>
            {/* <h2>User Voices</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : userVoices.length === 0 ? (
                <p>No voices found for this phone number.</p>
            ) : (
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Phone Number</th>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">Address</th>
                            <th className="border px-4 py-2">Gender</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Audio File</th>
                            <th className="border px-4 py-2">Video File</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userVoices.map((voice) => (
                            <tr key={voice._id}>
                                <td className="border px-4 py-2">{voice.name || "Not Provided"}</td>
                                <td className="border px-4 py-2">{voice.phoneNumber || "Not Provided"}</td>
                                <td className="border px-4 py-2">{voice.email || "Not Provided"}</td>
                                <td className="border px-4 py-2">{voice.address || "Not Provided"}</td>
                                <td className="border px-4 py-2">{voice.gender || "Not Provided"}</td>
                                <td className="border px-4 py-2">{voice.status || "Not Provided"}</td>
                                <td className="border px-4 py-2">
                                    <a href={voice.audioFile} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                        Audio
                                    </a>
                                </td>
                                <td className="border px-4 py-2">
                                    <a href={voice.videoFile} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                        Video
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )} */}
            <h2 className="text-2xl font-semibold mb-4">User Voices</h2>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : userVoices.length === 0 ? (
                <p>No voices found for this phone number.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-separate border-spacing-0 bg-white shadow-lg rounded-lg">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Phone Number</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Email</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Address</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Gender</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Audio File</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Video File</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userVoices.map((voice) => (
                                <tr key={voice._id} className="border-t hover:bg-gray-50 transition duration-300">
                                    <td className="px-6 py-4 text-sm text-gray-700">{voice.name || "Not Provided"}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{voice.phoneNumber || "Not Provided"}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{voice.email || "Not Provided"}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{voice.address || "Not Provided"}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{voice.gender || "Not Provided"}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{voice.status || "Not Provided"}</td>
                                    <td className="px-6 py-4 text-sm text-blue-600">
                                        <a href={voice.audioFile} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                            Audio
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-blue-600">
                                        <a href={voice.videoFile} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                            Video
                                        </a>
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

export default UserVoices;
