const pool = require("../config/db");


// =========================================================
// CREATE LEAVE REQUEST
// =========================================================

const createLeaveRequest = async (data) => {

  const [result] = await pool.query(
    `
    INSERT INTO leave_requests
    (
      staff_id,
      leave_type,
      start_date,
      end_date,
      total_days,
      reason,
      status,
      created_at
    )
    VALUES (?, ?, ?, ?, ?, ?, 'PENDING', NOW())
    `,
    [
      data.staff_id,
      data.leave_type,
      data.start_date,
      data.end_date,
      data.total_days,
      data.reason || null
    ]
  );

  return result;
};


// =========================================================
// GET ALL LEAVE REQUESTS
// SUPER_ADMIN  → All schools
// SCHOOL_ADMIN → Own school only
// =========================================================

const getAllLeaveRequests = async (user) => {

  let query = `
    SELECT
      lr.leave_id,
      lr.staff_id,

      s.school_id,

      s.full_name AS staff_name,
      s.email AS staff_email,

      lr.leave_type,
      lr.start_date,
      lr.end_date,
      lr.total_days,
      lr.reason,
      lr.status,

      lr.reviewed_by,
      reviewer.full_name AS reviewer_name,

      lr.reviewed_at,
      lr.comments,
      lr.created_at

    FROM leave_requests lr

    INNER JOIN staff s
      ON lr.staff_id = s.id

    LEFT JOIN staff reviewer
      ON lr.reviewed_by = reviewer.id
  `;

  const params = [];


  // SCHOOL ADMIN
  if (user.role === "SCHOOL_ADMIN") {

    query += `
      WHERE s.school_id = ?
    `;

    params.push(
      user.schoolId
    );

  }


  query += `
    ORDER BY lr.leave_id DESC
  `;


  const [rows] =
    await pool.query(
      query,
      params
    );


  return rows;

};


// =========================================================
// GET LEAVE REQUESTS BY STAFF
// =========================================================

const getLeaveRequestsByStaff = async (
  staffId,
  user
) => {

  let query = `
    SELECT
      lr.leave_id,
      lr.staff_id,

      s.school_id,

      s.full_name AS staff_name,

      lr.leave_type,
      lr.start_date,
      lr.end_date,
      lr.total_days,
      lr.reason,
      lr.status,

      lr.reviewed_by,
      reviewer.full_name AS reviewer_name,

      lr.reviewed_at,
      lr.comments,
      lr.created_at

    FROM leave_requests lr

    INNER JOIN staff s
      ON lr.staff_id = s.id

    LEFT JOIN staff reviewer
      ON lr.reviewed_by = reviewer.id

    WHERE lr.staff_id = ?
  `;

  const params = [
    staffId
  ];


  // SCHOOL ADMIN
  if (
    user &&
    user.role === "SCHOOL_ADMIN"
  ) {

    query += `
      AND s.school_id = ?
    `;

    params.push(
      user.schoolId
    );

  }


  const [rows] =
    await pool.query(
      query,
      params
    );


  return rows;

};


// =========================================================
// GET LEAVE REQUEST BY ID
// =========================================================

const getLeaveRequestById = async (
  id,
  user
) => {

  let query = `
    SELECT
      lr.leave_id,
      lr.staff_id,

      s.school_id,

      s.full_name AS staff_name,
      s.email AS staff_email,

      lr.leave_type,
      lr.start_date,
      lr.end_date,
      lr.total_days,
      lr.reason,
      lr.status,

      lr.reviewed_by,
      reviewer.full_name AS reviewer_name,

      lr.reviewed_at,
      lr.comments,
      lr.created_at

    FROM leave_requests lr

    INNER JOIN staff s
      ON lr.staff_id = s.id

    LEFT JOIN staff reviewer
      ON lr.reviewed_by = reviewer.id

    WHERE lr.leave_id = ?
  `;

  const params = [
    id
  ];


  // SCHOOL ADMIN
  if (
    user &&
    user.role === "SCHOOL_ADMIN"
  ) {

    query += `
      AND s.school_id = ?
    `;

    params.push(
      user.schoolId
    );

  }


  // STAFF → only own request
  if (
    user &&
    user.role === "STAFF"
  ) {

    query += `
      AND lr.staff_id = ?
    `;

    params.push(
      user.id
    );

  }


  const [rows] =
    await pool.query(
      query,
      params
    );


  return rows[0];

};


// =========================================================
// UPDATE LEAVE REQUEST
// =========================================================

const updateLeaveRequest = async (
  id,
  data
) => {

  const [result] =
    await pool.query(
      `
      UPDATE leave_requests

      SET
        leave_type = ?,
        start_date = ?,
        end_date = ?,
        total_days = ?,
        reason = ?

      WHERE leave_id = ?
      `,
      [
        data.leave_type,
        data.start_date,
        data.end_date,
        data.total_days,
        data.reason || null,
        id
      ]
    );


  return result;

};


// =========================================================
// REVIEW LEAVE REQUEST
// =========================================================

const reviewLeaveRequest = async (
  id,
  status,
  reviewedBy,
  comments
) => {

  const [result] =
    await pool.query(
      `
      UPDATE leave_requests

      SET
        status = ?,
        reviewed_by = ?,
        reviewed_at = NOW(),
        comments = ?

      WHERE leave_id = ?
      `,
      [
        status,
        reviewedBy,
        comments || null,
        id
      ]
    );


  return result;

};


// =========================================================
// DELETE LEAVE REQUEST
// =========================================================

const deleteLeaveRequest = async (
  id
) => {

  const [result] =
    await pool.query(
      `
      DELETE FROM leave_requests

      WHERE leave_id = ?
      `,
      [id]
    );


  return result;

};


// =========================================================
// EXPORT
// =========================================================

module.exports = {

  createLeaveRequest,

  getAllLeaveRequests,

  getLeaveRequestsByStaff,

  getLeaveRequestById,

  updateLeaveRequest,

  reviewLeaveRequest,

  deleteLeaveRequest

};