import api from "../../api/axios";

export const createConversation = async () => {
  const response = await api.post("/conversations");

  return response.data;
};

export const getConversations = async () => {
  const response = await api.get("/conversations");

  return response.data;
};

export const getConversationById = async (id) => {
  const response = await api.get(
    `/conversations/${id}`
  );

  return response.data;
};

export const deleteConversation = async (id) => {
  const response = await api.delete(
    `/conversations/${id}`
  );

  return response.data;
};