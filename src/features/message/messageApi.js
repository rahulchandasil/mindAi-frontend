import api from "../../api/axios";

export const getMessages = async (
  conversationId
) => {
  const response = await api.get(
    `/messages/${conversationId}`
  );

  return response.data;
};

export const createMessage = async (
  conversationId,
  messageData
) => {
  const response = await api.post(
    `/messages/${conversationId}`,
    messageData
  );

  return response.data;
};