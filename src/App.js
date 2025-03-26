import "./App.css";
import Navbar from "./components/Home/Navbar";
import Home from "./components/Home/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./components/LoginRegisterUser/Login";
import Register from "./components/LoginRegisterUser/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer/Footer";

import AdminRegister from "./Admin/components/AdminRegisterLogin/AdminRegister";
import CreateAdmin from "./Admin/components/AdminRegisterLogin/CreateAdmin";
import AdminLogin from "./Admin/components/AdminRegisterLogin/AdminLogin";
import Lead from "./components/Lead/Lead";
import LeadStatus from "./components/Lead/LeadStatus/LeadStatus";
import PostConference from "./components/Conference/PostConference";
import GetUserConference from "./components/Conference/GetUserConference";
import GetAllConference from "./Admin/components/AdminConference/GetAllConference";
import Repoter from "./components/Repoter/Repoter";
import InfuAndAdv from "./components/InfuAndAdv/InfuAndAdv";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import UserDashboard from "./components/User/UserDashboard";
import LeadDetails from "./components/Lead/LeadDetails";
import ConferenceDetails from "./components/Conference/ConferenceDetails";
import LeadDetailsReporter from "./components/Repoter/LeadDetailsReporter";
import CouponManagement from "./Admin/components/AdminCoupon/CouponManagement";
import ConferenceDetailsReporter from "./components/Repoter/ConferenceDetailsReporter";
import ReporterConference from "./components/Repoter/ReporterConference";
import AdminPanel from "./Admin/AdminPanel";
import UpdateCard from "./Admin/components/AdminCards/UpdateCard";
import Profile from "./components/User/components/Profile/Profile";
import ReporterDashboard from "./components/Repoter/User/ReporterDashboard";
import InAdDashboard from "./components/InfuAndAdv/User/InAdDashboard";
import ConferenceDetailsReporterById from "./components/Repoter/ConferenceDetailsReporterById";
import RegisterDarbar from "./Darbar/components/LoginRegisterDarbar/RegisterDarbar";
import LoginDarbar from "./Darbar/components/LoginRegisterDarbar/LoginDarbar";
import ScrollToTop from "./ScrollToTop";
import CreateDarbar from "./Darbar/components/CreateDarbar/CreateDarbar";
import AdminGetAllDarbar from "./Darbar/components/AdminDarbar/AdminGetALLDarbar";
import DarbarDetailsByIdAdmin from "./Darbar/components/AdminDarbar/DarbarDetailsByIdAdmin";
import GetRelevantDarbar from "./Darbar/components/ReporterDarbar/GetRelevantDarbar";
import GetDarbarByIdReporter from "./Darbar/components/ReporterDarbar/GetDarbarByIdReporter";
import AcceptedDarbarStatus from "./Darbar/components/ReporterDarbar/AcceptedDarbarStatus";
import GetUserDarbar from "./Darbar/components/CreateDarbar/GetUserDarbar";
import GetUserDarbarById from "./Darbar/components/CreateDarbar/GetUserDarbarById";
import LoginWithOtp from "./RaiseYourVoice/components/LoginWithOtp";
import RaiseVoice from "./RaiseYourVoice/components/RaiseVoice";
import UpdateVoiceStatusAdmin from "./RaiseYourVoice/components/AdminVoices/UpdateVoiceStatusAdmin";
import ReporterGetAllVoice from "./RaiseYourVoice/components/ReporterGetAllVoice";
import FaqSection from "./Services/Faq";
import MarketerRegister from "./components/Markerter/LoginRegister/MarketerLoginRegister";
import MarketerDashboard from "./components/Markerter/Dashboard/MarketerDashboard";
import Advertise from "./components/Markerter/Advertise/Advertise";
import JoinIinsaf from "./components/JoinIinsaf";
import Header from "./components/Home/Header";
import IdCardDetails from "./components/Repoter/IdCardDetails";
import { useState } from "react";
import UserVoices from "./RaiseYourVoice/components/UserVoices";
import GetVoiceDataById from "./RaiseYourVoice/components/GetVoiceDataById";
import GoogleTranslate from "./components/Repoter/User/components/GoogleTranslate";

