import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { createLead } from "../../redux/leadSlicer";
import { createLead } from "../../redux/leadSlicer";
import indianstateandcity from "../LoginRegisterUser/IndianStatesCities.json";
import { baseUrl, loadRazorpay } from "../../utils/const";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify components
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { useNavigate } from "react-router-dom";

const PostLead = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const { status, error } = useSelector((state) => state.lead);

  const [formData, setFormData] = useState({
    channelType: "",
    adType: "",
    requiredViews: "1000",
    adArea: { adState: "", adCity: "" },
    createdBy: "",
    adDescription: "",
    adNote: "",
    couponCode: "",
    mediaType: "image", // Default set to image
    mediaDescription: "",
    adLength: "5",
    image: null,
    video: null,
  });

  const [selectedMediaType, setSelectedMediaType] = useState("image"); // Default state set to image
  const [states, setStates] = useState([]); // Store state names
  const [selectedState, setSelectedState] = useState(""); // Store selected state
  const [cities, setCities] = useState([]); // Store cities for selected state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // New state for checkbox
  const [pricing, setPricing] = useState(null);
  const [totalCost, setTotalCost] = useState(0);
  const [savedAmount, setSavedAmount] = useState(null);
  const [minAdLength, setMinAdLength] = useState(0);
  const [maxAdLength, setMaxAdLength] = useState(0);
  const [minViews, setMinViews] = useState(100);
  const [maxViews, setMaxViews] = useState(10000);

  useEffect(() => {
    // Populate state names from the JSON file
    setStates(Object.keys(indianstateandcity));
  }, []);

  const [adTypes, setAdTypes] = useState([]); // State to hold ad types
  const [channelType, setChannelType] = useState([]); // State to hold channel types
  // Fetch ad types when the component mounts
  // console.log(adTypes);

  useEffect(() => {
    const fetchAdTypes = async () => {
      try {
        const response = await axios.get(`${baseUrl}getPricing`); // Adjust the endpoint as needed
        // Ensure response.data.adType is correctly accessed:
        setAdTypes(response.data.adType); // Assuming response.data.adType is the array
        setChannelType(response.data.channelType);
        setPricing(response.data);
        setFormData((prev) => ({
          ...prev,
          adLength: response.data.minAdLength.toString(), // Ensure it's a string if needed
        }));
        setMinAdLength(response?.data?.minAdLength);
        setMaxAdLength(response?.data?.maxAdLength);
        setMinViews(response?.data?.minViews);
        setMaxViews(response?.data?.maxViews);

        //   console.log(response);
      } catch (error) {
        console.error("Error fetching ad types:", error);
      }
    };

    fetchAdTypes();
  }, []);

  const calculateTotalCost = (discount = 0) => {
    // Check if pricing is not null and has the necessary properties
    if (pricing && pricing.adType && formData) {
      const adTypePrice =
        pricing.adType.find((ad) => ad.name === formData.adType)?.price || 1;
      const viewsCost = formData.requiredViews * pricing.views;
      const adLengthCost = formData.adLength * pricing.adLength;
      const creatorCost = pricing[formData.createdBy] || 1;

      let total = (viewsCost + adLengthCost) * creatorCost * adTypePrice;

      // Apply the discount
      if (discount > 0) {
        const saved = (total * discount) / 100; // Calculate saved amount
        setSavedAmount(saved); // Update the saved amount
        total = total - saved; // Subtract the discount from the total
      } else {
        setSavedAmount(null); // Reset saved amount if no discount
      }

      setTotalCost(total); // Update the total cost
    }
  };

  useEffect(() => {
    // Only call calculateTotalCost if pricing is not null
    if (pricing) {
      calculateTotalCost();
    }
  }, [formData, pricing]); // Recalculate when formData or pricing changes

  const getCityName = (cityObj) =>
    typeof cityObj === "string" ? cityObj : cityObj.city;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("adArea.")) {
      const key = name.split(".")[1];
      setFormData((prevState) => ({
        ...prevState,
        adArea: { ...prevState.adArea, [key]: value },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    const stateCities = indianstateandcity[selectedState] || [];

    setFormData((prevState) => ({
      ...prevState,
      adArea: {
        adState: selectedState,
        adCity: getCityName(stateCities[0]) || "",
      },
    }));
    setCities(stateCities);
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file) {
      const fileType = file.type; // Get the MIME type of the file

      // Check for invalid media type based on the selectedMediaType
      if (
        (selectedMediaType === "image" && !fileType.startsWith("image/")) ||
        (selectedMediaType === "video" && !fileType.startsWith("video/"))
      ) {
        alert(
          `Invalid media type. Please upload a valid ${selectedMediaType}.`
        );
        e.target.value = ""; // Clear the input field
        return;
      }

      // If valid, update the formData and reset the other field
      setFormData({
        ...formData,
        image: name === "image" ? file : null, // Reset image if uploading video
        video: name === "video" ? file : null, // Reset video if uploading image
      });
    } else {
      // Reset the field if no file is selected
      setFormData({
        ...formData,
        [name]: null,
      });
    }
  };

  const handleMediaTypeChange = (e) => {
    setSelectedMediaType(e.target.value);
    setFormData({ ...formData, mediaType: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked); // Update checkbox state
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if checkbox is checked
    if (!isChecked) {
      toast.error("Please check the box to proceed.");
      return;
    }

    // Collect errors
    const errors = [];

    // Validate fields
    if (formData.createdBy === "self" && !formData.image && !formData.video) {
      toast.error("Please upload an image or a video.");
      return;
    }
    if (!formData.channelType) errors.push("Channel Type is required.");
    if (!formData.adType) errors.push("Ad Type is required.");
    if (
      !formData.requiredViews ||
      parseInt(formData.requiredViews, 10) < 1000
    ) {
      errors.push("Reach People must be at least 1000.");
    }
    if (!formData.adArea.adState) errors.push("State is required.");
    if (!formData.adArea.adCity) errors.push("City is required.");

    // If any errors, show them as toast messages
    if (errors.length) {
      errors.forEach((err) => toast.error(err));
      return;
    }

    // Prepare lead data for submission
    const leadData = new FormData();
    for (let key in formData) {
      if (key === "adArea") {
        for (let areaKey in formData.adArea) {
          leadData.append(`adArea[${areaKey}]`, formData.adArea[areaKey]);
        }
      } else {
        leadData.append(key, formData[key]);
      }
    }

    // Start submitting
    setIsSubmitting(true);

    // Get the userToken from localStorage
    const token = localStorage.getItem("userToken");

    // Make API request to create lead and get the payment order
    axios
      .post(`${baseUrl}create-lead`, leadData, {
        headers: {
          Authorization: token, // Attach userToken in headers
        },
      })
      .then((response) => {
        console.log("response from create lead => ", response); // <-- Add this line to log the adCost
        // Assuming response contains adCost and razorpayOrderId
        const razorpayOrderId = response.data.razorpayOrderId;
        const adCost = response.data.lead.adCost; // Extract adCost from the response

        // Load Razorpay dynamically
        loadRazorpay()
          .then((Razorpay) => {
            // console.log("RazorPay response in then => ", Razorpay);
            // console.log("Ad Cost in paise:", adCost * 100); // <-- Add this line to verify the paise amount
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
                  .post(`${baseUrl}verify-payment`, {
                    paymentId: paymentDetails.razorpay_payment_id,
                    orderId: paymentDetails.razorpay_order_id,
                    signature: paymentDetails.razorpay_signature,
                  })
                  .then((verifyResponse) => {
                    // If the payment verification is successful
                    toast.success("Payment verified successfully!");
                    navigate("/InAd/leads-Status"); // Navigate to leads-status page
                  })
                  .catch((err) => {
                    // If there was an error during payment verification
                    toast.error(err.message || "Error verifying payment.");
                  });
              },
              prefill: {
                name: formData.name,
                email: formData.email,
                contact: formData.mobile,
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
      .finally(() => {
        setIsSubmitting(false); // Reset submitting state
      });
  };

  const applyCouponCode = async (e) => {
    e.preventDefault();
    if (!formData.couponCode) {
      alert("Please enter a coupon code.");
      return;
    }

    try {
      // Make a GET request using Axios
      const response = await axios.get(`${baseUrl}applyCoupon`, {
        params: { couponCode: formData.couponCode }, // Pass couponCode as a query parameter
      });

      // Extract data from the response
      const data = response.data;

      alert(data.message);

      // Apply the discount in calculateTotalCost
      const discount = data.coupon.couponDiscount; // Get the discount percentage
      calculateTotalCost(discount); // Pass the discount to the function
    } catch (error) {
      // Handle Axios errors
      if (error.response) {
        // Server responded with a status other than 2xx
        alert(error.response.data.message || "Failed to apply coupon.");
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response from server:", error.request);
        alert("No response from server. Please try again later.");
      } else {
        // Something else caused the error
        console.error("Error:", error.message);
        alert("An error occurred while applying the coupon.");
      }
    }
  };

  return (
    <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="col-span-1 lg:col-span-2 grid grid-cols-1 gap-6"
      >
        {/* Ad Configuration Section */}
        <FormCard title="Ad Configuration">
          <h6>Channel Type</h6>
          <select
            name="channelType"
            value={formData.channelType}
            onChange={handleChange}
            className="w-full p-2 border"
          >
            <option value="">Select Channel Type</option>
            {channelType.map((channel) => (
              <option key={channel.name} value={channel.name}>
                {channel.name}
              </option>
            ))}
          </select>

          <h6>Ad Type</h6>
          <select
            name="adType"
            value={formData.adType}
            onChange={handleChange}
            className="w-full p-2 border"
          >
            <option value="">Select Ad Type</option>
            {adTypes.map((ad) => (
              <option key={ad.name} value={ad.name}>
                {ad.name}
              </option>
            ))}
          </select>

          <h6>Reach People</h6>
          {/* <InputField
            name="requiredViews"
            type="number"
            placeholder="Reach People"
            value={formData.requiredViews}
            onChange={(e) => {
              const value = Number(e.target.value);

              // Enforce min and max constraints
              if (value < minViews) {
                setFormData((prev) => ({
                  ...prev,
                  requiredViews: minViews,
                }));
              } else if (value > maxViews) {
                setFormData((prev) => ({
                  ...prev,
                  requiredViews: maxViews,
                }));
              } else {
                setFormData((prev) => ({
                  ...prev,
                  requiredViews: value,
                }));
              }
            }}
            min={minViews}
            max={maxViews}
          /> */}
          <InputFieldViews
            name="requiredViews"
            type="number"
            placeholder="Reach People"
            value={formData.requiredViews}
            onChange={(e) => {
              let value = Number(e.target.value);

              // Round to the nearest multiple of 1000
              if (value % 1000 !== 0) {
                value = Math.round(value / 1000) * 1000;
              }

              // Enforce min and max constraints
              if (value < minViews) {
                value = minViews;
              } else if (value > maxViews) {
                value = maxViews;
              }

              setFormData((prev) => ({
                ...prev,
                requiredViews: value,
              }));
            }}
            min={minViews}
            max={maxViews}
            step={1000} // ensures only 1000 increments
          />

          <h6>Ad Length</h6>
          <div className="flex justify-evenly">
            <input
              name="adLength"
              type="range"
              min={minAdLength} // Use min value from backend
              max={maxAdLength} // Set your max value based on desired range
              step="1" // Adjust the step as needed
              value={formData.adLength}
              onChange={handleChange}
            />
            <span className="bg-blue-200">{formData.adLength} seconds</span>
          </div>

          {/* Conditionally Render Media Description Based on Creator */}
          {formData.createdBy === "self" && (
            <>
              <h6>Media Description</h6>
              <textarea
                className="w-full h-[100px] p-2 border border-gray-300 rounded-md resize-y"
                name="mediaDescription"
                placeholder="Media Description"
                value={formData.mediaDescription}
                onChange={handleChange}
              />

              {/* Media Type Selection */}
              <div className="flex gap-4 items-center">
                <label className="font-semibold">Select Media Type:</label>
                <label>
                  <input
                    type="radio"
                    name="mediaType"
                    value="image"
                    checked={selectedMediaType === "image"}
                    onChange={handleMediaTypeChange}
                    className="mr-2"
                  />
                  Image
                </label>
                <label>
                  <input
                    type="radio"
                    name="mediaType"
                    value="video"
                    checked={selectedMediaType === "video"}
                    onChange={handleMediaTypeChange}
                    className="mr-2"
                  />
                  Video
                </label>
              </div>
              <br />
              {selectedMediaType === "image" && (
                <div>
                  <h6>Upload Image</h6>
                  <InputFieldVideo
                    name="image"
                    type="file"
                    onChange={handleFileChange}
                  />
                </div>
              )}
              {selectedMediaType === "video" && (
                <>
                  <h6>Upload Video</h6>
                  <InputFieldVideo
                    name="video"
                    type="file"
                    onChange={handleFileChange}
                  />
                </>
              )}
            </>
          )}
        </FormCard>

        {/* Creator Information Section */}
        <FormCard title="Creator Information">
          <h6>Created By</h6>
          <select
            name="createdBy"
            value={formData.createdBy}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="" disabled>
              Select Creator
            </option>
            {["self", "iinsaf"].map((creator) => (
              <option key={creator} value={creator}>
                {creator}
              </option>
            ))}
          </select>

          {/* Conditionally Render Ad Description and Ad Note */}
          {formData.createdBy === "iinsaf" && (
            <>
              <h6>Ad Description</h6>
              <textarea
                className="w-full h-[100px] p-2 border border-gray-300 rounded-md resize-y"
                name="adDescription"
                placeholder="Ad Description"
                value={formData.adDescription}
                onChange={handleChange}
              />
              <h6>Ad Note</h6>
              <textarea
                className="w-full h-[100px] p-2 border border-gray-300 rounded-md resize-y"
                name="adNote"
                placeholder="Ad Note"
                value={formData.adNote}
                onChange={handleChange}
              />
            </>
          )}

          <h6>Ad State</h6>
          <select
            name="adArea.adState"
            value={formData.adArea.adState}
            onChange={handleStateChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select State</option>

            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          <h6>Ad City</h6>
          <select
            name="adArea.adCity"
            value={formData.adArea.adCity}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            {cities.map((city) => (
              <option key={city.id || city} value={getCityName(city)}>
                {getCityName(city)}
              </option>
            ))}
          </select>

          <h6>Coupon Code</h6>
          <div className="flex">
            <InputField
              name="couponCode"
              placeholder="Coupon Code"
              value={formData.couponCode}
              onChange={handleChange}
            />
            <button
              onClick={applyCouponCode}
              className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition ml-2"
            >
              Apply Coupon
            </button>
          </div>

          {savedAmount > 0 && (
            <>
              <h2>You saved:</h2>
              <p className="mt-2 text-green-500">
                You saved: ₹{savedAmount.toFixed(2)}
              </p>
            </>
          )}
          <h6>Total Cost</h6>
          <p className="text-lg font-bold">Rs. {totalCost.toFixed(2)}</p>
        </FormCard>

        <div className="col-span-1 lg:col-span-2 flex items-center">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label className="text-gray-700">
            I agree to the terms and conditions before submitting the lead.
          </label>
        </div>

        <button
          type="submit"
          className="col-span-1 lg:col-span-2 p-2 bg-blue-500 text-white hover:bg-blue-600 rounded w-60"
          disabled={isSubmitting} // Disable button while submitting
        >
          {isSubmitting ? "Submitting..." : "Submit Adv"}
        </button>

        {status === "loading" && <p>Loading...</p>}
        {status === "success" && <p>Lead created successfully!</p>}
        {status === "failed" && <p>Error: {error}</p>}
      </form>
    </div>
  );
};

const FormCard = ({ title, children }) => (
  <div className="p-4 border rounded-lg shadow-md bg-white space-y-4">
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{children}</div>
  </div>
);

const InputField = ({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  options = [],
}) => {
  return type === "select" ? (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-40 p-2 border rounded"
    >
      <option value="">{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  ) : (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-40 p-2 border rounded"
    />
  );
};

const InputFieldViews = ({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  options = [],
  step = 1, // default step is 1
}) => {
  return type === "select" ? (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-40 p-2 border rounded"
    >
      <option value="">{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  ) : (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-40 p-2 border rounded"
      step={step} // add step attribute
    />
  );
};

const InputFieldVideo = ({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full p-2 border rounded"
  />
);

export default PostLead;
