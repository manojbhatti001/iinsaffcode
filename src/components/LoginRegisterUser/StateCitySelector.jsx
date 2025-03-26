import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StateCitySelector = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [error, setError] = useState('');

  const statess =[
    "Andaman & Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra & Nagar Haveli",
    "Daman & Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu & Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
]
  useEffect(() => {
    // Fetch all states
    const fetchStates = async () => {
      try {
        const response = await axios.get('https://locations.iinsaf.com/?states=all');
     //   console.log(response)
        setStates(response.data);
      } catch (error) {
        console.error('Error fetching states:', error);
        setError('Failed to load states. Please try again.');
      }
    };

    fetchStates();
  }, []);

  const handleStateChange = async (event) => {
    const stateName = event.target.value;
    setSelectedState(stateName);

    if (stateName) {
      // Fetch cities for the selected state
      try {
        const response = await axios.get(`https://locations.iinsaf.com/?states=${stateName}`);
     //   console.log(response)
        setCities(response.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
        setError('Failed to load cities. Please try again.');
      }
    } else {
      setCities([]); // Clear cities when no state is selected
    }
  };

  return (
    <div>
      <h1>Select Your State and City</h1>
      {error && <div className="error">{error}</div>}
      <div>
        <label htmlFor="state">State: </label>
        <select id="state" value={selectedState} onChange={handleStateChange}>
          <option value="">Select State...</option>
          {states.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="city">City: </label>
        <select id="city" disabled={!cities.length}>
          <option value="">Select City...</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default StateCitySelector;
