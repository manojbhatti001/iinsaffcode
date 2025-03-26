import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/const";
import doctorImage from "../assets/images/docotor.jpg"; // Adjust the path as needed
import advocateImage from "../assets/images/advocate.jpg";
import ngoImage from "../assets/images/ngo.jpg";
import organizationImage from "../assets/images/organization.jpg";
import partnerImage from "../assets/images/partner.jpg";
import companyImage from "../assets/images/company.jpg";
import indianstateandcity from "./LoginRegisterUser/IndianStatesCities.json";

const JoinIinsaf = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    state: "",
    city: "",
    address: "",
    photo: null,
    document: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedRole, setSelectedRole] = useState("Doctor");
  const [cities, setCities] = useState([]);
  const [photoName, setPhotoName] = useState("");
  const [documentName, setDocumentName] = useState("");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      // Update file name display
      if (name === "photo" && files[0]) {
        setPhotoName(files[0].name);
      } else if (name === "document" && files[0]) {
        setDocumentName(files[0].name);
      }
    } else if (type === "radio") {
      setSelectedRole(value); // Directly set the role as a string
      setFormData((prev) => ({ ...prev, [name]: value })); // Update formData with role
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "role") {
        data.append(key, formData[key]); // Send role as a string
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post(`${baseUrl}join-iinsaf`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const roleDetails = {
    Doctor: {
      image: doctorImage,
      heading: "Join iinsaf as a Doctor",
      paragraph:
        "We are looking for compassionate doctors to help those in need. Share your knowledge and expertise with our community.",
    },
    Advocate: {
      image: advocateImage,
      heading: "Join iinsaf as an Advocate",
      paragraph:
        "Help us fight for justice and rights. Your legal expertise can make a difference in people's lives.",
    },
    NGO: {
      image: ngoImage,
      heading: "Join iinsaf as an NGO",
      paragraph:
        "Partner with us to create a positive social impact. Let's work together to empower communities.",
    },
    Organization: {
      image: organizationImage,
      heading: "Join iinsaf as an Organization",
      paragraph:
        "Join hands with us to bring change. Your organization can play a vital role in our mission.",
    },
    Partner: {
      image: partnerImage,
      heading: "Join iinsaf as a Partner",
      paragraph:
        "We value partnerships. Let’s collaborate to grow and make a lasting impact.",
    },
    Company: {
      image: companyImage,
      heading: "Join iinsaf as a Company",
      paragraph:
        "Corporate social responsibility matters. Your company's involvement will have a meaningful impact on society.",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-800 via-purple-800 to-black">
      {/* Top spacing to prevent navbar overlap */}
      <div className="h-20"></div>
      
      {/* Main content with proper padding */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Main Content Container */}
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left Column - Role Image and Description - Hidden on mobile */}
            <div className="hidden lg:block lg:w-5/12">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden sticky top-24">
                <div className="relative h-[450px] sm:h-[550px]">
                  <img
                    src={roleDetails[selectedRole]?.image}
                    alt="Role Image"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h1 className="text-3xl font-bold text-white mb-4">
                        {roleDetails[selectedRole]?.heading}
                      </h1>
                      <p className="text-white text-lg opacity-90 leading-relaxed">
                        {roleDetails[selectedRole]?.paragraph}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form - Centered on mobile */}
            <div className="w-full max-w-2xl mx-auto lg:max-w-none lg:w-7/12">
              <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
                <div className="max-w-2xl mx-auto">
                  <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
                    Join iinsaf Organization
                  </h2>
                  
                  <form className="space-y-8" onSubmit={handleSubmit}>
                    {/* Name and Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter your full name"
                          className="w-full border-2 border-gray-200 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          onChange={handleChange}
                          value={formData.name}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                          className="w-full border-2 border-gray-200 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          onChange={handleChange}
                          value={formData.email}
                        />
                      </div>
                    </div>

                    {/* Phone input */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                      <input
                        type="tel"
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(/[^0-9]/g, "");
                        }}
                        name="phone"
                        placeholder="Enter your phone number"
                        className="w-full border-2 border-gray-200 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        onChange={handleChange}
                        value={formData.phone}
                      />
                    </div>

                    {/* Role Selection */}
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">Select Your Role</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {["Doctor", "Advocate", "NGO", "Organization", "Partner", "Company"].map((label) => (
                          <label
                            key={label}
                            className={`flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                              selectedRole === label
                                ? "bg-blue-50 border-blue-500 text-blue-700 shadow-md"
                                : "border-gray-200 hover:border-blue-200 hover:bg-blue-50/50"
                            }`}
                          >
                            <input
                              type="radio"
                              name="role"
                              value={label}
                              checked={selectedRole === label}
                              onChange={handleChange}
                              className="hidden"
                            />
                            <span className="text-sm font-medium">{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* File Uploads */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-all duration-200">
                          <input
                            type="file"
                            name="photo"
                            accept="image/*"
                            className="hidden"
                            id="photo-upload"
                            onChange={handleChange}
                          />
                          <label htmlFor="photo-upload" className="cursor-pointer">
                            <div className="text-sm text-gray-600">
                              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              {photoName ? (
                                <div className="mt-2">
                                  <p className="text-blue-600 font-medium">{photoName}</p>
                                  <p className="text-xs text-gray-500 mt-1">Click to change photo</p>
                                </div>
                              ) : (
                                <p className="mt-1">Click to upload photo</p>
                              )}
                            </div>
                          </label>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Document</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-all duration-200">
                          <input
                            type="file"
                            name="document"
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                            id="document-upload"
                            onChange={handleChange}
                          />
                          <label htmlFor="document-upload" className="cursor-pointer">
                            <div className="text-sm text-gray-600">
                              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                <path d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-14c0 4.418-7.163 8-16 8S8 18.418 8 14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              {documentName ? (
                                <div className="mt-2">
                                  <p className="text-blue-600 font-medium">{documentName}</p>
                                  <p className="text-xs text-gray-500 mt-1">Click to change document</p>
                                </div>
                              ) : (
                                <p className="mt-1">Click to upload document</p>
                              )}
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Location Selection */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">State</label>
                        <select
                          name="state"
                          value={formData.state}
                          onChange={(event) => {
                            const selectedState = event.target.value;
                            setFormData({ ...formData, state: selectedState, city: "" });
                            setCities(indianstateandcity[selectedState] || []);
                          }}
                          className="w-full border-2 border-gray-200 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="">Select your state</option>
                          {Object.keys(indianstateandcity).map((state) => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">City</label>
                        <select
                          name="city"
                          value={formData.city}
                          onChange={(event) => setFormData({ ...formData, city: event.target.value })}
                          className="w-full border-2 border-gray-200 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="">Select your city</option>
                          {cities.map((city) => (
                            <option key={city.city} value={city.city}>{city.city}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Complete Address</label>
                      <textarea
                        name="address"
                        placeholder="Enter your complete address"
                        rows="3"
                        className="w-full border-2 border-gray-200 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        onChange={handleChange}
                        value={formData.address}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-blue-600 text-white py-4 rounded-xl font-medium hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 shadow-lg hover:shadow-xl"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        "Join iinsaf"
                      )}
                    </button>
                  </form>

                  {/* Message Display */}
                  {message && (
                    <div className={`mt-6 p-4 rounded-xl ${
                      message.includes("success") 
                        ? "bg-green-50 text-green-800 border border-green-200" 
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}>
                      {message}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinIinsaf;
