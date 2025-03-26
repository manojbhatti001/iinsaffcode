import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, requestOtp, resetPassword } from "../../redux/userSlicer";
import iinsafLogo from "../../assets/images/iinsaf.png";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isOtpSent } = useSelector((state) => state.user);

  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState("login");
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [resetPasswordData, setResetPasswordData] = useState({
    newPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      const userRole = localStorage.getItem("userRole");
      if (userRole === "Advertiser") {
        navigate("/InAd");
      } else if (userRole === "Reporter" || userRole === "Influencer") {
        navigate("/ReporterDashboard");
      } else {
        navigate("/"); 
      }
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ emailOrMobile, password }))
      .unwrap()
      .then((data) => {
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userRole", data.role); 
        toast.success("Login successful!");
        if (data.role === "Advertiser") {
          navigate("/InAd");
        } else if (data.role === "Reporter") {
          navigate("/ReporterDashboard");
        } else if (data.role === "Influencer") {
          navigate("/ReporterDashboard");
        } else {
          navigate("/"); 
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Login failed! Please check your credentials.");
      });
  };

  const handleForgotPasswordSubmit = (event) => {
    event.preventDefault();
    dispatch(requestOtp(forgotPasswordEmail)) 
      .unwrap()
      .then(() => {
        setTab("verifyOtp2");
        toast.success("OTP requested successfully!");
      })
      .catch((err) => {
        console.error("Error requesting OTP:", err);
        toast.error("Error requesting OTP. Please try again.");
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
        toast.success(
          "Password has been reset successfully! Redirecting to login..."
        );
        setTab("login");
        setTimeout(() => navigate("/login"), 1000);
      })
      .catch((err) => {
        console.error("Error resetting password:", err);
        toast.error("Error resetting password. Please try again.");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4 mt-16 md:mt-0">
      <div className="w-full max-w-4xl flex rounded-3xl shadow-2xl overflow-hidden bg-white">
        {/* Left Side - Image and Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-12 flex-col justify-between">
          <div className="flex justify-center">
            <img src={iinsafLogo} alt="IINSAF Logo" className="h-16 object-contain" />
          </div>
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-6">Welcome IINSAf</h2>
            <p className="text-blue-100 text-lg">
            IINSAF is a leading platform dedicated to promoting social justice through innovative technological solutions.
            </p>
          </div>
          <div className="text-blue-200 text-sm">
            {new Date().getFullYear()} IINSAF. All rights reserved.
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 pt-16 md:pt-12">
          <div className="lg:hidden flex justify-center mb-8">
            <img src={iinsafLogo} alt="IINSAF Logo" className="h-12 object-contain" />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Sign In</h1>
            <p className="text-gray-600 mt-2">Please login to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faEnvelope} className="text-blue-600" />
              </div>
              <input
                type="text"
                value={emailOrMobile}
                onChange={(e) => setEmailOrMobile(e.target.value)}
                placeholder="Email or Mobile Number"
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-700"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faLock} className="text-blue-600" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-700"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600 rounded border-2 border-gray-300"
                />
                <span className="ml-2 text-gray-700">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => setTab("forgotPassword")}
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                  Create Account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;
