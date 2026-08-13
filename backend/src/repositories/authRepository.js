const pool = require("../config/db");


// =========================================================
// SUPER ADMIN
// =========================================================

const findSuperAdminByEmail = async (email) => {

  const [rows] = await pool.query(
    "SELECT * FROM super_admin WHERE email = ?",
    [email]
  );

  return rows[0];
};


const createSuperAdmin = async (data) => {

  const [result] = await pool.query(
    `INSERT INTO super_admin
      (
        full_name,
        email,
        password,
        status,
        is_verified
      )
      VALUES (?, ?, ?, ?, ?)`,
    [
      data.full_name,
      data.email,
      data.password,
      data.status,
      data.is_verified
    ]
  );

  return result;
};


const loginSuperAdmin = async (email) => {

  const [rows] = await pool.query(
    "SELECT * FROM super_admin WHERE email = ?",
    [email]
  );

  return rows[0];
};


const findSuperAdminById = async (id) => {

  const [rows] = await pool.query(
    "SELECT * FROM super_admin WHERE id = ?",
    [id]
  );

  return rows[0];
};


const updateSuperAdminPassword = async (
  id,
  password
) => {

  const [result] = await pool.query(
    `UPDATE super_admin
     SET password = ?
     WHERE id = ?`,
    [
      password,
      id
    ]
  );

  return result;
};


const updateSuperAdminProfile = async (
  id,
  full_name,
  email
) => {

  const [result] = await pool.query(
    `UPDATE super_admin
     SET full_name = ?,
         email = ?
     WHERE id = ?`,
    [
      full_name,
      email,
      id
    ]
  );

  return result;
};


// =========================================================
// EMAIL VERIFICATION
// =========================================================

// Mark Super Admin email as verified

const verifySuperAdminEmail = async (userId) => {

  const [result] = await pool.query(
    `UPDATE super_admin
     SET is_verified = 1,
         verification_otp = NULL,
         otp_expires_at = NULL
     WHERE id = ?`,
    [userId]
  );

  return result;
};


// Save OTP directly in super_admin table

const saveSuperAdminVerificationOtp = async (
  userId,
  otp,
  expiresAt
) => {

  const [result] = await pool.query(
    `UPDATE super_admin
     SET verification_otp = ?,
         otp_expires_at = ?
     WHERE id = ?`,
    [
      otp,
      expiresAt,
      userId
    ]
  );

  return result;
};


// Get user for OTP verification

const findSuperAdminByIdForVerification = async (
  userId
) => {

  const [rows] = await pool.query(
    `SELECT
      id,
      full_name,
      email,
      is_verified,
      verification_otp,
      otp_expires_at
     FROM super_admin
     WHERE id = ?`,
    [userId]
  );

  return rows[0];
};


// =========================================================
// EMAIL VERIFICATION TOKEN TABLE
// =========================================================

// Save OTP in email_verification_tokens table

const createEmailVerificationToken = async (
  userId,
  email,
  otpHash,
  expiresAt
) => {

  // Remove old OTPs for this user first

  await pool.query(
    `DELETE FROM email_verification_tokens
     WHERE user_id = ?`,
    [userId]
  );


  const [result] = await pool.query(
    `INSERT INTO email_verification_tokens
      (
        user_id,
        email,
        otp_hash,
        expires_at,
        attempts
      )
      VALUES (?, ?, ?, ?, 0)`,
    [
      userId,
      email,
      otpHash,
      expiresAt
    ]
  );

  return result;
};


// Find OTP record

const findEmailVerificationToken = async (
  userId,
  email
) => {

  const [rows] = await pool.query(
    `SELECT *
     FROM email_verification_tokens
     WHERE user_id = ?
       AND email = ?
     ORDER BY id DESC
     LIMIT 1`,
    [
      userId,
      email
    ]
  );

  return rows[0];
};


// Update OTP attempts

const incrementVerificationAttempts = async (
  tokenId
) => {

  const [result] = await pool.query(
    `UPDATE email_verification_tokens
     SET attempts = attempts + 1
     WHERE id = ?`,
    [tokenId]
  );

  return result;
};


// Delete OTP after successful verification

const deleteEmailVerificationToken = async (
  tokenId
) => {

  const [result] = await pool.query(
    `DELETE FROM email_verification_tokens
     WHERE id = ?`,
    [tokenId]
  );

  return result;
};


// =========================================================
// PASSWORD RESET
// =========================================================

const saveResetToken = async (
  email,
  token,
  expiresAt
) => {

  const [result] = await pool.query(
    `INSERT INTO password_reset_tokens
      (
        email,
        token,
        expires_at
      )
      VALUES (?, ?, ?)`,
    [
      email,
      token,
      expiresAt
    ]
  );

  return result;
};


const findResetToken = async (token) => {

  const [rows] = await pool.query(
    `SELECT *
     FROM password_reset_tokens
     WHERE token = ?`,
    [token]
  );

  return rows[0];
};


const deleteResetToken = async (token) => {

  const [result] = await pool.query(
    `DELETE
     FROM password_reset_tokens
     WHERE token = ?`,
    [token]
  );

  return result;
};


// =========================================================
// SCHOOL ADMIN
// =========================================================

const findSchoolAdminByEmail = async (email) => {

  const [rows] = await pool.query(
    `SELECT
      s.id,
      s.school_name,
      s.admin_email,
      s.admin_password
     FROM school s
     WHERE s.admin_email = ?
     LIMIT 1`,
    [email]
  );

  return rows[0];
};


// =========================================================
// EXPORTS
// =========================================================

module.exports = {

  // Super Admin
  findSuperAdminByEmail,
  createSuperAdmin,
  loginSuperAdmin,
  findSuperAdminById,
  updateSuperAdminPassword,
  updateSuperAdminProfile,

  // Email Verification
  verifySuperAdminEmail,
  saveSuperAdminVerificationOtp,
  findSuperAdminByIdForVerification,

  // Email Verification Token Table
  createEmailVerificationToken,
  findEmailVerificationToken,
  incrementVerificationAttempts,
  deleteEmailVerificationToken,

  // Password Reset
  saveResetToken,
  findResetToken,
  deleteResetToken,

  // School Admin
  findSchoolAdminByEmail

};