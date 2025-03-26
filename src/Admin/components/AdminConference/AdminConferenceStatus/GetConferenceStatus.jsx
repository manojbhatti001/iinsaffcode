// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchConferenceStatus } from "../../../../redux/AdminRedux/conferenceStatusSlicer";
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// import { baseUrl } from "../../../../utils/const";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const GetConferenceStatus = () => {
//   const [isEditable, setIsEditable] = useState(false);


//   const toggleEditable = () => {
//     setIsEditable(!isEditable);
//   };

//   const dispatch = useDispatch();
//   const conferenceStatus = useSelector(
//     (state) => state.adminConferenceStatus.conferenceStatus
//   );
//   const status = useSelector((state) => state.adminConferenceStatus.status);
//   const error = useSelector((state) => state.adminConferenceStatus.error);

//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const conferenceId = queryParams.get("conferenceId");

//   const [updateData, setUpdateData] = useState({});
//   const [updatingStatus, setUpdatingStatus] = useState({});

//   useEffect(() => {
//     if (conferenceId) {
//       dispatch(fetchConferenceStatus(conferenceId));
//     }
//   }, [conferenceId, dispatch]);

//   useEffect(() => {
//     if (conferenceStatus.length > 0) {
//       const initialData = {};
//       conferenceStatus.forEach((statusItem) => {
//         initialData[statusItem._id] = {
//           videoDate: statusItem.videoDate
//             ? new Date(statusItem.videoDate).toISOString().slice(0, 16)
//             : "",
//           videoUrl: statusItem.videoUrl || "",
//           statusByAdmin: statusItem.statusByAdmin || "",
//           note: statusItem.note || "",
//         };
//       });
//       setUpdateData(initialData);
//     }
//   }, [conferenceStatus]);

//   const handleInputChange = (e, statusId) => {
//     const { name, value } = e.target;
//     setUpdateData((prevData) => ({
//       ...prevData,
//       [statusId]: {
//         ...prevData[statusId],
//         [name]: value,
//       },
//     }));
//   };

//   const handleUpdate = async (statusId) => {
//     const updatedData = updateData[statusId];
//     setUpdatingStatus((prevStatus) => ({ ...prevStatus, [statusId]: true }));

//     try {
//       await axios.put(
//         `${baseUrl}updateConferenceStatusView`,
//         {
//           id: statusId,
//           videoDate: updatedData.videoDate,
//           videoUrl: updatedData.videoUrl,
//           statusByAdmin: updatedData.statusByAdmin,
//           note: updatedData.note,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
//           },
//         }
//       );

//       toast.success("Conference status updated successfully!");
//       dispatch(fetchConferenceStatus(conferenceId)); // Refresh the data after updating
//     } catch (err) {
//       //   console.log(err);
//       toast.error(
//         "Error updating conference status: " +
//         (err.response?.data?.error || "Something went wrong.")
//       );
//     } finally {
//       setUpdatingStatus((prevStatus) => ({ ...prevStatus, [statusId]: false }));
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
//       <ToastContainer />
//       <h1 className="text-2xl font-bold mb-4">
//         Conference Status for ID: {conferenceId}
//       </h1>

//       <h2 className="text-2xl font-bold mb-4">Accepted By {conferenceStatus?.length} Reporters</h2>
//       {status === "loading" && <p className="text-gray-500">Loading...</p>}
//       {status === "failed" && (
//         <p className="text-red-500">
//           Error: {error?.message || "Something went wrong."}
//         </p>
//       )}

//       {status === "succeeded" && conferenceStatus.length > 0 ? (
//         conferenceStatus.map((statusItem) => (
//           <div
//             key={statusItem._id}
//             className="mb-6 p-4 border rounded-lg shadow-sm bg-gray-50"
//           >
//             <h2 className="text-xl font-semibold mb-2">
//               Update Conference Status - ID: {statusItem._id}
//             </h2>
//             <div className="grid grid-cols-1 gap-4">
//               <p>
//                 <strong>Accepted By User:</strong> {statusItem.acceptedByUser}
//               </p>
//               <p>
//                 <strong>Accepted Date:</strong>{" "}
//                 {new Date(statusItem.acceptedDate).toLocaleString()}
//               </p>
//               <p>
//                 <strong>Conference ID:</strong> {statusItem.conferenceId}
//               </p>
//               <p>
//                 <strong>Created At:</strong>{" "}
//                 {new Date(statusItem.createdAt).toLocaleString()}
//               </p>
//               <p>
//                 <strong>Status:</strong> {statusItem.status}
//               </p>
//               <p>
//                 <strong>Updated At:</strong>{" "}
//                 {new Date(statusItem.updatedAt).toLocaleString()}
//               </p>

