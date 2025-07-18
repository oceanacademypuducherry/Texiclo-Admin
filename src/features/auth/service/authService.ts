import { createAsyncThunk } from "@reduxjs/toolkit";
import { AdminAPI } from "../../../services";

export const SEND_LOGIN_OTP = createAsyncThunk(
  "auth/sendOtp",
  async (email: string, thunkAPI) => {
    try {
      const response = await AdminAPI.post("/auth/", { email });
      return {
        message: response.data.message,
        email,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Failed to send OTP" },
      );
    }
  },
);

export const VERIFY_LOGIN_OTP = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }: { email: string; otp: string }, thunkAPI) => {
    try {
      const response = await AdminAPI.post("/auth/verify-otp/", {
        email,
        otp,
      });
      return {
        message: response.data.message,
        token: response.data.token,
        email,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Invalid OTP" },
      );
    }
  },
);
