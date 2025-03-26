import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../../utils/const";

const CreateDarbar = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    darbarDate: "",
    darbarState: "",
    darbarCity: "",
    area: "",
    village: "",
    purpose: "",
    darbarReason: "",
    pincode: "",
    peopleAvailable: "",
    peopleRequired: "",
    darbarType: "",
    darbarTimeLimit: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [creating, setCreating] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    try {
      setCreating(true)
      let token = localStorage.getItem("darbarToken");
      if (!token) {
        token = localStorage.getItem("userToken");
      }

      const response = await axios.post(`${baseUrl}createDarbar`, formData, {
        headers: {
          Authorization: token,
        },
      });
      setSuccessMessage(response.data.message);
      window.alert("Darbar Created Successfully");
      navigate("/userDarbar");
    } catch (error) {
      console.error("Error creating Darbar:", error);
      setErrorMessage("Error creating Darbar. Please try again.");
    }
    setCreating(false)
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 mt-24">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Darbar
        </h2>

        {successMessage && (
          <p className="text-green-500 text-center">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}

        {/* Section 1: Date and Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="darbarDate" className="text-gray-600">Darbar Date</label>
            <input
              type="date"
              id="darbarDate"
              name="darbarDate"
              value={formData.darbarDate}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="darbarState" className="text-gray-600">Darbar State</label>
            <input
              type="text"
              id="darbarState"
              name="darbarState"
              value={formData.darbarState}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="darbarCity" className="text-gray-600">Darbar City</label>
            <input
              type="text"
              id="darbarCity"
              name="darbarCity"
              value={formData.darbarCity}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="area" className="text-gray-600">Area</label>
            <input
              type="text"
              id="area"
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
              required
            />
          </div>
        </div>

        {/* Section 2: Additional Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="village" className="text-gray-600">Village</label>
            <input
              type="text"
              id="village"
              name="village"
              value={formData.village}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="purpose" className="text-gray-600">Purpose</label>
            <input
              type="text"
              id="purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="darbarReason" className="text-gray-600">Darbar Reason</label>
            <input
              type="text"
              id="darbarReason"
              name="darbarReason"
              value={formData.darbarReason}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="pincode" className="text-gray-600">Pincode</label>
            <input
              type="number"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
              required
            />
          </div>
        </div>

        {/* Section 3: People Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="peopleAvailable" className="text-gray-600">People Available</label>
            <input
              type="number"
              id="peopleAvailable"
              name="peopleAvailable"
              value={formData.peopleAvailable}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="peopleRequired" className="text-gray-600">People Required</label>
            <input
              type="number"
              id="peopleRequired"
              name="peopleRequired"
              value={formData.peopleRequired}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
              required
            />
          </div>
        </div>

        {/* Section 4: Event Type and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            {/* <label htmlFor="darbarType" className="text-gray-600">Darbar Type</label>
            <input
              type="text"
              id="darbarType"
              name="darbarType"
              value={formData.darbarType}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
              required
            /> */}
            <label htmlFor="darbarType" className="text-gray-600">Darbar Type</label>
            <select
              id="darbarType"
              name="darbarType"
              value={formData.darbarType}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Select Darbar Type</option>
              <option value="paid">Paid</option>
              <option value="free">Free</option>
            </select>

          </div>

          <div className="flex flex-col">
            <label htmlFor="darbarTimeLimit" className="text-gray-600">Days Darbar Stays Active</label>
            <input
              type="text"
              id="darbarTimeLimit"
              name="darbarTimeLimit"
              value={formData.darbarTimeLimit}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700"
          disabled={creating}
        >
          {creating ? "Creating Darbar" : "Create Darbar"}
        </button>
        <Link
          to="/userDarbar"
          className="inline-block px-2 py-1 bg-blue-600 text-white font-semibold text-center rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 sm:px-2 sm:py-2 lg:px-2 lg:py-2 text-sm sm:text-base lg:text-lg w-full"
        >
          Your Darbars
        </Link>
      </form>

    </div>
  );
};

export default CreateDarbar;
