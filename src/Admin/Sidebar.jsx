import React, { useEffect } from "react";
import dashboardicon from "./assets/icons/dashboard.png";
import influencericon from "./assets/icons/influncer.png";
import advertisersicon from "./assets/icons/advertisers.png";
import leadicon from "./assets/icons/leads.png";
import paymenthistoryicon from "./assets/icons/mhistory.png";
import withdrawalicon from "./assets/icons/money-withdrawal.png";
import cardrequestsicon from "./assets/icons/applied_card.png";
import pandingcardicon from "./assets/icons/pending_card.png";
import rejectedcardicon from "./assets/icons/rejected_card.png";
import profileicon from "./assets/icons/profile.png";
import settingsicon from "./assets/icons/setting.png";
import logouticon from "./assets/icons/switch.png";
import confranceicon from "./assets/icons/conferences.png";
import usergroupicon from "./assets/icons/user-group-296.svg";
import reporteicon from "./assets/icons/male-reporter-journalist-icon.svg";
import createadminicon from "./assets/icons/creatadmin.png";
import couponmanagementicon from "./assets/icons/8633496.png";
import alladminicon from "./assets/icons/all admin icon.png";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";

const Sidebar = ({ onNavigate }) => {
  const navigate = useNavigate();
  // const handellogout = () => {
  //   localStorage.removeItem("adminToken");
  //   navigate("/adminlogin");
  // };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("adminToken");
        navigate("/adminlogin");
        Swal.fire("Logged Out", "You have been logged out.", "success");
      }
    });
  };
  const linkClasses =
    "flex items-center space-x-4 px-2 py-2 hover:bg-gray-200 rounded-lg cursor-pointer";

  return (
    <>
      <h2 className="text-2xl font-bold p-6 sticky top-0 bg-white z-10 shadow-md shadow-blue-300 border-b border-blue-300 rounded-b-lg text-center">
        Admin Panel
      </h2>
      <div className="p-6">
        <ul className="space-y-4">
          <li onClick={() => onNavigate("dashboard")} className={linkClasses}>
            <img src={dashboardicon} alt="Dashboard" className="w-6 h-6" />
            <span>Dashboard</span>
          </li>
          {/* <li onClick={() => onNavigate("advertisers")} className={linkClasses}>
            <img src={advertisersicon} alt="Advertisers" className="w-6 h-6" />
            <span>Advertisers</span>
          </li>
          <li onClick={() => onNavigate("influencers")} className={linkClasses}>
            <img src={influencericon} alt="Influencers" className="w-6 h-6" />
            <span>Influencers</span>
          </li>
          <li onClick={() => onNavigate("Reporter")} className={linkClasses}>
            <img src={reporteicon} alt="Influencers" className="w-6 h-6" />
            <span>Reporter</span>
          </li> */}
          <h2 className="text-black font-bold uppercase text-sm tracking-wide mt-4">
            Other
          </h2>
          <li onClick={() => onNavigate("priceset")} className={linkClasses}>
            <img src={pandingcardicon} alt="Price Set" className="w-6 h-6" />
            <span>Advertisement Setting</span>
          </li>
          <h2 className="text-black font-bold uppercase text-sm tracking-wide mt-4">
            All USer
          </h2>
          <li onClick={() => onNavigate("AllUser")} className={linkClasses}>
            <img src={usergroupicon} alt="Leads" className="w-6 h-6" />
            <span>All User Details</span>
          </li>
          <h2 className="text-black font-bold uppercase text-sm tracking-wide mt-4">
            Advertiser Lead
          </h2>
          <li onClick={() => onNavigate("getallleads")} className={linkClasses}>
            <img src={leadicon} alt="Leads" className="w-6 h-6" />
            <span>Reporter Advertisement</span>
          </li>
          <h2 className="text-black font-bold uppercase text-sm tracking-wide mt-4">
            MArketer Profiles
          </h2>
          <li
            onClick={() => onNavigate("getallProfiles")}
            className={linkClasses}
          >
            <img src={leadicon} alt="Advs" className="w-6 h-6" />
            <span>Marketer User</span>
          </li>

          <li onClick={() => onNavigate("getalllAdvs")} className={linkClasses}>
            <img src={leadicon} alt="Advs" className="w-6 h-6" />
            <span>Marketer Advertisement</span>
          </li>
          <h2 className="text-black font-bold uppercase text-sm tracking-wide mt-4">
            Advertiser Conference
          </h2>
          <li
            onClick={() => onNavigate("allconfrences")}
            className={linkClasses}
          >
            <img src={confranceicon} alt="Leads" className="w-6 h-6" />
            <span> All Confrences</span>
          </li>
          <h2 className="text-black font-bold uppercase text-sm tracking-wide mt-4">
            Free Ad
          </h2>
          <li
            onClick={() => onNavigate("freeAd")}
            className={linkClasses}
          >
            <img src={confranceicon} alt="Ad" className="w-6 h-6" />
            <span> FreeAd</span>
          </li>
          <li
            onClick={() => onNavigate("adStatus")}
            className={linkClasses}
          >
            <img src={confranceicon} alt="Ad" className="w-6 h-6" />
            <span> AdStatus</span>
          </li>
          {/* <li
            onClick={() => onNavigate("freeconfrences")}
            className={linkClasses}
          >
            <img src={confranceicon} alt="Conferences" className="w-6 h-6" />
            <span> Free Confrences</span>
          </li> */}
          {/* <li onClick={() => onNavigate("updateconfrences")} className={linkClasses}>
          <img src={confranceicon} alt="Leads" className="w-6 h-6" />
          <span> Update Confrences</span>
        </li> */}
          <h2 className="text-black font-bold uppercase text-sm tracking-wide mt-4">
            Payments
          </h2>
          <li
            onClick={() => onNavigate("payment-history")}
            className={linkClasses}
          >
            <img
              src={paymenthistoryicon}
              alt="Payment History"
              className="w-6 h-6"
            />
            <span>Payment History</span>
          </li>
          <li
            onClick={() => onNavigate("withdrawal-history")}
            className={linkClasses}
          >
            <img
              src={paymenthistoryicon}
              alt="Payment History"
              className="w-6 h-6"
            />
            <span>Withdrawal History</span>
          </li>
          <li
            onClick={() => onNavigate("withdrawal-requests")}
            className={linkClasses}
          >
            <img
              src={withdrawalicon}
              alt="Withdrawal Requests"
              className="w-6 h-6"
            />
            <span>Withdrawal Requests</span>
          </li>
          <h2 className="text-black font-bold uppercase text-sm tracking-wide mt-4">
            Id-cards
          </h2>
          <li
            onClick={() => onNavigate("card-requests")}
            className={linkClasses}
          >
            <img
              src={cardrequestsicon}
              alt="Card Requests"
              className="w-6 h-6"
            />
            <span>New Id-Cards</span>
          </li>
          <li
            onClick={() => onNavigate("approved-cards")}
            className={linkClasses}
          >
            <img
              src={pandingcardicon}
              alt="Approved Cards"
              className="w-6 h-6"
            />
            <span>Verified Id-Cards</span>
          </li>
          <li
            onClick={() => onNavigate("rejected-cards")}
            className={linkClasses}
          >
            <img
              src={rejectedcardicon}
              alt="Rejected Cards"
              className="w-6 h-6"
            />
            <span>Rejected Id-Cards</span>
          </li>
          <h2 className="text-black font-bold uppercase text-sm tracking-wide mt-4">
            Create Admins
          </h2>
          <li onClick={() => onNavigate("createAdmin")} className={linkClasses}>
            <img src={createadminicon} alt="createAdmin" className="w-6 h-6" />
            <span>New Admin</span>
          </li>
          <li onClick={() => onNavigate("AllAdmin")} className={linkClasses}>
            <img src={alladminicon} alt="createAdmin" className="w-6 h-6" />
            <span>All Admin</span>
          </li>
          <h2 className="text-black font-bold uppercase text-sm tracking-wide mt-4">
            Darbar
          </h2>
          <li
            onClick={() => onNavigate("getAllDarbar")}
            className={linkClasses}
          >
            <img src={alladminicon} alt="getAllDarbar" className="w-6 h-6" />
            <span>Darbar</span>
          </li>
          <h2 className="text-black font-bold uppercase text-sm tracking-wide mt-4">
            voices
          </h2>
          <li onClick={() => onNavigate("voices")} className={linkClasses}>
            <img src={alladminicon} alt="voices" className="w-6 h-6" />
            <span> Raise Voices</span>
          </li>
          <h2 className="text-black font-bold uppercase text-sm tracking-wide mt-4">
            Organizations
          </h2>
          <li
            onClick={() => onNavigate("organization")}
            className={linkClasses}
          >
            <img src={alladminicon} alt="organization" className="w-6 h-6" />
            <span>iinsaf Organization</span>
          </li>
          <h2 className="text-black font-bold uppercase text-sm tracking-wide mt-4">
            Discount coupon
          </h2>

          <li
            onClick={() => onNavigate("admincouponmanage")}
            className={linkClasses}
          >
            <img src={couponmanagementicon} alt="Coupon" className="w-6 h-6" />
            <span>Coupon Management</span>
          </li>
          <h2 className="text-black font-bold uppercase text-sm tracking-wide mt-4">
            Settings
          </h2>
          <li onClick={() => onNavigate("profile")} className={linkClasses}>
            <img src={profileicon} alt="Profile" className="w-6 h-6" />
            <span>Profile</span>
          </li>
          <li onClick={() => onNavigate("settings")} className={linkClasses}>
            <img src={settingsicon} alt="Settings" className="w-6 h-6" />
            <span>Admin Password</span>
          </li>
          <li
            //  onClick={() => onNavigate("login")}
            className={linkClasses}
          >
            <img src={logouticon} alt="Logout" className="w-6 h-6" />
            <span onClick={handleLogout}>Logout</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
