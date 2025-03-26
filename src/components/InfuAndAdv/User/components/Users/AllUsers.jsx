// AllUsers.jsx

import { fetchUsers } from "../../../redux/userSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  if (status === "loading")
    return <div className="text-center text-xl font-semibold">Loading...</div>;
  if (status === "failed")
    return (
      <div className="text-center text-xl font-semibold text-red-600">
        Error: {error}
      </div>
    );

  return (
    <div className="p-6 bg-gray-100  flex">
      <div className=" w-full p-6 bg-white shadow-2xl rounded-lg overflow-hidden">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 p-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-t-lg">
          Users List
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg divide-y divide-gray-200">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                  User ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                  Mobile
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="transition-transform duration-300"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.mobile}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
