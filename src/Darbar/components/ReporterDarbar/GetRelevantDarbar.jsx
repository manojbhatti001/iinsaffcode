import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../utils/const";
import { Link } from "react-router-dom";

const GetRelevantDarbar = () => {
  const [darbars, setDarbars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDarbars = async () => {
      try {
        const response = await axios.get(`${baseUrl}getRelevantDarbar`, {
          headers: {
            Authorization: localStorage.getItem("userToken"),
          },
        });
        setDarbars(response.data.darbars);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchDarbars();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4  w-screen sm:w-full overflow-scroll">
      <h1 className="text-2xl font-bold mb-4">Relevant Darbars</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Purpose</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Location</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Availability</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Type</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {darbars.length > 0 ? (
              darbars.map((darbar) => (
                <tr key={darbar._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-800">{darbar.purpose}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {new Date(darbar.darbarDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {darbar.village}, {darbar.darbarCity}, {darbar.darbarState}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {darbar.peopleAvailable} / {darbar.peopleRequired}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">{darbar.darbarStatus}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{darbar.darbarType}</td>
                  <td className="px-4 py-2 text-sm">
                    <Link
                      to={`/getDarbarByReporter?Id=${darbar._id}`}
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-2 text-center text-sm text-gray-600">
                  No relevant darbars found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetRelevantDarbar;
