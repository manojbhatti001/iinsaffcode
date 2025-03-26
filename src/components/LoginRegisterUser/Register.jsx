import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, verifyOtp } from "../../redux/userSlicer";
import indianstateandcity from "./IndianStatesCities.json";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCity,
  faEnvelope,
  faLock,
  faMapMarkerAlt,
  faPhoneAlt,
  faUser,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// Import your images here
import image1 from "../../assets/images/reporter.png"; // Image for Reporter
import image2 from "../../assets/images/influencer.png"; // Image for Influencer
import image3 from "../../assets/images/advertiser .png"; // Image for Advertiser
import image4 from "../../assets/images/10619.jpg";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Get role from URL if present
  const searchParams = new URLSearchParams(location.search);
  const roleFromUrl = searchParams.get('role');

  const { loading, error, successMessage } = useSelector((state) => state.user); // Access user state from Redux store

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    email: "",
    mobile: "",
    state: "",
    city: "",
    password: "",
    confirmpassword: "",
  });

  const [states, setStates] = useState([]); // Store state names
  const [selectedState, setSelectedState] = useState(""); // Store selected state
  const [cities, setCities] = useState([]); // Store cities for selected state
  const [isRegisterButtonVisible, setIsRegisterButtonVisible] = useState(true); // Manage register button visibility
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // New state for managing button text

  const [timer, setTimer] = useState(180); // 3 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [canResendOTP, setCanResendOTP] = useState(false);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    // Populate state names from the JSON file
    setStates(Object.keys(indianstateandcity));
  }, []);

  useEffect(() => {
    let interval;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime <= 1) {
            setIsTimerRunning(false);
            setCanResendOTP(true);
            clearInterval(interval);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startOTPTimer = () => {
    setTimer(180);
    setIsTimerRunning(true);
    setCanResendOTP(false);
  };

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setFormData({ ...formData, state: selectedState, city: "" });
    const stateCities = indianstateandcity[selectedState] || [];
    setCities(stateCities);
  };

  const [selectedRole, setSelectedRole] = useState(roleFromUrl || "Advertiser");
  const [showOtpFields, setShowOtpFields] = useState(false); // State to manage OTP fields visibility
  const [otpData, setOtpData] = useState({
    email: formData.email, // Make sure this is defined and not empty
    mobile: formData.mobile,
    otpMobile: "",
    otpEmail: "",
  });

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    // Update URL with selected role
    navigate(`/register?role=${role}`, { replace: true });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOtpChange = (e) => {
    setOtpData({
      ...otpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsRegistering(true);

    if (formData.password !== formData.confirmpassword) {
      toast.error("Passwords do not match!");
      setIsSubmitting(false);
      setIsRegistering(false);
      return;
    }

    // Set OTP data for verification
    setOtpData({
      email: formData.email,
      mobile: formData.mobile,
    });

    // Add role to the form data
    const userData = {
      ...formData,
      role: selectedRole,
    };

    dispatch(registerUser(userData))
      .then((result) => {
        setIsRegistering(false);
        if (result.meta.requestStatus === "fulfilled") {
          setShowOtpFields(true);
          setIsRegisterButtonVisible(false);
          startOTPTimer(); // Start the timer when OTP is sent
          toast.success("Registration successful! Please verify OTP sent to your email and mobile.");
        } else {
          const errorMessage = result.payload?.msg || result.error?.message;
          
          if (errorMessage === "User already exists") {
            toast.error("User already exists. Please login.");
          } else if (errorMessage === "User exists but is not verified. New OTPs have been sent to your email and mobile.") {
            setShowOtpFields(true);
            setIsRegisterButtonVisible(false);
            startOTPTimer(); // Start the timer for resent OTP
            toast.info("User exists but is not verified. New OTPs have been sent.");
          } else {
            toast.error("Registration failed. Please try again.");
          }
        }
        setIsSubmitting(false);
      })
      .catch((error) => {
        toast.error(error.message || "An error occurred");
        setIsSubmitting(false);
        setIsRegistering(false);
      });
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    // Dispatch the verifyOtp action with the OTP data
    dispatch(verifyOtp(otpData)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("OTP verified successfully!");
        navigate("/login");
      } else {
        toast.error("OTP verification failed. Please try again.");
      }
    });
  };

  const handleResendOTP = async () => {
    if (!canResendOTP) return;
    
    setIsResending(true);
    try {
      // Dispatch resend OTP action
      const result = await dispatch(registerUser({
        ...formData,
        role: selectedRole,
        resendOTP: true
      })).unwrap();
      
      if (result) {
        startOTPTimer();
        toast.success("OTP has been resent successfully!");
      }
    } catch (error) {
      toast.error("Failed to resend OTP. Please try again.");
    }
    setIsResending(false);
  };

  console.log(formData);
  console.log(selectedRole);

  const containerStyle = {
    marginTop: "80px",
    padding: "20px",
    width: "100%",
    maxWidth: "1200px", // Increased max-width
    margin: "80px auto 0",
    minHeight: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  // If no role is selected in URL, show only role selection
  if (!roleFromUrl) {
    return (
      <motion.div
        initial="hidden"
        animate="show"
        style={containerStyle}
      >
        <ToastContainer />
        <div className="container w-full flex flex-col items-center justify-center backdrop-blur-md bg-white/90 shadow-2xl rounded-2xl overflow-hidden p-8">
          <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
            Choose Your Role
          </h1>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {["Advertiser", "Influencer", "Reporter"].map((role) => (
              <motion.button
                key={role}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedRole === role
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => handleRoleSelection(role)}
              >
                Join as {role}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="show"
      style={containerStyle}
    >
      <ToastContainer />
      <div className="container w-full flex flex-col md:flex-row justify-between items-center backdrop-blur-md bg-white/90 shadow-2xl rounded-2xl overflow-hidden">
        <motion.div 
          variants={fadeIn("right", 0.3)}
          className="w-full md:w-2/5 p-8 flex flex-col items-center justify-center"
        >
          {selectedRole === "Reporter" && (
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              src={image1}
              alt="Reporter"
              className="w-3/4 h-auto object-contain"
            />
          )}
          {selectedRole === "Influencer" && (
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              src={image2}
              alt="Influencer"
              className="w-3/4 h-auto object-contain"
            />
          )}
          {selectedRole === "Advertiser" && (
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              src={image3}
              alt="Advertiser"
              className="w-3/4 h-auto object-contain"
            />
          )}
        </motion.div>

        <motion.div 
          variants={fadeIn("left", 0.3)}
          className="w-full md:w-3/5 p-8 bg-white rounded-l-3xl" // Changed from w-1/2 to w-3/5
        >
          <div className="max-w-3xl mx-auto"> 
            <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              Register as {selectedRole ? selectedRole : "a Role"}
            </h1>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {["Advertiser", "Influencer", "Reporter"].map((role) => (
                <motion.button
                  key={role}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedRole === role
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  onClick={() => handleRoleSelection(role)}
                >
                  Join as {role}
                </motion.button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="relative group"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-gray-50 focus:bg-white text-base" // Increased padding and font size
                      placeholder="Enter your name"
                    />
                    <FontAwesomeIcon
                      icon={faUser}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative group"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <div className="relative">
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-gray-50 focus:bg-white appearance-none text-base" // Increased padding and font size
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <FontAwesomeIcon
                      icon={faVenusMars}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative group"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-gray-50 focus:bg-white text-base" // Increased padding and font size
                      placeholder="Enter your email"
                    />
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative group"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile No.
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Allow only digits
                      }}
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-gray-50 focus:bg-white text-base" // Increased padding and font size
                      placeholder="Enter your mobile number"
                    />
                    <FontAwesomeIcon
                      icon={faPhoneAlt}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="relative group"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <div className="relative">
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleStateChange}
                      className="w-full px-6 py-4 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-gray-50 focus:bg-white appearance-none text-base" // Increased padding and font size
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="relative group"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <div className="relative">
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-gray-50 focus:bg-white appearance-none text-base" // Increased padding and font size
                    >
                      <option value="">Select City</option>
                      {cities.map((city, idx) => (
                        <option key={idx} value={city.city}>
                          {city.city}
                        </option>
                      ))}
                    </select>
                    <FontAwesomeIcon
                      icon={faCity}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="relative group"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-gray-50 focus:bg-white text-base" // Increased padding and font size
                      placeholder="Enter your password"
                    />
                    <FontAwesomeIcon
                      icon={faLock}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="relative group"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="confirmpassword"
                      value={formData.confirmpassword}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-gray-50 focus:bg-white text-base" // Increased padding and font size
                      placeholder="Confirm your password"
                    />
                    <FontAwesomeIcon
                      icon={faLock}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200"
                    />
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col gap-4"
              >
                {isRegisterButtonVisible && (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 text-white bg-gradient-to-r from-indigo-600 to-blue-500 rounded-lg shadow-lg shadow-indigo-200 hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isRegistering ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                        <span>Registering...</span>
                      </div>
                    ) : (
                      "Register"
                    )}
                  </button>
                )}

                <p className="text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
                  >
                    Login here
                  </Link>
                </p>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
      {showOtpFields && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-lg mx-auto p-8 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-center">Verify OTP</h3>
              <div className="text-sm font-medium text-gray-600">
                Time remaining: <span className="text-indigo-600">{formatTime(timer)}</span>
              </div>
            </div>
            <form onSubmit={handleOtpSubmit}>
              <div className="mb-4">
                <label htmlFor="otpEmail" className="block text-sm font-medium text-gray-700">
                  Email OTP
                </label>
                <input
                  type="text"
                  id="otpEmail"
                  name="otpEmail"
                  maxLength={6}
                  value={otpData.otpEmail}
                  onChange={handleOtpChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter 6-digit OTP"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Check your email {formData.email} for the OTP
                </p>
              </div>
              <div className="mb-4">
                <label htmlFor="mobileOtp" className="block text-sm font-medium text-gray-700">
                  Mobile OTP
                </label>
                <input
                  type="text"
                  id="otpMobile"
                  name="otpMobile"
                  maxLength={6}
                  value={otpData.otpMobile}
                  onChange={handleOtpChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter 6-digit OTP"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Check your phone {formData.mobile} for the OTP
                </p>
              </div>
              <div className="flex flex-col gap-4 mt-6">
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200"
                >
                  Verify OTP
                </button>
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={!canResendOTP || isResending}
                  className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    canResendOTP && !isResending
                      ? "bg-gray-100 text-indigo-600 hover:bg-gray-200"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {isResending ? "Resending..." : "Resend OTP"}
                </button>
              </div>
            </form>
            <button
              onClick={() => setShowOtpFields(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Register;
