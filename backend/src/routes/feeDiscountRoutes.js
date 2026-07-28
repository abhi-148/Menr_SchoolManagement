const express = require("express");

const router = express.Router();

const verifyToken = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/checkRole");

const {
  createFeeDiscount,
  getAllFeeDiscounts,
  getFeeDiscountById,
  updateFeeDiscount,
  deleteFeeDiscount,
} = require("../controllers/feeDiscountController");

// ================= CREATE =================

router.post(
  "/",
  verifyToken,
  checkRole("SUPER_ADMIN", "SCHOOL_ADMIN"),
  createFeeDiscount
);

// ================= GET ALL =================

router.get(
  "/",
  verifyToken,
  getAllFeeDiscounts
);

// ================= GET BY ID =================

router.get(
  "/:id",
  verifyToken,
  getFeeDiscountById
);

// ================= UPDATE =================

router.put(
  "/:id",
  verifyToken,
  checkRole("SUPER_ADMIN", "SCHOOL_ADMIN"),
  updateFeeDiscount
);

// ================= DELETE =================

router.delete(
  "/:id",
  verifyToken,
  checkRole("SUPER_ADMIN", "SCHOOL_ADMIN"),
  deleteFeeDiscount
);

module.exports = router;