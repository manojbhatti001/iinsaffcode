import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  loginAdmin,
  requestOtp,
  resetPassword,
} from "../../../redux/AdminRedux/adminLogin__RegisterSlicer";
import bgimg from '../../assets/bgimg/adminregisterloginbg.webp'
import loginicon from '../../assets/icons/login-removebg-preview.png'

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.admin);
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

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAdmin(formData)).then((action) => {
      if (action.payload?.token) {
        navigate("/admin"); // Redirect to admin dashboard upon successful login
      }
    });
  };

  const handleForgotPasswordSubmit = (event) => {
    event.preventDefault();
    dispatch(requestOtp(forgotPasswordEmail)) // Dispatching requestOtp action
      .unwrap()
      .then(() => {
        setTab("verifyOtp2");
      })
      .catch((err) => {
        console.error("Error requesting OTP:", err);
      });
  };

  const handleVerifyOtpSubmit2 = (event) => {
    event.preventDefault();
    dispatch(
      resetPassword({
        email: forgotPasswordEmail,
        otp,
        newPassword: resetPasswordData.newPassword,
      })
    )
      .unwrap()
      .then(() => {
        setTab("login");
        setTimeout(() => navigate("/adminLogin"), 1000);
      })
      .catch((err) => {
        console.error("Error resetting password:", err);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center" style={{ backgroundImage: `url(${bgimg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="bg-gradient-to-b from-[#cbf0fa] via-[#f7fbfd] to-[#fbfbfe] p-8 rounded-3xl shadow-md w-full max-w-md">
        <div className='flex items-center justify-center'>
          <img src={loginicon} className="h-20 mb-6" />
        </div>

        {tab === "login" && (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Admin Login
            </h2>
            <h2 className=" font-bold text-center text-gray-800 mt-10 mb-6">
              Make a new doc to Bring your words, data, and teams together. For free
            </h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="relative">
                {/* Email or Mobile Input */}
                <svg class="w-5 h-5 absolute left-3 top-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 4l8 5 8-5" />
                </svg>
                <input
                  type="text"
                  name="emailOrMobile"
                  placeholder="Email or Mobile"
                  value={formData.emailOrMobile}
                  onChange={handleChange}
                  required
                  className="w-full px-10 py-2 border border-gray-300 rounded-2xl"
                />
              </div>
              <div className="relative">
                {/* Password Input */}
                <svg className="w-5 h-5 absolute left-3 top-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a5 5 0 00-5 5v1H4a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2h-1V7a5 5 0 00-5-5zM8 7a2 2 0 114 0v1H8V7zm2 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-10 py-2 border border-gray-300 rounded-2xl"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-3-7c-4.418 0-8 3.134-8 7s3.582 7 8 7 8-3.134 8-7-3.582-7-8-7z" />
                </svg>
                </button>
              </div>

              <button
                type="button"
                className="text-blue-500"
                onClick={() => setTab("forgotPassword")}
              >
                Forgot password?
              </button>
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-2xl"
              >
                {status === "loading" ? "Logging in..." : "Login"}
              </button>
            </form>
          </>
        )}

        {tab === "forgotPassword" && (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Forgot Password
            </h2>
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-8">
              <input
                type="email"
                placeholder="Enter your email"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                required
                className="w-full px-10 py-2 border border-gray-300 rounded-2xl"
              />
              <button
                type="submit"
                className="w-full bg-black hover:bg-gray-800 text-white py-2 rounded-2xl"
              >
                Request OTP
              </button>
              <button
                type="button"
                className="w-full bg-gray-300 text-black py-2 rounded-2xl"
                onClick={() => setTab("login")}
              >
                Back to Login
              </button>
            </form>
          </>
        )}

        {tab === "verifyOtp2" && (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Verify OTP
            </h2>
            <form onSubmit={handleVerifyOtpSubmit2} className="space-y-8">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full px-10 py-2 border border-gray-300 rounded-2xl"
              />
              <input
                type="password"
                placeholder="Enter new password"
                value={resetPasswordData.newPassword}
                onChange={(e) =>
                  setResetPasswordData({
                    ...resetPasswordData,
                    newPassword: e.target.value,
                  })
                }
                required
                className="w-full px-10 py-2 border border-gray-300 rounded-2xl"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-2xl"
              >
                Reset Password
              </button>
              <button
                type="button"
                className="w-full bg-gray-300 text-black py-2 rounded-2xl"
                onClick={() => setTab("login")}
              >
                Back to Login
              </button>
            </form>
          </>
        )}
        <div className="text-center mt-6">
          <Link
            to="/adminregister"
            className="text-blue-500 hover:text-blue-600 transition duration-300"
          >
            Create an account? Signup in
          </Link>
        </div>

        {error && (
          <p className="text-center text-red-500 mt-4">{error.msg || error}</p>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
