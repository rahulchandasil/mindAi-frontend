import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversations: [],
  activeConversation: null,
  loading: false,
  error: null,
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,

  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },

    setConversations: (state, action) => {
      state.loading = false;
      state.conversations = action.payload;
    },

    setActiveConversation: (
      state,
      action
    ) => {
      state.activeConversation =
        action.payload;
    },

    addConversation: (state, action) => {
      state.conversations.unshift(
        action.payload
      );
    },

    removeConversation: (
      state,
      action
    ) => {
      state.conversations =
        state.conversations.filter(
          (conv) =>
            conv._id !== action.payload
        );
    },

    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  setConversations,
  setActiveConversation,
  addConversation,
  removeConversation,
  setError,
} = conversationSlice.actions;

export default conversationSlice.reducer;