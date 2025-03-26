import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../utils/const";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CouponManagement = () => {
  const [coupons, setCoupons] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState("");
  const [uses, setUses] = useState("");
  const [daysActive, setDaysActive] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isCreating, setIsCreating] = useState(false); // For create button
  const [deletingCouponId, setDeletingCouponId] = useState(null);

  const [isEditable, setIsEditable] = useState(false);

  const toggleEditable = () => {
    setIsEditable(!isEditable);
  };

  const fetchCoupons = async () => {
    try {
      const token = localStorage.getItem("adminToken"); // Get admin token
      const response = await axios.get(`${baseUrl}getAllCoupons`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      });
      setCoupons(response.data.coupons);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch coupons.");
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleCreateCoupon = async () => {
    if (couponCode.length <= 6) {
      toast.error("Coupon code must be at least 6 characters.");
      return;
    }
    setIsCreating(true); // Set loading state for create button
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.post(
        `${baseUrl}createCoupon`,
        {
          couponCode,
          couponDiscount,
          uses,
          daysActive,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      fetchCoupons(); // Refresh the coupon list
    } catch (err) {
      console.error(err);
      toast.error("Failed to create coupon. Please check your inputs.");
    } finally {
      setIsCreating(false); // Reset loading state
    }
  };

  const handleDeleteCoupon = async (id) => {
    setDeletingCouponId(id); // Set loading state for delete button
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${baseUrl}deleteCoupon`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { id },
      });
      toast.success("Coupon deleted successfully!");
      fetchCoupons(); // Refresh the coupon list
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete coupon.");
    } finally {
      setDeletingCouponId(null); // Reset loading state
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <ToastContainer />
        <h1 className="text-3xl font-bold mb-4">Coupon Management</h1>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {successMessage && (
          <div className="text-green-600 mb-4">{successMessage}</div>
        )}

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Create Coupon</h2>
          <div className="grid items-center grid-cols-1 sm:grid-cols-2 gap-4">
            <h3 className="text-lg font-semibold mb-1">Coupon Code</h3>
            <input
              type="text"
              placeholder="Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <h3 className="text-lg font-semibold mb-1">Discount (%)</h3>
            <input
              type="number"
              placeholder="Discount (%)"
              value={couponDiscount}
              onChange={(e) => setCouponDiscount(e.target.value)}
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <h3 className="text-lg font-semibold mb-1">NO. Of Uses</h3>
            <input
              type="number"
              placeholder="Uses"
              value={uses}
              onChange={(e) => setUses(e.target.value)}
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <h3 className="text-lg font-semibold mb-1">Active Days</h3>
            <input
              type="number"
              placeholder="Days Active"
              value={daysActive}
              onChange={(e) => setDaysActive(e.target.value)}
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <button
          onClick={handleCreateCoupon}
          disabled={isCreating}
          className={`mt-4 font-semibold rounded-md px-4 py-2 transition ${
            isCreating
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {isCreating ? "Creating..." : "Create Coupon"}
        </button>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Existing Coupons
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Coupon Code</th>
                  <th className="py-3 px-6 text-center">Discount (%)</th>
                  <th className="py-3 px-6 text-center">Expiry Date</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {coupons.map((coupon) => (
                  <tr
                    key={coupon._id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left">
                      <strong>{coupon.couponCode}</strong>
                    </td>
                    <td className="py-3 px-6 text-center">
                      {coupon.couponDiscount}%
                    </td>
                    <td className="py-3 px-6 text-center">
                      {new Date(coupon.expireAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <button
                        onClick={() => handleDeleteCoupon(coupon._id)}
                        disabled={deletingCouponId === coupon._id}
                        className={`font-semibold rounded-lg px-4 py-2 transition ${
                          deletingCouponId === coupon._id
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600 text-white"
                        } flex items-center justify-center gap-2`}
                      >
                        {deletingCouponId === coupon._id ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Deleting...
                          </>
                        ) : (
                          <>
                            <svg
                              viewBox="0 0 24 24"
                              width="16"
                              height="16"
                              stroke="currentColor"
                              strokeWidth="2"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mx-2"
                            >
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              <line x1="10" y1="11" x2="10" y2="17"></line>
                              <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                            Delete
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default CouponManagement;
