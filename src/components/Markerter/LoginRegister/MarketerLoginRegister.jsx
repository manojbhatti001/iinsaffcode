import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../utils/const";
import { useNavigate } from "react-router-dom";
import loginImg from "../../../assets/images/marketerLogin.png";
import signUpImg from "../../../assets/images/marketerSignup.png";

const MarketerLoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [performing, setPerforming] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    state: "",
    city: "",
    gender: "",
    refer: "",
    emailOtp: "", 
    mobileOtp: "", 
  });
  const [message, setMessage] = useState("");
  const [emailOrMobile, setEmailOrMobile] = useState(""); 
  const [showOTPFields, setShowOTPFields] = useState(false); 
  const [isForgotPassword, setIsForgotPassword] = useState(false); 
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState(""); 
  const [otpAndNewPassword, setOtpAndNewPassword] = useState({
    otp: "",
    newPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmailOrMobileChange = (e) => {
    setEmailOrMobile(e.target.value); 
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refTok = urlParams.get("refTok");

    if (refTok) {
      setFormData((prevData) => ({
        ...prevData,
        refer: refTok,
      }));
      setIsLogin(false);
    }
  }, []);

  const handleForgotPasswordRequest = async () => {
    try {
      const response = await axios.post(`${baseUrl}requestMarketerOtp`, {
        email: forgotPasswordEmail,
      });
      setMessage(response.data.msg);
      setIsForgotPassword("resetPassword"); 
    } catch (error) {
      setMessage(
        error.response ? error.response.data.msg : "Failed to request OTP."
      );
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(`${baseUrl}ResetPasswordMarketer`, {
        email: forgotPasswordEmail,
        emailOtp: otpAndNewPassword.otp,
        newPassword: otpAndNewPassword.newPassword,
      });
      setMessage(response.data.msg);
      setIsForgotPassword(false); 
      setIsLogin(true); 
    } catch (error) {
      setMessage(
        error.response ? error.response.data.msg : "Failed to reset password."
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        setPerforming(true);
        const response = await axios.post(`${baseUrl}loginMarketer`, {
          emailOrMobile, 
          password: formData.password,
        });
        setMessage("Login successful!");
        localStorage.setItem("marketerToken", response.data.token);
        navigate("/marketerDashboard"); 
      } catch (error) {
        setMessage(error.response ? error.response.data.msg : "Login failed.");
      }
    } else {
      if (showOTPFields) {
        try {
          const response = await axios.post(`${baseUrl}verifyMarketerOtp`, {
            email: formData.email, 
            mobile: formData.mobile, 
            otpEmail: formData.emailOtp,
            // otpMobile: formData.mobileOtp,
          });
          window.alert("OTP Verified Successfully !");
          setMessage(response.data.msg);
          window.location.reload();
        } catch (error) {
          setMessage(
            error.response
              ? error.response.data.msg
              : "OTP verification failed."
          );
        }
      } else {
        try {
          setPerforming(true);
          const response = await axios.post(
            `${baseUrl}registerMarketer`,
            formData
          );
          setMessage(response.data.msg);
          setShowOTPFields(true); 
        } catch (error) {
          setMessage(
            error.response ? error.response.data.msg : "Signup failed."
          );
        }
      }
    }
    setPerforming(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-4">
        <div className="flex w-full sm:max-w-lg lg:max-w-4xl bg-white rounded-lg shadow-md transition-all">
          {/* Left side Image */}
          <div className="hidden sm:block w-1/2 h-full flex justify-center items-center bg-blue-200">
            <div className="p-1">
              {/* Conditionally render images based on isLogin */}
              {isLogin ? (
                <img
                  src={loginImg}
                  alt="Login Image"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={signUpImg}
                  alt="Signup Image"
                  className="w-full h-[72vh] object-cover"
                />
              )}
            </div>
          </div>
          {/* Right side Form */}
          <div className="w-full sm:w-1/2 p-6 lg:p-4">
            <div className="p-4 bg-gray-100">
              <h2 className="text-2xl lg:text-3xl font-bold text-center mb-6">
                {isLogin ? "Login Form" : "Signup Form"}
              </h2>

              <div className="flex mb-6 rounded-full overflow-hidden border border-gray-300">
                <button
                  className={`w-1/2 py-2 text-lg font-semibold transition-colors duration-200 ${
                    isLogin
                      ? "text-white bg-gradient-to-r from-[#003580] to-[#0072e5] shadow-md"
                      : "text-gray-600 bg-white"
                  } rounded-full`}
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </button>
                <button
                  className={`w-1/2 py-2 text-lg font-semibold transition-colors duration-200 ${
                    !isLogin
                      ? "text-white bg-gradient-to-r from-[#003580] to-[#0072e5] shadow-md"
                      : "text-gray-600 bg-white"
                  } rounded-full`}
                  onClick={() => setIsLogin(false)}
                >
                  Signup
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                {isForgotPassword === "requestOtp" ? (
                  <>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-2 mb-4 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={handleForgotPasswordRequest}
                      className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                      Request OTP
                    </button>
                  </>
                ) : isForgotPassword === "resetPassword" ? (
                  <>
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      className="w-full px-4 py-2 mb-4 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={otpAndNewPassword.otp}
                      onChange={(e) =>
                        setOtpAndNewPassword({
                          ...otpAndNewPassword,
                          otp: e.target.value,
                        })
                      }
                    />
                    <input
                      type="password"
                      placeholder="Enter new password"
                      className="w-full px-4 py-2 mb-4 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={otpAndNewPassword.newPassword}
                      onChange={(e) =>
                        setOtpAndNewPassword({
                          ...otpAndNewPassword,
                          newPassword: e.target.value,
                        })
                      }
                    />
                    <button
                      type="button"
                      onClick={handleResetPassword}
                      className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                      Reset Password
                    </button>
                  </>
                ) : isLogin ? (
                  <>
                    <input
                      type="text"
                      name="emailOrMobile"
                      placeholder="Email or Mobile"
                      className="w-full px-4 py-2 mb-4 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={emailOrMobile}
                      onChange={handleEmailOrMobileChange}
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="w-full px-4 py-2 mb-4 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.password}
                      onChange={handleChange}
                    />

                    <p
                      onClick={() => setIsForgotPassword("requestOtp")}
                      className="my-2 text-blue-500 cursor-pointer"
                    >
                      Forgot Password?
                    </p>

                    <button
                      type="submit"
                      className="w-full py-2 text-white bg-gradient-to-r from-[#003580] to-[#0072e5] rounded-lg hover:bg-blue-600"
                    >
                      {performing ? "Logging In" : "Log In"}
                    </button>
                    <div className="flex justify-center items-center mt-4">
                      <p className="text-gray-600">Don't have an account?</p>
                      <button
                        onClick={() => setIsLogin(false)}
                        className="text-blue-500 ml-2 font-semibold hover:text-blue-600"
                      >
                        {performing ? "Creating" : "Create Account"} Create
                        Account
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {!showOTPFields ? (
                      <>
                        <div className="flex gap-4 mb-4">
                          <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="w-full sm:w-1/2 px-4 py-2 mb-4 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.name}
                            onChange={handleChange}
                          />
                          <input
                            type="tel"
                            onInput={(e) => {
                              e.target.value = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                              ); 
                            }}
                            name="mobile"
                            placeholder="Mobile"
                            className="w-full sm:w-1/2 px-4 py-2 mb-4 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.mobile}
                            onChange={handleChange}
                          />
                        </div>

                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          className="w-full px-4 py-2 mb-4 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={formData.email}
                          onChange={handleChange}
                        />

                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 mb-4 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.password}
                            onChange={handleChange}
                          />
                          <span
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-2 cursor-pointer text-xl"
                            role="button"
                            aria-label="Toggle password visibility"
                          >
                            {showPassword ? "" : ""}
                          </span>
                        </div>

                        <div className="flex  gap-4 mb-4">
                          <input
                            type="text"
                            name="state"
                            placeholder="State"
                            className="w-full sm:w-1/2 px-4 py-2 mb-4 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.state}
                            onChange={handleChange}
                          />
                          <input
                            type="text"
                            name="city"
                            placeholder="City"
                            className="w-full sm:w-1/2 px-4 py-2 mb-4 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.city}
                            onChange={handleChange}
                          />
                        </div>

                        <select
                          name="gender"
                          className="w-full px-4 py-2 mb-4 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={formData.gender}
                          onChange={handleChange}
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>

                        <input
                          type="text"
                          name="refer"
                          placeholder="Refer Code (Optional)"
                          className="w-full px-4 py-2 mb-4 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={formData.refer}
                          onChange={handleChange}
                        />

                        <button
                          type="submit"
                          className="w-full py-2 text-white bg-gradient-to-r from-[#003580] to-[#0072e5] rounded-lg hover:bg-blue-600"
                        >
                          {performing ? "Signing Up" : "Sign Up"}
                        </button>
                      </>
                    ) : (
                      <>
                        <input
                          type="text"
                          name="emailOtp"
                          placeholder="Enter email OTP"
                          className="w-full px-4 py-2 mb-4 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={formData.emailOtp}
                          onChange={handleChange}
                        />
                        <input
                          type="text"
                          name="mobileOtp"
                          placeholder="Enter mobile OTP"
                          className="w-full px-4 py-2 mb-4 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={formData.mobileOtp}
                          onChange={handleChange}
                        />
                        <button
                          type="submit"
                          className="w-full py-2 text-white bg-gradient-to-r from-[#003580] to-[#0072e5] rounded-lg hover:bg-blue-600"
                        >
                          Verify OTP
                        </button>
                      </>
                    )}
                  </>
                )}
              </form>

              {message && (
                <div
                  className={`mt-4 text-center ${
                    message.includes("failed")
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketerLoginRegister;
