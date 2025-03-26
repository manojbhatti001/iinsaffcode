import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../utils/const";

// Create lead async action
export const createLead = createAsyncThunk(
  "lead/createLead",
  async (leadData, { rejectWithValue }) => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("userToken");
   //   console.log("usertoken=>", leadData);

      // Make API request with the token in the Authorization header
      const response = await axios.post(`${baseUrl}create-lead`, leadData, {
        headers: {
          Authorization: token, // Add token to the header
          "Content-Type": "multipart/form-data", // Make sure to send form-data for file uploads
        },
      });
   //   console.log(response);
      return response.data;
    } catch (error) {
   //   console.log(error);
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Async action to fetch leads
export const fetchUserLeads = createAsyncThunk(
  "leads/fetchUserLeads",
  async (status, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get(`${baseUrl}getLeads-user`, {
        headers: {
          Authorization: token,
        },
        params: { status:status },
      });
   //   console.log(response);
      return { data: response.data, status }; // Return both data and status
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async action to fetch relevant leads
export const fetchRelevantLeads = createAsyncThunk(
  "leads/fetchRelevantLeads",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get(`${baseUrl}getRelevantLeads`, {
        headers: {
          Authorization: token,
        },
      });
   //   console.log(response);
      return response.data; // Assuming the API returns an array of leads
    } catch (error) {
   //   console.log(error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const leadSlice = createSlice({
  name: "lead",
  initialState: {
    pendingLeads: [],
    completedLeads: [],
    rejectedLeads: [],
    cancelledLeads: [],
    allLeads: [], // Store all leads when status is empty
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.successMessage = null;
      // Reset all leads to an empty array
      state.allLeads = [];
      state.pendingLeads = [];
      state.completedLeads = [];
      state.rejectedLeads = [];
      state.cancelledLeads = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLead.fulfilled, (state, action) => {
        state.loading = false;
        state.allLeads.push(action.payload); // Store newly created lead in allLeads
        state.successMessage = "Lead created successfully!";
      })
      .addCase(createLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create lead.";
      });

    // Handle fetching leads by status
    builder
      .addCase(fetchUserLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserLeads.fulfilled, (state, action) => {
        state.loading = false;
        const { status, data } = action.payload;

        if (status === "") {
          // Handle empty status to fetch all leads
          state.allLeads = data; // Store all leads when status is empty
        } else {
          switch (status) {
            case "approved":
              state.pendingLeads = data;
              break;
            case "completed":
              state.completedLeads = data;
              break;
            case "rejected":
              state.rejectedLeads = data;
              break;
            case "cancelled":
              state.cancelledLeads = data;
              break;
            default:
              break;
          }
        }
      })
      .addCase(fetchUserLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch leads.";
      });
    builder
      .addCase(fetchRelevantLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRelevantLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.allLeads = action.payload.leads; // Assuming leads are stored in `leads` field
      })
      .addCase(fetchRelevantLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch relevant leads.";
      });
  },
});

export const { resetState } = leadSlice.actions;
export default leadSlice.reducer;
