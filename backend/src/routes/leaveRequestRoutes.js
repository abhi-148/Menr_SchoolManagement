const express = require("express");

const router = express.Router();

const {
  createLeaveRequest,
  getAllLeaveRequests,
  getMyLeaveRequests,
  getLeaveRequestById,
  updateLeaveRequest,
  reviewLeaveRequest,
  deleteLeaveRequest
} = require("../controllers/leaveRequestController");

const authMiddleware =
  require("../middlewares/authMiddleware");

const authorizeRoles =
  require("../middlewares/roleMiddleware");


// =========================================================
// CREATE LEAVE REQUEST
// Staff apni leave request create karega
// =========================================================

router.post(
  "/",
  authMiddleware,
  authorizeRoles(
    "STAFF"
  ),
  createLeaveRequest
);


// =========================================================
// GET MY LEAVE REQUESTS
// Logged-in staff ki apni requests
// =========================================================

router.get(
  "/my",
  authMiddleware,
  authorizeRoles(
    "STAFF"
  ),
  getMyLeaveRequests
);


// =========================================================
// GET ALL LEAVE REQUESTS
// Admin sabhi leave requests dekh sakta hai
// =========================================================

router.get(
  "/",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  getAllLeaveRequests
);


// =========================================================
// GET SINGLE LEAVE REQUEST
// =========================================================

router.get(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN",
    "STAFF"
  ),
  getLeaveRequestById
);


// =========================================================
// UPDATE LEAVE REQUEST
// Staff apni pending request update karega
// =========================================================

router.put(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "STAFF"
  ),
  updateLeaveRequest
);


// =========================================================
// REVIEW LEAVE REQUEST
// Admin approve/reject karega
// =========================================================

router.put(
  "/:id/review",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  reviewLeaveRequest
);


// =========================================================
// DELETE LEAVE REQUEST
// Staff pending request delete karega
// =========================================================

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "STAFF"
  ),
  deleteLeaveRequest
);


module.exports = router;