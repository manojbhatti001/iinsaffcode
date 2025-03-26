// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { baseUrl } from "../../../utils/const";
// import reporterIcon from "../../assets/icons/male-reporter-journalist-icon.svg";
// import influencerIcon from "../../assets/icons/influncer.png";
// import advertiserIcon from "../../assets/icons/advertisers.png";
// import allIcon from "../../assets/icons/user-group-296.svg";
// import UserCard from "../../UserCard";

// const AllUsers = () => {
//   const [advertisers, setAdvertisers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filter, setFilter] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchType, setSearchType] = useState("mobile");
//   const [viewDetailsId, setViewDetailsId] = useState(null);

//   const roleIcons = {
//     All: allIcon,
//     Advertiser: advertiserIcon,
//     Reporter: reporterIcon,
//     Influencer: influencerIcon,
//   };

//   const roleStyles = {
//     All: "bg-white hover:bg-gray-600",
//     Advertiser: "bg-white hover:bg-blue-600",
//     Reporter: "bg-white hover:bg-green-600",
//     Influencer: "bg-white hover:bg-red-600",
//   };

//   useEffect(() => {
//     const fetchAdvertisers = async () => {
//       try {
//         const response = await axios.get(`${baseUrl}users`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
//           },
//         });
//         setAdvertisers(response.data);
//       } catch (err) {
//         setError(err.message);
//         console.error("Error fetching advertisers:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAdvertisers();
//   }, []);

//   const handleFilterChange = (role) => {
//     setFilter(role);
//   };

//   // Calculate counts for each role
//   const roleCounts = advertisers.reduce(
//     (counts, user) => {
//       counts[user.role] = (counts[user.role] || 0) + 1;
//       counts.All += 1; // Increment the total count
//       return counts;
//     },
//     { All: 0, Advertiser: 0, Reporter: 0, Influencer: 0 }
//   );

//   const filteredAdvertisers = advertisers.filter(
//     (ad) =>
//       (filter === "All" || ad.role === filter) &&
//       (searchType === "mobile"
//         ? ad.mobile && String(ad.mobile).includes(searchQuery)
//         : ad.email && String(ad.email).includes(searchQuery))
//   );

//   const toggleViewDetails = (id) => {
//     if (viewDetailsId === id) {
//       setViewDetailsId(null);
//     } else {
//       setViewDetailsId(id);
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="container mx-auto px-4">
//       <div className="flex justify-between flex-wrap space-y-1 items-center space-x-2 mb-4">
//         {["All", "Advertiser", "Reporter", "Influencer"].map((role) => (
//           <button
//             key={role}
//             onClick={() => handleFilterChange(role)}
//             className={`flex items-center space-x-2 py-2 px-4 rounded-full text-black border-2 font-bold transition-colors duration-300 ${roleStyles[role]}`}
//           >
//             <img
//               src={roleIcons[role]}
//               alt={`${role} icon`}
//               className="w-6 h-6"
//             />
//             <span>
//               {role} ({roleCounts[role]})
//             </span>
//           </button>
//         ))}
//       </div>
//       <div className="flex items-center gap-2 mb-4">
//         <select
//           onChange={(e) => setSearchType(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="mobile">Mobile</option>
//           <option value="email">Email</option>
//         </select>
//         <input
//           type="text"
//           placeholder={`Search by ${searchType}...`}
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="border p-2 rounded-full flex-grow"
//         />
//       </div>

//       {filteredAdvertisers.length === 0 ? (
//         <p>No advertisers found.</p>
//       ) : (
//         <UserCard advertisers={filteredAdvertisers} />
//       )}
//     </div>
//   );
// };

// export default AllUsers;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../utils/const";
import reporterIcon from "../../assets/icons/male-reporter-journalist-icon.svg";
import influencerIcon from "../../assets/icons/influncer.png";
import advertiserIcon from "../../assets/icons/advertisers.png";
import allIcon from "../../assets/icons/user-group-296.svg";

