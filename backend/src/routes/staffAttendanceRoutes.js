const express = require("express");

const router = express.Router();

const {
  createAttendance,
  getAllAttendance,
  getAttendanceByStaff,
  getAttendanceById,
  updateAttendance,
  deleteAttendance
} = require("../controllers/staffAttendanceController");

const authMiddleware =
  require("../middlewares/authMiddleware");

const authorizeRoles =
  require("../middlewares/roleMiddleware");


// =========================================================
// STAFF ATTENDANCE
// =========================================================


// =========================================================
// CREATE ATTENDANCE
// SUPER_ADMIN / SCHOOL_ADMIN
// =========================================================

router.post(
  "/",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  createAttendance
);


// =========================================================
// GET ALL ATTENDANCE
// SUPER_ADMIN / SCHOOL_ADMIN
// =========================================================

router.get(
  "/",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  getAllAttendance
);


// =========================================================
// GET ATTENDANCE BY STAFF
//
// SUPER_ADMIN
// SCHOOL_ADMIN → own school
// STAFF → own attendance only
// =========================================================

router.get(
  "/staff/:staffId",
  authMiddleware,
  getAttendanceByStaff
);


// =========================================================
// GET ATTENDANCE BY ID
//
// SUPER_ADMIN
// SCHOOL_ADMIN → own school
// STAFF → own attendance only
// =========================================================

router.get(
  "/:id",
  authMiddleware,
  getAttendanceById
);


// =========================================================
// UPDATE ATTENDANCE
// SUPER_ADMIN / SCHOOL_ADMIN
// =========================================================

router.put(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  updateAttendance
);


// =========================================================
// DELETE ATTENDANCE
// SUPER_ADMIN / SCHOOL_ADMIN
// =========================================================

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  deleteAttendance
);


module.exports = router;