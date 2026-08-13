const express = require("express");
const router = express.Router();


const authMiddleware = require("../middlewares/authMiddleware");
const uploadEventImage = require("../middlewares/uploadEventImage");

const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

// =======================================
// Event Master Routes
// =======================================

// Create Event
router.post(
  "/",
  authMiddleware,
  uploadEventImage.single("cover_image"),
  createEvent
);

// Get All Events
router.get(
  "/",
  authMiddleware,
  getAllEvents
);

// Get Single Event
router.get(
  "/:id",
  authMiddleware,
  getEventById
);

// Update Event
router.put(
  "/:id",
  authMiddleware,
  uploadEventImage.single("cover_image"),
  updateEvent
);

// Delete Event
router.delete(
  "/:id",
  authMiddleware,
  deleteEvent
);

module.exports = router;