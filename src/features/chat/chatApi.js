import api from "../../api/axios";

export const chatWithAI = async (
  conversationId,
  content
) => {
  const response = await api.post(
    `/chat/${conversationId}`,
    {
      content,
    }
  );

  return response.data;
};