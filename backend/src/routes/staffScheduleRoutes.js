const express = require("express");

const router = express.Router();

const {
  createStaffSchedule,
  getAllStaffSchedules,
  getStaffScheduleById,
  getStaffSchedulesByStaff,
  updateStaffSchedule,
  deleteStaffSchedule
} = require("../controllers/staffScheduleController");

const authMiddleware =
  require("../middlewares/authMiddleware");

const authorizeRoles =
  require("../middlewares/roleMiddleware");

// =========================================================
// GET ALL STAFF SCHEDULES
// =========================================================

router.get(
  "/",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  getAllStaffSchedules
);


// =========================================================
// GET SCHEDULE BY STAFF
// IMPORTANT: Keep this before /:id
// =========================================================

router.get(
  "/staff/:staffId",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  getStaffSchedulesByStaff
);


// =========================================================
// GET SINGLE SCHEDULE
// =========================================================

router.get(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  getStaffScheduleById
);


// =========================================================
// CREATE STAFF SCHEDULE
// =========================================================

router.post(
  "/",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  createStaffSchedule
);


// =========================================================
// UPDATE STAFF SCHEDULE
// =========================================================

router.put(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  updateStaffSchedule
);


// =========================================================
// DELETE STAFF SCHEDULE
// =========================================================

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN"
  ),
  deleteStaffSchedule
);


module.exports = router;