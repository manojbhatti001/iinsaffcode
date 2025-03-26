import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/const";

export const fetchLeadStatus = createAsyncThunk(
  "adminLeadStatus/fetchLeadStatus", // Adjusted action type for clarity
  async (leadId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}getLeadStatusView`, {
        params: { leadId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
   //   console.log("Status", response);
      return response.data;
    } catch (error) {
   //   console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateLeadStatus = createAsyncThunk(
  "adminLeadStatus/updateLeadStatus",
  async ({ statusId, updateData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${baseUrl}updateLeadStatusView`,
        { updateData },
        {
          params: {
            statusId: statusId, // Use statusId here
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
   //   console.log(response);
      return response.data;
    } catch (error) {
   //   console.log(error);
      return rejectWithValue(
        error.response && error.response.data
          ? error.response.data
          : error.message
      );
    }
  }
);


const leadStatusSlice = createSlice({
  name: "adminLeadStatus",
  initialState: {
    status: "idle",
    LeadStatus: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeadStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLeadStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.LeadStatus = action.payload;
      })
      .addCase(fetchLeadStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(updateLeadStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateLeadStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Update the LeadStatus array with the updated item
        state.LeadStatus = state.LeadStatus.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })
      .addCase(updateLeadStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default leadStatusSlice.reducer;
