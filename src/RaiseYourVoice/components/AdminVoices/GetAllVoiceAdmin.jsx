// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { baseUrl } from "../../../utils/const";
// import { Link } from "react-router-dom";

// const GetAllVoiceAdmin = () => {
//   const [voices, setVoices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchVoices = async () => {
//       try {
//         const response = await axios.get(`${baseUrl}getAllVoice`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("adminToken")}`, // Make sure to retrieve token if needed
//           },
//         });
//         setVoices(response.data.data);
//       } catch (err) {
//         setError("Failed to fetch voices");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVoices();
//   }, []);

//   const handleViewClick = (voiceId) => {
//     // Implement the view logic, e.g., navigate to a detailed page or open a modal
//  //   console.log("View button clicked for voice with ID:", voiceId);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-semibold text-center mb-4">All Voices</h1>

//       {loading && <p className="text-center">Loading...</p>}
//       {error && <p className="text-center text-red-500">{error}</p>}

//       {!loading && !error && (
//         <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {voices.map((voice) => (
//             <div
//               key={voice._id}
//               className="border p-4 rounded-lg shadow-lg space-y-4"
//             >
//               <h2 className="text-xl font-semibold">{voice.name}</h2>
//               <p>
//                 <strong>Phone Number:</strong> {voice.phoneNumber}
//               </p>
//               <p>
//                 <strong>Email:</strong> {voice.email}
//               </p>
//               <p>
//                 <strong>Gender:</strong> {voice.gender}
//               </p>
//               <p>
//                 <strong>Date of Birth:</strong>{" "}
//                 {new Date(voice.dateOfBirth).toLocaleDateString()}
//               </p>
//               <p>
//                 <strong>Address:</strong> {voice.address}
//               </p>
//               <p>
//                 <strong>Occupation:</strong> {voice.occupation}
//               </p>
//               <p>
//                 <strong>Text Content:</strong> {voice.textContent}
//               </p>

//               <div>
//                 <strong>Audio File:</strong>
//                 <audio controls>
//                   <source src={voice.audioFile} type="audio/mp3" />
//                   Your browser does not support the audio element.
//                 </audio>
//               </div>

//               <div>
//                 <strong>Video File:</strong>
//                 <video controls className="w-full">
//                   <source src={voice.videoFile} type="video/mp4" />
//                   Your browser does not support the video element.
//                 </video>
//               </div>

//               <p>
//                 <strong>Verification Status:</strong>{" "}
//                 {voice.isVerified === "approved" ? "Approved" : "Not Approved"}
//               </p>
//               <p>
//                 <strong>Created At:</strong>{" "}
//                 {new Date(voice.createdAt).toLocaleString()}
//               </p>
//               <p>
//                 <strong>Updated At:</strong>{" "}
//                 {new Date(voice.updatedAt).toLocaleString()}
//               </p>

//               {/* View Button */}
//               <Link
//                 to={`/updateVoiceStatus?id=${voice._id}`}
//                 onClick={() => handleViewClick(voice._id)}
//                 className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 transition duration-200"
//               >
//                 View
//               </Link>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default GetAllVoiceAdmin;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { baseUrl } from "../../../utils/const";
import { Link } from "react-router-dom";

const GetAllVoiceAdmin = () => {
  const [voices, setVoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const response = await axios.get(`${baseUrl}getAllVoice`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`, // Make sure to retrieve token if needed
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
  };

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center mb-4">Raise Voices</h1>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Phone</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Gender</th>
                <th className="border px-4 py-2">DOB</th>
                {/* <th className="border px-4 py-2">Address</th>
                <th className="border px-4 py-2">Occupation</th>
                <th className="border px-4 py-2">Text Content</th>
                <th className="border px-4 py-2">Audio</th>
                <th className="border px-4 py-2">Video</th> */}
                <th className="border px-4 py-2">Create At</th>
                <th className="border px-4 py-2">Verification</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {voices.map((voice) => (
                <tr key={voice._id}>
                  <td className="border px-4 py-2">{voice._id}</td>
                  <td className="border px-4 py-2">{voice.name}</td>
                  <td className="border px-4 py-2">{voice.phoneNumber}</td>
                  <td className="border px-4 py-2">{voice.email}</td>
                  <td className="border px-4 py-2">{voice.gender}</td>
                  <td className="border px-4 py-2 text-nowrap">
                    {new Date(voice.dateOfBirth).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2 text-nowrap">
                    {new Date(voice.createdAt).toLocaleDateString()}
                  </td>
                  {/* <td className="border px-4 py-2">{voice.address}</td>
                  <td className="border px-4 py-2">{voice.occupation}</td>
                  <td className="border px-4 py-2">{voice.textContent}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() =>
                        openModal({
                          type: "audio",
                          src: voice.audioFile,
                        })
                      }
                      className="text-blue-500 underline"
                    >
                      Play Audio
                    </button>
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() =>
                        openModal({
                          type: "video",
                          src: voice.videoFile,
                        })
                      }
                      className="text-blue-500 underline"
                    >
                      Play Video
                    </button>
                  </td> */}
                  <td className="border px-4 py-2">
                    {voice.isVerified === "approved"
                      ? "Approved"
                      : "Not Approved"}
                  </td>
                  <td className="border px-4 py-2">
                    <Link
                      to={`/admin/getvoicesByIdAdmin?id=${voice._id}`}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Audio/Video */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Media Modal"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg p-4 max-w-lg w-full">
          <button
            onClick={closeModal}
            className="text-red-500 float-right text-lg"
          >
            &times;
          </button>
          {modalContent?.type === "audio" && (
            <audio controls className="w-full mt-4">
              <source src={modalContent.src} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          )}
          {modalContent?.type === "video" && (
            <video controls className="w-full mt-4">
              <source src={modalContent.src} type="video/mp4" />
              Your browser does not support the video element.
            </video>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default GetAllVoiceAdmin;
