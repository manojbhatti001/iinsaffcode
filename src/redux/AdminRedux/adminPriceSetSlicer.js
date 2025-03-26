import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/const";

export const createOrUpdatePricing = createAsyncThunk(
  "pricing/createOrUpdatePricing",
  async (pricingData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
   //   console.log("admin token=>", token);

      const response = await axios.post(
        `${baseUrl}createPricing`,
        pricingData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the header
          },
        }
      );
   //   console.log(response);
      return response.data; // Assuming the response is the pricing object directly
    } catch (error) {
   //   console.log(error);
      // Improved error handling
      return rejectWithValue(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  }
);

const pricingSlice = createSlice({
  name: "pricing",
  initialState: {
    pricing: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrUpdatePricing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrUpdatePricing.fulfilled, (state, action) => {
        state.loading = false;
        // Access the pricing object correctly depending on your API response
        state.pricing = action.payload; // Use action.payload if the response is the pricing object directly
      })
      .addCase(createOrUpdatePricing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Use action.payload for the error message
      });
  },
});

export default pricingSlice.reducer;
