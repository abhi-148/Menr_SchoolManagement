import api from "./api";

export const getLeaveRequests = async () => {
  const response = await api.get(
    "/leave-requests"
  );

  return response.data;
};

export const getMyLeaveRequests = async () => {
  const response = await api.get(
    "/leave-requests/my"
  );

  return response.data;
};

export const getLeaveRequestById = async (id) => {
  const response = await api.get(
    `/leave-requests/${id}`
  );

  return response.data;
};

export const createLeaveRequest = async (data) => {
  const response = await api.post(
    "/leave-requests",
    data
  );

  return response.data;
};

export const updateLeaveRequest = async (
  id,
  data
) => {
  const response = await api.put(
    `/leave-requests/${id}`,
    data
  );

  return response.data;
};

export const reviewLeaveRequest = async (
  id,
  data
) => {
  const response = await api.put(
    `/leave-requests/${id}/review`,
    data
  );

  return response.data;
};

export const deleteLeaveRequest = async (id) => {
  const response = await api.delete(
    `/leave-requests/${id}`
  );

  return response.data;
};