import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../utils/const";
import { Link, useNavigate } from "react-router-dom";
import { register } from "react-scroll/modules/mixins/scroller";

const RegisterDarbar = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    state: "",
    city: "",
  });
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const [otpMessage, setOtpMessage] = useState("");
  const [registering, setRegistering] = useState(false);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      setRegistering(true)
      const response = await axios.post(`${baseUrl}darbarRegester`, formData);
      setMessage("Registration successful! Please enter the OTP sent to your email.");
      setIsOtpSent(true);
    } catch (error) {
      console.error("Error:", error.response?.data?.msg || error.message);
      setMessage("Registration failed.");
    }
    setRegistering(false)
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await axios.post(`${baseUrl}verify-otpDarbar`, {
        email: formData.email,
        // mobile: formData.mobile,
        otpEmail: otp,
      });
      setOtpMessage("OTP verified successfully. Please log in to continue.");
      setIsOtpSent(false);
      navigate("/darbarLogin")
    } catch (error) {
      console.error("OTP Verification Error:", error.response?.data?.msg || error.message);
      setOtpMessage("Invalid or expired OTP.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-20">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        {message && <p className="text-center text-red-500 mb-4">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "address", "mobile", "email", "state", "city"].map(
            (field) => (
              <div key={field}>
                <label className="block text-gray-700 capitalize">
                  {field}
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            )
          )}
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
            disabled={registering}
          >
            {registering ? "Registering" : "Register"}
          </button>
          <Link
            to="/darbarLogin"
            className="inline-block px-2 py-1 bg-blue-600 text-white font-semibold text-center rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 sm:px-2 sm:py-2 lg:px-2 lg:py-2 text-sm sm:text-base lg:text-lg w-full"
          >
            Login
          </Link>

        </form>
        {isOtpSent && (
          <div className="mt-4">
            <label className="block text-gray-700">Enter OTP</label>
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button
              onClick={handleOtpSubmit}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200 mt-2"
            >
              Verify OTP
            </button>
            {otpMessage && <p className="text-center text-green-500 mt-4">{otpMessage}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterDarbar;
