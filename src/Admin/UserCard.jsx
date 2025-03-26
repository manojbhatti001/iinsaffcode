import { useEffect, useState } from "react";

const UserCard = ({ advertisers }) => {
  const [viewDetailsId, setViewDetailsId] = useState(null);

  const toggleViewDetails = (id) => {
    // Toggle the visibility of details for a specific advertiser
    if (viewDetailsId === id) {
      setViewDetailsId(null); // If already visible, hide details
    } else {
      setViewDetailsId(id); // Show details for the clicked advertiser
    }
  };

  return (
    <div className="flex items-center justify-center flex-wrap gap-4">
      {advertisers.map((advertiser) => (
        <div
          key={advertiser.id}
          className="relative w-80 h-auto rounded-xl overflow-hidden shadow-lg"
        >
          {/* Upper Div */}
          <div className="bg-blue-200 h-48 flex items-end justify-center relative">
            <p className="mb-32 ml-28">
              <strong>Wallet:</strong> {advertiser.wallet}
            </p>

            <div className="absolute -bottom-12 w-24 h-24 rounded-full overflow-hidden border-4 border-white">
              <img
                src={
                  advertiser.profilePicture || "https://via.placeholder.com/100"
                }
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Bottom Div */}
          <div className="bg-gray-50 p-4 text-center">
            <h3 className="text-xl mt-10 font-semibold">{advertiser.name}</h3>
            <p className="text-gray-500">{advertiser.mobile}</p>
            <p className="p-2 hover:bg-gray-100">{advertiser.email}</p>
            <hr />
            <button
              className="mt-2 mb-2 p-2 items-center bg-blue-500 text-white  rounded-full hover:bg-blue-600 transition-colors duration-200"
              onClick={() => toggleViewDetails(advertiser._id)}
            >
              {viewDetailsId === advertiser._id
                ? "Hide Details"
                : "View Details"}
            </button>
            <hr />
            <div
              className={`details transition-all ease-in-out ${
                viewDetailsId === advertiser._id ? "expanded" : "collapsed"
              }`}
            >
              {viewDetailsId === advertiser._id && (
                <div className="text-left ">
                  <p>
                    <strong>Wallet:</strong> {advertiser.wallet}
                  </p>
                  <p>
                    <strong>State:</strong> {advertiser.state}
                  </p>
                  <p>
                    <strong>City:</strong> {advertiser.city}
                  </p>
                  <p>
                    <strong>Area Details:</strong> {advertiser.areaDetails}
                  </p>
                  <p>
                    <strong>Pincode:</strong> {advertiser.pincode}
                  </p>
                  <p>
                    <strong>Secondary Phone:</strong>{" "}
                    {advertiser.secondaryPhone}
                  </p>
                  <p>
                    <strong>Gender:</strong> {advertiser.gender}
                  </p>
                  <p>
                    <strong>WhatsApp:</strong> {advertiser.whatsapp}
                  </p>
                  <p>
                    <strong>Website:</strong> {advertiser.website}
                  </p>
                  <p>
                    <strong>Admin Verified:</strong>{" "}
                    {advertiser.adminVerified ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Channel Name:</strong> {advertiser.channelName}
                  </p>
                  <p>
                    <strong>YouTube Channel URL:</strong>{" "}
                    <a href={advertiser.youtubeChannelUrl}>Visit YouTube</a>
                  </p>
                  <p>
                    <strong>Facebook Page URL:</strong>{" "}
                    <a href={advertiser.facebookPageUrl}>Visit Facebook</a>
                  </p>
                  <p>
                    <strong>Instagram Page URL:</strong>{" "}
                    <a href={advertiser.instagramPageUrl}>Visit Instagram</a>
                  </p>
                  <p>
                    <strong>Verified:</strong>{" "}
                    {advertiser.isVerified ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Account Created:</strong>{" "}
                    {new Date(advertiser.date).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCard;
