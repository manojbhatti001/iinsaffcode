// features/leadsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/const";

// Fetch leads from the API
export const fetchLeads = createAsyncThunk(
  "leads/fetchLeads",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await axios.get(`${baseUrl}getAllUserLeads`, {
        headers: {
          Authorization: `Bearer ${token}`, // Assuming token is stored in localStorage
        },
      });
   //   console.log(response);
      return response.data;
    } catch (error) {
     //   console.log(error)
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch a lead by ID
export const fetchLeadById = createAsyncThunk(
  "leads/getSpecificLeadDetailsAdmin",
  async (leadId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}getSpecificLeadDetailsAdmin`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        params: { leadId: leadId},
      });

   //   console.log(response)
      return response.data; // Return the lead data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update a lead
export const updateLead = createAsyncThunk(
  "leads/updateLead",
  async (leadData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseUrl}lead/update`, leadData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "application/json", // Specify the content type
        },
      });
   //   console.log(response)
      return response.data; // Return the updated lead data
    } catch (error) {
   //   console.log(error)
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const leadsSlice = createSlice({
  name: "adminLeads",
  initialState: {
    leads: [],
    currentLead: null, // State to hold the current lead details
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetching leads
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.leads = action.payload; // Save leads in state
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Fetching a single lead by ID
    builder
      .addCase(fetchLeadById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLeadById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentLead = action.payload; // Save the fetched lead
      })
      .addCase(fetchLeadById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Updating a lead
    builder
      .addCase(updateLead.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateLead.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.leads.findIndex((lead) => lead._id === action.payload._id);
        if (index !== -1) {
          state.leads[index] = action.payload; // Update the lead in the list
        }
        state.currentLead = action.payload; // Also update currentLead state
      })
      .addCase(updateLead.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default leadsSlice.reducer;
