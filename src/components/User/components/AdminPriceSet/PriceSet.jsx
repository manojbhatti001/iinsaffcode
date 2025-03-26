import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrUpdatePricing } from "../../../redux/AdminRedux/adminPriceSetSlicer";

const PriceSet = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.pricing);

  const [formData, setFormData] = useState({
    views: "",
    minViews: "",
    maxViews: "",
    oneKView: "",
    adLength: "",
    bannerAd: "",
    videoAd: "",
    lTypeAd: "",
    self: "",
    iinsaf: "",
    conferencePrice: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createOrUpdatePricing(formData));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Set Pricing</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Views"
              type="number"
              name="views"
              value={formData.views}
              onChange={handleChange}
              placeholder="Views"
            />
            <InputField
              label="Min Views"
              type="number"
              name="minViews"
              value={formData.minViews}
              onChange={handleChange}
              placeholder="Min Views"
            />
            <InputField
              label="Max Views"
              type="number"
              name="maxViews"
              value={formData.maxViews}
              onChange={handleChange}
              placeholder="Max Views"
            />
            <InputField
              label="1K View"
              type="number"
              name="oneKView"
              value={formData.oneKView}
              onChange={handleChange}
              placeholder="1K View"
            />
            <InputField
              label="Ad Length"
              type="number"
              name="adLength"
              value={formData.adLength}
              onChange={handleChange}
              placeholder="Ad Length"
            />
            <InputField
              label="Banner Ad"
              type="number"
              name="bannerAd"
              value={formData.bannerAd}
              onChange={handleChange}
              placeholder="Banner Ad"
            />
            <InputField
              label="Video Ad"
              type="number"
              name="videoAd"
              value={formData.videoAd}
              onChange={handleChange}
              placeholder="Video Ad"
            />
            <InputField
              label="Live Type Ad"
              type="number"
              name="lTypeAd"
              value={formData.lTypeAd}
              onChange={handleChange}
              placeholder="Live Type Ad"
            />
            <InputField
              label="Self"
              type="number"
              name="self"
              value={formData.self}
              onChange={handleChange}
              placeholder="Self"
            />
            <InputField
              label="iinsaf"
              type="number"
              name="iinsaf"
              value={formData.iinsaf}
              onChange={handleChange}
              placeholder="iinsaf"
            />
            <InputField
              label="Conference Price"
              type="number"
              name="conferencePrice"
              value={formData.conferencePrice}
              onChange={handleChange}
              placeholder="Conference Price"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Pricing"}
          </button>
        </form>
        {error && <p className="mt-4 text-red-500">Error: {error}</p>}
      </div>
    </div>
  );
};

const InputField = ({ label, type, name, value, onChange, placeholder }) => (
  <div className="flex flex-col">
    <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
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
