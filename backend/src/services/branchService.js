const {
  createBranch,
  getAllBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
} = require("../repositories/branchRepository");

// ======================================
// Create Branch
// ======================================
const createBranchService = async (data) => {
  // Required Validations
  if (!data.school_id) {
    throw new Error("School is required.");
  }

  if (!data.branch_code) {
    throw new Error("Branch Code is required.");
  }

  if (!data.branch_name) {
    throw new Error("Branch Name is required.");
  }

  if (!data.branch_type) {
    data.branch_type = "MAIN";
  }

  if (!data.status) {
    data.status = "ACTIVE";
  }

  return await createBranch(data);
};

// ======================================
// Get All
// ======================================
const getAllBranchesService = async () => {
  return await getAllBranches();
};

// ======================================
// Get By Id
// ======================================
const getBranchByIdService = async (id) => {
  const branch = await getBranchById(id);

  if (!branch) {
    throw new Error("Branch not found.");
  }

  return branch;
};

// ======================================
// Update
// ======================================
const updateBranchService = async (id, data) => {
  const branch = await getBranchById(id);

  if (!branch) {
    throw new Error("Branch not found.");
  }

  return await updateBranch(id, data);
};

// ======================================
// Delete
// ======================================
const deleteBranchService = async (id) => {
  const branch = await getBranchById(id);

  if (!branch) {
    throw new Error("Branch not found.");
  }

  return await deleteBranch(id);
};

module.exports = {
  createBranchService,
  getAllBranchesService,
  getBranchByIdService,
  updateBranchService,
  deleteBranchService,
};