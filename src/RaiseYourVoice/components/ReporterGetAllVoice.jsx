import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../utils/const";

const ReporterGetAllVoice = () => {
  const [voices, setVoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const response = await axios.get(`${baseUrl}getAllApprovedVoice`, {
          headers: {
            Authorization: localStorage.getItem("userToken"), // Make sure to retrieve token if needed
          },
        });
        setVoices(response.data.data);
      } catch (err) {
        setError("Failed to fetch voices");
      } finally {
        setLoading(false);
      }
    };

    fetchVoices();
  }, []);

  const handleViewClick = (voiceId) => {
    // Implement the view logic, e.g., navigate to a detailed page or open a modal
 //   console.log("View button clicked for voice with ID:", voiceId);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center mb-4">All Voices</h1>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {voices.map((voice) => (
            <div
              key={voice._id}
              className="border p-4 rounded-lg shadow-lg space-y-4"
            >
              <h2 className="text-xl font-semibold">{voice.name}</h2>
              <p>
                <strong>Phone Number:</strong> {voice.phoneNumber}
              </p>
              <p>
                <strong>Email:</strong> {voice.email}
              </p>
              <p>
                <strong>Gender:</strong> {voice.gender}
              </p>
              <p>
                <strong>Date of Birth:</strong>{" "}
                {new Date(voice.dateOfBirth).toLocaleDateString()}
              </p>
              <p>
                <strong>Address:</strong> {voice.address}
              </p>
              <p>
                <strong>Occupation:</strong> {voice.occupation}
              </p>
              <p>
                <strong>Text Content:</strong> {voice.textContent}
              </p>

              <div>
                <strong>Audio File:</strong>
                <audio controls>
                  <source src={voice.audioFile} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
              </div>

              <div>
                <strong>Video File:</strong>
                <video controls className="w-full">
                  <source src={voice.videoFile} type="video/mp4" />
                  Your browser does not support the video element.
                </video>
              </div>

              <p><strong>Verification Status:</strong> {voice.isVerified === 'approved' ? 'Approved' : 'Not Approved'}</p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(voice.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Updated At:</strong>{" "}
                {new Date(voice.updatedAt).toLocaleString()}
              </p>

              {/* View Button */}
              {/* <button
                onClick={() => handleViewClick(voice._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 transition duration-200"
              >
                View
              </button> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReporterGetAllVoice;
