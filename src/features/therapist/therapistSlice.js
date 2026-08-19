import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alerts: [],
  loading: false,
  error: null,
};

const therapistSlice = createSlice({
  name: "therapist",
  initialState,

  reducers: {
    setAlerts: (state, action) => {
      state.alerts = action.payload;
      state.loading = false;
    },

    setLoading: (state) => {
      state.loading = true;
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setAlerts,
  setLoading,
  setError,
} = therapistSlice.actions;

export default therapistSlice.reducer;