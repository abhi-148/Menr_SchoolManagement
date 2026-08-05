import api from "./api";

// ==============================
// Get All Branches
// ==============================
export const getBranches = async () => {
  const response = await api.get("/branches");
  return response.data;
};

// ==============================
// Get Branch By Id
// ==============================
export const getBranchById = async (id) => {
  const response = await api.get(`/branches/${id}`);
  return response.data;
};

// ==============================
// Create Branch
// ==============================
export const createBranch = async (data) => {
  const response = await api.post("/branches", data);
  return response.data;
};

// ==============================
// Update Branch
// ==============================
export const updateBranch = async (id, data) => {
  const response = await api.put(`/branches/${id}`, data);
  return response.data;
};

// ==============================
// Delete Branch
// ==============================
export const deleteBranch = async (id) => {
  const response = await api.delete(`/branches/${id}`);
  return response.data;
};