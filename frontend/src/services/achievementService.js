import api from "./api";

// Get All Achievements
export const getAchievements = () => {
  return api.get("/achievements");
};

// Get Achievement By ID
export const getAchievementById = (id) => {
  return api.get(`/achievements/${id}`);
};

// Create Achievement
export const createAchievement = (data) => {
  return api.post("/achievements", data);
};

// Update Achievement
export const updateAchievement = (id, data) => {
  return api.put(`/achievements/${id}`, data);
};

// Delete Achievement
export const deleteAchievement = (id) => {
  return api.delete(`/achievements/${id}`);
};

// Search Achievement
export const searchAchievement = (keyword) => {
  return api.get(`/achievements/search/${keyword}`);
};

// Get Achievement By School
export const getAchievementsBySchool = (schoolId) => {
  return api.get(`/achievements/school/${schoolId}`);
};

// Get Achievement By Category
export const getAchievementByCategory = (category) => {
  return api.get(`/achievements/category/${category}`);
};

// Get Achievement By Level
export const getAchievementByLevel = (level) => {
  return api.get(`/achievements/level/${level}`);
};

// Get Achievement By Student
export const getAchievementByStudent = (studentId) => {
  return api.get(`/achievements/student/${studentId}`);
};

// Get Achievement By Status
export const getAchievementByStatus = (status) => {
  return api.get(`/achievements/status/${status}`);
};