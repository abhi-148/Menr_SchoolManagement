const {
  createBranchService,
  getAllBranchesService,
  getBranchByIdService,
  updateBranchService,
  deleteBranchService,
} = require("../services/branchService");

// ======================================
// Create Branch
// ======================================
const createBranch = async (req, res) => {
  try {
    let schoolId;

    // Super Admin
    if (req.user.role === "SUPER_ADMIN") {
      schoolId = req.body.school_id;

      if (!schoolId) {
        return res.status(400).json({
          success: false,
          message: "School is required.",
        });
      }
    }

    // School Admin
    else {
      schoolId =
        req.user.schoolId ||
        req.user.school_id;

      if (!schoolId) {
        return res.status(400).json({
          success: false,
          message: "School not found in token.",
        });
      }
    }

    const result =
      await createBranchService({
        ...req.body,
        school_id: schoolId,
        created_by: req.user.id,
      });

    return res.status(201).json({
      success: true,
      message: "Branch created successfully.",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get All Branches
// ======================================
const getAllBranches = async (req, res) => {
  try {
    const data =
      await getAllBranchesService();

    return res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get Branch By Id
// ======================================
const getBranchById = async (req, res) => {
  try {
    const data =
      await getBranchByIdService(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Update Branch
// ======================================
const updateBranch = async (req, res) => {
  try {
    await updateBranchService(
      req.params.id,
      {
        ...req.body,
        updated_by: req.user.id,
      }
    );

    return res.status(200).json({
      success: true,
      message:
        "Branch updated successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Delete Branch
// ======================================
const deleteBranch = async (req, res) => {
  try {
    await deleteBranchService(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Branch deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBranch,
  getAllBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
};