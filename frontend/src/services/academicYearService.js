import api from "./api";

// ==========================================
// Get All Academic Years
// ==========================================
export const getAcademicYears = async () => {
  const response = await api.get("/academic-years");
  return response.data;
};

// ==========================================
// Get Academic Year By ID
// ==========================================
export const getAcademicYearById = async (id) => {
  const response = await api.get(
    `/academic-years/${id}`
  );

  return response.data;
};

// ==========================================
// Create Academic Year
// ==========================================
export const createAcademicYear = async (data) => {
  const response = await api.post(
    "/academic-years",
    data
  );

  return response.data;
};

// ==========================================
// Update Academic Year
// ==========================================
export const updateAcademicYear = async (
  id,
  data
) => {
  const response = await api.put(
    `/academic-years/${id}`,
    data
  );

  return response.data;
};

// ==========================================
// Delete Academic Year
// ==========================================
export const deleteAcademicYear = async (id) => {
  const response = await api.delete(
    `/academic-years/${id}`
  );

  return response.data;
};

// ==============================
// Search Academic Years
// ==============================
export const searchAcademicYears = async (keyword) => {
  const response = await api.get(
    `/academic-years/search?keyword=${encodeURIComponent(keyword)}`
  );

  return response.data;
};