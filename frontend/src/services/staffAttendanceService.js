import api from "./api";

export const getStaffAttendance = async () => {
  const response = await api.get(
    "/staff-attendance"
  );

  return response.data;
};

export const getAttendanceByStaff = async (
  staffId
) => {
  const response = await api.get(
    `/staff-attendance/staff/${staffId}`
  );

  return response.data;
};

export const getAttendanceById = async (
  id
) => {
  const response = await api.get(
    `/staff-attendance/${id}`
  );

  return response.data;
};

export const createStaffAttendance = async (
  data
) => {
  const response = await api.post(
    "/staff-attendance",
    data
  );

  return response.data;
};

export const updateStaffAttendance = async (
  id,
  data
) => {
  const response = await api.put(
    `/staff-attendance/${id}`,
    data
  );

  return response.data;
};

export const deleteStaffAttendance = async (
  id
) => {
  const response = await api.delete(
    `/staff-attendance/${id}`
  );

  return response.data;
};