//               <label className="block">
//                 <span className="text-gray-700">Video URL</span>
//                 <input
//                   type="text"
//                   name="videoUrl"
//                   placeholder="Video URL"
//                   value={updateData[statusItem._id]?.videoUrl || ""}
//                   onChange={(e) => handleInputChange(e, statusItem._id)}
//                   className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
//                 />
//               </label>

//               <label className="block">
//                 <span className="text-gray-700">Note</span>
//                 <input
//                   type="text"
//                   name="note"
//                   placeholder="Note"
//                   value={updateData[statusItem._id]?.note || ""}
//                   onChange={(e) => handleInputChange(e, statusItem._id)}
//                   className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
//                 />
//               </label>

//               <label className="block">
//                 <span className="text-gray-700">Video Date</span>
//                 <input
//                   type="datetime-local"
//                   name="videoDate"
//                   value={updateData[statusItem._id]?.videoDate || ""}
//                   onChange={(e) => handleInputChange(e, statusItem._id)}
//                   className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
//                 />
//               </label>

//               {/* <label className="block">
//                 <span className="text-gray-700">Status By Admin</span>
//                 <input
//                   type="text"
//                   name="statusByAdmin"
//                   placeholder="Status By Admin"
//                   value={updateData[statusItem._id]?.statusByAdmin || ""}
//                   onChange={(e) => handleInputChange(e, statusItem._id)}
//                   className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
//                 />
//               </label> */}
//               <label className="block">
//                 <span className="text-gray-700">Status By Admin</span>
//                 <select
//                   name="statusByAdmin"
//                   value={updateData[statusItem._id]?.statusByAdmin || ""}
//                   onChange={(e) => handleInputChange(e, statusItem._id)}
//                   className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
//                 >
//                   <option value="" disabled>
//                     Select Status
//                   </option>
//                   <option value="Pending">Pending</option>
//                   <option value="Completed">Completed</option>
//                 </select>
//               </label>

//               <button
//                 onClick={() => handleUpdate(statusItem._id)}
//                 className="mt-2 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
//                 disabled={updatingStatus[statusItem._id]}
//               >
//                 {updatingStatus[statusItem._id] ? "Updating..." : "Update"}
//               </button>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className="text-gray-500">No conference status found.</p>
//       )}
//     </div>
//   );
// };

