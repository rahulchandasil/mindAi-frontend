import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  isInitializing: !!localStorage.getItem("token"),
  error: null,

  forgotPasswordLoading: false,
  forgotPasswordSuccess: false,
  forgotPasswordMessage: "",

  resetPasswordLoading: false,
  resetPasswordSuccess: false,
  resetPasswordMessage: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      localStorage.setItem("token", action.payload.token);
    },

    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    logout: (state) => {
      localStorage.removeItem("token");

      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },

    fetchUserStart: (state) => {
      state.isInitializing = true;
    },

    fetchUserSuccess: (state, action) => {
      state.isInitializing = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    fetchUserFailure: (state) => {
      state.isInitializing = false;
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },

    forgotPasswordStart: (state) => {
      state.forgotPasswordLoading = true;
      state.forgotPasswordSuccess = false;
      state.forgotPasswordMessage = "";
      state.error = null;
    },

    forgotPasswordSuccess: (state, action) => {
      state.forgotPasswordLoading = false;
      state.forgotPasswordSuccess = true;
      state.forgotPasswordMessage = action.payload.message;
    },

    forgotPasswordFailure: (state, action) => {
      state.forgotPasswordLoading = false;
      state.error = action.payload;
    },

    clearForgotPasswordState: (state) => {
      state.forgotPasswordLoading = false;
      state.forgotPasswordSuccess = false;
      state.forgotPasswordMessage = "";
      state.error = null;
    },
    resetPasswordStart: (state) => {
      state.resetPasswordLoading = true;
      state.error = null;
      state.resetPasswordSuccess = false;
    },

    resetPasswordSuccess: (state, action) => {
      state.resetPasswordLoading = false;
      state.resetPasswordSuccess = true;
      state.resetPasswordMessage = action.payload.message;
    },

    resetPasswordFailure: (state, action) => {
      state.resetPasswordLoading = false;
      state.error = action.payload;
    },

    clearResetPasswordState: (state) => {
      state.resetPasswordLoading = false;
      state.resetPasswordSuccess = false;
      state.resetPasswordMessage = "";
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  clearForgotPasswordState,
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
  clearResetPasswordState,
} = authSlice.actions;

export default authSlice.reducer;
