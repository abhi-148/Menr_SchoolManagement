const pool = require("../config/db");


// =========================================================
// SUPER ADMIN
// =========================================================

const findSuperAdminByEmail = async (email) => {

  const [rows] = await pool.query(
    `
    SELECT *
    FROM super_admin
    WHERE email = ?
    LIMIT 1
    `,
    [email]
  );

  return rows[0];
};


const createSuperAdmin = async (data) => {

  const [result] = await pool.query(
    `
    INSERT INTO super_admin
    (
      full_name,
      email,
      password,
      status,
      is_verified
    )
    VALUES (?, ?, ?, ?, ?)
    `,
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
    `
    SELECT *
    FROM super_admin
    WHERE email = ?
    LIMIT 1
    `,
    [email]
  );

  return rows[0];
};


const findSuperAdminById = async (id) => {

  const [rows] = await pool.query(
    `
    SELECT *
    FROM super_admin
    WHERE id = ?
    LIMIT 1
    `,
    [id]
  );

  return rows[0];
};


const updateSuperAdminPassword = async (
  id,
  password
) => {

  const [result] = await pool.query(
    `
    UPDATE super_admin
    SET password = ?
    WHERE id = ?
    `,
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
    `
    UPDATE super_admin
    SET
      full_name = ?,
      email = ?
    WHERE id = ?
    `,
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

const verifySuperAdminEmail = async (userId) => {

  const [result] = await pool.query(
    `
    UPDATE super_admin
    SET
      is_verified = 1,
      verification_otp = NULL,
      otp_expires_at = NULL
    WHERE id = ?
    `,
    [userId]
  );

  return result;
};


const saveSuperAdminVerificationOtp = async (
  userId,
  otp,
  expiresAt
) => {

  const [result] = await pool.query(
    `
    UPDATE super_admin
    SET
      verification_otp = ?,
      otp_expires_at = ?
    WHERE id = ?
    `,
    [
      otp,
      expiresAt,
      userId
    ]
  );

  return result;
};


const findSuperAdminByIdForVerification = async (
  userId
) => {

  const [rows] = await pool.query(
    `
    SELECT
      id,
      full_name,
      email,
      is_verified,
      verification_otp,
      otp_expires_at
    FROM super_admin
    WHERE id = ?
    LIMIT 1
    `,
    [userId]
  );

  return rows[0];
};


// =========================================================
// EMAIL VERIFICATION TOKEN TABLE
// =========================================================

const createEmailVerificationToken = async (
  userId,
  email,
  otpHash,
  expiresAt
) => {

  await pool.query(
    `
    DELETE FROM email_verification_tokens
    WHERE user_id = ?
    `,
    [userId]
  );


  const [result] = await pool.query(
    `
    INSERT INTO email_verification_tokens
    (
      user_id,
      email,
      otp_hash,
      expires_at,
      attempts
    )
    VALUES (?, ?, ?, ?, 0)
    `,
    [
      userId,
      email,
      otpHash,
      expiresAt
    ]
  );

  return result;
};


const findEmailVerificationToken = async (
  userId,
  email
) => {

  const [rows] = await pool.query(
    `
    SELECT *
    FROM email_verification_tokens
    WHERE user_id = ?
      AND email = ?
    ORDER BY id DESC
    LIMIT 1
    `,
    [
      userId,
      email
    ]
  );

  return rows[0];
};


const incrementVerificationAttempts = async (
  tokenId
) => {

  const [result] = await pool.query(
    `
    UPDATE email_verification_tokens
    SET attempts = attempts + 1
    WHERE id = ?
    `,
    [tokenId]
  );

  return result;
};


const deleteEmailVerificationToken = async (
  tokenId
) => {

  const [result] = await pool.query(
    `
    DELETE FROM email_verification_tokens
    WHERE id = ?
    `,
    [tokenId]
  );

  return result;
};


// =========================================================
// PASSWORD RESET
// =========================================================

const saveResetToken = async (
  userType,
  userId,
  email,
  token,
  expiresAt
) => {

  // Remove previous active tokens for this user
  await pool.query(
    `
    DELETE FROM password_reset_tokens
    WHERE user_type = ?
      AND user_id = ?
    `,
    [
      userType,
      userId
    ]
  );


  const [result] = await pool.query(
    `
    INSERT INTO password_reset_tokens
    (
      user_type,
      user_id,
      email,
      token,
      expires_at
    )
    VALUES (?, ?, ?, ?, ?)
    `,
    [
      userType,
      userId,
      email,
      token,
      expiresAt
    ]
  );

  return result;
};


const findResetToken = async (
  token
) => {

  const [rows] = await pool.query(
    `
    SELECT
      id,
      user_type,
      user_id,
      email,
      token,
      expires_at
    FROM password_reset_tokens
    WHERE token = ?
    LIMIT 1
    `,
    [token]
  );

  return rows[0];
};


const deleteResetToken = async (
  token
) => {

  const [result] = await pool.query(
    `
    DELETE FROM password_reset_tokens
    WHERE token = ?
    `,
    [token]
  );

  return result;
};


// =========================================================
// SCHOOL ADMIN
// =========================================================

const findSchoolAdminByEmail = async (email) => {

  const [rows] = await pool.query(
    `
    SELECT
      s.id,
      s.school_name,
      s.admin_email,
      s.admin_password
    FROM school s
    WHERE s.admin_email = ?
    LIMIT 1
    `,
    [email]
  );

  return rows[0];
};


// =========================================================
// UPDATE SCHOOL ADMIN PASSWORD
// =========================================================

const updateSchoolAdminPassword = async (
  schoolId,
  password
) => {

  const [result] = await pool.query(
    `
    UPDATE school
    SET admin_password = ?
    WHERE id = ?
    `,
    [
      password,
      schoolId
    ]
  );

  return result;
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
  findSchoolAdminByEmail,
  updateSchoolAdminPassword,

};