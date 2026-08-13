const express = require("express");

const router = express.Router();

const {
  login,
  signup,
  verifyEmail,
  resendVerificationOtp,
  changePassword,
  getProfile,
  updateProfile,
  forgotPassword,
  resetPassword
} = require("../controllers/authController");

const verifyToken =
  require("../middlewares/authMiddleware");


// =========================================================
// LOGIN
// POST /api/auth/login
// =========================================================

router.post(
  "/login",
  login
);


// =========================================================
// SIGNUP
// POST /api/auth/signup
// =========================================================

router.post(
  "/signup",
  signup
);


// =========================================================
// VERIFY EMAIL OTP
// POST /api/auth/verify-email
// =========================================================

router.post(
  "/verify-email",
  verifyEmail
);


// =========================================================
// RESEND VERIFICATION OTP
// POST /api/auth/resend-verification
// =========================================================

router.post(
  "/resend-verification",
  resendVerificationOtp
);


// =========================================================
// CHANGE PASSWORD
// POST /api/auth/change-password
// Protected
// =========================================================

router.post(
  "/change-password",
  verifyToken,
  changePassword
);


// =========================================================
// GET PROFILE
// GET /api/auth/profile
// Protected
// =========================================================

router.get(
  "/profile",
  verifyToken,
  getProfile
);


// =========================================================
// UPDATE PROFILE
// PUT /api/auth/profile
// Protected
// =========================================================

router.put(
  "/profile",
  verifyToken,
  updateProfile
);


// =========================================================
// FORGOT PASSWORD
// POST /api/auth/forgot-password
// =========================================================

router.post(
  "/forgot-password",
  forgotPassword
);


// =========================================================
// RESET PASSWORD
// POST /api/auth/reset-password
// =========================================================

router.post(
  "/reset-password",
  resetPassword
);


module.exports = router;