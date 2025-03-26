// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { baseUrl } from "../../../utils/const";

// const GetAllCreatedProfileByMarketer = () => {
//   const [profiles, setProfiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editProfile, setEditProfile] = useState(null); // For tracking profile being edited
//   const [formData, setFormData] = useState({
//     status: "",
//     note: "",
//     discount: 0,
//     isDiscountInRupees: true,
//   });

//   useEffect(() => {
//     const fetchProfiles = async () => {
//       try {
//         const response = await axios.get(`${baseUrl}adminGetAllProfile`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
//           },
//         });
//         setProfiles(response.data.profiles);
//         setLoading(false);
//       } catch (err) {
//         setError(err.response?.data?.message || "An error occurred");
//         setLoading(false);
//       }
//     };

//     fetchProfiles();
//   }, []);

//   const handleEditClick = (profile) => {
//     setEditProfile(profile._id);
//     setFormData({
//       status: profile.status || "",
//       note: profile.note || "",
//       discount: profile.discount || 0,
//       isDiscountInRupees: profile.isDiscountInRupees ?? true,
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === "discount" ? parseFloat(value) : value,
//     }));
//   };

//   const handleSubmit = async (id) => {
//     try {
//       const response = await axios.put(
//         `${baseUrl}updateStatusAndNote?id=${id}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
//           },
//         }
//       );
//       alert("Profile updated successfully!"); // Replace with a user-friendly UI update
//       setProfiles((prev) =>
//         prev.map((profile) =>
//           profile._id === id ? response.data.updatedProfile : profile
//         )
//       );
//       setEditProfile(null);
//     } catch (error) {
//       console.error(error);
//       alert(error.response?.data?.message || "Failed to update profile");
//     }
//   };

//   if (loading)
//     return <div className="text-center mt-8">Loading profiles...</div>;
//   if (error)
//     return <div className="text-center mt-8 text-red-500">{error}</div>;

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h1 className="text-2xl font-bold text-center mb-6">
//         All Created Profiles
//       </h1>
//       {profiles.map((profile) => (
//         <div
//           key={profile._id}
//           className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200"
//         >
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">
//             {profile.companyName} ({profile.companyType})
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <p>
//                 <strong>Company Address:</strong> {profile.companyAddress}
//               </p>
//               <p>
//                 <strong>GST Checked:</strong>{" "}
//                 {profile.gstChecked ? "Yes" : "No"}
//               </p>
//               <p>
//                 <strong>GST Number:</strong> {profile.gstNumber}
//               </p>
//               <p>
//                 <strong>PAN Card:</strong> {profile.panCardNumber}
//               </p>
//               <p>
//                 <strong>Address:</strong> {profile.address}
//               </p>
//               <p>
//                 <strong>Street:</strong> {profile.street}
//               </p>
//               <p>
//                 <strong>Locality:</strong> {profile.locality}
//               </p>
//             </div>
//             <div>
//               <p>
//                 <strong>City:</strong> {profile.city}
//               </p>
//               <p>
//                 <strong>State:</strong> {profile.state}
//               </p>
//               <p>
//                 <strong>Pincode:</strong> {profile.pincode}
//               </p>
//               <p>
//                 <strong>First Name:</strong> {profile.firstName}
//               </p>
//               <p>
//                 <strong>Last Name:</strong> {profile.lastName}
//               </p>
//               <p>
//                 <strong>Mobile:</strong> {profile.mobile}
//               </p>
//               <p>
//                 <strong>Email:</strong> {profile.email}
//               </p>
//             </div>
//           </div>
//           <div className="mt-4">
//             <h3 className="text-lg font-semibold">Marketer Details:</h3>
//             <p>
//               <strong>Name:</strong> {profile?.name}
//             </p>
//             <p>
//               <strong>Mobile:</strong> {profile?.mobile}
//             </p>
//             <p>
//               <strong>Email:</strong> {profile.email}
//             </p>
//           </div>
//           {editProfile === profile._id ? (
//             <div className="mt-4">
//               <label>
//                 <strong>Status:</strong>
//                 <select
//                   name="status"
//                   value={formData.status}
//                   onChange={handleInputChange}
//                   className="block w-full p-2 border border-gray-300 rounded"
//                 >
//                   <option value="pending">Pending</option>
//                   <option value="approved">Approved</option>
//                   <option value="cancelled">Cancelled</option>
//                   <option value="completed">Completed</option>
//                   <option value="rejected">Rejected</option>
//                 </select>
//               </label>
//               <label className="mt-2 block">
//                 <strong>Note:</strong>
//                 <textarea
//                   name="note"
//                   value={formData.note}
//                   onChange={handleInputChange}
//                   className="block w-full p-2 border border-gray-300 rounded"
//                 ></textarea>
//               </label>
//               <label className="mt-2 block">
//                 <strong>Discount:</strong>
//                 <input
//                   type="number"
//                   name="discount"
//                   value={formData.discount}
//                   onChange={handleInputChange}
//                   className="block w-full p-2 border border-gray-300 rounded"
//                 />
//               </label>
//               <label className="mt-2 block">
//                 <input
//                   type="checkbox"
//                   name="isDiscountInRupees"
//                   checked={formData.isDiscountInRupees}
//                   onChange={(e) =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       isDiscountInRupees: e.target.checked,
//                     }))
//                   }
//                 />
//                 <span className="ml-2">Is Discount in Rupees?</span>
//               </label>
//               <button
//                 onClick={() => handleSubmit(profile._id)}
//                 className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
//               >
//                 Save Changes
//               </button>
//               <button
//                 onClick={() => setEditProfile(null)}
//                 className="mt-4 ml-2 bg-gray-400 text-white px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>
//             </div>
//           ) : (
//             <div className="mt-4">
//               <p>
//                 <strong>Status:</strong> {profile.status}
//               </p>
//               <button
//                 onClick={() => handleEditClick(profile)}
//                 className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
//               >
//                 Edit
//               </button>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default GetAllCreatedProfileByMarketer;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../utils/const";

