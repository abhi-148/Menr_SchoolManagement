const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {

  createEventRegistration,

  getAllEventRegistrations,

  getEventRegistrationById,

  updateEventRegistration,

  deleteEventRegistration,

  getRegistrationsByEvent,

} = require("../controllers/eventRegistrationController");

// =======================================
// Event Registration Routes
// =======================================

// Create Registration
router.post(
  "/",
  authMiddleware,
  createEventRegistration
);

// Get All Registrations
router.get(
  "/",
  authMiddleware,
  getAllEventRegistrations
);

// Get Registration By Id
router.get(
  "/:id",
  authMiddleware,
  getEventRegistrationById
);

// Update Registration
router.put(
  "/:id",
  authMiddleware,
  updateEventRegistration
);

// Delete Registration
router.delete(
  "/:id",
  authMiddleware,
  deleteEventRegistration
);

// Get Registrations By Event
router.get(
  "/event/:eventId",
  authMiddleware,
  getRegistrationsByEvent
);

module.exports = router;