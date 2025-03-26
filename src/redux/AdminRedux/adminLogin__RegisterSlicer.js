import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/const";

// Register Superadmin
export const registerSuperAdmin = createAsyncThunk(
  "admin/registerSuperAdmin",
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}adminRegister`, adminData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); // Safer error handling
    }
  }
);

// Create Admin
export const createAdmin = createAsyncThunk(
  "admin/createAdmin",
  async (adminData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.post(`${baseUrl}create-admin`, adminData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
   //   console.log(response);
      // window.alert("Admin Created Successfully .");
      return response.data;
    } catch (error) {
   //   console.log(error);
      // Display an alert with error message if available
      const errorMsg = error.response?.data?.msg || "Failed to create admin.";
      window.alert(errorMsg);
      return rejectWithValue(errorMsg); // Ensure we pass a specific error message
    }
  }
);

// Admin Login
export const loginAdmin = createAsyncThunk(
  "admin/loginAdmin",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}adminLogin`, loginData);
   //   console.log(response);
      localStorage.setItem("adminToken", response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); // Safer error handling
    }
  }
);

// Action to request OTP for password reset
export const requestOtp = createAsyncThunk(
  "admin/requestOtp",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}adminRequest-otp`, {
        email,
      });
   //   console.log(response);
      return response.data;
    } catch (error) {
   //   console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Action to verify OTP and reset password
export const resetPassword = createAsyncThunk(
  "admin/resetPassword",
  async ({ email, otp, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseUrl}adminForget-password`, {
        email,
        otp,
        newPassword,
      });
   //   console.log(response);
      return response.data;
    } catch (err) {
   //   console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

// Thunk for Verifying OTP
export const verifyOtp = createAsyncThunk(
  "admin/verifyOtp",
  async (otpData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}adminVerify-otp`, otpData);
   //   console.log(response);
      return response.data;
    } catch (err) {
   //   console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admin: null,
    admins: [],
    status: "idle",
    error: null,
    isVerified: false,  // Initialize isVerified
  },
  reducers: {},
  extraReducers: (builder) => {
    // Register Superadmin
    builder
      .addCase(registerSuperAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerSuperAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          state.admin = action.payload;
        }
      })
      .addCase(registerSuperAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });

    // Create Admin
    builder
      .addCase(createAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          state.admins.push(action.payload); // Add the new admin to the admins list
        }
      })
      .addCase(createAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });

    // Admin Login
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload?.token) {
          state.admin = action.payload;
        }
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });

    // Request OTP cases
    builder
      .addCase(requestOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isOtpSent = false;
      })
      .addCase(requestOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.msg;
        state.isOtpSent = true;
      })
      .addCase(requestOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isOtpSent = false;
      });
    // Reset Password cases
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.msg;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      // Verify OTP
      .addCase(verifyOtp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.status = "succeeded";
        state.isVerified = true; // Set isVerified to true on success
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
        state.isVerified = false; // Ensure isVerified is reset on failure
      });
  },
});

export default adminSlice.reducer;
