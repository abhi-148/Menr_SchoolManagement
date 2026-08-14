const express = require("express");

const router =
  express.Router();


const {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,
  getMyAnnouncements
} = require(
  "../controllers/announcementController"
);


const authMiddleware =
  require("../middlewares/authMiddleware");

const authorizeRoles =
  require("../middlewares/roleMiddleware");


// =========================================================
// MY ANNOUNCEMENTS
// =========================================================

router.get(
  "/my",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN",
    "STAFF",
    "STUDENT"
  ),
  getMyAnnouncements
);


// =========================================================
// CREATE
// =========================================================

router.post(
  "/",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  createAnnouncement
);


// =========================================================
// GET ALL
// =========================================================

router.get(
  "/",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  getAllAnnouncements
);


// =========================================================
// GET BY ID
// =========================================================

router.get(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  getAnnouncementById
);


// =========================================================
// UPDATE
// =========================================================

router.put(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  updateAnnouncement
);


// =========================================================
// DELETE
// =========================================================

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  deleteAnnouncement
);


module.exports = router;