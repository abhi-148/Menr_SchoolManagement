const express =
  require("express");

const router =
  express.Router();


const {
  askAI
} = require(
  "../controllers/aiController"
);


const authMiddleware =
  require(
    "../middlewares/authMiddleware"
  );


const authorizeRoles =
  require(
    "../middlewares/roleMiddleware"
  );


router.post(
  "/chat",

  authMiddleware,

  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),

  askAI
);


module.exports =
  router;