function App() {
  const [activeTopic, setActiveTopic] = useState("reporting");
  const [activeCareer, setActiveCareer] = useState("Reporter");
  const location = useLocation(); // Get current location
  const isAdminRoute = location.pathname.startsWith("/admin"); // Check if the path starts with '/admin'
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  const isDashboard = location.pathname.replace(/\/$/, "").startsWith("/InAd"); // This is for checking /inAd/*
  const isReporterDashboard = location.pathname
    .replace(/\/$/, "")
    .startsWith("/ReporterDashboard");
  const isMarketerDashboard = location.pathname
    .replace(/\/$/, "")
    .startsWith("/marketerDashboard");

  const userRole = localStorage.getItem("userRole"); // Get the user role from local storage
  console.log("Current Pathname:", location.pathname);

  return (
    <>  <GoogleTranslate />
      {/* {!isAdminRoute && <Header />} */}
      {!isAdminRoute &&
        !isDashboard &&
        !isReporterDashboard &&
        !isMarketerDashboard && (
          <Navbar
          
            activeTopic={activeTopic}
            setActiveTopic={setActiveTopic}
            activeCareer={activeCareer}
            setActiveCareer={setActiveCareer}
          />
        )}
      <ToastContainer />
    
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              activeTopic={activeTopic}
              setActiveTopic={setActiveTopic}
              activeCareer={activeCareer}
              setActiveCareer={setActiveCareer}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/ReporterDashboard/*"
          element={
            <ProtectedRoute
              element={<Repoter />}
              allowedRoles={["Reporter", "Influencer"]}
              userRole={userRole}
            />
          }
        />
        <Route
          path="/repoterConference"
          element={
            <ProtectedRoute
              element={<ReporterConference />}
              allowedRoles={["Reporter", "Influencer"]}
              userRole={userRole}
            />
          }
        />
        <Route
          path="/InAd/*"
          element={
            <ProtectedRoute
              element={<InfuAndAdv />}
              allowedRoles={["Advertiser"]}
              userRole={userRole}
            />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/lead" element={<Lead />} />
        <Route path="/leadStatus" element={<LeadStatus />} />
        <Route
          path="/getSpecificLeadDetailsReporter"
          element={<LeadDetailsReporter />}
        />
        <Route
          path="/getSpecificConferenceDetailsReporter"
          element={<ConferenceDetailsReporter />}
        />
        <Route
          path="/getSpecificConferenceDetailsReporterById"
          element={<ConferenceDetailsReporterById />}
        />
        <Route path="/createConfrence" element={<PostConference />} />
        <Route path="/getConfrence" element={<GetUserConference />} />
        <Route
          path="/getSpecificConfrenceDetails"
          element={<ConferenceDetails />}
        />
        <Route path="/userdashboard/*" element={<UserDashboard />} />
        <Route path="/ReporterDashboard/*" element={<ReporterDashboard />} />
        <Route path="/InAdDashboard/*" element={<InAdDashboard />} />
        <Route path="/createDarbar" element={<CreateDarbar />} />
        <Route path="/getRelevantDarbar" element={<GetRelevantDarbar />} />
        <Route
          path="/getDarbarByReporter"
          element={<GetDarbarByIdReporter />}
        />
        <Route path="/acceptedDarbar" element={<AcceptedDarbarStatus />} />
        <Route path="/userDarbar" element={<GetUserDarbar />} />
        <Route path="/getUserDarbarById" element={<GetUserDarbarById />} />

        <Route path="/voice" element={<LoginWithOtp />} />
        <Route path="/chekVoiceStatus" element={<GetVoiceDataById />} />
        <Route path="/raiseVoice" element={<RaiseVoice />} />
        <Route path="/getUserRaiseVoice" element={<UserVoices />} />
        <Route path="/reporterGetAllVoice" element={<ReporterGetAllVoice />} />
        <Route path="/marketer" element={<MarketerRegister />} />
        <Route path="/marketerDashboard/*" element={<MarketerDashboard />} />
        <Route path="/advertise" element={<Advertise />} />
        <Route path="/joinIinsaf" element={<JoinIinsaf />} />

        {/* admin Routes */}
        {/* <Route path="/register-superadmin" element={<AdminRegister />} /> */}
        <Route path="/create-admin" element={<CreateAdmin />} />
        <Route path="/admin/*" element={<AdminPanel />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        {/* <Route path="admin/getAllLeads" element={<GetAllLeads />} /> */}
        {/* <Route path="admin/updateLeads" element={<UpdateLeadAdmin />} /> */}
        <Route path="/adminregister" element={<AdminRegister />} />
        {/* <Route path="/allAdmins" element={<AllAdmins />} /> */}
        <Route path="/admin/getAllConference" element={<GetAllConference />} />
        <Route path="/getSpecificLeadDetails" element={<LeadDetails />} />
        {/* <Route
          path="/admin/updateConference"
          element={<UpdateConferenceAdmin />}
        /> */}
        {/* <Route
          path="/admin/getConferenceStatus"
          element={<GetConferenceStatus />}
        /> */}
        {/* <Route path="/admin/getLeadStatus" element={<GetLeadStatus />} /> */}
        {/* <Route path="/adminDashboard" element={<AdminDashboard />} /> */}
        <Route path="/admin/updateCard" element={<UpdateCard />} />
        {/* Coupon Routes */}
        <Route path="/couponManagement" element={<CouponManagement />} />
        <Route path="/getReporterByIdCard" element={<IdCardDetails />} />

        {/* Darbar Routes */}
        <Route path="/darbarRegister" element={<RegisterDarbar />} />
        <Route path="/darbarLogin" element={<LoginDarbar />} />
        <Route path="/getAllDarbar" element={<AdminGetAllDarbar />} />
        <Route path="/getDarbarById" element={<DarbarDetailsByIdAdmin />} />
        <Route path="/updateVoiceStatus" element={<UpdateVoiceStatusAdmin />} />

        {/* FAQ/TAC/ETC section */}
        <Route path="/faqs" element={<FaqSection />} />
      </Routes>
      {/* {!isAdminRoute && <Footer />} */}
      {!isAdminRoute &&
        !isLoginPage &&
        !isRegisterPage &&
        !isDashboard &&
        !isReporterDashboard &&
        !isMarketerDashboard && <Footer />}
    </>
  );
}

export default App;
 