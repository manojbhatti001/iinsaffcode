import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../utils/const";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MarketerUserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("marketerToken");

      if (!token) {
        setError("No authentication token found.");
        setLoading(false);
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(`${baseUrl}getUserById`, {
          headers: {
            Authorization: token,
          },
        });
        setUserData(response.data.user);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.msg || "Error fetching data");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleCopyReferral = () => {
    if (userData?.referral) {
      navigator.clipboard.writeText(
        `http://localhost:3000/marketer?refTok=${userData.referral}`
      );
      toast.success("Referral code copied to clipboard!", {
        // position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ToastContainer />
      {userData && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6">
            Marketer Profile
          </h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">Name</label>
                <input
                  type="text"
                  value={userData.name}
                  readOnly
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Email</label>
                <input
                  type="email"
                  value={userData.email}
                  readOnly
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Mobile</label>
                <input
                  type="tel"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Allow only digits
                  }}
                  value={userData.mobile}
                  readOnly
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">State</label>
                <input
                  type="text"
                  value={userData.state}
                  readOnly
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">City</label>
                <input
                  type="text"
                  value={userData.city}
                  readOnly
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Gender</label>
                <input
                  type="text"
                  value={userData.gender || "N/A"}
                  readOnly
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Verified</label>
                <input
                  type="text"
                  value={userData.isVerified ? "Yes" : "No"}
                  readOnly
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">
                  Wallet Balance
                </label>
                <input
                  type="text"
                  value={userData.wallet}
                  readOnly
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">
                  Referral Code
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={`http://localhost:3000/marketer?refTok=${userData.referral}`}
                    readOnly
                    className="w-full border rounded px-3 py-2"
                  />
                  <button
                    type="button"
                    onClick={handleCopyReferral}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Referred By</label>
                <input
                  type="text"
                  value={userData.refer || "N/A"}
                  readOnly
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">
                  Account Created
                </label>
                <input
                  type="text"
                  value={new Date(userData.createdAt).toLocaleDateString()}
                  readOnly
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Last Updated</label>
                <input
                  type="text"
                  value={new Date(userData.updatedAt).toLocaleDateString()}
                  readOnly
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MarketerUserProfile;