const GetAllCreatedProfileByMarketer = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editProfile, setEditProfile] = useState(null); // For tracking profile being edited
  const [formData, setFormData] = useState({
    status: "",
    note: "",
    discount: 0,
    isDiscountInRupees: true,
  });

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(`${baseUrl}adminGetAllProfile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        setProfiles(response.data.profiles);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred");
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleEditClick = (profile) => {
    setEditProfile(profile._id === editProfile ? null : profile._id);
    setFormData({
      status: profile.status || "",
      note: profile.note || "",
      discount: profile.discount || 0,
      isDiscountInRupees: profile.isDiscountInRupees ?? true,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "discount" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (id) => {
    try {
      const response = await axios.put(
        `${baseUrl}updateStatusAndNote?id=${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      alert("Profile updated successfully!"); // Replace with a user-friendly UI update
      setProfiles((prev) =>
        prev.map((profile) =>
          profile._id === id ? response.data.updatedProfile : profile
        )
      );
      setEditProfile(null);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to update profile");
    }
  };

  if (loading)
    return <div className="text-center mt-8">Loading profiles...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">
        All Created Profiles
      </h1>
      {/* <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2">Company Name</th>
            <th className="border border-gray-200 px-4 py-2">Address</th>
            <th className="border border-gray-200 px-4 py-2">City</th>
            <th className="border border-gray-200 px-4 py-2">State</th>
            <th className="border border-gray-200 px-4 py-2">Mobile</th>
            <th className="border border-gray-200 px-4 py-2">Status</th>
            <th className="border border-gray-200 px-4 py-2">Update Status</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => (
            <>
              <tr key={profile._id}>
                <td className="border border-gray-200 px-4 py-2">
                  {profile.companyName}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {profile.companyAddress}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {profile.city}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {profile.state}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {profile.mobile}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {profile.status}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  <button
                    onClick={() => handleEditClick(profile)}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    {editProfile === profile._id ? "Close" : "View Details"}
                  </button>
                </td>
              </tr>
              {editProfile === profile._id && (
                <tr>
                  <td colSpan="7" className="p-4 bg-gray-50 border border-gray-200">
                    <div>
                      <label>
                        <strong>Status:</strong>
                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                          className="block w-full p-2 border border-gray-300 rounded"
                        >
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="completed">Completed</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </label>
                      <label className="mt-2 block">
                        <strong>Note:</strong>
                        <textarea
                          name="note"
                          value={formData.note}
                          onChange={handleInputChange}
                          className="block w-full p-2 border border-gray-300 rounded"
                        ></textarea>
                      </label>
                      <label className="mt-2 block">
                        <strong>Discount:</strong>
                        <input
                          type="number"
                          name="discount"
                          value={formData.discount}
                          onChange={handleInputChange}
                          className="block w-full p-2 border border-gray-300 rounded"
                        />
                      </label>
                      <label className="mt-2 block">
                        <input
                          type="checkbox"
                          name="isDiscountInRupees"
                          checked={formData.isDiscountInRupees}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              isDiscountInRupees: e.target.checked,
                            }))
                          }
                        />
                        <span className="ml-2">Is Discount in Rupees?</span>
                      </label>
                      <button
                        onClick={() => handleSubmit(profile._id)}
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setEditProfile(null)}
                        className="mt-4 ml-2 bg-gray-400 text-white px-4 py-2 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody> 
      </table>
      */}
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2">Company Name</th>
            <th className="border border-gray-200 px-4 py-2">Address</th>
            <th className="border border-gray-200 px-4 py-2">City</th>
            <th className="border border-gray-200 px-4 py-2">State</th>
            <th className="border border-gray-200 px-4 py-2">Mobile</th>
            <th className="border border-gray-200 px-4 py-2">Status</th>
            <th className="border border-gray-200 px-4 py-2">Update Status</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => (
            <>
              <tr key={profile._id}>
                <td className="border border-gray-200 px-4 py-2">{profile.companyName}</td>
                <td className="border border-gray-200 px-4 py-2">{profile.companyAddress}</td>
                <td className="border border-gray-200 px-4 py-2">{profile.city}</td>
                <td className="border border-gray-200 px-4 py-2">{profile.state}</td>
                <td className="border border-gray-200 px-4 py-2">{profile.mobile}</td>
                <td className="border border-gray-200 px-4 py-2">{profile.status}</td>
                <td className="border border-gray-200 px-4 py-2">
                  <button
                    onClick={() => handleEditClick(profile)}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    {editProfile === profile._id ? "Close" : "View Details"}
                  </button>
                </td>
              </tr>

              {editProfile === profile._id && (
                <tr>
                  <td colSpan="7" className="p-4 bg-gray-50 border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Left Table */}
                      <table className="table-auto w-full border-collapse border border-gray-300">
                        <tbody>
                          <tr>
                            <th className="text-left px-4 py-2 border">Marketer Name</th>
                            <td className="px-4 py-2 border">{profile.marketerUser?.name || "N/A"}</td>
                          </tr>
                          <tr>
                            <th className="text-left px-4 py-2 border">Marketer Mobile</th>
                            <td className="px-4 py-2 border">{profile.marketerUser?.mobile || "N/A"}</td>
                          </tr>
                          <tr>
                            <th className="text-left px-4 py-2 border">GST Checked</th>
                            <td className="px-4 py-2 border">{profile.gstChecked ? "Yes" : "No"}</td>
                          </tr>
                          <tr>
                            <th className="text-left px-4 py-2 border">GST Number</th>
                            <td className="px-4 py-2 border">{profile.gstNumber || "N/A"}</td>
                          </tr>
                          <tr>
                            <th className="text-left px-4 py-2 border">PAN Card</th>
                            <td className="px-4 py-2 border">{profile.panCardNumber}</td>
                          </tr>
                          <tr>
                            <th className="text-left px-4 py-2 border">Type</th>
                            <td className="px-4 py-2 border">{profile.companyType}</td>
                          </tr>
                        </tbody>
                      </table>

                      {/* Right Table */}
                      <table className="table-auto w-full border-collapse border border-gray-300">
                        <tbody>
                          <tr>
                            <th className="text-left px-4 py-2 border">Discount</th>
                            <td className="px-4 py-2 border">
                              <input
                                type="number"
                                name="discount"
                                value={formData.discount}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th className="text-left px-4 py-2 border">Discount in Rupees?</th>
                            <td className="px-4 py-2 border">
                              <input
                                type="checkbox"
                                name="isDiscountInRupees"
                                checked={formData.isDiscountInRupees}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    isDiscountInRupees: e.target.checked,
                                  }))
                                }
                              />
                            </td>
                          </tr>
                          <tr>
                            <th className="text-left px-4 py-2 border">Status</th>
                            <td className="px-4 py-2 border">
                              <select
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                              >
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="completed">Completed</option>
                                <option value="rejected">Rejected</option>
                              </select>
                            </td>
                          </tr>
                          <tr>
                            <th className="text-left px-4 py-2 border">Note</th>
                            <td className="px-4 py-2 border">
                              <textarea
                                name="note"
                                value={formData.note}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                              ></textarea>
                            </td>
                          </tr>
                          <tr>
                            <th className="text-left px-4 py-2 border">Created At</th>
                            <td className="px-4 py-2 border">
                              {new Date(profile.createdAt).toLocaleString()}
                            </td>
                          </tr>
                          <tr>
                            <th className="text-left px-4 py-2 border">Updated At</th>
                            <td className="px-4 py-2 border">
                              {new Date(profile.updatedAt).toLocaleString()}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4 flex justify-end gap-4">
                      <button
                        onClick={() => handleSubmit(profile._id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setEditProfile(null)}
                        className="bg-gray-400 text-white px-4 py-2 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>

    </div>

  );
};

export default GetAllCreatedProfileByMarketer;