// export default GetConferenceStatus;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConferenceStatus } from "../../../../redux/AdminRedux/conferenceStatusSlicer";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { baseUrl } from "../../../../utils/const";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GetConferenceStatus = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [visibility, setVisibility] = useState({});

  const toggleEditable = () => {
    setIsEditable(!isEditable);
  };

  const toggleVisibility = (statusId) => {
    setVisibility((prev) => ({
      ...prev,
      [statusId]: !prev[statusId],
    }));
  };

  const dispatch = useDispatch();
  const conferenceStatus = useSelector(
    (state) => state.adminConferenceStatus.conferenceStatus
  );
  const status = useSelector((state) => state.adminConferenceStatus.status);
  const error = useSelector((state) => state.adminConferenceStatus.error);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const conferenceId = queryParams.get("conferenceId");

  const [updateData, setUpdateData] = useState({});
  const [updatingStatus, setUpdatingStatus] = useState({});

  useEffect(() => {
    if (conferenceId) {
      dispatch(fetchConferenceStatus(conferenceId));
    }
  }, [conferenceId, dispatch]);

  useEffect(() => {
    if (conferenceStatus.length > 0) {
      const initialData = {};
      conferenceStatus.forEach((statusItem) => {
        initialData[statusItem._id] = {
          videoDate: statusItem.videoDate
            ? new Date(statusItem.videoDate).toISOString().slice(0, 16)
            : "",
          videoUrl: statusItem.videoUrl || "",
          statusByAdmin: statusItem.statusByAdmin || "",
          note: statusItem.note || "",
        };
      });
      setUpdateData(initialData);
    }
  }, [conferenceStatus]);

  const handleInputChange = (e, statusId) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [statusId]: {
        ...prevData[statusId],
        [name]: value,
      },
    }));
  };

  const handleUpdate = async (statusId) => {
    const updatedData = updateData[statusId];
    setUpdatingStatus((prevStatus) => ({ ...prevStatus, [statusId]: true }));

    try {
      await axios.put(
        `${baseUrl}updateConferenceStatusView`,
        {
          id: statusId,
          videoDate: updatedData.videoDate,
          videoUrl: updatedData.videoUrl,
          statusByAdmin: updatedData.statusByAdmin,
          note: updatedData.note,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      toast.success("Conference status updated successfully!");
      dispatch(fetchConferenceStatus(conferenceId)); // Refresh the data after updating
    } catch (err) {
      toast.error(
        "Error updating conference status: " +
        (err.response?.data?.error || "Something went wrong.")
      );
    } finally {
      setUpdatingStatus((prevStatus) => ({ ...prevStatus, [statusId]: false }));
    }
  };

  return (
    // <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
    //   <ToastContainer />
    //   <h1 className="text-2xl font-bold mb-4">
    //     Conference Status for ID: {conferenceId}
    //   </h1>

    //   <h2 className="text-2xl font-bold mb-4">
    //     Accepted By {conferenceStatus?.length} Reporters
    //   </h2>
    //   {status === "loading" && <p className="text-gray-500">Loading...</p>}
    //   {status === "failed" && (
    //     <p className="text-red-500">
    //       Error: {error?.message || "Something went wrong."}
    //     </p>
    //   )}

    //   {status === "succeeded" && conferenceStatus.length > 0 ? (
    //     conferenceStatus.map((statusItem) => (
    //       <div
    //         key={statusItem._id}
    //         className="mb-6 p-4 border rounded-lg shadow-sm bg-gray-50"
    //       >
    //         <h2 className="text-xl font-semibold mb-2">
    //           Conference Status - ID: {statusItem._id}
    //         </h2>
    //         <button
    //           onClick={() => toggleVisibility(statusItem._id)}
    //           className="mb-4 bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
    //         >
    //           {visibility[statusItem._id] ? "Hide Details" : "Show Details"}
    //         </button>

    //         {visibility[statusItem._id] && (
    //           <div className="grid grid-cols-1 gap-4">
    //             <p>
    //               <strong>Accepted By User:</strong>{" "}
    //               {statusItem.acceptedByUser}
    //             </p>
    //             <p>
    //               <strong>Accepted Date:</strong>{" "}
    //               {new Date(statusItem.acceptedDate).toLocaleString()}
    //             </p>
    //             <p>
    //               <strong>Conference ID:</strong> {statusItem.conferenceId}
    //             </p>
    //             <p>
    //               <strong>Created At:</strong>{" "}
    //               {new Date(statusItem.createdAt).toLocaleString()}
    //             </p>
    //             <p>
    //               <strong>Status:</strong> {statusItem.status}
    //             </p>
    //             <p>
    //               <strong>Updated At:</strong>{" "}
    //               {new Date(statusItem.updatedAt).toLocaleString()}
    //             </p>

    //             <label className="block">
    //               <span className="text-gray-700">Video URL</span>
    //               <input
    //                 type="text"
    //                 name="videoUrl"
    //                 placeholder="Video URL"
    //                 value={updateData[statusItem._id]?.videoUrl || ""}
    //                 onChange={(e) => handleInputChange(e, statusItem._id)}
    //                 className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
    //               />
    //             </label>

    //             <label className="block">
    //               <span className="text-gray-700">Note</span>
    //               <input
    //                 type="text"
    //                 name="note"
    //                 placeholder="Note"
    //                 value={updateData[statusItem._id]?.note || ""}
    //                 onChange={(e) => handleInputChange(e, statusItem._id)}
    //                 className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
    //               />
    //             </label>

    //             <label className="block">
    //               <span className="text-gray-700">Video Date</span>
    //               <input
    //                 type="datetime-local"
    //                 name="videoDate"
    //                 value={updateData[statusItem._id]?.videoDate || ""}
    //                 onChange={(e) => handleInputChange(e, statusItem._id)}
    //                 className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
    //               />
    //             </label>

    //             <label className="block">
    //               <span className="text-gray-700">Status By Admin</span>
    //               <select
    //                 name="statusByAdmin"
    //                 value={updateData[statusItem._id]?.statusByAdmin || ""}
    //                 onChange={(e) => handleInputChange(e, statusItem._id)}
    //                 className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
    //               >
    //                 <option value="" disabled>
    //                   Select Status
    //                 </option>
    //                 <option value="pending">Pending</option>
    //                 <option value="completed">Completed</option>
    //               </select>
    //             </label>

    //             <button
    //               onClick={() => handleUpdate(statusItem._id)}
    //               className="mt-2 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
    //               disabled={updatingStatus[statusItem._id]}
    //             >
    //               {updatingStatus[statusItem._id]
    //                 ? "Updating..."
    //                 : "Update"}
    //             </button>
    //           </div>
    //         )}
    //       </div>
    //     ))
    //   ) : (
    //     <p className="text-gray-500">No conference status found.</p>
    //   )}
    // </div>
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Conference Status for ID: <span className="text-blue-500">{conferenceId}</span>
      </h1>

      <h2 className="text-xl font-semibold mb-6 text-gray-700">
        Accepted By <span className="text-green-600">{conferenceStatus?.length}</span> Reporters
      </h2>

      {/* Loading and Error States */}
      {status === "loading" && <p className="text-gray-500 text-center">Loading...</p>}
      {status === "failed" && (
        <p className="text-red-500 text-center">
          Error: {error?.message || "Something went wrong."}
        </p>
      )}

      {/* Conference Status Cards */}
      {status === "succeeded" && conferenceStatus.length > 0 ? (
        conferenceStatus.map((statusItem) => (
          <div
            key={statusItem._id}
            className="mb-8 p-6 border rounded-lg shadow-sm bg-gray-50"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Conference Status - ID: <span className="text-blue-500">{statusItem._id}</span>
            </h2>
            <button
              onClick={() => toggleVisibility(statusItem._id)}
              className="mb-4 bg-green-500 text-white font-medium py-2 px-6 rounded-md hover:bg-green-600 transition"
            >
              {visibility[statusItem._id] ? "Hide Details" : "Show Details"}
            </button>

            {visibility[statusItem._id] && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Details Section */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <label className="w-1/3 text-gray-700 font-medium">Accepted By User:</label>
                    <input
                      type="text"
                      value={statusItem.acceptedByUser}
                      readOnly
                      className="w-2/3 p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className="w-1/3 text-gray-700 font-medium">Accepted Date:</label>
                    <input
                      type="text"
                      value={new Date(statusItem.acceptedDate).toLocaleString()}
                      readOnly
                      className="w-2/3 p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className="w-1/3 text-gray-700 font-medium">Conference ID:</label>
                    <input
                      type="text"
                      value={statusItem.conferenceId}
                      readOnly
                      className="w-2/3 p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className="w-1/3 text-gray-700 font-medium">Created At:</label>
                    <input
                      type="text"
                      value={new Date(statusItem.createdAt).toLocaleString()}
                      readOnly
                      className="w-2/3 p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className="w-1/3 text-gray-700 font-medium">Status:</label>
                    <input
                      type="text"
                      value={statusItem.status}
                      readOnly
                      className="w-2/3 p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className="w-1/3 text-gray-700 font-medium">Updated At:</label>
                    <input
                      type="text"
                      value={new Date(statusItem.updatedAt).toLocaleString()}
                      readOnly
                      className="w-2/3 p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Editable Fields */}
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-gray-700 font-medium">Video URL</span>
                    <input
                      type="text"
                      name="videoUrl"
                      placeholder="Video URL"
                      value={updateData[statusItem._id]?.videoUrl || ""}
                      onChange={(e) => handleInputChange(e, statusItem._id)}
                      className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                  </label>

                  <label className="block">
                    <span className="text-gray-700 font-medium">Note</span>
                    <input
                      type="text"
                      name="note"
                      placeholder="Note"
                      value={updateData[statusItem._id]?.note || ""}
                      onChange={(e) => handleInputChange(e, statusItem._id)}
                      className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                  </label>

                  <label className="block">
                    <span className="text-gray-700 font-medium">Video Date</span>
                    <input
                      type="datetime-local"
                      name="videoDate"
                      value={updateData[statusItem._id]?.videoDate || ""}
                      onChange={(e) => handleInputChange(e, statusItem._id)}
                      className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                  </label>

                  <label className="block">
                    <span className="text-gray-700 font-medium">Status By Admin</span>
                    <select
                      name="statusByAdmin"
                      value={updateData[statusItem._id]?.statusByAdmin || ""}
                      onChange={(e) => handleInputChange(e, statusItem._id)}
                      className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    >
                      <option value="" disabled>
                        Select Status
                      </option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                  </label>

                  <button
                    onClick={() => handleUpdate(statusItem._id)}
                    className="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 transition"
                    disabled={updatingStatus[statusItem._id]}
                  >
                    {updatingStatus[statusItem._id] ? "Updating..." : "Update"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No conference status found.</p>
      )}
    </div >

  );
};

export default GetConferenceStatus;
