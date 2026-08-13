const pool = require("../config/db");


// =========================================================
// CREATE ATTENDANCE
// =========================================================

const createAttendance = async (data) => {

  const [result] = await pool.query(
    `
    INSERT INTO staff_attendance
    (
      staff_id,
      date,
      clock_in,
      clock_out,
      status
    )
    VALUES (?, ?, ?, ?, ?)
    `,
    [
      data.staff_id,
      data.date,
      data.clock_in || null,
      data.clock_out || null,
      data.status
    ]
  );

  return result;
};


// =========================================================
// GET ALL ATTENDANCE
// SUPER_ADMIN       → All staff
// SCHOOL_ADMIN      → Own school staff
// =========================================================

const getAllAttendance = async (user) => {

  let query = `
    SELECT
      sa.attendance_id,
      sa.staff_id,

      s.school_id,

      s.full_name,
      s.email,

      sa.date,
      sa.clock_in,
      sa.clock_out,
      sa.status,
      sa.created_at

    FROM staff_attendance sa

    INNER JOIN staff s
      ON sa.staff_id = s.id
  `;

  const params = [];


  if (
    user &&
    user.role === "SCHOOL_ADMIN"
  ) {

    query += `
      WHERE s.school_id = ?
    `;

    params.push(
      user.schoolId
    );

  }


  query += `
    ORDER BY
      sa.date DESC,
      sa.attendance_id DESC
  `;


  const [rows] =
    await pool.query(
      query,
      params
    );

  return rows;
};


// =========================================================
// GET ATTENDANCE BY STAFF
// =========================================================

const getAttendanceByStaff = async (
  staffId,
  user
) => {

  let query = `
    SELECT
      sa.attendance_id,
      sa.staff_id,

      s.school_id,

      s.full_name,
      s.email,

      sa.date,
      sa.clock_in,
      sa.clock_out,
      sa.status,
      sa.created_at

    FROM staff_attendance sa

    INNER JOIN staff s
      ON sa.staff_id = s.id

    WHERE sa.staff_id = ?
  `;

  const params = [
    staffId
  ];


  // SCHOOL ADMIN → only own school
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


  // STAFF → only own attendance
  if (
    user &&
    user.role === "STAFF"
  ) {

    query += `
      AND sa.staff_id = ?
    `;

    params.push(
      user.id
    );

  }


  query += `
    ORDER BY sa.date DESC
  `;


  const [rows] =
    await pool.query(
      query,
      params
    );

  return rows;
};


// =========================================================
// GET ATTENDANCE BY ID
// =========================================================

const findAttendanceById = async (
  id,
  user
) => {

  let query = `
    SELECT
      sa.attendance_id,
      sa.staff_id,

      s.school_id,

      s.full_name,
      s.email,

      sa.date,
      sa.clock_in,
      sa.clock_out,
      sa.status,
      sa.created_at

    FROM staff_attendance sa

    INNER JOIN staff s
      ON sa.staff_id = s.id

    WHERE sa.attendance_id = ?
  `;

  const params = [
    id
  ];


  // SCHOOL ADMIN → own school only
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


  // STAFF → own attendance only
  if (
    user &&
    user.role === "STAFF"
  ) {

    query += `
      AND sa.staff_id = ?
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
// UPDATE ATTENDANCE
// =========================================================

const updateAttendance = async (
  id,
  data
) => {

  const [result] =
    await pool.query(
      `
      UPDATE staff_attendance

      SET
        staff_id = ?,
        date = ?,
        clock_in = ?,
        clock_out = ?,
        status = ?

      WHERE attendance_id = ?
      `,
      [
        data.staff_id,
        data.date,
        data.clock_in || null,
        data.clock_out || null,
        data.status,
        id
      ]
    );

  return result;
};


// =========================================================
// DELETE ATTENDANCE
// =========================================================

const deleteAttendance = async (
  id
) => {

  const [result] =
    await pool.query(
      `
      DELETE FROM staff_attendance

      WHERE attendance_id = ?
      `,
      [id]
    );

  return result;
};


// =========================================================
// EXPORT
// =========================================================

module.exports = {

  createAttendance,

  getAllAttendance,

  getAttendanceByStaff,

  findAttendanceById,

  updateAttendance,

  deleteAttendance

};