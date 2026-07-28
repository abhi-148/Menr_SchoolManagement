const pool = require("../config/db");

// ================= SUPER ADMIN =================

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
    (full_name, email, password, status)
    VALUES (?, ?, ?, ?)`,
    [
      data.full_name,
      data.email,
      data.password,
      data.status
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

const updateSuperAdminPassword = async (id, password) => {
  const [result] = await pool.query(
    `UPDATE super_admin
     SET password = ?
     WHERE id = ?`,
    [password, id]
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

// ================= PASSWORD RESET =================

const saveResetToken = async (
  email,
  token,
  expiresAt
) => {
  const [result] = await pool.query(
    `INSERT INTO password_reset_tokens
    (email, token, expires_at)
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

// ================= SCHOOL ADMIN =================

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

module.exports = {
  findSuperAdminByEmail,
  createSuperAdmin,
  loginSuperAdmin,
  findSuperAdminById,
  updateSuperAdminPassword,
  updateSuperAdminProfile,
  saveResetToken,
  findResetToken,
  deleteResetToken,
  findSchoolAdminByEmail
};