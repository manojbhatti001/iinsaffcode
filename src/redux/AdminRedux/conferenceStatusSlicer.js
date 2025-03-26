import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../../utils/const';

export const fetchConferenceStatus = createAsyncThunk(
  'adminConferenceStatus/fetchConferenceStatus', // Adjusted action type for clarity
  async (conferenceId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}getConferenceStatusView`, {
        params: {conferenceId },
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      });
   //   console.log("Status",response)
      return response.data;
    } catch (error) {
   //   console.log(error)
      return rejectWithValue(error.response.data);
    }
  }
);

const conferenceStatusSlice = createSlice({
  name: 'adminConferenceStatus',
  initialState: {
    status: 'idle',
    conferenceStatus: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConferenceStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchConferenceStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.conferenceStatus = action.payload;
      })
      .addCase(fetchConferenceStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default conferenceStatusSlice.reducer;
