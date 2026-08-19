import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stats: null,
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,

  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },

    setStats: (state, action) => {
      state.stats = action.payload;
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
  setStats,
  setError,
} = adminSlice.actions;

export default adminSlice.reducer;