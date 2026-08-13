const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middlewares/authMiddleware");

const authorizeRoles =
  require("../middlewares/roleMiddleware");

const {
  createAcademicYearSession,
  getAllAcademicYearSessions,
  getCurrentAcademicYearSession,
  getAcademicYearSessionById,
  updateAcademicYearSession,
  deleteAcademicYearSession,
} = require(
  "../controllers/academicYearSessionController"
);

// ==========================================
// Create Session
// ==========================================
router.post(
  "/",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  createAcademicYearSession
);

// ==========================================
// Get All Sessions
// Optional:
// /api/academic-year-sessions?academic_year_id=1
// ==========================================
router.get(
  "/",
  authMiddleware,
  getAllAcademicYearSessions
);

// ==========================================
// Get Current Session
// IMPORTANT: Keep before /:id
// ==========================================
router.get(
  "/current",
  authMiddleware,
  getCurrentAcademicYearSession
);

// ==========================================
// Get Session By ID
// ==========================================
router.get(
  "/:id",
  authMiddleware,
  getAcademicYearSessionById
);

// ==========================================
// Update Session
// ==========================================
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  updateAcademicYearSession
);

// ==========================================
// Delete Session
// ==========================================
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN"
  ),
  deleteAcademicYearSession
);

module.exports = router;