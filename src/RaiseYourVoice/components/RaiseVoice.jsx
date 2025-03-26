import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { baseUrl } from "../../utils/const";

const RaiseVoice = () => {
  const [voiceData, setVoiceData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    gender: "Male",
    address: "",
    dateOfBirth: "",
    audioFile: null,
    videoFile: null,
    textContent: "",
    occupation: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const navigate = useNavigate();
  const location = useLocation();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVoiceData({ ...voiceData, [name]: value });
  };

  // Handle file changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (file && file.size > 50000000) {
      // Example: 5MB file size limit
      setError("File size exceeds the limit of 5MB.");
      return;
    }
    setVoiceData({ ...voiceData, [name]: file });
  };

  // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Check if phone number is verified
  //   // if (!isPhoneVerified) {
  //   //   setError("Phone number not verified. Please verify your number.");
  //   //   return;
  //   // }

  //   // Validate required fields
  //   const requiredFields = [
  //     "name",
  //     "email",
  //     "phoneNumber",
  //     "address",
  //     "gender",
  //   ];
  //   for (let field of requiredFields) {
  //     if (!voiceData[field]) {
  //       setError(`Please fill out the ${field} field.`);
  //       return;
  //     }
  //   }

  //   setIsLoading(true); // Show loading state
  //   try {
  //     // Prepare FormData for file uploads
  //     const formData = new FormData();
  //     for (let key in voiceData) {
  //       if (voiceData[key] && key !== "audioFile" && key !== "videoFile") {
  //         formData.append(key, voiceData[key]);
  //       }
  //     }
  //     if (voiceData.audioFile) {
  //       formData.append("audioFile", voiceData.audioFile);
  //     }
  //     if (voiceData.videoFile) {
  //       formData.append("videoFile", voiceData.videoFile);
  //     }

  //     // Post data to backend
  //     const response = await axios.post(
  //       `${baseUrl}createVoiceEntry`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     if (response.status === 201) {
  //       setError(""); // Clear any previous error
  //       setIsLoading(false); // Hide loading state
  //       navigate("/next-page"); // Redirect to the next page
  //     }
  //   } catch (err) {
  //     setIsLoading(false); // Hide loading state in case of error
  //     setError(
  //       err.response?.data?.message ||
  //         "An error occurred while submitting your voice data."
  //     );
  //     console.error("Error submitting form:", err);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if phone number is verified
    // if (!isPhoneVerified) {
    //   setError("Phone number not verified. Please verify your number.");
    //   return;
    // }

    // Validate required fields
    const requiredFields = [
      "name",
      "email",
      "phoneNumber",
      "address",
      "gender",
    ];
    for (let field of requiredFields) {
      if (!voiceData[field]) {
        setError(`Please fill out the ${field} field.`);
        return;
      }
    }

    // Check if the audio or video files have valid types
    const validAudioTypes = ["audio/mpeg", "audio/wav", "audio/mp3"];
    const validVideoTypes = ["video/mp4", "video/webm", "video/avi"];

    if (voiceData.audioFile && !validAudioTypes.includes(voiceData.audioFile.type)) {
      alert("Invalid file type. You can only upload an audio file (MP3, WAV, MP4).");
      return;
    }

    if (voiceData.videoFile && !validVideoTypes.includes(voiceData.videoFile.type)) {
      alert("Invalid file type. You can only upload a video file (MP4, WebM, AVI).");
      return;
    }

    setIsLoading(true); // Show loading state
    try {
      // Prepare FormData for file uploads
      const formData = new FormData();
      for (let key in voiceData) {
        if (voiceData[key] && key !== "audioFile" && key !== "videoFile") {
          formData.append(key, voiceData[key]);
        }
      }
      if (voiceData.audioFile) {
        formData.append("audioFile", voiceData.audioFile);
      }
      if (voiceData.videoFile) {
        formData.append("videoFile", voiceData.videoFile);
      }

      // Post data to backend
      const response = await axios.post(
        `${baseUrl}createVoiceEntry`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setError(""); // Clear any previous error
        setIsLoading(false); // Hide loading state
        // window.alert("Your Voice Is Raised Successfully ! Your Voice ID => " , response.data.msg); 
        window.alert(`Your Voice id is => ${response.data.voice._id}`)
        console.log(response.data.voice._id)
        navigate("/getUserRaiseVoice", { state: { phoneNumber: voiceData.phoneNumber } });
      }
    } catch (err) {
      setIsLoading(false); // Hide loading state in case of error
      setError(
        err.response?.data?.message ||
        "An error occurred while submitting your voice data."
      );

      console.error("Error submitting form:", err);
      window.alert("You Can Only Raise Your Voice Once After Verifying The Otp To Raise Your Voice Again Reverify The Otp Again")
      navigate("/voice")
    }
  };


  useEffect(() => {

    // If you want to prefill any data from the location state or URL params
    if (location.state) {
      setVoiceData({ ...voiceData, ...location.state });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const goToUserVoicesByPhoneNumber = () => {
    navigate("/getUserRaiseVoice", { state: { phoneNumber: voiceData.phoneNumber } });
  }
  return (
    <div className="min-h-screen flex items-center justify-center mt-20 bg-gray-100">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
          Raise Your Voice
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={voiceData.name}
                onChange={handleChange}
                className="w-full px-5 py-4 text-lg border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={voiceData.email}
                onChange={handleChange}
                className="w-full px-5 py-4 text-lg border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
          </div>

          <div className="relative">
            <input
              type="tel"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Allow only digits
              }}
              name="phoneNumber"
              placeholder="Your Phone Number"
              value={voiceData.phoneNumber}
              onChange={handleChange}
              className="w-full px-5 py-4 text-lg border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              disabled
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <select
                name="gender"
                value={voiceData.gender}
                onChange={handleChange}
                className="w-full px-5 py-4 text-lg border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="relative">
              <input
                type="text"
                name="address"
                placeholder="Your Address"
                value={voiceData.address}
                onChange={handleChange}
                className="w-full px-5 py-4 text-lg border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <input
                type="date"
                name="dateOfBirth"
                value={voiceData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-5 py-4 text-lg border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
            <br />
            <div className="relative">
              <label htmlFor="Audio">Audio</label>
              <input
                type="file"
                name="audioFile"
                onChange={handleFileChange}
                className="w-full px-5 py-4 text-lg border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
          </div>

          <div className="relative">
            <label htmlFor="Video">Video</label>
            <input
              type="file"
              name="videoFile"
              onChange={handleFileChange}
              className="w-full px-5 py-4 text-lg border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
          </div>

          <div className="relative">
            <textarea
              name="textContent"
              placeholder="Your Message"
              value={voiceData.textContent}
              onChange={handleChange}
              className="w-full px-5 py-4 text-lg border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
          </div>

          <div className="relative">
            <input
              type="text"
              name="occupation"
              placeholder="Your Occupation"
              value={voiceData.occupation}
              onChange={handleChange}
              className="w-full px-5 py-4 text-lg border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
          </div>

          {/* {error && <p className="text-red-500 text-sm mt-2">{error}</p>} */}

          <div className="flex justify-center gap-5">
            <button
              type="submit"
              className="w-48 py-4 text-white font-bold rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300 shadow-lg hover:shadow-xl"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
            <button onClick={goToUserVoicesByPhoneNumber}
              className="w-48 py-4 text-white font-bold rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300 shadow-lg hover:shadow-xl"
              disabled={isLoading}
            >
              Check All Voices
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default RaiseVoice;
