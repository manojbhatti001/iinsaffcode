import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../utils/const";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateProfile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    gstChecked: false,
    gstNumber: "",
    panCardNumber: "",
    companyType: "",
    address: "",
    street: "",
    locality: "",
    city: "",
    state: "",
    pincode: "",
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    gstAnswer: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleNext = () => {
    if (!isFormValid()) {
      // Show a generic error or handle specific error messages in isFormValid
      toast.error("Please fill in all required fields."); // Replace with toast or your preferred error display method
      return;
    }

    // Proceed to the next tab if all validations pass
    if (activeTab < 2) {
      setActiveTab(activeTab + 1);
    }
  };

  const handleBack = () => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  };

  const isFormValid = () => {
    let isValid = true;

    if (activeTab === 0) {
      if (!formData.companyName) {
        toast.error("Company Name is required");
        isValid = false;
        return;
      }
      if (!formData.companyAddress) {
        toast.error("Company Address is required");
        isValid = false;
        return;
      }
      if (!formData.gstAnswer) {
        toast.error("GST Answer is required");
        isValid = false;
        return;
      }
      if (formData.gstAnswer === "yes" && !formData.gstNumber) {
        toast.error("GST Number is required if you have GST");
        isValid = false;
        return;
      }
      if (!formData.panCardNumber) {
        toast.error("PAN Card Number is required");
        isValid = false;
        return;
      } else {
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
        if (!panRegex.test(formData.panCardNumber)) {
          toast.error("Invalid PAN format. Correct format is AAAAA9999A");
          isValid = false;
          return;
        }
      }
      if (!formData.companyType) {
        toast.error("Company Type is required");
        isValid = false;
        return;
      }
    }

    if (activeTab === 1) {
      if (!formData.address) {
        toast.error("Address is required");
        isValid = false;
        return;
      }
      if (!formData.city) {
        toast.error("City is required");
        isValid = false;
        return;
      }
      if (!formData.state) {
        toast.error("State is required");
        isValid = false;
        return;
      }
      if (!formData.pincode) {
        toast.error("Pincode is required");
        isValid = false;
        return;
      }
    }

    if (activeTab === 2) {
      if (!formData.firstName) {
        toast.error("First Name is required");
        isValid = false;
        return;
      }
      if (!formData.lastName) {
        toast.error("Last Name is required");
        isValid = false;
        return;
      }
      if (!formData.mobile) {
        toast.error("Mobile number is required");
        isValid = false;
        return;
      }
      if (!formData.email) {
        toast.error("Email is required");
        isValid = false;
        return;
      }
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      // Proceed with form submission
      console.log("Form submitted", formData);
    }
    setLoading(true);
    const token = localStorage.getItem("marketerToken");
    try {
      const response = await axios.post(`${baseUrl}createProfile`, formData, {
        headers: {
          Authorization: token,
        },
      });

      if (response.status === 200) {
        alert("Form submitted successfully!");
      }
      setFormData({
        companyName: "",
        companyAddress: "",
        gstChecked: false,
        gstNumber: "",
        panCardNumber: "",
        companyType: "",
        address: "",
        street: "",
        locality: "",
        city: "",
        state: "",
        pincode: "",
        firstName: "",
        lastName: "",
        mobile: "",
        email: "",
        gstAnswer: "",
      });

      setActiveTab(0);
      navigate("/marketerDashboard/profileStatus");
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast("There was an error submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        {/* Tabs Navigation */}
        <div className="flex justify-between mb-6">
          <button
            type="button"
            onClick={() => setActiveTab(0)}
            className={`px-4 py-2 rounded-md ${
              activeTab === 0 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Company Details
          </button>
          <button
            type="button"
            onClick={() => setActiveTab(1)}
            className={`px-4 py-2 rounded-md ${
              activeTab === 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Personal Details
          </button>
          <button
            type="button"
            onClick={() => setActiveTab(2)}
            className={`px-4 py-2 rounded-md ${
              activeTab === 2 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Contact Details
          </button>
        </div>

        {/* Tab 1 - Company Details */}
        {activeTab === 0 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Address
              </label>
              <input
                type="text"
                name="companyAddress"
                value={formData.companyAddress}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pan Card Number
              </label>
              <input
                type="text"
                name="panCardNumber"
                value={formData.panCardNumber}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Type
              </label>
              <input
                type="text"
                name="companyType"
                value={formData.companyType}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>

            {/* GST Radio Buttons */}
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="gstAnswer"
                  value="yes"
                  checked={formData.gstAnswer === "yes"}
                  onChange={handleInputChange}
                  className="h-4 w-4"
                />
                <label className="ml-2 text-sm">Yes, I have GST</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="gstAnswer"
                  value="no"
                  checked={formData.gstAnswer === "no"}
                  onChange={handleInputChange}
                  className="h-4 w-4"
                />
                <label className="ml-2 text-sm">No, I don't have GST</label>
              </div>
            </div>

            {formData.gstAnswer === "yes" && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  GST Number
                </label>
                <input
                  type="text"
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
            )}
          </div>
        )}

        {/* Tab 2 - Personal Details */}
        {activeTab === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Street
              </label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Locality
              </label>
              <input
                type="text"
                name="locality"
                value={formData.locality}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pincode
              </label>
              <input
                type="number"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
          </div>
        )}

        {/* Tab 3 - Contact Details */}
        {activeTab === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mobile
              </label>
              <input
                type="tel"
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 bg-gray-200 rounded-md"
          >
            Back
          </button>
          {activeTab !== 2 && (
            <button
              type="button"
              onClick={handleNext}
              // disabled={!isFormValid()}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Next
            </button>
          )}
        </div>

        {/* Submit Button */}
        {activeTab === 2 && (
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-[200px] bg-green-500 text-white py-2 rounded-md"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateProfile;
