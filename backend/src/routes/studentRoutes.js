const express = require("express");

const router = express.Router();

const validate =
require("../middlewares/validationMiddleware");

const authMiddleware =
require("../middlewares/authMiddleware");

const {
  createStudentValidation
} = require("../validators/studentValidator");

const authorizeRoles =
  require("../middlewares/roleMiddleware");

const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  updateStudentProfile,
  updateStudentStatus,
  getStudentsWithPagination,
  searchStudents,
  loginStudent,
  getStudentProfile,
  changeStudentPassword,
  getStudentDashboard,
} = require("../controllers/studentController");

/* ===========================
   STUDENT SELF ROUTES
=========================== */

// Student Login
router.post(
  "/login",
  loginStudent
);

// Student Profile
router.get(
  "/profile",
  authMiddleware,
  getStudentProfile
);

// Student Dashboard
router.get(
  "/dashboard",
  authMiddleware,
  authorizeRoles(
    "STUDENT"
  ),
  getStudentDashboard
);

// Update Own Profile
router.put(
  "/profile",
  authMiddleware,
  updateStudentProfile
);

// Change Password
router.put(
  "/change-password",
  authMiddleware,
  changeStudentPassword
);

/* ===========================
   ADMIN ROUTES
=========================== */

// Create Student
router.post(
  "/",
  authMiddleware,
  createStudentValidation,
  validate,
  createStudent
);

// Get All Students
router.get(
  "/",
  authMiddleware,
  getAllStudents
);

// Pagination
router.get(
  "/pagination",
  authMiddleware,
  getStudentsWithPagination
);

// Search Students
router.get(
  "/search",
  authMiddleware,
  searchStudents
);

// Get Student By Id
router.get(
  "/:id",
  authMiddleware,
  getStudentById
);

// Update Student
router.put(
  "/:id",
  authMiddleware,
  createStudentValidation,
  validate,
  updateStudent
);

// Update Student Status
router.patch(
  "/:id/status",
  authMiddleware,
  updateStudentStatus
);

module.exports = router;