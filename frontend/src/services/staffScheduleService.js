import api from "./api";

export const getStaffSchedules = async () => {
  const response = await api.get("/staff-schedules");
  return response.data;
};

export const getStaffScheduleById = async (id) => {
  const response = await api.get(`/staff-schedules/${id}`);
  return response.data;
};

export const getStaffSchedulesByStaff = async (staffId) => {
  const response = await api.get(`/staff-schedules/staff/${staffId}`);
  return response.data;
};

export const createStaffSchedule = async (data) => {
  const response = await api.post(
    "/staff-schedules",
    data
  );

  return response.data;
};

export const updateStaffSchedule = async (
  id,
  data
) => {
  const response = await api.put(
    `/staff-schedules/${id}`,
    data
  );

  return response.data;
};

export const deleteStaffSchedule = async (id) => {
  const response = await api.delete(
    `/staff-schedules/${id}`
  );

  return response.data;
};