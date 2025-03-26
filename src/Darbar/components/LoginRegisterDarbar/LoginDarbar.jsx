import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../utils/const";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const LoginDarbar = () => {
  const [tab, setTab] = useState("login");
  const [formData, setFormData] = useState({
    emailOrMobile: "",
    password: "",
  });
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [resetPasswordData, setResetPasswordData] = useState({
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate= useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}darbarLogin`, formData);
      localStorage.setItem("darbarToken", response.data.token);
      toast.success("Login successful!");
      navigate("/createDarbar")
      // Optionally, redirect or perform post-login actions
    } catch (error) {
      toast.error(error.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${baseUrl}request-otpDarbar`, {
        email: forgotPasswordEmail,
      });
      toast.success("OTP sent to your email!");
      setTab("verifyOtp2"); // Switch to the verify OTP tab
      setIsOtpSent(true);
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${baseUrl}reset-passwordDarbar`, {
        email: forgotPasswordEmail,
        otp,
        newPassword: resetPasswordData.newPassword,
      });
      toast.success("Password has been reset successfully!");
      setTab("login"); // Switch back to login tab
    } catch (error) {
      toast.error(error.response?.data?.msg || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-blue-400 to-[#f2effd] flex items-center justify-center">
      <ToastContainer />
      <div className="bg-white shadow-lg rounded-3xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
        <div className="w-full md:w-1/2 p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-4xl font-bold mb-4">
              {tab === "login"
                ? "The Creative Adult is the child who survived."
                : tab === "forgotPassword"
                ? "Forgot Password?"
                : "Verify OTP"}
            </h1>
            <p className="text-gray-600">
              {tab === "login"
                ? "Welcome back! Please login to your account to continue."
                : tab === "forgotPassword"
                ? "Enter your email to request OTP."
                : "Enter OTP and reset your password."}
            </p>
          </div>

          {/* Login Form */}
          {tab === "login" && (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="emailOrMobile"
                  className="block text-sm font-medium text-black"
                >
                  Email or Mobile Number
                </label>
                <input
                  type="text"
                  id="emailOrMobile"
                  name="emailOrMobile"
                  value={formData.emailOrMobile}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Email or Mobile"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-black"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <button
                    type="button"
                    className="font-medium text-blue-600 hover:text-blue-500"
                    onClick={() => setTab("forgotPassword")}
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          )}

          {/* Forgot Password Form */}
          {tab === "forgotPassword" && (
            <form onSubmit={handleForgotPasswordSubmit} className="mt-6">
              <div className="mb-4">
                <label
                  htmlFor="forgotPasswordEmail"
                  className="block text-sm font-medium text-black"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="forgotPasswordEmail"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                disabled={loading}
              >
                Request OTP
              </button>
              <button
                type="button"
                className="w-full py-2 mt-4 bg-gray-300 text-black font-semibold rounded-md hover:bg-gray-400"
                onClick={() => setTab("login")}
              >
                Back to Login
              </button>
            </form>
          )}

          {/* OTP Verification Form */}
          {tab === "verifyOtp2" && isOtpSent && (
            <form onSubmit={handleVerifyOtpSubmit} className="mt-6">
              <div className="mb-4">
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700"
                >
                  OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={resetPasswordData.newPassword}
                  onChange={(e) =>
                    setResetPasswordData({
                      ...resetPasswordData,
                      newPassword: e.target.value,
                    })
                  }
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                disabled={loading}
              >
                Reset Password
              </button>
              <button
                type="button"
                className="w-full py-2 mt-4 bg-gray-300 text-black font-semibold rounded-md hover:bg-gray-400"
                onClick={() => setTab("login")}
              >
                Back to Login
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginDarbar;
