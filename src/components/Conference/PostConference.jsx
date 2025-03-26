import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createConference } from "../../redux/conferenceSlicer";
import indianstateandcity from "../LoginRegisterUser/IndianStatesCities.json";
import { toast, ToastContainer } from "react-toastify"; // Importing toast functions
import "react-toastify/dist/ReactToastify.css"; // Import
import { baseUrl, loadRazorpay } from "../../utils/const";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const PostConference = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.conference);
  const [formData, setFormData] = useState({
    conferenceName: "",
    whatsappNumber: "",
    conferenceEmailAddress: "",
    numberOfReporters: 1,
    conferenceChannelState: "",
    conferenceChannelCity: "",
    conferenceArea: "",
    conferencePinCode: "",
    conferencePurpose: "",
    conferenceType: "",
  });

  const [states, setStates] = useState([]); // Store state names
  const [selectedState, setSelectedState] = useState(""); // Store selected state
  const [cities, setCities] = useState([]); // Store cities for selected state
  useEffect(() => {
    // Populate state names from the JSON file
    setStates(Object.keys(indianstateandcity));
  }, []);
  const [cost, setCost] = useState(0);
  const [pricingData, setPricingData] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    const getPricing = async () => {
      const response = await axios.get(`${baseUrl}getPricing`);
      setPricingData(response.data);
    }
    getPricing();
  }, [])

  const calculateCost = () => {
    if (formData.conferenceType === "paid") {
      const totalCost = pricingData?.conferencePrice * formData.numberOfReporters
      setCost(totalCost)
    } else {
      setCost(1)
    }
  }

  useEffect(() => {
    if (formData?.numberOfReporters && pricingData) {
      calculateCost();
    }
  }, [formData]);

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      conferenceChannelState: selectedState,
      conferenceChannelCity: "", // Reset city when state changes
    }));

    const stateCities = indianstateandcity[selectedState] || [];
    setCities(stateCities);
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      conferenceChannelCity: selectedCity,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let isValid = true;

    if (!formData.conferenceName) {
      toast.error("Conference Name is required");
      return false;
    }
    if (!formData.conferenceType) {
      toast.error("Conference Type is required");
      return false;
    }
    if (!formData.whatsappNumber) {
      toast.error("WhatsApp Number is required");
      return false;
    } else if (formData.whatsappNumber.length < 10) {
      toast.error("WhatsApp Number must be at least 10 digits");
      return false;
    }
    if (!formData.conferenceEmailAddress) {
      toast.error("Email Address is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(formData.conferenceEmailAddress)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!formData.numberOfReporters || formData.numberOfReporters < 1) {
      toast.error("Number of Reporters must be at least 1");
      return false;
    }
    if (!formData.conferenceChannelState) {
      toast.error("State is required");
      return false;
    }
    if (!formData.conferenceChannelCity) {
      toast.error("City is required");
      return false;
    }
    if (!formData.conferenceArea) {
      toast.error("Area is required");
      return false;
    }
    if (!formData.conferencePinCode) {
      toast.error("Pin Code is required");
      return false;
    } else if (formData.conferencePinCode.length != 6) {
      toast.error("Pin Code should be 6 digits");
      return false;
    }
    if (!formData.conferencePurpose) {
      toast.error("Purpose is required");
      return false;
    }
    const wordCount = formData.conferencePurpose.trim().split(/\s+/).length;
    if (wordCount < 10) {
      toast.error("Purpose must contain at least 10 words");
      return false;
    }

    return isValid; // Return true only if all validations pass

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form before dispatching the createConference action
    if (validateForm()) {
      try {
        // await dispatch(createConference(formData)); // Assuming createConference returns a promise
        const token = localStorage.getItem("userToken");

        await axios.post(
          `${baseUrl}createConference`,
          formData,
          {
            headers: {
              Authorization: token,
            },
          }
        ).then((response) => {
          console.log("response from create lead => ", response); // <-- Add this line to log the adCost
          // Assuming response contains adCost and razorpayOrderId
          const razorpayOrderId = response.data.razorpayOrderId;
          const adCost = response.data.conference.conferenceCost; // Extract adCost from the response

          // Load Razorpay dynamically
          loadRazorpay()
            .then((Razorpay) => {
              console.log("RazorPay response in then => ", Razorpay);
              console.log("Ad Cost in paise:", adCost * 100); // <-- Add this line to verify the paise amount
              // Initialize Razorpay payment
              const options = {
                key: "rzp_test_MAiOifGgaIOqpq", // Razorpay API key (can be obtained from Razorpay dashboard)
                amount: adCost * 100, // Convert amount to paise (Razorpay uses paise as currency unit)
                currency: "INR",
                order_id: razorpayOrderId, // Order ID from the backend
                name: "Your Company Name",
                description: "Payment for Lead Creation",
                handler: function (response) {
                  console.log("Received payment response:", response); // Log the entire response object
                  // Payment success callback
                  const paymentDetails = response;
                  console.log("payment", paymentDetails);
                  toast.success("Payment successful!");

                  // Directly call your API to verify the payment
                  axios
                    .post(`${baseUrl}verify-paymentConference`, {
                      paymentId: paymentDetails.razorpay_payment_id,
                      orderId: paymentDetails.razorpay_order_id,
                      signature: paymentDetails.razorpay_signature,
                    })
                    .then((verifyResponse) => {
                      // If the payment verification is successful
                      toast.success("Payment verified successfully!");
                      toast.success("Conference created successfully!"); // Show success toast
                      setFormData({
                          conferenceName: "",
                          whatsappNumber: "",
                          conferenceEmailAddress: "",
                          numberOfReporters: 1,
                          conferenceChannelState: "",
                          conferenceChannelCity: "",
                          conferenceArea: "",
                          conferencePinCode: "",
                          conferencePurpose: "",
                        });
                        setSelectedState("");
                        setCities([]);
                      navigate("/InAd/get-user-conferences"); // Navigate to leads-status page
                    })
                    .catch((err) => {
                      // If there was an error during payment verification
                      toast.error(err.message || "Error verifying payment.");
                    });
                },
                prefill: {
                  name: formData.conferenceName,
                  email: formData.conferenceEmailAddress,
                  contact: formData.whatsappNumber,
                },
                theme: {
                  color: "#F37254", // Customize Razorpay theme color
                },
              };

              // Open Razorpay payment modal
              const rzp1 = new Razorpay(options);
              rzp1.open();
            })
            .catch((err) => {
              toast.error("Razorpay script failed to load: " + err.message);
            });
        })
          .catch((err) => {
            toast.error(err.message || "Error creating lead.");
          })


        // toast.success("Conference created successfully!"); // Show success toast
        // setFormData({
        //   conferenceName: "",
        //   whatsappNumber: "",
        //   conferenceEmailAddress: "",
        //   numberOfReporters: 1,
        //   conferenceChannelState: "",
        //   conferenceChannelCity: "",
        //   conferenceArea: "",
        //   conferencePinCode: "",
        //   conferencePurpose: "",
        // });
        // setSelectedState("");
        // setCities([]);
      } catch (err) {
        toast.error("Error creating conference: " + err.message); // Show error toast
      }
    }
  };

  return (
    <div className="mt-16 max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <ToastContainer /> {/* ToastContainer for displaying notifications */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        Create Conference
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* {error && <p className="text-red-500">{error}</p>} */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Conference Name
            </label>
            <input
              type="text"
              name="conferenceName"
              placeholder="Conference Name"
              value={formData.conferenceName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label htmlFor="conferenceType">Conference Type:</label>
            <select
              name="conferenceType"
              value={formData.conferenceType}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select a type</option>
              <option value="paid">Paid</option>
              <option value="free">Free</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              WhatsApp Number
            </label>
            <input
              type="tel"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Allow only digits
              }}
              name="whatsappNumber"
              placeholder="WhatsApp Number"
              value={formData.whatsappNumber}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            name="conferenceEmailAddress"
            placeholder="Email Address"
            value={formData.conferenceEmailAddress}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Number of Reporters
            </label>
            <input
              type="number"
              name="numberOfReporters"
              placeholder="Number of Reporters"
              value={formData.numberOfReporters}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              State
            </label>
            <select
              name="conferenceChannelState"
              value={formData.conferenceChannelState}
              onChange={handleStateChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled>
                Select State
              </option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            City
          </label>
          <select
            name="conferenceChannelCity"
            value={formData.conferenceChannelCity}
            onChange={handleCityChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={!formData.conferenceChannelState}
          >
            <option value="" disabled>
              Select City
            </option>
            {cities.map((cityObj) => (
              <option key={cityObj.id} value={cityObj.city}>
                {cityObj.city}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Area
            </label>
            <input
              type="text"
              name="conferenceArea"
              placeholder="Area"
              value={formData.conferenceArea}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pin Code
            </label>
            <input
              type="number"
              name="conferencePinCode"
              placeholder="Pin Code"
              value={formData.conferencePinCode}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Purpose
          </label>
          <textarea
            name="conferencePurpose"
            value={formData.conferencePurpose}
            onChange={handleChange}
            rows="3"
            placeholder="Purpose"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cost
          </label>
          <input
            type="number"
            name="cost"
            placeholder="Cost of Conference"
            value={cost}
            readOnly
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full p-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {loading ? "Creating Conference..." : "Create Conference"}
        </button>
      </form>
    </div>
  );
};

export default PostConference;
