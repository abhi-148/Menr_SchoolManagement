const pool = require("../config/db");

// =========================================================
// CREATE STAFF SCHEDULE
// =========================================================

const createStaffSchedule = async (data) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // -----------------------------------------------------
    // Get duration from selected period
    // -----------------------------------------------------

    const [periodRows] = await connection.query(
      `
      SELECT
        period_id,
        slot_duration
      FROM tbl_school_period
      WHERE period_id = ?
        AND status = 'active'
      LIMIT 1
      `,
      [data.period_id]
    );

    if (periodRows.length === 0) {
      throw new Error("Selected period not found or inactive");
    }

    const duration = periodRows[0].slot_duration;

    // -----------------------------------------------------
    // Check staff-subject mapping
    // -----------------------------------------------------

    const [teacherSubjectRows] = await connection.query(
      `
      SELECT
        id
      FROM teacher_subjects
      WHERE staff_id = ?
        AND subject_id = ?
        AND status = 'active'
      LIMIT 1
      `,
      [
        data.staff_id,
        data.subject_id
      ]
    );

    if (teacherSubjectRows.length === 0) {
      throw new Error(
        "Selected subject is not assigned to this staff member"
      );
    }

    // -----------------------------------------------------
    // Insert Schedule
    // -----------------------------------------------------

    const [result] = await connection.query(
      `
      INSERT INTO staff_schedules
      (
        staff_id,
        period_id,
        class_id,
        batch_id,
        subject_id,
        day_of_week,
        duration,
        room,
        status,
        created_by
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        data.staff_id,
        data.period_id,
        data.class_id,
        data.batch_id,
        data.subject_id,
        data.day_of_week,
        duration,
        data.room,
        data.status || "active",
        data.created_by || null
      ]
    );

    await connection.commit();

    return {
      schedule_id: result.insertId,
      duration
    };

  } catch (error) {

    await connection.rollback();

    throw error;

  } finally {

    connection.release();

  }
};


// =========================================================
// GET ALL STAFF SCHEDULES
// =========================================================

const getAllStaffSchedules = async () => {

  const [rows] = await pool.query(
    `
    SELECT
      ss.schedule_id,
      ss.staff_id,
st.full_name AS staff_name,
st.school_id AS school_id,

      ss.period_id,
      sp.period_number,
      sp.start_time,
      sp.end_time,

      ss.class_id,
      c.class_name,

      ss.batch_id,
      ss.subject_id,
      sub.subject_name,

      ss.day_of_week,
      ss.duration,
      ss.room,
      ss.status,

      ss.created_by,
      ss.updated_by,
      ss.created_at,
      ss.updated_at

    FROM staff_schedules ss

    INNER JOIN staff st
      ON st.id = ss.staff_id

    INNER JOIN tbl_school_period sp
      ON sp.period_id = ss.period_id

    INNER JOIN classes c
      ON c.id = ss.class_id

    INNER JOIN subjects sub
      ON sub.id = ss.subject_id

    ORDER BY
      ss.day_of_week,
      sp.period_number,
      ss.schedule_id DESC
    `
  );

  return rows;
};


// =========================================================
// GET STAFF SCHEDULES BY SCHOOL
// =========================================================

const getStaffSchedulesBySchool = async (schoolId) => {

  const [rows] = await pool.query(
    `
    SELECT
      ss.schedule_id,
     ss.staff_id,
st.full_name AS staff_name,
st.school_id AS school_id,

      ss.period_id,
      sp.period_number,
      sp.start_time,
      sp.end_time,

      ss.class_id,
      c.class_name,

      ss.batch_id,
      ss.subject_id,
      sub.subject_name,

      ss.day_of_week,
      ss.duration,
      ss.room,
      ss.status,

      ss.created_by,
      ss.updated_by,
      ss.created_at,
      ss.updated_at

    FROM staff_schedules ss

    INNER JOIN staff st
      ON st.id = ss.staff_id

    INNER JOIN tbl_school_period sp
      ON sp.period_id = ss.period_id

    INNER JOIN classes c
      ON c.id = ss.class_id

    INNER JOIN subjects sub
      ON sub.id = ss.subject_id

    WHERE st.school_id = ?

    ORDER BY
      ss.day_of_week,
      sp.period_number,
      ss.schedule_id DESC
    `,
    [schoolId]
  );

  return rows;
};


// =========================================================
// GET STAFF SCHEDULE BY ID
// =========================================================

const getStaffScheduleById = async (scheduleId) => {

  const [rows] = await pool.query(
    `
    SELECT
      ss.schedule_id,
     ss.staff_id,
st.full_name AS staff_name,
st.school_id AS school_id,

      ss.period_id,
      sp.period_number,
      sp.start_time,
      sp.end_time,
      sp.slot_duration,

      ss.class_id,
      c.class_name,

      ss.batch_id,
      ss.subject_id,
      sub.subject_name,

      ss.day_of_week,
      ss.duration,
      ss.room,
      ss.status,

      ss.created_by,
      ss.updated_by,
      ss.created_at,
      ss.updated_at

    FROM staff_schedules ss

    INNER JOIN staff st
      ON st.id = ss.staff_id

    INNER JOIN tbl_school_period sp
      ON sp.period_id = ss.period_id

    INNER JOIN classes c
      ON c.id = ss.class_id

    INNER JOIN subjects sub
      ON sub.id = ss.subject_id

    WHERE ss.schedule_id = ?

    LIMIT 1
    `,
    [scheduleId]
  );

  return rows[0];
};


// =========================================================
// UPDATE STAFF SCHEDULE
// =========================================================

const updateStaffSchedule = async (
  scheduleId,
  data
) => {

  const connection = await pool.getConnection();

  try {

    await connection.beginTransaction();

    // -----------------------------------------------------
    // Get duration from selected period
    // -----------------------------------------------------

    const [periodRows] = await connection.query(
      `
      SELECT
        period_id,
        slot_duration
      FROM tbl_school_period
      WHERE period_id = ?
        AND status = 'active'
      LIMIT 1
      `,
      [data.period_id]
    );

    if (periodRows.length === 0) {
      throw new Error(
        "Selected period not found or inactive"
      );
    }

    const duration = periodRows[0].slot_duration;

    // -----------------------------------------------------
    // Check staff-subject mapping
    // -----------------------------------------------------

    const [teacherSubjectRows] = await connection.query(
      `
      SELECT
        id
      FROM teacher_subjects
      WHERE staff_id = ?
        AND subject_id = ?
        AND status = 'active'
      LIMIT 1
      `,
      [
        data.staff_id,
        data.subject_id
      ]
    );

    if (teacherSubjectRows.length === 0) {
      throw new Error(
        "Selected subject is not assigned to this staff member"
      );
    }

    // -----------------------------------------------------
    // Update Schedule
    // -----------------------------------------------------

    const [result] = await connection.query(
      `
      UPDATE staff_schedules
      SET
        staff_id = ?,
        period_id = ?,
        class_id = ?,
        batch_id = ?,
        subject_id = ?,
        day_of_week = ?,
        duration = ?,
        room = ?,
        status = ?,
        updated_by = ?,
        updated_at = NOW()
      WHERE schedule_id = ?
      `,
      [
        data.staff_id,
        data.period_id,
        data.class_id,
        data.batch_id,
        data.subject_id,
        data.day_of_week,
        duration,
        data.room,
        data.status || "active",
        data.updated_by || null,
        scheduleId
      ]
    );

    if (result.affectedRows === 0) {
      throw new Error(
        "Staff Schedule Not Found"
      );
    }

    await connection.commit();

    return {
      schedule_id: scheduleId,
      duration
    };

  } catch (error) {

    await connection.rollback();

    throw error;

  } finally {

    connection.release();

  }
};


// =========================================================
// DELETE STAFF SCHEDULE
// =========================================================

const deleteStaffSchedule = async (scheduleId) => {

  const [result] = await pool.query(
    `
    DELETE FROM staff_schedules
    WHERE schedule_id = ?
    `,
    [scheduleId]
  );

  if (result.affectedRows === 0) {
    throw new Error(
      "Staff Schedule Not Found"
    );
  }

  return result;
};


// =========================================================
// GET SCHEDULES BY STAFF
// =========================================================

const getStaffSchedulesByStaff = async (staffId) => {

  const [rows] = await pool.query(
    `
    SELECT
      ss.schedule_id,

     ss.staff_id,
st.full_name AS staff_name,
st.school_id AS school_id,
      ss.period_id,
      sp.period_number,
      sp.start_time,
      sp.end_time,

      ss.class_id,
      c.class_name,

      ss.batch_id,

      ss.subject_id,
      sub.subject_name,

      ss.day_of_week,
      ss.duration,
      ss.room,
      ss.status

    FROM staff_schedules ss

    INNER JOIN staff st
      ON st.id = ss.staff_id

    INNER JOIN tbl_school_period sp
      ON sp.period_id = ss.period_id

    INNER JOIN classes c
      ON c.id = ss.class_id

    INNER JOIN subjects sub
      ON sub.id = ss.subject_id

    WHERE ss.staff_id = ?

    ORDER BY
      FIELD(
        ss.day_of_week,
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ),
      sp.period_number
    `,
    [staffId]
  );

  return rows;
};


// =========================================================
// EXPORT
// =========================================================

module.exports = {

  createStaffSchedule,

  getAllStaffSchedules,

  getStaffSchedulesBySchool,

  getStaffScheduleById,

  updateStaffSchedule,

  deleteStaffSchedule,

  getStaffSchedulesByStaff

};