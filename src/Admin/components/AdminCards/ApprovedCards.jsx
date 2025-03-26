// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { baseUrl } from "../../../utils/const";

// const ApprovedCards = () => {
//   const [cardRequests, setCardRequests] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     fatherName: "",
//     bloodGroup: "",
//     designation: "",
//     aadharCardNumber: "",
//     address: "",
//     mobile: "",
//     status: "",
//   });
//   const [selectedCardId, setSelectedCardId] = useState(null);
//   const [error, setError] = useState(null);

//   // Fetch pending card requests
//   useEffect(() => {
//     const fetchCardRequests = async () => {
//       try {
//         const token = localStorage.getItem("adminToken"); // Get token from local storage
//         const { data } = await axios.get(`${baseUrl}approvedCard`, {
//           headers: {
//             Authorization: `Bearer ${token}`, // Set Authorization header
//           },
//         });
//         setCardRequests(data);
//       } catch (err) {
//         setError("Error fetching card requests");
//       }
//     };
//     fetchCardRequests();
//   }, []);

//   // Handle form field changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle card selection
//   const handleCardSelect = (card) => {
//     setSelectedCardId(card._id);
//     setFormData({
//       name: card.name,
//       fatherName: card.fatherName,
//       bloodGroup: card.bloodGroup,
//       designation: card.designation,
//       aadharCardNumber: card.aadharCardNumber,
//       address: card.address,
//       mobile: card.mobile,
//       status: card.status,
//     });
//   };

