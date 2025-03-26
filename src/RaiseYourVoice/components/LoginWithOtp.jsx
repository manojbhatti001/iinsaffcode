import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../utils/const";
import { Link, useNavigate } from "react-router-dom";

const LoginWithOtp = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSendOtp = async () => {
    try {
      const response = await axios.post(`${baseUrl}voiceSend-otp`, {
        phoneNumber,
      });
      // Check if the response has a success message
      if (response.data.msg === "OTP sent successfully") {
        setOtpSent(true);
        setError(null); // Clear any previous errors
        //   console.log("OTP sent to:", phoneNumber);
      }
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(`${baseUrl}voiceVerify-otp`, {
        phoneNumber,
        otp,
      });
      if (response.data.msg === "OTP verified successfully") {
        setError(null);
        navigate("/raiseVoice", { state: { phoneNumber } });
        //   console.log("OTP verified successfully");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Error verifying OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-5xl flex flex-col md:flex-row bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Left Section */}
        <div className="flex-1 flex flex-col justify-center items-center p-8 space-y-6">
          <h2 className="text-4xl font-extrabold text-gray-800">
            Raise Your Voice
          </h2>
          <div className="w-full max-w-md space-y-4">
            <div className="relative">
              <input
                type="tel"
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Allow only digits
                }}
                placeholder="Your Phone Number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                className="w-full px-5 py-4 pl-12 text-lg border rounded-full bg-gray-100 focus:outline-none focus:border-blue-400 transition-all duration-300 hover:shadow-lg hover:bg-white"
              />
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                📞
              </span>
            </div>

            {otpSent && (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={handleOtpChange}
                  className="w-full px-5 py-4 pl-12 text-lg border rounded-full bg-gray-100 focus:outline-none focus:border-blue-400 transition-all duration-300 hover:shadow-lg hover:bg-white"
                />
                <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                  🔒
                </span>
              </div>
            )}

            <button
              onClick={otpSent ? handleVerifyOtp : handleSendOtp}
              className="w-full py-4 text-white font-bold rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {otpSent ? "VERIFY OTP" : "SEND OTP"}
            </button>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <Link
            to="/chekVoiceStatus"
            className=" text-center w-full py-4 text-white font-bold rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Check Voice Status
          </Link>
        </div>

        {/* Right Section with Animated Background */}
        <div className="hidden md:flex flex-1 justify-center items-center p-8 animated-bg">
          <div className="text-center text-white space-y-4">
            <h2 className="text-3xl font-semibold">
              Want to track your complaint?
            </h2>
            <p className="text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <div className="relative w-48 h-48 transform hover:scale-105 transition-transform duration-500">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu1ZAMw2XkttJYi3cOhggQjkn1XnBgxoFOrA&s"
                alt="Illustration"
                className="w-full h-full object-cover animate-pulseImage rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginWithOtp;
