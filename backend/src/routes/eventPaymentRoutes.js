const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {
  createEventPayment,
  getAllEventPayments,
  getEventPaymentById,
  updateEventPayment,
  deleteEventPayment,
  getPaymentsByRegistration,
} = require("../controllers/eventPaymentController");

const {
  createEventPaymentValidation,
} = require("../validators/eventPaymentValidator");

// =======================================
// Event Payment CRUD
// =======================================

router.post(
  "/",
  authMiddleware,
  createEventPaymentValidation,
  createEventPayment
);

router.get(
  "/",
  authMiddleware,
  getAllEventPayments
);

router.get(
  "/:id",
  authMiddleware,
  getEventPaymentById
);

router.put(
  "/:id",
  authMiddleware,
  createEventPaymentValidation,
  updateEventPayment
);

router.delete(
  "/:id",
  authMiddleware,
  deleteEventPayment
);

router.get(
  "/registration/:registrationId",
  authMiddleware,
  getPaymentsByRegistration
);

module.exports = router;