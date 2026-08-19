import api from "../../api/axios";

export const getNotes = async (conversationId) => {
  const response = await api.get(
    `/therapist-notes/${conversationId}`
  );

  return response.data;
};

export const createNote = async (
  conversationId,
  note
) => {
  const response = await api.post(
    `/therapist-notes/${conversationId}`,
    { note }
  );

  return response.data;
};

export const updateNote = async (
  noteId,
  note
) => {
  const response = await api.put(
    `/therapist-notes/${noteId}`,
    { note }
  );

  return response.data;
};

export const deleteNote = async (noteId) => {
  const response = await api.delete(
    `/therapist-notes/${noteId}`
  );

  return response.data;
};