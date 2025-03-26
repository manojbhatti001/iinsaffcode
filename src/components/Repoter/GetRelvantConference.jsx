// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { baseUrl } from '../../utils/const';

// const GetRelevantConference = () => {
//     const [conferences, setConferences] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchConferences = async () => {
//             try {
//                 const token = localStorage.getItem('userToken');

//                 const response = await axios.get(`${baseUrl}getRelevantConference`, {
//                     headers: {
//                         Authorization: token
//                     }
//                 });
//                 setConferences(response.data.relevantConferences);
//                 setLoading(false);
//             } catch (err) {
//                 setError('Error fetching conferences');
//                 setLoading(false);
//             }
//         };

//         fetchConferences();
//     }, []);

//     const handleEdit = (leadId) => {
//         // Add logic to handle edit action
//         //   console.log("Edit lead:", leadId);
//     };

//     if (loading) return <p>Loading conferences...</p>;

//     return (
//         <div className="max-w-4xl mx-auto p-6">
//             <h1 className="text-3xl font-semibold text-center mb-8 text-blue-600">Relevant Conferences</h1>
//             <div className="overflow-x-auto">
//                 <table className="w-full border-collapse border border-gray-300">
//                     <thead>
//                         <tr className="bg-gray-100">
//                             <th className="border border-gray-300 px-4 py-2 text-left">Conference Name</th>
//                             <th className="border border-gray-300 px-4 py-2 text-left">Purpose</th>
//                             <th className="border border-gray-300 px-4 py-2 text-left">City</th>
//                             <th className="border border-gray-300 px-4 py-2 text-left">State</th>
//                             <th className="border border-gray-300 px-4 py-2 text-left">Cost</th>
//                             <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {conferences.length > 0 ? (
//                             conferences.map((conference) => (
//                                 <tr key={conference._id} className="even:bg-gray-50">
//                                     <td className="border border-gray-300 px-4 py-2">{conference.conferenceName}</td>
//                                     <td className="border border-gray-300 px-4 py-2">{conference.conferencePurpose}</td>
//                                     <td className="border border-gray-300 px-4 py-2">{conference.conferenceChannelCity}</td>
//                                     <td className="border border-gray-300 px-4 py-2">{conference.conferenceChannelState}</td>
//                                     <td className="border border-gray-300 px-4 py-2">₹{conference.conferenceCost}</td>
//                                     <td className="border border-gray-300 px-4 py-2">
//                                         <Link
//                                             to={`/getSpecificConferenceDetailsReporter?conferenceId=${conference._id}`}
//                                             className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition"
//                                             onClick={() => handleEdit(conference._id)}
//                                         >
//                                             Edit
//                                         </Link>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td
//                                     colSpan="6"
//                                     className="border border-gray-300 px-4 py-2 text-center text-gray-500"
//                                 >
//                                     No data available
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>

//         </div>
//     );
// };

// export default GetRelevantConference;

import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../utils/const';

const GetRelevantConference = () => {
    const [conferences, setConferences] = useState([]);
    const [filteredConferences, setFilteredConferences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [showToday, setShowToday] = useState(false);

    const location = useLocation();
    const [pricingData, setPricingData] = useState(null)

    useEffect(() => {
        const getPricing = async () => {
            const response = await axios.get(`${baseUrl}getPricing`);
            setPricingData(response.data);
        }
        getPricing();
    }, [])

    useEffect(() => {
        const fetchConferences = async () => {
            try {
                const token = localStorage.getItem('userToken');

                const response = await axios.get(`${baseUrl}getRelevantConference`, {
                    headers: {
                        Authorization: token,
                    },
                });

                const data = response.data.relevantConferences;
                setConferences(data);
                setFilteredConferences(data);

                // Check if URL contains stat=today and set the checkbox
                const params = new URLSearchParams(location.search);
                if (params.get("stat") === "today") {
                    setShowToday(true);
                    filterTodayConferences(data);
                }

                setLoading(false);
            } catch (err) {
                setError('Error fetching conferences');
                setLoading(false);
            }
        };

        fetchConferences();
    }, [location]);

    const filterTodayConferences = (data) => {
        const todayDate = new Date().toISOString().split("T")[0];
        const filtered = data.filter((conference) =>
            new Date(conference.createdAt).toISOString().split("T")[0] === todayDate
        );
        setFilteredConferences(filtered);
    };

    const handleTodayCheckbox = () => {
        if (!showToday) {
            filterTodayConferences(conferences);
        } else {
            setFilteredConferences(conferences);
        }
        setShowToday(!showToday);
    };

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearch(value);

        const filtered = conferences.filter((conference) =>
            conference.conferenceName.toLowerCase().includes(value)
        );

        setFilteredConferences(filtered);
    };

    if (loading) return <p>Loading conferences...</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-semibold text-center mb-8 text-blue-600">Relevant Conferences</h1>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center mb-4">
                <input
                    type="text"
                    placeholder="Search by conference name"
                    value={search}
                    onChange={handleSearch}
                    className="border border-gray-300 p-2 rounded w-full sm:w-1/3"
                />
                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={showToday}
                        onChange={handleTodayCheckbox}
                        className="w-4 h-4"
                    />
                    <span>Today's Conferences</span>
                </label>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">Conference Name</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Purpose</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">City</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">State</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Profit</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredConferences.length > 0 ? (
                            filteredConferences.map((conference) => (
                                <tr key={conference._id} className="even:bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-2">{conference.conferenceName}</td>
                                    <td className="border border-gray-300 px-4 py-2">{conference.conferencePurpose}</td>
                                    <td className="border border-gray-300 px-4 py-2">{conference.conferenceChannelCity}</td>
                                    <td className="border border-gray-300 px-4 py-2">{conference.conferenceChannelState}</td>
                                    <td className="border border-gray-300 px-4 py-2">₹{pricingData.conferencePrice}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <Link
                                            to={`/getSpecificConferenceDetailsReporter?conferenceId=${conference._id}`}
                                            className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                                >
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GetRelevantConference;
