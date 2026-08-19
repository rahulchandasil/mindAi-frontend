import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,

  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },

    setNotifications: (state, action) => {
      state.loading = false;
      state.notifications = action.payload;
    },

    setUnreadCount: (state, action) => {
      state.unreadCount = action.payload.count;
    },

    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  setNotifications,
  setUnreadCount,
  setError,
} = notificationSlice.actions;

export default notificationSlice.reducer;