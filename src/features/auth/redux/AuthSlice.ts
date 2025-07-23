import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SEND_LOGIN_OTP, VERIFY_LOGIN_OTP } from "../service";
import Cookies from "js-cookie";

interface AuthState {
  email: string;
  token?: string;
  isOtpVerified: boolean;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  email: "",
  token: Cookies.get("token") || undefined,
  isOtpVerified: false,
  isAuthenticated: Cookies.get("token") ? true : false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      Cookies.remove("token");
      state.email = "";
      state.token = undefined;
      state.isOtpVerified = false;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    setTokenFromCookie(state, action: PayloadAction<{ token: string }>) {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isOtpVerified = true;
    },
  },
  extraReducers: (builder) => {
    builder

      // Send OTP
      .addCase(SEND_LOGIN_OTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SEND_LOGIN_OTP.fulfilled, (state, action) => {
        state.loading = false;
        state.email = action.payload.email;
      })
      .addCase(SEND_LOGIN_OTP.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as any)?.message || "Failed to send OTP";
      })

      // Verify OTP
      .addCase(VERIFY_LOGIN_OTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(VERIFY_LOGIN_OTP.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.isOtpVerified = true;
        state.isAuthenticated = true;
        Cookies.set("token", action.payload.token, { expires: 1 });
      })
      .addCase(VERIFY_LOGIN_OTP.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as any)?.message || "OTP verification failed";
      });
  },
});

export const { logout, setTokenFromCookie } = authSlice.actions;
export const AuthReducer = authSlice.reducer;
