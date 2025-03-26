import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { baseUrl } from "../../../utils/const";

const AcceptedDarbarStatus = () => {
  const [darbars, setDarbars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [note, setNote] = useState("");
  const [photo, setPhoto] = useState(null); // State for captured photo
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [readon, setReadon] = useState(false)
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const fetchDarbars = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get(`${baseUrl}getUserAcceptedDarbars`, {
          headers: {
            Authorization: token,
          },
        });
        setDarbars(response.data.userDarbars);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDarbars();
  }, []);

  const handleUpdateClick = (darbar) => {
    setUpdatingId(darbar._id); // Set the darbar ID for updating
    setVideoUrl(darbar.videoUrl);
    setNote(darbar.note)
    if (darbar.videoUrl) {
      setReadon(true)
    }

  };

  const openCamera = () => {
    setIsCameraOpen(true);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((err) => {
        console.error("Error accessing camera:", err);
      });
  };

  const capturePhoto = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 300, 200); // Draw the video frame on the canvas
    canvasRef.current.toBlob((blob) => {
      setPhoto(blob); // Save the photo as a blob
      setIsCameraOpen(false); // Close camera after capturing
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop()); // Stop the camera stream
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setUpdateError(null);

    try {
      const token = localStorage.getItem("userToken");

      const formData = new FormData();
      formData.append("darbarId", updatingId);
      formData.append("videoUrl", videoUrl);
      formData.append("note", note);
      if (photo) {
        formData.append("photo", photo, "photo.jpg"); // Attach captured photo
      }

      await axios.put(
        `${baseUrl}updateDarbarStatusReporter`,
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setVideoUrl("");
      setNote("");
      setPhoto(null);
      setUpdatingId(null);
      setReadon(true)
    } catch (err) {
      setUpdateError(err.response.data.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  // if (error) {
  //   return <div className="text-center text-red-500">{error}</div>;
  // }

  return (
    <div className="container mx-auto p-4  w-screen sm:w-full overflow-scroll">
      <h1 className="text-2xl font-bold mb-4">Accepted Darbars</h1>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Darbar Details</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Darbar ID</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Darbar By</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Location</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Purpose</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Reason</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">People</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Type</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Accepted Date</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Admin Status</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {darbars.length === 0 ? (
                <tr>
                  <td colSpan="12" className="text-center px-4 py-2 text-gray-600">
                    No accepted Darbars found.
                  </td>
                </tr>
              ) : (
                darbars.map((darbar) => (
                  <tr key={darbar._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-800">{darbar.darbarId._id}</td>
                    <td className="px-4 py-2 text-sm text-gray-800">{darbar.darbarId.darbarBy}</td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {new Date(darbar.darbarId.darbarDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {darbar.darbarId.village}, {darbar.darbarId.area}, {darbar.darbarId.darbarCity}, {darbar.darbarId.darbarState} - {darbar.darbarId.pincode}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">{darbar.darbarId.purpose}</td>
                    <td className="px-4 py-2 text-sm text-gray-800">{darbar.darbarId.darbarReason}</td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {darbar.darbarId.peopleAvailable} / {darbar.darbarId.peopleRequired}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">{darbar.darbarId.darbarType}</td>
                    <td className="px-4 py-2 text-sm text-gray-800">{darbar.darbarId.darbarStatus}</td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {new Date(darbar.acceptedDate).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">{darbar.statusByAdmin}</td>
                    <td className="px-4 py-2 text-sm">
                      <button
                        onClick={() => handleUpdateClick(darbar)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {updatingId && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-100">
          <h2 className="text-lg font-bold mb-2">Update Darbar Status</h2>
          {updateError && <p className="text-red-500">{updateError}</p>}
          <form onSubmit={handleUpdateSubmit}>
            <div className="mb-2">
              <label className="block mb-1">Video URL</label>
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                // required
                className="border rounded-lg px-3 py-2 w-full"
                readOnly={readon}
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Note</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                // required
                className="border rounded-lg px-3 py-2 w-full"
                rows="3"
                readOnly={readon}
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Capture Photo</label>
              {isCameraOpen ? (
                <div>
                  <video ref={videoRef} className="w-full h-48 bg-black"></video>
                  <button
                    type="button"
                    onClick={capturePhoto}
                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Capture
                  </button>
                  <canvas ref={canvasRef} width="300" height="200" className="hidden"></canvas>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={openCamera}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Open Camera
                </button>
              )}
              {photo && <p>Photo captured successfully!</p>}
            </div>
            <button
              type="submit"
              className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ${updateLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={updateLoading}
            >
              {updateLoading ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AcceptedDarbarStatus;
