import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  loading: false,
  error: null,
};

const messageSlice = createSlice({
  name: "message",
  initialState,

  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
      state.loading = false;
    },

    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },

    setLoading: (state) => {
      state.loading = true;
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const {
  setMessages,
  addMessage,
  setLoading,
  setError,
  clearMessages,
} = messageSlice.actions;

export default messageSlice.reducer;