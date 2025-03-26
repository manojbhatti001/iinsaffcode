import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerSuperAdmin,
  verifyOtp,
} from "../../../redux/AdminRedux/adminLogin__RegisterSlicer";
import bgimg from "../../assets/bgimg/adminregisterloginbg.webp";
import { Link } from "react-router-dom";
import mobileicon from "../../assets/icons/mobile-phone.png";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, isVerified, error } = useSelector((state) => state.admin);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [otpData, setOtpData] = useState({
    otpEmail: "",
    // otpMobile: "",
  });

  // Local state to control OTP view after registration
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (e) => {
    setOtpData({ ...otpData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerSuperAdmin(formData))
      .then(() => {
        setOtpSent(true);
        toast.success(
          "OTP sent successfully. Please check your email and mobile."
        );
      })
      .catch((err) => toast.error("Registration failed. Please try again."));
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const { email, mobile } = formData;
  
    try {
      // Unwrap the result to get the direct response data
      await dispatch(verifyOtp({ email, mobile, ...otpData })).unwrap();
      
      // OTP verified successfully
      toast.success("OTP verified successfully!");
      navigate("/adminlogin");
    } catch (error) {
      // OTP verification failed
      toast.error("OTP verification failed. Please try again.");
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error.msg || error);
  //   }
  // }, [error]);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgimg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="ml-1 mr-1 bg-gradient-to-b from-[#cbf0fa] via-[#f7fbfd] to-[#fbfbfe] backdrop-blur-lg p-8 shadow-lg rounded-3xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          {otpSent ? "Verify OTP" : "Register Superadmin"}
        </h2>
        <h3 className=" font-bold text-center text-gray-500 mb-6">
          Make a new doc to Bring your words, data, and teams together. For free
        </h3>

        <form
          onSubmit={otpSent ? handleVerifyOtp : handleRegister}
          className="px-4 space-y-6"
        >
          {!otpSent ? (
            <>
              {/* Registration Fields */}
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border bg-gray-100 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="relative">
                <svg
                  class="w-5 h-5 absolute left-3 top-3 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 4l8 5 8-5"
                  />
                </svg>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-10 py-2 border bg-gray-100 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative flex items-center">
                <img
                  src={mobileicon}
                  className="h-6 ml-3 absolute"
                  alt="mobile icon"
                />
                <input
                  type="tel"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Allow only digits
                  }}
                  name="mobile"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  className="w-full px-10 py-2 border bg-gray-100 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative">
                <svg
                  className="w-5 h-5 absolute left-3 top-3 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a5 5 0 00-5 5v1H4a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2h-1V7a5 5 0 00-5-5zM8 7a2 2 0 114 0v1H8V7zm2 9a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-10 py-2 border bg-gray-100 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={togglePasswordVisibility}
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-3-7c-4.418 0-8 3.134-8 7s3.582 7 8 7 8-3.134 8-7-3.582-7-8-7z"
                    />
                  </svg>{" "}
                </button>
              </div>
            </>
          ) : (
            <>
              {/* OTP Verification Fields */}
              <input
                type="text"
                name="otpEmail"
                placeholder="Email OTP"
                value={otpData.otpEmail}
                onChange={handleOtpChange}
                required
                className="w-full px-4 py-2 border bg-gray-100 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* <input
                type="text"
                name="otpMobile"
                placeholder="Mobile OTP"
                value={otpData.otpMobile}
                onChange={handleOtpChange}
                required
                className="w-full px-4 py-2 border bg-gray-100 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              /> */}
            </>
          )}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-2xl hover:bg-gray-900 transition-colors"
          >
            {status === "loading"
              ? otpSent
                ? "Verifying..."
                : "Registering..."
              : otpSent
              ? "Verify OTP"
              : "Get Started"}
          </button>
        </form>
        <div className="text-center mt-6">
          <Link
            to="/adminlogin"
            className="text-blue-500 hover:text-blue-600 transition duration-300"
          >
            Already have an account? Log in
          </Link>
        </div>
        {status === "loading" && (
          <p className="text-center text-blue-500 mt-4">Loading...</p>
        )}
        {/* {error && (
          <p className="text-center text-red-500 mt-4">{error.msg || error}</p>
        )} */}
        {isVerified && (
          <p className="text-center text-green-500 mt-4">
            Registration Successful!
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminRegister;
