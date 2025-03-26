import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createOrUpdatePricing } from "../../../redux/AdminRedux/adminPriceSetSlicer"; // Assuming this is where your action is defined
import { baseUrl } from "../../../utils/const";

const PriceSet = () => {
  const dispatch = useDispatch();
  const [isEditable, setIsEditable] = useState(false);


  const toggleEditable = () => {
    setIsEditable(!isEditable);
  };

  const [formData, setFormData] = useState({
    views: "",
    minViews: "",
    maxViews: "",
    oneKView: "",
    adLength: "",
    reporterPriceAdLength: "",
    reporterPricePerRequestedView: "",
    minAdLength: "",
    maxAdLength: "",
    self: "",
    iinsaf: "",
    conferencePrice: "",
    adType: [],
    channelType: [],
  });

  const [adTypeInput, setAdTypeInput] = useState({
    name: "",
    price: "",
  });
  const [channelTypeInput, setChannelTypeInput] = useState
    ({
      name: "",
      price: "",
    });

  // Fetch existing pricing data on component mount
  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const response = await fetch(`${baseUrl}getPricing`); // Adjust the endpoint as necessary
        if (!response.ok) {
          throw new Error("Failed to fetch pricing data");
        }
        const data = await response.json();
        setFormData({
          views: data.views || "",
          minViews: data.minViews || "",
          maxViews: data.maxViews || "",
          oneKView: data.oneKView || "",
          adLength: data.adLength || "",
          reporterPriceAdLength: data.reporterPriceAdLength || "",
          reporterPricePerRequestedView: data.reporterPricePerRequestedView || "",
          minAdLength: data.minAdLength || "",
          maxAdLength: data.maxAdLength || "",
          self: data.self || "",
          iinsaf: data.iinsaf || "",
          conferencePrice: data.conferencePrice || "",
          adType: data.adType || [], // Populate the adType array
          channelType: data.channelType || [], // Populate the channelType array
        });
      } catch (error) {
        console.error("Error fetching pricing data:", error);
      }
    };

    fetchPricing();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdTypeChange = (e) => {
    const { name, value } = e.target;
    setAdTypeInput({ ...adTypeInput, [name]: value });
  };

  const handleChannelTypeChange = (e) => {
    const { name, value } = e.target;
    setChannelTypeInput({
      ...channelTypeInput, [name]: value
    });
  };

  const handleAddAdType = () => {
    if (adTypeInput.name && adTypeInput.price) {
      setFormData((prevData) => ({
        ...prevData,
        adType: [...prevData.adType, { ...adTypeInput }],
      }));
      setAdTypeInput({ name: "", price: "" }); // Reset input fields
    }
  };

  const handleAddChannelType = () => {
    if (channelTypeInput.name && channelTypeInput.price) {
      setFormData((prevData) => ({
        ...prevData,
        channelType: [...prevData.channelType, { ...channelTypeInput }],
      }));
      setChannelTypeInput({ name: "", price: "" }); // Reset input fields
    }
  }

  const handleRemoveAdType = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      adType: prevData.adType.filter((_, i) => i !== index),
    }));
  };

  const handleRemoveChannelType = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      channelType: prevData.channelType.filter((_, i) => i !== index),
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createOrUpdatePricing(formData));
  };

  console.log(formData);
  return (
    <div className="bg-gray-100 flex items-center justify-center p-6 min-h-screen">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-4 sm:p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Price Set</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold block mb-2">Price Multiple Views</label>
            <input
              type="number"
              name="views"
              className="w-full p-2 border rounded"
              value={formData.views}
              onChange={handleChange}
              placeholder="Views"
            />
          </div>
          <div>
            <label className="font-semibold block mb-2">Min Views</label>
            <input
              type="number"
              name="minViews"
              className="w-full p-2 border rounded"
              value={formData.minViews}
              onChange={handleChange}
              placeholder="Min Views"
            />
          </div>
          <div>
            <label className="font-semibold block mb-2">Max Views</label>
            <input
              type="number"
              name="maxViews"
              className="w-full p-2 border rounded"
              value={formData.maxViews}
              onChange={handleChange}
              placeholder="Max Views"
            />
          </div>


          <div>
            <label className="font-semibold block mb-2">Reporter Price per view</label>
            <input
              type="number"
              name="reporterPricePerRequestedView"
              className="w-full p-2 border rounded"
              value={formData.reporterPricePerRequestedView}
              onChange={handleChange}
              placeholder="Price Per View"
            />
          </div>
          <div>
            <label className="font-semibold block mb-2">Reporter Price Ad Length</label>
            <input
              type="number"
              name="reporterPriceAdLength"
              className="w-full p-2 border rounded"
              value={formData.reporterPriceAdLength}
              onChange={handleChange}
              placeholder="Price For Ad Length"
            />
          </div>
          {/* <div>
            <label className="font-semibold block mb-2">1K View</label>
            <input
              type="number"
              name="oneKView"
              className="w-full p-2 border rounded"
              value={formData.oneKView}
              onChange={handleChange}
              placeholder="1K View"
            />
          </div> */}
          <div>
            <label className="font-semibold block mb-2">Ad Length Price</label>
            <input
              type="number"
              name="adLength"
              className="w-full p-2 border rounded"
              value={formData.adLength}
              onChange={handleChange}
              placeholder="Ad Length"
            />
          </div>
          <div>
            <label className="font-semibold block mb-2">Minimum Ad Length</label>
            <input
              type="number"
              name="minAdLength"
              className="w-full p-2 border rounded"
              value={formData.minAdLength}
              onChange={handleChange}
              placeholder="Min Ad Length"
            />
          </div>
          <div>
            <label className="font-semibold block mb-2">Maximum Ad Length</label>
            <input type="number"
              name="maxAdLength"
              className="w-full p-2 border rounded"
              value={formData.maxAdLength}
              onChange={handleChange}
              placeholder="Max Ad Length"
            />
          </div>
          <div>
            <label className="font-semibold block mb-2">Self Price</label>
            <input
              type="number"
              name="self"
              className="w-full p-2 border rounded"
              value={formData.self}
              onChange={handleChange}
              placeholder="Self"
            />
          </div>
          <div>
            <label className="font-semibold block mb-2">iinsaf Price</label>
            <input
              type="number"
              name="iinsaf"
              className="w-full p-2 border rounded"
              value={formData.iinsaf}
              onChange={handleChange}
              placeholder="iinsaf"
            />
          </div>
          <div>
            <label className="font-semibold block mb-2">Conference Price / Reporter</label>
            <input
              type="number"
              name="conferencePrice"
              className="w-full p-2 border rounded"
              value={formData.conferencePrice}
              onChange={handleChange}
              placeholder="Conference Price"
            />
          </div>

          {/* Ad Type Section */}
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold pt-4">Ad Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold block mb-2">Ad Type Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full p-2 border rounded"
                  value={adTypeInput.name}
                  onChange={handleAdTypeChange}
                  placeholder="Ad Type Name"
                />
              </div>
              <div>
                <label className="font-semibold block mb-2">Ad Type Price</label>
                <input
                  type="number"
                  name="price"
                  className="w-full p-2 border rounded"
                  value={adTypeInput.price}
                  onChange={handleAdTypeChange}
                  placeholder="Ad Type Price"
                />
              </div>
              <div className="md:col-span-2 flex justify-center mt-4">
                <button
                  type="button"
                  onClick={handleAddAdType}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add Ad Type
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-md font-semibold mt-4 mb-2">Current Ad Types</h3>
            <ul>
              {formData.adType.map((ad, index) => (
                <li
                  key={index}
                  className="p-2 bg-gray-200 rounded mb-1 flex justify-between items-center"
                >
                  <span>{ad.name}: ${ad.price}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAdType(index)}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>


          {/* Channel Type Section */}
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold pt-4">Channel Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold block mb-2">Channel Type Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full p-2 border rounded"
                  value={channelTypeInput.name}
                  onChange={handleChannelTypeChange}
                  placeholder="Channel Type Name"
                />
              </div>
              <div>
                <label className="font-semibold block mb-2">Channel Type Price</label>
                <input
                  type="number"
                  name="price"
                  className="w-full p-2 border rounded"
                  value={channelTypeInput.price}
                  onChange={handleChannelTypeChange}
                  placeholder="Channel Type Price"
                />
              </div>
              <div className="md:col-span-2 flex justify-center mt-4">
                <button
                  type="button"
                  onClick={handleAddChannelType}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add Channel Type
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-md font-semibold mt-4 mb-2">Current Channel Types</h3>
            <ul>
              {formData.channelType.map((channel, index) => (
                <li
                  key={index}
                  className="p-2 bg-gray-200 rounded mb-1 flex justify-between items-center"
                >
                  <span>{channel.name}: ${channel.price}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveChannelType(index)}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Save Pricing
            </button>
          </div>
        </form>
      </div >
    </div >
  );

};

const InputField = ({ label, type, name, value, onChange, placeholder }) => (
  <div className="flex flex-col">
    <label className="mb-1 text-sm font-medium text-black">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

export default PriceSet;