const AllUsers = () => {
  const [advertisers, setAdvertisers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("mobile");
  const [viewDetailsId, setViewDetailsId] = useState(null);
  const [formData, setFormData] = useState({});
  const [profilePhoto, setProfilePhoto] = useState(null);

  const roleIcons = {
    All: allIcon,
    Advertiser: advertiserIcon,
    Reporter: reporterIcon,
    Influencer: influencerIcon,
  };

  const roleStyles = {
    All: "bg-white hover:bg-gray-600",
    Advertiser: "bg-white hover:bg-blue-600",
    Reporter: "bg-white hover:bg-green-600",
    Influencer: "bg-white hover:bg-red-600",
  };

  useEffect(() => {
    const fetchAdvertisers = async () => {
      try {
        const response = await axios.get(`${baseUrl}users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        setAdvertisers(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching advertisers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvertisers();
  }, []);

  const handleFilterChange = (role) => {
    setFilter(role);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDropdownChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value === "true" });
  };

  const handleFileChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleEdit = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("userId", viewDetailsId);
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      if (profilePhoto) {
        formDataToSend.append("image", profilePhoto);
      }

      const response = await axios.put(`${baseUrl}user/update`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("User details updated successfully!");
      setAdvertisers((prev) =>
        prev.map((user) =>
          user._id === viewDetailsId
            ? { ...user, ...formData, photo: response.data.user.photo }
            : user
        )
      );
      setViewDetailsId(null);
      setFormData({});
      setProfilePhoto(null);
    } catch (err) {
      alert("Error updating user details. Please try again.");
      console.error(err);
    }
  };

  const toggleViewDetails = (id) => {
    if (viewDetailsId === id) {
      setViewDetailsId(null);
      setFormData({});
      setProfilePhoto(null);
    } else {
      const user = advertisers.find((ad) => ad._id === id);
      setViewDetailsId(id);
      setFormData(user);
    }
  };

  const roleCounts = advertisers.reduce(
    (counts, user) => {
      counts[user.role] = (counts[user.role] || 0) + 1;
      counts.All += 1;
      return counts;
    },
    { All: 0, Advertiser: 0, Reporter: 0, Influencer: 0 }
  );

  const filteredAdvertisers = advertisers.filter(
    (ad) =>
      (filter === "All" || ad.role === filter) &&
      (searchType === "mobile"
        ? ad.mobile && String(ad.mobile).includes(searchQuery)
        : ad.email && String(ad.email).includes(searchQuery))
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between flex-wrap space-y-1 items-center space-x-2 mb-4">
        {["All", "Advertiser", "Reporter", "Influencer"].map((role) => (
          <button
            key={role}
            onClick={() => handleFilterChange(role)}
            className={`flex items-center space-x-2 py-2 px-4 rounded-full text-black border-2 font-bold transition-colors duration-300 ${roleStyles[role]}`}
          >
            <img
              src={roleIcons[role]}
              alt={`${role} icon`}
              className="w-6 h-6"
            />
            <span>
              {role} ({roleCounts[role]})
            </span>
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 mb-4">
        <select
          onChange={(e) => setSearchType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="mobile">Mobile</option>
          <option value="email">Email</option>
        </select>
        <input
          type="text"
          placeholder={`Search by ${searchType}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded-full flex-grow"
        />
      </div>

      {filteredAdvertisers.length === 0 ? (
        <p>No advertisers found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredAdvertisers.map((user) => (
            <div
              key={user._id}
              className="border p-4 rounded-lg shadow hover:shadow-md transition duration-300"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-bold">{user.name || "No Name"}</h3>
                <button
                  onClick={() => toggleViewDetails(user._id)}
                  className="bg-blue-500 text-white px-4 py-1 rounded"
                >
                  {viewDetailsId === user._id ? "Hide Details" : "View Details"}
                </button>
              </div>
              {/* {viewDetailsId === user._id && (
                <div className="mt-4 space-y-2">
                  <img
                    src={formData.photo}
                    alt="UserPhoto"
                    className="w-32 h-32 rounded-full object-cover mx-auto"
                  />
                  <label className="block font-medium">Update Photo</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="border p-2 rounded w-full"
                  />
                  {Object.keys(formData).map((key) => {
                    if (key === "adminVerified" || key === "isVerified") {
                      return (
                        <div key={key}>
                          <label className="block font-medium">
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </label>
                          <select
                            name={key}
                            value={formData[key]}
                            onChange={handleDropdownChange}
                            className="border p-2 rounded w-full"
                          >
                            <option value="true">True</option>
                            <option value="false">False</option>
                          </select>
                        </div>
                      );
                    } else if (key === "_id" || key === "role" || key === "password" || key === "photo") {
                      return null;
                    } else {
                      return (
                        <div key={key}>
                          <label className="block font-medium">
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </label>
                          <input
                            type="text"
                            name={key}
                            value={formData[key] || ""}
                            onChange={handleInputChange}
                            className="border p-2 rounded w-full"
                          />
                        </div>
                      );
                    }
                  })}
                  <button
                    onClick={handleEdit}
                    className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                  >
                    Save Changes
                  </button>
                </div>
              )} */}
              {viewDetailsId === user._id && (
                <div className="mt-4 space-y-4">
                  {/* User Photo */}
                  <div className="flex justify-center">
                    <img
                      src={formData.photo}
                      alt="UserPhoto"
                      className="w-32 h-32 rounded-full object-cover"
                    />
                  </div>
                  <label className="block font-medium text-center">Update Photo</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="border p-2 rounded w-full"
                  />

                  {/* Data in Responsive Grid Table Format */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {Object.keys(formData).map((key) => {
                      if (key === "adminVerified" || key === "isVerified") {
                        return (
                          <div
                            key={key}
                            className="border border-gray-300 p-4 rounded bg-white"
                          >
                            <label className="block font-medium capitalize">
                              {key.replace(/([A-Z])/g, " $1")}
                            </label>
                            <select
                              name={key}
                              value={formData[key]}
                              onChange={handleDropdownChange}
                              className="border p-2 rounded w-full mt-2"
                            >
                              <option value="true">True</option>
                              <option value="false">False</option>
                            </select>
                          </div>
                        );
                      } else if (key === "_id" || key === "role" || key === "password" || key === "photo") {
                        return null;
                      } else {
                        return (
                          <div
                            key={key}
                            className="border border-gray-300 p-4 rounded bg-white"
                          >
                            <label className="block font-medium capitalize">
                              {key.replace(/([A-Z])/g, " $1")}
                            </label>
                            <input
                              type="text"
                              name={key}
                              value={formData[key] || ""}
                              onChange={handleInputChange}
                              className="border p-2 rounded w-full mt-2"
                            />
                          </div>
                        );
                      }
                    })}
                  </div>

                  {/* Save Changes Button */}
                  <button
                    onClick={handleEdit}
                    className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                  >
                    Save Changes
                  </button>
                </div>
              )}

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllUsers;
