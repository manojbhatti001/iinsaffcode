import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/const";

export const fetchConferences = createAsyncThunk(
  "conferences/fetchConferences",
  async (_, { rejectWithValue }) => {
    try {
      // Get the adminToken from localStorage
      const token = localStorage.getItem("adminToken");

      // Make the API request with the token in headers
      const response = await axios.get(`${baseUrl}getAllConference`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token as a Bearer token
        },
      });

   //   console.log(response);
      return response.data;
    } catch (error) {
   //   console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchConferenceById = createAsyncThunk(
  "conference/getSpecificConferenceDetailsAdmin",
  async (conferenceId, { rejectWithValue }) => {
    try {
     //   console.log(conferenceId);
      const response = await axios.get(`${baseUrl}getConferenceById`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        params: { conferenceId: conferenceId },
      });
   //   console.log(conferenceId);


   //   console.log(response)
      return response.data.conference; // Return the lead data
    } catch (error) {
     //   console.log(error)
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to update a conference
export const updateConference = createAsyncThunk(
  "conferences/updateConference",
  async (conferenceData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await axios.put(
        `${baseUrl}conference/update`,
        conferenceData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
   //   console.log(response)

      return response.data.conference; // Assuming the response contains the updated conference
    } catch (error) {
     //   console.log(error)
      return rejectWithValue(
        error.response?.data || "Failed to update conference"
      );
    }
  }
);

const conferenceSlice = createSlice({
    name: "adminConferences",
    initialState: {
      conferenceData: null,
      freeConferenceData: null,
      loading: false,
      error: null,
      currentConference: null, // Add this line to hold the current conference data
    },
    reducers: {
      clearError: (state) => {
        state.error = null; // Action to clear the error
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchConferences.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchConferences.fulfilled, (state, action) => {
          state.loading = false;
          state.conferenceData = action.payload.conference;
          state.freeConferenceData = action.payload.freeConference;
        })
        .addCase(fetchConferences.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
  
      builder
        .addCase(fetchConferenceById.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchConferenceById.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.currentConference = action.payload; // Change from currentLead to currentConference
        })
        .addCase(fetchConferenceById.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        });
  
      builder
        .addCase(updateConference.pending, (state) => {
          state.loading = true; // Set loading state while updating
          state.error = null; // Clear any previous errors
        })
        .addCase(updateConference.fulfilled, (state, action) => {
          state.loading = false;
          // Find the index of the updated conference in the conferenceData array
          const index = state.conferenceData.findIndex(
            (conf) => conf._id === action.payload._id
          );
          if (index !== -1) {
            // Update the conference data with the new values
            state.conferenceData[index] = action.payload;
          }
        })
        .addCase(updateConference.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload; // Set error if update failed
        });
    },
  });

export const { clearError } = conferenceSlice.actions; // Export the clearError action
export default conferenceSlice.reducer;