//   // Update card details API call
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedCardId) {
//       setError("Please select a card to update");
//       return;
//     }
//     try {
//       const token = localStorage.getItem("adminToken"); // Get token from local storage
//       const { data } = await axios.put(
//         `${baseUrl}updateCard?cardId=${selectedCardId}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Set Authorization header
//           },
//         }
//       );
//       // console.log("Updated card details:", data);
//       // Update local state if needed
//     } catch (err) {
//       setError("Error updating card details");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center min-h-screen bg-gray-100">
//       <h2 className="text-2xl font-semibold my-4">Approved Card Requests</h2>
//       {error && <p className="text-red-500">{error}</p>}

//       <div className="max-w-lg w-full bg-white shadow-md rounded-lg overflow-hidden mb-4">
//         <table className="min-w-full bg-white">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border-b text-left text-gray-700">
//                 Name
//               </th>
//               <th className="py-2 px-4 border-b text-left text-gray-700">
//                 Mobile
//               </th>
//               <th className="py-2 px-4 border-b text-left text-gray-700">
//                 Select
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {cardRequests.map((card) => (
//               <tr key={card._id} className="hover:bg-gray-100">
//                 <td className="py-2 px-4 border-b">{card.name}</td>
//                 <td className="py-2 px-4 border-b">{card.mobile}</td>
//                 <td className="py-2 px-4 border-b">
//                   <button
//                     onClick={() => handleCardSelect(card)}
//                     className="text-blue-600 hover:underline"
//                   >
//                     Select
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         className="p-8 bg-white shadow-lg rounded-lg max-w-lg w-full space-y-4"
//       >
//         <h2 className="text-2xl font-semibold text-gray-800">
//           Update Card Details
//         </h2>

//         {Object.keys(formData).map((field) => (
//           <div key={field} className="flex flex-col">
//             <label className="text-gray-600 capitalize">
//               {field.replace(/([A-Z])/g, " $1")}
//             </label>

//             {field === "status" ? (
//               // Render a dropdown for the "status" field
//               <select
//                 name={field}
//                 value={formData[field]}
//                 onChange={handleChange}
//                 className="px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               >
//                 <option value="" disabled>
//                   Select Status
//                 </option>
//                 <option value="pending">Pending</option>
//                 <option value="approved">Approved</option>
//                 <option value="rejected">Rejected</option>
//               </select>
//             ) : (
//               // Render a text input for all other fields
//               <input
//                 type="text"
//                 name={field}
//                 value={formData[field]}
//                 onChange={handleChange}
//                 className="px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             )}
//           </div>
//         ))}

//         <button
//           type="submit"
//           className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
//         >
//           Update Card
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ApprovedCards;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../utils/const";
import 'react-toastify/dist/ReactToastify.css'; 
import { toast, ToastContainer } from "react-toastify";

const ApprovedCards = () => {
  const [cardRequests, setCardRequests] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]); // For filtered results
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    bloodGroup: "",
    designation: "",
    aadharCardNumber: "",
    address: "",
    mobile: "",
    status: "",
  });
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [error, setError] = useState(null);
  const [isSwitchOn, setIsSwitchOn] = useState(false);  // State for switch (On/Off)

  // Fetch approved card requests
  useEffect(() => {
    const fetchCardRequests = async () => {
      try {
        const token = localStorage.getItem("adminToken"); // Get token from local storage
        const { data } = await axios.get(`${baseUrl}approvedCard`, {
          headers: {
            Authorization: `Bearer ${token}`, // Set Authorization header
          },
        });
        setCardRequests(data);
        setFilteredCards(data); // Initialize filtered cards
      } catch (err) {
        setError("Error fetching card requests");
      }
    };
    fetchCardRequests();
  }, []);

  // Handle search query change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter cards based on name, mobile, or email
    const filtered = cardRequests.filter(
      (card) =>
        card.name.toLowerCase().includes(query) ||
        card.mobile.toString().includes(query) ||
        card.email?.toLowerCase().includes(query) // Handle email if it exists
    );

    setFilteredCards(filtered);
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle card selection
  const handleCardSelect = (card) => {
    if (!isSwitchOn) {
      toast.error("Please turn on the switch to view card details!");
      return;
    }
    setSelectedCardId(card._id);
    setFormData({
      name: card.name,
      fatherName: card.fatherName,
      bloodGroup: card.bloodGroup,
      designation: card.designation,
      aadharCardNumber: card.aadharCardNumber,
      address: card.address,
      mobile: card.mobile,
      status: card.status,
    });
  };

  // Update card details API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCardId) {
      setError("Please select a card to update");
      return;
    }
    try {
      const token = localStorage.getItem("adminToken"); // Get token from local storage
      const { data } = await axios.put(
        `${baseUrl}updateCard?cardId=${selectedCardId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Set Authorization header
          },
        }
      );
      alert("Card details updated successfully!");
      setError(null);
    } catch (err) {
      setError("Error updating card details");
    }
  };

  const toggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <ToastContainer/>
      <h2 className="text-2xl font-semibold my-4">Approved Card Requests</h2>
      {error && <p className="text-red-500">{error}</p>}

          {/* Switch for on/off */}
          <div className="flex items-center mb-4">
        <label className="mr-2 text-gray-700">View Info: </label>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only"
            checked={isSwitchOn}
            onChange={toggleSwitch}
          />
          <div
            className={`w-11 h-6 bg-gray-200 rounded-full flex items-center ${isSwitchOn ? 'bg-blue-500' : 'bg-gray-400'}`}
          >
            <span
              className={`absolute w-4 h-4 bg-white rounded-full transition-transform ${isSwitchOn ? 'transform translate-x-5' : 'transform translate-x-0'}`}
            />
          </div>
        </label>
      </div>

      {/* Search Bar */}
      <div className="w-full max-w-md mb-4">
        <input
          type="text"
          placeholder="Search by name, number, or email..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Cards Table */}
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg overflow-hidden mb-4">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left text-gray-700">
                Name
              </th>
              <th className="py-2 px-4 border-b text-left text-gray-700">
                Mobile
              </th>
              <th className="py-2 px-4 border-b text-left text-gray-700">
                Id-Card Details
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCards.map((card) => (
              <tr key={card._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{card.name}</td>
                <td className="py-2 px-4 border-b">{card.mobile}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleCardSelect(card)}
                    className="text-blue-600 hover:underline"
                  >
                    View-Info
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Form */}
      {selectedCardId && isSwitchOn && (
        <form
          onSubmit={handleSubmit}
          className="p-8 bg-white shadow-lg rounded-lg max-w-lg w-full space-y-4"
        >
          <h2 className="text-2xl font-semibold text-gray-800">
            Update Card Details
          </h2>

          {Object.keys(formData).map((field) => (
            <div key={field} className="flex flex-col">
              <label className="text-gray-600 capitalize">
                {field.replace(/([A-Z])/g, " $1")}
              </label>

              {field === "status" ? (
                <select
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              ) : (
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Update Card
          </button>
        </form>
      )}
    </div>
  );
};

export default ApprovedCards;
