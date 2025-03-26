import React, { useState } from 'react';
import { baseUrl } from '../../utils/const';
import axios from 'axios';

const GetVoiceDataById = () => {
    const [id, setId] = useState('');
    const [voiceData, setVoiceData] = useState(null);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setId(e.target.value); // Update the input value
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!id) {
            window.alert('ID is required');
            return;
        }

        try {
            const response = await axios.get(`${baseUrl}getVoiceByIdUser`, {
                params: {
                    id: id, // Pass the ID as a query parameter
                },
            });

            const data = response.data;

            if (data.success) {
                setVoiceData(data.data); // Update state with the fetched voice data
                setError('');
            } else {
                setError(data.message); // If there's an error, display the message
                setVoiceData(null); // Clear any previous data
            }
        } catch (error) {
            setError('Server Error');
            setVoiceData(null);
        }
    };

    return (
        <div className="p-6 mt-32">
            <h2 className="text-xl font-semibold mb-4">Get Voice Data by ID</h2>

            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    value={id}
                    onChange={handleChange}
                    className="px-4 py-2 border rounded-lg w-full mb-4"
                    placeholder="Enter Voice ID"
                />
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                >
                    Submit
                </button>
            </form>

            {error && <p className="text-red-500">{error}</p>}

            {voiceData && (
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold text-blue-600 mb-4">Voice Information</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <p className="font-medium text-gray-700">
                                <strong>Name:</strong>
                                <input type="text" value={voiceData.name} readOnly className="w-full mt-1 p-2 border border-gray-300 rounded" />
                            </p>

                            <p className="font-medium text-gray-700">
                                <strong>Phone Number:</strong>
                                <input type="tel" onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Allow only digits
                                }}
                                    value={voiceData.phoneNumber}
                                    readOnly
                                    className="w-full mt-1 p-2 border border-gray-300 rounded" />
                            </p>

                            <p className="font-medium text-gray-700">
                                <strong>Email:</strong>
                                <input type="email" value={voiceData.email} readOnly className="w-full mt-1 p-2 border border-gray-300 rounded" />
                            </p>

                            <p className="font-medium text-gray-700">
                                <strong>Gender:</strong>
                                <input type="text" value={voiceData.gender} readOnly className="w-full mt-1 p-2 border border-gray-300 rounded" />
                            </p>

                            <p className="font-medium text-gray-700">
                                <strong>Occupation:</strong>
                                <input type="text" value={voiceData.occupation} readOnly className="w-full mt-1 p-2 border border-gray-300 rounded" />
                            </p>

                            <p className="font-medium text-gray-700">
                                <strong>Status:</strong>
                                <input type="text" value={voiceData.status} readOnly className="w-full mt-1 p-2 border border-gray-300 rounded" />
                            </p>

                            <p className="font-medium text-gray-700">
                                <strong>Address:</strong>
                                <input type="text" value={voiceData.address} readOnly className="w-full mt-1 p-2 border border-gray-300 rounded" />
                            </p>

                            <p className="font-medium text-gray-700">
                                <strong>Text Content:</strong>
                                <input type="text" value={voiceData.textContent} readOnly className="w-full mt-1 p-2 border border-gray-300 rounded" />
                            </p>

                            <p className="font-medium text-gray-700">
                                <strong>Created At:</strong>
                                <input type="text" value={new Date(voiceData.createdAt).toLocaleString()} readOnly className="w-full mt-1 p-2 border border-gray-300 rounded" />
                            </p>

                            <p className="font-medium text-gray-700">
                                <strong>Updated At:</strong>
                                <input type="text" value={new Date(voiceData.updatedAt).toLocaleString()} readOnly className="w-full mt-1 p-2 border border-gray-300 rounded" />
                            </p>

                            <p className="font-medium text-gray-700">
                                <strong>Is Verified:</strong>
                                <input type="text" value={voiceData.isVerified ? 'Yes' : 'No'} readOnly className="w-full mt-1 p-2 border border-gray-300 rounded" />
                            </p>

                            <p className="font-medium text-gray-700">
                                <strong>Date of Birth:</strong>
                                <input type="text" value={new Date(voiceData.dateOfBirth).toLocaleDateString()} readOnly className="w-full mt-1 p-2 border border-gray-300 rounded" />
                            </p>
                        </div>
                    </div>


                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h4 className="text-xl font-semibold text-blue-600 mb-4">Media Files</h4>
                        <div className="space-y-4">
                            <div>
                                <h5 className="font-semibold text-gray-700">Audio File:</h5>
                                <audio controls className="w-full mt-2">
                                    <source src={voiceData.audioFile} type="audio/mp3" />
                                    Your browser does not support the audio element.
                                </audio>
                            </div>

                            <div>
                                <h5 className="font-semibold text-gray-700">Video File:</h5>
                                <video controls className="w-full mt-2">
                                    <source src={voiceData.videoFile} type="video/mp4" />
                                    Your browser does not support the video element.
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GetVoiceDataById;
