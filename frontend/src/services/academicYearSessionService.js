import api from "./api";

// ==========================================
// Get All Academic Year Sessions
// ==========================================
export const getAcademicYearSessions = async (
  academicYearId = null
) => {
  const url = academicYearId
    ? `/academic-year-sessions?academic_year_id=${academicYearId}`
    : "/academic-year-sessions";

  const response = await api.get(url);

  return response.data;
};

// ==========================================
// Get Session By ID
// ==========================================
export const getAcademicYearSessionById = async (
  id
) => {
  const response = await api.get(
    `/academic-year-sessions/${id}`
  );

  return response.data;
};

// ==========================================
// Create Session
// ==========================================
export const createAcademicYearSession = async (
  data
) => {
  const response = await api.post(
    "/academic-year-sessions",
    data
  );

  return response.data;
};

// ==========================================
// Update Session
// ==========================================
export const updateAcademicYearSession = async (
  id,
  data
) => {
  const response = await api.put(
    `/academic-year-sessions/${id}`,
    data
  );

  return response.data;
};

// ==========================================
// Delete Session
// ==========================================
export const deleteAcademicYearSession = async (
  id
) => {
  const response = await api.delete(
    `/academic-year-sessions/${id}`
  );

  return response.data;
};

// ==========================================
// Get Current Session
// ==========================================
export const getCurrentAcademicYearSession = async (
 academicYearId
) => {
  const response = await api.get(
    `/academic-year-sessions/current/${academicYearId}`
  );

  return response.data;
};