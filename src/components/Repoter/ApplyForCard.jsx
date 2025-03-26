import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../utils/const";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import facebook from "../../assets/facebook_5968764.png";
import instagram from "../../assets/social_15707814.png";
import youtube from "../../assets/social_15707749.png";
import iinsaf from "../../assets/iinsaf_logo_+_name-removebg-preview.png";
import signature from "../../assets/1000176827-removebg-preview.png";
import { QRCodeCanvas } from "qrcode.react";
import { Link } from "react-router-dom";

export const fetchApprovedCard = async () => {
  try {
    const response = await axios.get(`${baseUrl}getUserApprovedCards`, {
      headers: {
        Authorization: localStorage.getItem("userToken"), // Assuming token-based authentication
      },
    });
    return response.data.card; // Only return the card object
  } catch (error) {
    console.error("Error fetching approved card:", error);
    return null;
  }
};
const ApplyForCard = () => {
  const initialFormState = {
    name: "",
    fatherName: "",
    bloodGroup: "",
    designation: "",
    aadharCardNumber: "",
    address: "",
    mobile: "",
    dob: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [card, setCard] = useState(null);
  const [qrText, setQrText] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [already, setAlready] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // State for checkbox
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${baseUrl}user`, {
          headers: {
            Authorization: localStorage.getItem("userToken"),
          },
        });
        setUserData(response.data);
        
        // Auto-fill form with user profile data
        const user = response.data;
        if (user) {
          // Combine address components
          const addressParts = [
            user.areaDetails,
            user.city,
            user.state,
            user.pincode
          ].filter(Boolean); // Remove empty values
          
          const fullAddress = addressParts.join(', ');
          
          setFormData({
            name: user.name || "",
            fatherName: user.fatherName || "",
            bloodGroup: user.bloodGroup || "",
            designation: user.designation || "Reporter",
            aadharCardNumber: user.aadharCardNumber || "",
            address: fullAddress || "",
            mobile: user.mobile ? user.mobile.toString() : "",
            dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : "",
          });
        }
      } catch (err) {
        setError("Failed to fetch user data");
        console.error(err);
      }
    };

    fetchUserData();
  }, []);

  // Update preview when form data changes
  useEffect(() => {
    if (userData && !formData.name) {
      // Combine address components
      const addressParts = [
        userData.areaDetails,
        userData.city,
        userData.state,
        userData.pincode
      ].filter(Boolean); // Remove empty values
      
      const fullAddress = addressParts.join(', ');

      setFormData(prevData => ({
        ...prevData,
        name: userData.name || "",
        fatherName: userData.fatherName || "",
        bloodGroup: userData.bloodGroup || "",
        designation: userData.designation || "Reporter",
        aadharCardNumber: userData.aadharCardNumber || "",
        address: fullAddress || "",
        mobile: userData.mobile ? userData.mobile.toString() : "",
        dob: userData.dob ? new Date(userData.dob).toISOString().split('T')[0] : "",
      }));
    }
  }, [userData]);

  useEffect(() => {
    const fetchCard = async () => {
      const data = await fetchApprovedCard();
      if (data) {
        setCard(data);
        setAlready(true);
        // setQrText(data.cardForId._id)
        setQrText(
          `http://localhost:3000/getReporterByIdCard?cardId=${data._id}`
        );
      }
    };
    fetchCard();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isChecked) {
      toast.error("Please check the box to proceed with the submit.");
      return;
    }

    // Validate required fields
    const requiredFields = ['name', 'fatherName', 'bloodGroup', 'designation', 'aadharCardNumber', 'address', 'mobile', 'dob'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}createIdCard`, formData, {
        headers: {
          Authorization: localStorage.getItem("userToken"),
        },
      });
      toast.success(response.data.message);
      setMessage(response.data.message);
      setError(null);
      // Don't reset form after successful submission
      // setFormData(initialFormState);
    } catch (err) {
      setMessage(null);
      setError(err.response ? err.response.data.message : "An error occurred");
      toast.error(err.response ? err.response.data.message : "An error occurred");
    }
  };
  const GenerateQRCode = ({ text, image }) => {
    return (
      <div
        style={{
          textAlign: "center",
          alignContent: "center",
          alignItems: "center",
        }}
        className="mt-3 w-full"
      >
        {text && image ? (
          <div className="flex justify-evenly">
            <img
              src={image}
              alt="notProvided"
              style={{
                width: "70px",
                height: "70px",
                alignItems: "center",
                alignContent: "center",
                marginTop: "10px",
              }}
            />
            <QRCodeCanvas value={text} size={90} />
          </div>
        ) : (
          <p>Please provide text to generate a QR code</p>
        )}
      </div>
    );
  };

  return (
    <div className="p-4">
      <ToastContainer /> {/* Render Toastify container */}
      <h1 className="text-2xl font-bold mb-4">Apply for ID Card</h1>
      {already ? (
        <div className="flex justify-center">
          <h1 className="text-center text-green-500">Card Already Applied</h1>
          <Link
            to="/ReporterDashboard/approvedCard"
            className="ml-2 inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
          >
            Go to Card
          </Link>
        </div>
      ) : (
        ""
      )}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        {/* Left side - Form */}
        <div className="sm:col-span-4 bg-gray-100 p-4">
          {/* <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              name="fatherName"
              placeholder="Father's Name"
              value={formData.fatherName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              name="bloodGroup"
              placeholder="Blood Group"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              name="designation"
              placeholder="Designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              name="aadharCardNumber"
              placeholder="Aadhar Card Number"
              value={formData.aadharCardNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
            <textarea
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            ></textarea>
            <input
              type="tel"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Allow only digits
              }}
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
            <input
              type="date"
              name="dob"
              placeholder="Date of Birth"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="confirmationCheckbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="confirmationCheckbox" className="text-gray-700">
                I confirm the details are correct.
              </label>
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Submit Application
            </button>
          </form> */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Father's Name */}
            <div>
              <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700 mb-1">
                Father's Name
              </label>
              <input
                type="text"
                id="fatherName"
                name="fatherName"
                placeholder="Enter your father's name"
                value={formData.fatherName}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Blood Group */}
            {/* <div>
              <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-1">
                Blood Group
              </label>
              <input
                type="text"
                id="bloodGroup"
                name="bloodGroup"
                placeholder="Enter your blood group"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div> */}
            <div>
              <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-1">
                Blood Group
              </label>
              <select
                id="bloodGroup"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="" disabled>Select your blood group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            {/* Designation */}
            <div>
              <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">
                Designation
              </label>
              <input
                type="text"
                id="designation"
                name="designation"
                placeholder="Enter your designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Aadhar Card Number */}
            <div>
              <label htmlFor="aadharCardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Aadhar Card Number
              </label>
              <input
                type="text"
                id="aadharCardNumber"
                name="aadharCardNumber"
                placeholder="Enter your Aadhar card number"
                value={formData.aadharCardNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              ></textarea>
            </div>

            {/* Mobile Number */}
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                placeholder="Enter your mobile number"
                value={formData.mobile}
                onChange={handleChange}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Allow only digits
                }}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Confirmation Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="confirmationCheckbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="confirmationCheckbox" className="text-gray-700">
                I confirm the details are correct.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Submit Application
            </button>
          </form>

          {message && <p className="mt-4 text-green-500">{message}</p>}
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>

        {/* Right side - UserApprovedCards */}
        <div className="sm:col-span-8 bg-gray-200 p-4 flex">
          {/* Front Side ui */}
          <div>
            <div
              id="card-frontt"
              style={{
                width: "310px",
                height: "480px",
                border: "1px solid #ccc",
                borderRadius: "20px",
                backgroundColor: "#fff",
                overflow: "hidden",
                display: "flex",
                flexDirection: "row",
                marginBottom: "20px",
                position: "relative",
              }}
            >
              {/* Left Red Strip */}
              <div
                style={{
                  background: "red",
                  width: "49px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "24px",
                  textAlign: "center",
                  fontWeight: "bolder",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    transform: "rotate(90deg)", // Rotate text to make it vertical
                    whiteSpace: "nowrap",
                    fontSize: "32px",
                    // marginLeft: "5px",
                    fontWeight: "700",
                    // fontFamily:"fantasy",
                    letterSpacing: "10px",
                    // color:"black"
                  }}
                >
                  Raise Your Voice
                </span>
              </div>

              {/* Right Content */}
              <div
                style={{
                  width: "85%",
                  padding: "10px",
                  marginTop: "20px",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={iinsaf}
                    alt="Logo"
                    style={{ width: "200px", height: "75px" }}
                  />
                </div>
                <h3
                  style={{
                    textAlign: "center",
                    marginBottom: "1px",
                    fontWeight: "bold",
                    color: "white",
                    background: "red",
                    fontSize: "30px",
                    alignItems: "",
                    verticalAlign: "",
                    width: "200px",
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ marginBottom: "0px", fontWeight: "900" }}>
                    PRESS
                  </span>
                </h3>
                <h3
                  className="text-center text-lg font-semibold text-gray-400"
                  style={{ fontSize: "16px", fontWeight: "700" }}
                >
                  {formData.designation || "Reporter"}
                </h3>

                <span
                  style={{
                    textAlign: "center",
                    marginBottom: "1px",
                    lineHeight: "18px",
                  }}
                >
                  <span
                    style={{ fontSize: "24px", lineHeight: "0px" }}
                    className="font-sans"
                  >
                    {formData.name}
                  </span>
                  <span style={{ fontWeight: "100" }} className="text-gray-500">
                    s/o <br />
                    <span
                      className="text-gray-500"
                      style={{ fontWeight: "700", fontSize: "12px" }}
                    >
                      {formData.fatherName}
                    </span>
                  </span>
                </span>

                <div
                  style={{
                    textAlign: "center",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={userData.photo}
                    alt="Logo"
                    style={{
                      border: "0px solid black",
                      borderRadius: "50%",
                      width: "120px",
                      height: "120px",
                      overflow: "hidden",
                    }}
                  />
                </div>
                <div
                  style={{
                    width: "80%",
                    marginBottom: "2px",
                    lineHeight: "17px",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "70px 10px auto",
                      marginBottom: "0px",
                    }}
                  >
                    <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                      iinsaf Id
                    </div>
                    <div style={{ textAlign: "center" }}>:</div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "400",
                        marginLeft: "10px",
                      }}
                    >
                      {/* {initialFormState.cardForId._id.slice(-7)} */}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "70px 10px auto",
                      marginBottom: "0px",
                    }}
                  >
                    <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                      Phone No
                    </div>
                    <div style={{ textAlign: "center" }}>:</div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "400",
                        marginLeft: "10px",
                      }}
                    >
                      {formData.mobile}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "70px 10px 140px",
                      marginBottom: "0px",
                      flexWrap: "noWrap",
                      textWrap: "wrap",
                    }}
                  >
                    <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                      Address
                    </div>
                    <div style={{ textAlign: "center" }}>:</div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "400",
                        marginLeft: "10px",
                        // textWrap: "nowrap"
                      }}
                    >
                      {formData.address}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0px",
                      alignItems: "",
                      fontSize: "12px",
                    }}
                    className="mt-2"
                  >
                    <div
                      style={{ fontWeight: "bold" }}
                      className="mt-4 text-gray-400"
                    >
                      Approved By:
                    </div>
                    <div>
                      <img
                        src={signature}
                        alt=""
                        style={{ height: "70px", marginTop: "-15px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div
              id="card-backk"
              style={{
                width: "310px",
                height: "480px",
                border: "1px solid #ccc",
                borderRadius: "20px",
                backgroundColor: "#fff",
                overflow: "hidden",
                display: "flex",
                flexDirection: "row",
              }}
            >
              {/* Left Red Strip */}
              <div
                style={{
                  backgroundColor: "red",
                  width: "49px",
                  height: "127mm",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "24px",
                  textAlign: "center",
                  fontWeight: "bold",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    transform: "rotate(90deg)",
                    whiteSpace: "nowrap",
                    fontSize: "50px",
                    letterSpacing: "20px",
                    marginLeft: "10px",
                    fontWeight: "900",
                    fontFamily: "",
                  }}
                >
                  <span className="text-white font-serif">ii</span>
                  <span className="text-black">nsaf</span>
                </span>
              </div>

              {/* Right Content */}
              <div
                style={{
                  width: "261px",
                  padding: "10px",
                  marginTop: "20px",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
                className="relative"
              >
                <div
                  style={{
                    width: "90%",
                    marginTop: "10px",
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  <div style={{ display: "flex", marginBottom: "0px" }}>
                    <span
                      style={{
                        width: "80px",
                        textAlign: "left",
                        padding: "1px",
                        fontWeight: "bold"
                      }}
                    >
                      DOB
                    </span>
                    <span style={{ margin: "0 10px" }}>:</span>
                    <span
                      style={{
                        textAlign: "left",
                        fontWeight: "400",
                        paddingLeft: "10px",
                      }}
                    >
                      {new Date(formData.dob).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div style={{ display: "flex", marginBottom: "0px" }}>
                    <span
                      style={{
                        width: "80px",
                        textAlign: "left",
                        padding: "1px",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        textWrap: "nowrap",
                      }}
                    >
                      Aadhaar No
                    </span>
                    <span style={{ margin: "0 10px" }}>:</span>
                    <span
                      style={{
                        textAlign: "left",
                        fontWeight: "400",
                        paddingLeft: "10px",
                        textWrap: "nowrap",
                      }}
                    >
                      {formData.aadharCardNumber.replace(
                        /(\d{4})(?=\d)/g,
                        "$1 "
                      )}
                    </span>
                  </div>
                  <div style={{ display: "flex", marginBottom: "0px" }}>
                    <span
                      style={{
                        width: "80px",
                        textAlign: "left",
                        padding: "1px",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Blood Group
                    </span>
                    <span style={{ margin: "0 10px" }}>:</span>
                    <span
                      style={{
                        textAlign: "left",
                        fontWeight: "400",
                        paddingLeft: "10px",
                      }}
                    >
                      {formData.bloodGroup}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "4px",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        width: "100px",
                        textAlign: "left",
                        padding: "1px",
                        fontWeight: "bold",
                      }}
                    >
                      Issue Date
                    </span>
                    <span style={{ margin: "0 10px" }}>:</span>
                    <span
                      style={{
                        textAlign: "left",
                        fontWeight: "400",
                        paddingLeft: "10px",
                      }}
                      className="text-nowrap"
                    >
                      {/* {new Date(formData.updatedAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )} */}
                      chosen by admin
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      marginBottom: "4px",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        width: "100px",
                        textAlign: "left",
                        padding: "1px",
                        fontWeight: "bold",
                      }}
                    >
                      Valid Up To
                    </span>
                    <span style={{ margin: "0 10px" }}>:</span>
                    <span
                      style={{
                        textAlign: "left",
                        fontWeight: "400",
                        paddingLeft: "10px",
                      }}
                      className="text-nowrap"
                    >
                      {/* {new Date(
                        new Date(formData.updatedAt).setFullYear(
                          new Date(formData.updatedAt).getFullYear() + 1
                        )
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })} */}
                      chosen by admin
                    </span>
                  </div>
                </div>

                <div
                  style={{ marginTop: "10px", fontSize: "19px" }}
                  className="mt-8 ml-1"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "4px",
                      marginTop: "10px",
                    }}
                  >
                    <img
                      src={instagram}
                      alt="Instagram"
                      style={{
                        width: "40px",
                        height: "40px",
                        marginRight: "10px",
                        verticalAlign: "middle",
                      }}
                    />
                    <span style={{ fontSize: "16px" }}>
                      {userData.youtubeChannelUrl}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "4px",
                    }}
                  >
                    <img
                      src={facebook}
                      alt="Facebook"
                      style={{
                        width: "40px",
                        height: "40px",
                        marginRight: "10px",
                        verticalAlign: "middle",
                      }}
                    />
                    <span style={{ fontSize: "16px" }}>
                      {userData.facebookPageUrl}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "4px",
                    }}
                  >
                    <img
                      src={youtube}
                      alt="YouTube"
                      style={{
                        width: "40px",
                        height: "40px",
                        marginRight: "10px",
                        verticalAlign: "middle",
                      }}
                    />
                    <span style={{ fontSize: "16px" }}>
                      {userData.instagramPageUrl}
                    </span>
                  </div>
                </div>

                <GenerateQRCode text={qrText} image={instagram} />
                <a
                  href="www.iinsaf.com"
                  target="_blank"
                  className="mt-1 text-blue-700"
                >
                  www.iinsaf.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyForCard;
