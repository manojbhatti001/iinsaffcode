import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../utils/const";
import facebook from "../../../assets/facebook_5968764.png";
import instagram from "../../../assets/social_15707814.png";
import youtube from "../../../assets/social_15707749.png";
import iinsaf from "../../../assets/iinsaf_logo_+_name-removebg-preview.png";
import signature from "../../../assets/1000176827-removebg-preview.png";
import { QRCodeCanvas } from "qrcode.react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const UpdateCard = () => {
  const [cardRequests, setCardRequests] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]); // For displaying filtered results
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    bloodGroup: "",
    designation: "",
    aadharCardNumber: "",
    address: "",
    mobile: "",
    status: "",
    dob: "",
    cardForId: "",
    photo: "",
    facebookPageUrl: "",
    instagramPageUrl: "",
    youtubeChannelUrl: "",
  });
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [qrText, setQrText] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState(false); // State for switch (On/Off)

  useEffect(() => {
    const fetchCardRequests = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const { data } = await axios.get(`${baseUrl}getCardRequest`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCardRequests(data);
        setFilteredCards(data); // Initialize filtered cards
      } catch (err) {
        setError("Error fetching card requests");
      }
    };
    fetchCardRequests();
  }, []);

  // Handle search query change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter cards based on name, mobile, or email
    const filtered = cardRequests.filter(
      (card) =>
        card.name.toLowerCase().includes(query) ||
        card.mobile.toString().includes(query) ||
        card.email?.toLowerCase().includes(query) // Handle email if it exists
    );

    setFilteredCards(filtered);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCardSelect = (card) => {
    if (!isSwitchOn) {
      toast.error("Please turn on the switch to view card details!");
      return;
    }
    setSelectedCardId(card._id);
    setQrText(card._id)
    setFormData({
      name: card.name,
      fatherName: card.fatherName,
      bloodGroup: card.bloodGroup,
      designation: card.designation,
      aadharCardNumber: card.aadharCardNumber,
      address: card.address,
      mobile: card.mobile,
      status: card.status,
      dob: card.dob,
      cardForId: card.cardForId._id,
      photo: card.cardForId.photo,
      facebookPageUrl: card.cardForId.facebookPageUrl,
      instagramPageUrl: card.cardForId.instagramPageUrl,
      youtubeChannelUrl: card.cardForId.youtubeChannelUrl,
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCardId) {
      setError("Please select a card to update");
      return;
    }

    setIsUpdating(true);

    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(
        `${baseUrl}updateCard?cardId=${selectedCardId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Card details updated successfully!");
      setError(null);
    } catch (err) {
      alert("Error updating card details");
    } finally {
      setIsUpdating(false);
    }
  };
  const GenerateQRCode = ({ text, image }) => {
    return (
      <div
        style={{
          textAlign: "center",
          alignContent: "center",
          alignItems: "center",
        }}
        className="mt-3 w-full"
      >
        {text && image ? (
          <div className="flex justify-evenly">
            <img
              src={image}
              alt="notProvided"
              style={{
                width: "70px",
                height: "70px",
                alignItems: "center",
                alignContent: "center",
                marginTop: "10px",
              }}
            />
            <QRCodeCanvas value={text} size={90} />
          </div>
        ) : (
          <p>Please provide text to generate a QR code</p>
        )}
      </div>
    );
  };

  const toggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <ToastContainer />

      <h2 className="text-2xl font-semibold my-4">Pending Card Requests</h2>
      {/* Switch for on/off */}
      <div className="flex items-center mb-4">
        <label className="mr-2 text-gray-700">View Info: </label>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only"
            checked={isSwitchOn}
            onChange={toggleSwitch}
          />
          <div
            className={`w-11 h-6 bg-gray-200 rounded-full flex items-center ${
              isSwitchOn ? "bg-blue-500" : "bg-gray-400"
            }`}
          >
            <span
              className={`absolute w-4 h-4 bg-white rounded-full transition-transform ${
                isSwitchOn
                  ? "transform translate-x-5"
                  : "transform translate-x-0"
              }`}
            />
          </div>
        </label>
      </div>
      {error && <p className="text-red-500">{error}</p>}

      {/* Search Bar */}
      <div className="w-full max-w-md mb-4">
        <input
          type="text"
          placeholder="Search by name, number, or email..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filteredCards.length > 0 ? (
        <>
          {/* Cards Table */}
          <div className="w-full bg-white shadow-md rounded-lg overflow-hidden mb-4">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left text-gray-700">
                    Name
                  </th>
                  <th className="py-2 px-4 border-b text-left text-gray-700">
                    Mobile
                  </th>
                  <th className="py-2 px-4 border-b text-left text-gray-700">
                    Select
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCards.map((card) => (
                  <tr key={card._id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{card.name}</td>
                    <td className="py-2 px-4 border-b">{card.mobile}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleCardSelect(card)}
                        className="text-blue-600 hover:underline"
                      >
                        Update Id Card
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Update Form */}
          {selectedCardId && isSwitchOn && (
            <div className="md:flex">
              <form
                onSubmit={handleSubmit}
                className="p-8 bg-white shadow-lg rounded-lg w-full max-w-2xl space-y-4"
              >
                <h2 className="text-2xl font-semibold text-gray-800">
                  Update Card Details
                </h2>

                {Object.keys(formData).map((field) => (
                  <div key={field} className="flex flex-col">
                    <label className="text-gray-600 capitalize">
                      {field.replace(/([A-Z])/g, " $1")}
                    </label>

                    {field === "status" ? (
                      <select
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="" disabled>
                          Select Status
                        </option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    )}
                  </div>
                ))}

                <button
                  type="submit"
                  className={`w-full py-2 px-4 font-semibold rounded-lg transition ${
                    isUpdating
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                  disabled={isUpdating}
                >
                  {isUpdating ? "Updating..." : "Update Card"}
                </button>
              </form>
              {/* Right side - UserApprovedCards */}
              <div className="sm:col-span-8 bg-gray-200 p-4">
                {/* Front Side ui */}
                <div>
                  <div
                    id="card-frontt"
                    style={{
                      width: "310px",
                      height: "480px",
                      border: "1px solid #ccc",
                      borderRadius: "20px",
                      backgroundColor: "#fff",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "20px",
                      position: "relative",
                    }}
                  >
                    {/* Left Red Strip */}
                    <div
                      style={{
                        background: "red",
                        width: "49px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "24px",
                        textAlign: "center",
                        fontWeight: "bolder",
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          transform: "rotate(90deg)", // Rotate text to make it vertical
                          whiteSpace: "nowrap",
                          fontSize: "32px",
                          // marginLeft: "5px",
                          fontWeight: "700",
                          // fontFamily:"fantasy",
                          letterSpacing: "10px",
                          // color:"black"
                        }}
                      >
                        Raise Your Voice
                      </span>
                    </div>

                    {/* Right Content */}
                    <div
                      style={{
                        width: "85%",
                        padding: "10px",
                        marginTop: "20px",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          marginBottom: "10px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={iinsaf}
                          alt="Logo"
                          style={{ width: "200px", height: "75px" }}
                        />
                      </div>
                      <h3
                        style={{
                          textAlign: "center",
                          marginBottom: "1px",
                          fontWeight: "bold",
                          color: "white",
                          background: "red",
                          fontSize: "30px",
                          alignItems: "",
                          verticalAlign: "",
                          width: "200px",
                          height: "50px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <span
                          style={{ marginBottom: "0px", fontWeight: "900" }}
                        >
                          PRESS
                        </span>
                      </h3>
                      <h3
                        className="text-center text-lg font-semibold text-gray-400"
                        style={{ fontSize: "16px", fontWeight: "700" }}
                      >
                        {formData.designation}
                      </h3>

                      <span
                        style={{
                          textAlign: "center",
                          marginBottom: "1px",
                          lineHeight: "18px",
                        }}
                      >
                        <span
                          style={{ fontSize: "24px", lineHeight: "0px" }}
                          className="font-sans"
                        >
                          {formData.name}
                        </span>
                        <span
                          style={{ fontWeight: "100" }}
                          className="text-gray-500"
                        >
                          s/o <br />
                          <span
                            className="text-gray-500"
                            style={{ fontWeight: "700", fontSize: "12px" }}
                          >
                            {formData.fatherName}
                          </span>
                        </span>
                      </span>

                      <div
                        style={{
                          textAlign: "center",
                          marginBottom: "10px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={formData.photo}
                          alt="Logo"
                          style={{
                            border: "0px solid black",
                            borderRadius: "50%",
                            width: "120px",
                            height: "120px",
                            overflow: "hidden",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          width: "80%",
                          marginBottom: "2px",
                          lineHeight: "17px",
                        }}
                      >
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "70px 10px auto",
                            marginBottom: "0px",
                          }}
                        >
                          <div style={{ fontSize: "14px", fontWeight: "600" }}>
                            iinsaf Id
                          </div>
                          <div style={{ textAlign: "center" }}>:</div>
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "400",
                              marginLeft: "10px",
                            }}
                          >
                            {formData.cardForId.slice(-7)}
                          </div>
                        </div>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "70px 10px auto",
                            marginBottom: "0px",
                          }}
                        >
                          <div style={{ fontSize: "14px", fontWeight: "600" }}>
                            Phone No
                          </div>
                          <div style={{ textAlign: "center" }}>:</div>
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "400",
                              marginLeft: "10px",
                            }}
                          >
                            {formData.mobile}
                          </div>
                        </div>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "70px 10px auto",
                            marginBottom: "0px",
                            flexWrap: "noWrap",
                            textWrap: "wrap",
                          }}
                        >
                          <div style={{ fontSize: "14px", fontWeight: "600" }}>
                            Address
                          </div>
                          <div style={{ textAlign: "center" }}>:</div>
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "400",
                              marginLeft: "10px",
                            }}
                          >
                            {formData.address}
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "0px",
                            alignItems: "",
                            fontSize: "12px",
                          }}
                          className="mt-2"
                        >
                          <div
                            style={{ fontWeight: "bold" }}
                            className="mt-4 text-gray-400"
                          >
                            Approved By:
                          </div>
                          <div>
                            <img
                              src={signature}
                              alt=""
                              style={{ height: "70px", marginTop: "-15px" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    id="card-backk"
                    style={{
                      width: "310px",
                      height: "480px",
                      border: "1px solid #ccc",
                      borderRadius: "20px",
                      backgroundColor: "#fff",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    {/* Left Red Strip */}
                    <div
                      style={{
                        backgroundColor: "red",
                        width: "49px",
                        height: "127mm",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontSize: "24px",
                        textAlign: "center",
                        fontWeight: "bold",
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          transform: "rotate(90deg)",
                          whiteSpace: "nowrap",
                          fontSize: "50px",
                          letterSpacing: "20px",
                          marginLeft: "10px",
                          fontWeight: "900",
                          fontFamily: "",
                        }}
                      >
                        <span className="text-white font-serif">ii</span>
                        <span className="text-black">nsaf</span>
                      </span>
                    </div>

                    {/* Right Content */}
                    <div
                      style={{
                        width: "261px",
                        padding: "10px",
                        marginTop: "20px",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "column",
                      }}
                      className="relative"
                    >
                      <div
                        style={{
                          width: "90%",
                          marginTop: "10px",
                          display: "flex",
                          flexDirection: "column",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        <div style={{ display: "flex", marginBottom: "0px" }}>
                          <span
                            style={{
                              width: "80px",
                              textAlign: "left",
                              padding: "1px",
                            }}
                          >
                            DOB
                          </span>
                          <span style={{ margin: "0 10px" }}>:</span>
                          <span
                            style={{
                              textAlign: "left",
                              fontWeight: "400",
                              paddingLeft: "10px",
                            }}
                          >
                            {new Date(formData.dob).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                        <div style={{ display: "flex", marginBottom: "0px" }}>
                          <span
                            style={{
                              width: "80px",
                              textAlign: "left",
                              padding: "1px",
                              fontWeight: "bold",
                              whiteSpace: "nowrap",
                              textWrap: "nowrap",
                            }}
                          >
                            Aadhaar No
                          </span>
                          <span style={{ margin: "0 10px" }}>:</span>
                          <span
                            style={{
                              textAlign: "left",
                              fontWeight: "400",
                              paddingLeft: "10px",
                              textWrap: "nowrap",
                            }}
                          >
                            {formData.aadharCardNumber.replace(
                              /(\d{4})(?=\d)/g,
                              "$1 "
                            )}
                          </span>
                        </div>
                        <div style={{ display: "flex", marginBottom: "0px" }}>
                          <span
                            style={{
                              width: "80px",
                              textAlign: "left",
                              padding: "1px",
                              fontWeight: "bold",
                              whiteSpace: "nowrap",
                            }}
                          >
                            Blood Group
                          </span>
                          <span style={{ margin: "0 10px" }}>:</span>
                          <span
                            style={{
                              textAlign: "left",
                              fontWeight: "400",
                              paddingLeft: "10px",
                            }}
                          >
                            {formData.bloodGroup}
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            marginBottom: "4px",
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              width: "100px",
                              textAlign: "left",
                              padding: "1px",
                              fontWeight: "bold",
                            }}
                          >
                            Issue Date
                          </span>
                          <span style={{ margin: "0 10px" }}>:</span>
                          <span
                            style={{
                              textAlign: "left",
                              fontWeight: "400",
                              paddingLeft: "10px",
                            }}
                            className="text-nowrap"
                          >
                            {new Date().toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "numeric",
                              day: "numeric",
                            })}
                            {/* chosen by admin */}
                          </span>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            marginBottom: "4px",
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              width: "100px",
                              textAlign: "left",
                              padding: "1px",
                              fontWeight: "bold",
                            }}
                          >
                            Valid Up To
                          </span>
                          <span style={{ margin: "0 10px" }}>:</span>
                          <span
                            style={{
                              textAlign: "left",
                              fontWeight: "400",
                              paddingLeft: "10px",
                            }}
                            className="text-nowrap"
                          >
                            {new Date(
                              new Date().setFullYear(
                                new Date().getFullYear() + 1
                              )
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "numeric",
                              day: "numeric",
                            })}
                            {/* chosen by admin */}
                          </span>
                        </div>
                      </div>

                      <div
                        style={{ marginTop: "10px", fontSize: "19px" }}
                        className="mt-8 ml-1"
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "4px",
                            marginTop: "10px",
                          }}
                        >
                          <img
                            src={instagram}
                            alt="Instagram"
                            style={{
                              width: "40px",
                              height: "40px",
                              marginRight: "10px",
                              verticalAlign: "middle",
                            }}
                          />
                          <span className="" style={{ fontSize: "16px" }}>
                            {formData.instagramPageUrl ||
                              "Not Available At Moment"}
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "4px",
                          }}
                        >
                          <img
                            src={facebook}
                            alt="Facebook"
                            style={{
                              width: "40px",
                              height: "40px",
                              marginRight: "10px",
                              verticalAlign: "middle",
                            }}
                          />
                          <span style={{ fontSize: "16px" }}>
                            {formData.facebookPageUrl ||
                              "Not Available At Moment"}
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "4px",
                          }}
                        >
                          <img
                            src={youtube}
                            alt="YouTube"
                            style={{
                              width: "40px",
                              height: "40px",
                              marginRight: "10px",
                              verticalAlign: "middle",
                            }}
                          />
                          <span style={{ fontSize: "16px" }}>
                            {formData.youtubeChannelUrl ||
                              "Not Available At Moment"}
                          </span>
                        </div>
                      </div>

                      <GenerateQRCode text={qrText} image={instagram} />
                      <a
                        href="www.iinsaf.com"
                        target="_blank"
                        className="mt-1 text-blue-700"
                      >
                        www.iinsaf.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-600">No card requests</p>
      )}
    </div>
  );
};

export default UpdateCard;
