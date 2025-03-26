import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../utils/const";

export const createConference = createAsyncThunk(
  "conference/createConference",
  async (conferenceData) => {
    const token = localStorage.getItem("userToken");

    const response = await axios.post(
      `${baseUrl}createConference`,
      conferenceData,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  }
);

// Async thunk to fetch user conferences
export const getUserConferences = createAsyncThunk(
  "conference/getUserConferences",
  async () => {
    const token = localStorage.getItem("userToken");

    const response = await axios.get(`${baseUrl}getConference`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data; // Return the list of conferences
  }
);

// Async thunk to fetch a conference by ID
export const fetchConferenceById = createAsyncThunk(
  "conference/fetchById",
  async (conferenceId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get(
        `${baseUrl}getSpecificeConferenceDetails`,
        {
          headers: {
            Authorization: token,
          },
          params: { conferenceId },
        }
      );
   //   console.log(response);
      return response.data.conference; // Return the conference data
    } catch (error) {
   //   console.log(error);
      return rejectWithValue(
        error.response.data || "Error fetching conference"
      );
    }
  }
);

// Async thunk to update a conference
export const updateConference = createAsyncThunk(
  "conference/updateConference",
  async ({ conferenceId, conferenceData }, { rejectWithValue }) => {
    const token = localStorage.getItem("userToken");

    try {
      const response = await axios.put(
        `${baseUrl}updateConferenceUser`,
        { conferenceId, ...conferenceData },
        {
          headers: {
            Authorization: token,
          },
        }
      );
   //   console.log(response)
      return response.data; // Return the updated conference data
    } catch (error) {
   //   console.log(error)
      return rejectWithValue(
        error.response.data || "Error updating conference"
      );
    }
  }
);

const conferenceSlice = createSlice({
  name: "conference",
  initialState: {
    conference: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createConference.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createConference.fulfilled, (state, action) => {
        state.loading = false;
        state.conference = action.payload.conference;
      })
      .addCase(createConference.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    // Handling getUserConferences actions
    builder
      .addCase(getUserConferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserConferences.fulfilled, (state, action) => {
        state.loading = false;
        state.conferences = action.payload; // Set the conferences in the state
      })
      .addCase(getUserConferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(fetchConferenceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConferenceById.fulfilled, (state, action) => {
        state.loading = false;
        state.conference = action.payload; // Set the fetched conference details
      })
      .addCase(fetchConferenceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch conference details";
      });
    // Handling updateConference actions
    builder
      .addCase(updateConference.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateConference.fulfilled, (state, action) => {
        state.loading = false;
        state.conference = action.payload.conference; // Set the updated conference
      })
      .addCase(updateConference.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error updating conference";
      });
  },
});

export default conferenceSlice.reducer;
