const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/checkRole");

const {
  createFeeInstallment,
  getAllFeeInstallments,
  getInstallmentsByFeeStructure,
  updateFeeInstallment,
  deleteFeeInstallment
} = require("../controllers/feeInstallmentController");

router.post(
  "/",
  verifyToken,
  checkRole("SUPER_ADMIN", "SCHOOL_ADMIN"),
  createFeeInstallment
);

router.get(
  "/",
  verifyToken,
  checkRole("SUPER_ADMIN", "SCHOOL_ADMIN"),
  getAllFeeInstallments
);

router.get(
  "/fee-structure/:feeStructureId",
  verifyToken,
  checkRole("SUPER_ADMIN", "SCHOOL_ADMIN"),
  getInstallmentsByFeeStructure
);

router.put(
  "/:id",
  verifyToken,
  checkRole("SUPER_ADMIN", "SCHOOL_ADMIN"),
  updateFeeInstallment
);

router.delete(
  "/:id",
  verifyToken,
  checkRole("SUPER_ADMIN", "SCHOOL_ADMIN"),
  deleteFeeInstallment
);

module.exports = router;