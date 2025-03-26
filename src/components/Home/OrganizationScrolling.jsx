import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules"; // Import Autoplay from 'swiper'
import axios from "axios";
import { baseUrl } from "../../utils/const";

const OrganizationScrolling = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEntries, setFilteredEntries] = useState([]);

  // Fetching entries from the API
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get(`${baseUrl}getIinsafEntryForAll`);
        console.log(response.data); // Log the response to verify the structure
        if (response.data.data) {
          setEntries(response.data.data);
          setFilteredEntries(response.data.data); // Set initial filtered entries
        }
      } catch (error) {
        console.error("Error fetching entries:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, []);

  // Filter entries by role and approved status
  const filterEntriesByRole = (role) => {
    const filtered = entries.filter(
      (entry) =>
        entry.role.toLowerCase().trim() === role.toLowerCase().trim() &&
        entry.status === "Approved"
    );
    return filtered;
  };

  // Handle search input change
  // const handleSearchChange = (e) => {
  //   const query = e.target.value;
  //   setSearchQuery(query);

  //   // Filter entries by name or id
  //   const searchResults = entries.filter(
  //     (entry) =>
  //       entry.name.toLowerCase().includes(query.toLowerCase()) ||
  //       entry._id.toLowerCase().includes(query.toLowerCase())
  //   );

  //   setFilteredEntries(searchResults);
  // };
  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter entries by name, ID, and approved status
    const searchResults = entries.filter(
      (entry) =>
        entry.status === "Approved" && // Ensure only approved entries are considered
        (entry.name.toLowerCase().includes(query.toLowerCase()) ||
          entry._id.toLowerCase().includes(query.toLowerCase()))
    );

    setFilteredEntries(searchResults);
  };


  const categories = [
    { name: "Doctor", role: "doctor" },
    { name: "Advocate", role: "advocate" },
    { name: "NGO", role: "ngo" }, // Targeting only the 'NGO' category
    { name: "Partner", role: "partner" },
    { name: "Company", role: "company" },
    { name: "Organization", role: "organization" },
  ];

  return (
    <div className="relative w-full flex flex-col gap-4 bg-gradient-to-r from-blue-600 via-black to-purple-700 pb-6 overflow-hidden">
      <h1 className="text-3xl font-bold text-white text-center pt-6">iinsaf Organization</h1>

      {/* Search Input */}
      <div className="w-full mb-4 relative flex justify-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by name or ID"
          className="w-64 p-2 border rounded-md text-sm"
        />
        {searchQuery && filteredEntries.length > 0 && (
          <div className="absolute mt-8 w-64 bg-white border border-gray-300 shadow-lg max-h-60 overflow-auto z-10">
            <ul className="max-h-60 overflow-y-auto">
              {filteredEntries.map((entry) => (
                <li
                  key={entry._id}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center gap-2"
                  onClick={() => {
                    setSearchQuery(entry.name); // Select the name
                    setFilteredEntries([entry]); // Show only the selected entry
                  }}
                >
                  <img
                    src={entry.photoUrl || "https://via.placeholder.com/50"}
                    alt={entry.name}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                  <div>
                    <p className="text-sm font-semibold">{entry.name}</p>
                    <p className="text-xs text-gray-500">{entry._id}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        categories.map((category, index) => {
          const filteredByRole = filterEntriesByRole(category.role);

          // Skip rendering the category if there are no approved entries to display
          if (filteredByRole.length === 0) return null;

          return (
            <div key={index} className="w-full h-full">
              <h2 className="text-2xl font-bold text-white text-center mb-4">
                {category.name}
              </h2>
              <Swiper
                modules={[Autoplay]}
                spaceBetween={30}
                slidesPerView={4} // Adjust this for your display
                loop={true}
                speed={5000}
                autoplay={{
                  delay: 3000, // Adjust delay for autoplay between slides
                  disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                className="mySwiper max-w-full"
                style={{ transitionTimingFunction: "linear !important" }}
                breakpoints={{
                  // Below 640px, show 1 slide
                  0: {
                    slidesPerView: 1, // Show only 1 slide on smaller screens (including 425px)
                    spaceBetween: 10,
                  },
                  // For screens 640px and above, show 2 slides
                  640: {
                    slidesPerView: 2, // Show 2 slides on medium screens
                    spaceBetween: 20,
                  },
                  // For larger screens (1024px), show 3 slides
                  1024: {
                    slidesPerView: 4, // Show 3 slides on larger screens
                    spaceBetween: 30,
                  },
                }}
              >
                {filteredByRole.map((entry) => (
                  <SwiperSlide
                    key={entry._id}
                    className="text-center text-lg font-semibold bg-gray-500 bg-opacity-50 flex flex-col items-center justify-center p-4 h-[300px] rounded-lg shadow-md backdrop-blur-lg"
                  >
                    <div className="flex justify-center">
                      <img
                        src={
                          entry.photoUrl || "https://via.placeholder.com/150"
                        }
                        alt={entry.name}
                        className="w-20 h-20 object-cover rounded-full mb-4"
                      />
                    </div>
                    <p className="text-xl text-white font-semibold">{entry.name}</p>
                    <p className="text-sm text-white">{entry.role}</p>
                    <p className="text-sm text-white">{entry.city} {entry.state}</p>
                    {/* Display the id */}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          );
        })
      )}
    </div>
  );
};

export default OrganizationScrolling;
