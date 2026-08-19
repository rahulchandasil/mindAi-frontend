import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
  loading: false,
  error: null,
};

const therapistNoteSlice = createSlice({
  name: "therapistNote",
  initialState,

  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },

    setNotes: (state, action) => {
      state.notes = action.payload;
      state.loading = false;
    },

    addNote: (state, action) => {
      state.notes.unshift(action.payload);
    },

    updateNoteState: (state, action) => {
      state.notes = state.notes.map((note) =>
        note._id === action.payload._id
          ? action.payload
          : note
      );
    },

    removeNote: (state, action) => {
      state.notes = state.notes.filter(
        (note) => note._id !== action.payload
      );
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setLoading,
  setNotes,
  addNote,
  updateNoteState,
  removeNote,
  setError,
} = therapistNoteSlice.actions;

export default therapistNoteSlice.reducer;