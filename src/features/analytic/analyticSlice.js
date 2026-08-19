import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  analytics: null,
  loading: false,
  error: null,
};

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,

  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },

    setAnalytics: (state, action) => {
      state.analytics = action.payload;
      state.loading = false;
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setLoading,
  setAnalytics,
  setError,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;