import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { createLead } from "../../redux/leadSlicer";
import { createLead } from '../../../../redux/leadSlicer'
import indianstateandcity from '../../../LoginRegisterUser/IndianStatesCities.json';


const PostLead = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.lead);

  const [formData, setFormData] = useState({
    channelType: "",
    adType: "",
    requiredViews: "",
    adArea: { adState: "", adCity: "" },
    createdBy: "",
    adDescription: "",
    adNote: "",
    couponCode: "",
    mediaType: "image", // Default set to image
    mediaDescription: "",
    adLength: "",
    image: null,
    video: null,
  });

  const [selectedMediaType, setSelectedMediaType] = useState("image"); // Default state set to image
  const [states, setStates] = useState([]); // Store state names
  const [selectedState, setSelectedState] = useState(""); // Store selected state
  const [cities, setCities] = useState([]); // Store cities for selected state
  useEffect(() => {
    // Populate state names from the JSON file
    setStates(Object.keys(indianstateandcity));
  }, []);

  const getCityName = (cityObj) => (typeof cityObj === "string" ? cityObj : cityObj.city);

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
      adArea: { adState: selectedState, adCity: getCityName(stateCities[0]) || "" },
    }));
    setCities(stateCities);
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleMediaTypeChange = (e) => {
    setSelectedMediaType(e.target.value);
    setFormData({ ...formData, mediaType: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
 //   console.log("Lead Data being sent:", leadData);
    dispatch(createLead(leadData));
  };

  console.log(formData)
  return (
    <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="col-span-1 lg:col-span-2 grid grid-cols-1 gap-6"
      >
        {/* Ad Configuration Section */}
        <FormCard title="Ad Configuration">
          <h6>Channel Type</h6>
          <InputField
            name="channelType"
            placeholder="Channel Type"
            value={formData.channelType}
            onChange={handleChange}
          />
          <h6>Ad Type</h6>
          <select
            name="adType"
            value={formData.adType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="" disabled>
              Select Ad Type
            </option>
            {["bannerAd", "videoAd", "lTypeAd"].map((adType) => (
              <option key={adType} value={adType}>
                {adType}
              </option>
            ))}
          </select>
          <h6>Reach People</h6>
          <InputField
            name="requiredViews"
            type="number"
            placeholder="Reach People"
            value={formData.requiredViews}
            onChange={handleChange}
          />
          <h6>Ad Length</h6>
          <InputField
            name="adLength"
            type="number"
            placeholder="Ad Length"
            value={formData.adLength}
            onChange={handleChange}
          />
          <h6>Media Description</h6>
          <InputField
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
            {["Created by user", "iinsaf organization"].map((creator) => (
              <option key={creator} value={creator}>
                {creator}
              </option>
            ))}
          </select>
          <h6>Ad Description</h6>
          <InputField
            name="adDescription"
            placeholder="Ad Description"
            value={formData.adDescription}
            onChange={handleChange}
          />
          <h6>Ad Note</h6>
          <InputField
            name="adNote"
            placeholder="Ad Note"
            value={formData.adNote}
            onChange={handleChange}
          />
        </FormCard>

        {/* Location and Coupon Section */}
        <FormCard title="Location and Coupon Information">
          <h6>Ad State</h6>
          <select
            name="adArea.adState"
            value={formData.adArea.adState}
            onChange={handleStateChange}
            className="w-full p-2 border rounded"
          >
            <option value=''>Select State</option>

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
          <InputField
            name="couponCode"
            placeholder="Coupon Code"
            value={formData.couponCode}
            onChange={handleChange}
          />
        </FormCard>

        {/* Conditional File Upload Section */}
        <FormCard title="File Upload">
          {selectedMediaType === "image" && (
            <>
              <h6>Upload Image</h6>
              <InputField name="image" type="file" onChange={handleFileChange} />
            </>
          )}
          {selectedMediaType === "video" && (
            <>
              <h6>Upload Video</h6>
              <InputField name="video" type="file" onChange={handleFileChange} />
            </>
          )}
        </FormCard>

        <button
          type="submit"
          className="col-span-1 lg:col-span-2 p-2 bg-blue-500 text-white hover:bg-blue-600 rounded"
        >
          Submit Lead
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  </div>
);

const InputField = ({ name, type = "text", placeholder, value, onChange }) => (
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
