import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  email: string;
  isOtpVerified: boolean;
  isAuthenticated: boolean;
  token: string | undefined;
}

const initialState: AuthState = {
  email: "",
  token: undefined,
  isOtpVerified: false,
  isAuthenticated: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    verifyOtp(state) {
      state.isOtpVerified = true;
    },
    authenticate(state) {
      if (state.isOtpVerified && state.email) {
        state.isAuthenticated = true;
        state.token = "sa6f575sdsg5q7ew5t";
      }
    },
    logout(state) {
      state.email = "";
      state.isOtpVerified = false;
      state.isAuthenticated = false;
    },
  },
});

export const { setEmail, verifyOtp, authenticate, logout } = authSlice.actions;

export const AuthReducer = authSlice.reducer;
