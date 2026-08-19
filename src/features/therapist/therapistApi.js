import api from "../../api/axios";

export const getAlerts = async (status = "") => {
  const url = status
    ? `/alerts?status=${status}`
    : "/alerts";

  const response = await api.get(url);

  return response.data;
};

export const updateAlertStatus = async (
  alertId,
  status
) => {
  const response = await api.put(
    `/alerts/${alertId}`,
    { status }
  );

  return response.data;
};
export const getConversationReview =
  async (conversationId) => {

    const response = await api.get(
      `/messages/review/${conversationId}`
    );

    return response.data;
};
export const getTherapists = async () => {
  const response = await api.get("/auth/therapists");
  const therapists = response.data?.data ?? response.data;
  return Array.isArray(therapists) ? therapists : [];
};
export const assignTherapist = async (
  alertId,
  therapistId
) => {
  const response = await api.put(
    `/alerts/${alertId}/assign`,
    {
      therapistId,
    }
  );

  return response.data;
};