import api from "../../api/axios";

export const getDashboardStats = async () => {
  const response = await api.get(
    "/admin/stats"
  );

  return response.data;
};
export const getUsers = async () => {
  const response = await api.get(
    "/admin/users"
  );

  return response.data;
};

export const updateRole = async (
  userId,
  role
) => {
  const response = await api.put(
    `/admin/users/${userId}/role`,
    { role }
  );

  return response.data;
};