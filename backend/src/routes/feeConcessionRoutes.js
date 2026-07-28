const express = require("express");

const router = express.Router();

const verifyToken = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/checkRole");

const {
  createFeeConcession,
  getAllFeeConcessions,
  getFeeConcessionById,
  updateFeeConcession,
  deleteFeeConcession,
} = require("../controllers/feeConcessionController");

// ================= CREATE =================

router.post(
  "/",
  verifyToken,
  checkRole("SUPER_ADMIN", "SCHOOL_ADMIN"),
  createFeeConcession
);

// ================= GET ALL =================

router.get(
  "/",
  verifyToken,
  getAllFeeConcessions
);

// ================= GET BY ID =================

router.get(
  "/:id",
  verifyToken,
  getFeeConcessionById
);

// ================= UPDATE =================

router.put(
  "/:id",
  verifyToken,
  checkRole("SUPER_ADMIN", "SCHOOL_ADMIN"),
  updateFeeConcession
);

// ================= DELETE =================

router.delete(
  "/:id",
  verifyToken,
  checkRole("SUPER_ADMIN", "SCHOOL_ADMIN"),
  deleteFeeConcession
);

module.exports = router;