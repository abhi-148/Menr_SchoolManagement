const express = require("express");

const router = express.Router();

const {
  createFeeStructureComponent,
  getAllFeeStructureComponents,
  getComponentsByFeeStructure,
  updateFeeStructureComponent,
  deleteFeeStructureComponent
} = require("../controllers/feeStructureComponentController");

const authMiddleware = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

router.post(
  "/",
  authMiddleware,
  authorizeRoles("SUPER_ADMIN", "SCHOOL_ADMIN"),
  createFeeStructureComponent
);

router.get(
  "/",
  authMiddleware,
  getAllFeeStructureComponents
);

router.get(
  "/fee-structure/:feeStructureId",
  authMiddleware,
  getComponentsByFeeStructure
);

router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("SUPER_ADMIN", "SCHOOL_ADMIN"),
  updateFeeStructureComponent
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("SUPER_ADMIN"),
  deleteFeeStructureComponent
);

module.exports = router;