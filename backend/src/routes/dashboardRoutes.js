const express = require("express");

const router = express.Router();

const {
  getDashboard
} = require("../controllers/dashboardController");

const verifyToken =
  require("../middlewares/authMiddleware");

const authorizeRoles =
  require("../middlewares/roleMiddleware");

router.get(
  "/",
  verifyToken,

  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN",
    "STAFF",
    "STUDENT"
  ),

  getDashboard
);

module.exports = router;