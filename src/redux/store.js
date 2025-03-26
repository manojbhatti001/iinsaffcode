import { configureStore } from "@reduxjs/toolkit";
import useReducer from "../redux/userSlicer";
import superAdmin from "./AdminRedux/adminLogin__RegisterSlicer";
import leadReducer from "../redux/leadSlicer";
import priceSetReducer from "./AdminRedux/adminPriceSetSlicer";
import adminleadsReducer from "./AdminRedux/adminGetAllLeadsSlicer";
import conferenceReducer from "../redux/conferenceSlicer";
import adminConferencesReducer from "../redux/AdminRedux/adminGetAllConferenceSlicer";
import advertiserDashboardReducer from "../redux/advertiserDashbordSlicer";
import adminConferenceStatusReducer from "./AdminRedux/conferenceStatusSlicer";
import adminLeadStatusReducer from "./AdminRedux/leadStatusSlicer";

const store = configureStore({
  reducer: {
    user: useReducer,
    admin: superAdmin,
    lead: leadReducer,
    pricing: priceSetReducer,
    adminLeads: adminleadsReducer,
    conference: conferenceReducer,
    adminConferences: adminConferencesReducer,
    adminConferenceStatus: adminConferenceStatusReducer,
    adminLeadStatus: adminLeadStatusReducer,
    advertiserDashboard: advertiserDashboardReducer,
  },
});

export default store;
