const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {
  createBranch,
  getAllBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
} = require("../controllers/branchController");

// ==========================================
// Branch Master Routes
// ==========================================

// Create Branch
router.post("/", authMiddleware, createBranch);

// Get All Branches
router.get("/", authMiddleware, getAllBranches);

// Get Branch By Id
router.get("/:id", authMiddleware, getBranchById);

// Update Branch
router.put("/:id", authMiddleware, updateBranch);

// Delete Branch
router.delete("/:id", authMiddleware, deleteBranch);

module.exports = router;