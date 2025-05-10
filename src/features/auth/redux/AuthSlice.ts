import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface AuthState {
  email: string;
  isOtpVerified: boolean;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  email: "",
  isOtpVerified: false,
  isAuthenticated: false,
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
      }
    },
    logout(state) {
      state.email = "";
      state.isOtpVerified = false;
      state.isAuthenticated = false;
    },
  },
});

export const { setEmail, verifyOtp, authenticate, logout } = authSlice.actions

export const AuthReducer=authSlice.reducer