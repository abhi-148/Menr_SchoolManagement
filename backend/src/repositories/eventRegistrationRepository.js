const pool = require("../config/db");

// =======================================
// Create Event Registration
// =======================================
const createEventRegistration = async (data) => {

  const [result] = await pool.query(
    `
    INSERT INTO tbl_event_registrations (

      event_id,
      school_id,

      participant_type,

      student_id,
      staff_id,
      parent_id,

      registration_date,
      registration_status,

      payment_id,

      remarks,

      status,

      created_by_staff_id,
      created_by_student_id

    )
    VALUES
    (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )
    `,
    [

      data.event_id,
      data.school_id,

      data.participant_type,

      data.student_id,
      data.staff_id,
      data.parent_id,

      data.registration_date,
      data.registration_status,

      data.payment_id,

      data.remarks,

      data.status,

      data.created_by_staff_id,
      data.created_by_student_id,

    ]
  );

  return result;

};

// =======================================
// Get All Event Registrations
// =======================================
const getAllEventRegistrations = async () => {

  const [rows] = await pool.query(
    `
    SELECT

      er.*,

      e.event_name,

      s.school_name

    FROM tbl_event_registrations er

   LEFT JOIN events e
ON e.id = er.event_id

LEFT JOIN school s
ON s.id = er.school_id

    ORDER BY
      er.registration_id DESC
    `
  );

  return rows;

};
// =======================================
// Get Event Registration By Id
// =======================================
const getEventRegistrationById = async (id) => {

  const [rows] = await pool.query(
    `
    SELECT *

    FROM tbl_event_registrations

    WHERE registration_id = ?
    `,
    [id]
  );

  return rows[0];

};

// =======================================
// Update Event Registration
// =======================================
const updateEventRegistration = async (
  id,
  data
) => {

  const [result] = await pool.query(
    `
    UPDATE tbl_event_registrations

    SET

      participant_type = ?,

      student_id = ?,

      staff_id = ?,

      parent_id = ?,

      registration_status = ?,

      payment_id = ?,

      remarks = ?,

      status = ?,

      updated_by_staff_id = ?,

      updated_by_student_id = ?,

      updated_at = NOW()

    WHERE registration_id = ?
    `,
    [

      data.participant_type,

      data.student_id,

      data.staff_id,

      data.parent_id,

      data.registration_status,

      data.payment_id,

      data.remarks,

      data.status,

      data.updated_by_staff_id,

      data.updated_by_student_id,

      id,

    ]
  );

  return result;

};

// =======================================
// Delete Event Registration
// =======================================
const deleteEventRegistration = async (id) => {

  const [result] = await pool.query(
    `
    DELETE

    FROM tbl_event_registrations

    WHERE registration_id = ?
    `,
    [id]
  );

  return result;

};

// =======================================
// Check Duplicate Registration
// =======================================
const checkDuplicateRegistration = async (
  eventId,
  participantType,
  studentId,
  staffId,
  parentId
) => {

  const [rows] = await pool.query(
    `
    SELECT registration_id

    FROM tbl_event_registrations

    WHERE

      event_id = ?

      AND participant_type = ?

      AND
      (
        student_id = ?
        OR staff_id = ?
        OR parent_id = ?
      )

      AND status = 'ACTIVE'
    `,
    [
      eventId,
      participantType,
      studentId,
      staffId,
      parentId,
    ]
  );

  return rows;

};

// =======================================
// Registration Count By Event
// =======================================
const getRegistrationCountByEvent = async (
  eventId
) => {

  const [rows] = await pool.query(
    `
    SELECT
      COUNT(*) AS total

    FROM tbl_event_registrations

    WHERE
      event_id = ?
      AND status = 'ACTIVE'
    `,
    [eventId]
  );

  return rows[0];

};

// =======================================
// Get Registrations By Event
// =======================================
const getRegistrationsByEvent = async (
  eventId
) => {

  const [rows] = await pool.query(
    `
    SELECT *

    FROM tbl_event_registrations

    WHERE
      event_id = ?

    ORDER BY
      registration_id DESC
    `,
    [eventId]
  );

  return rows;

};

// =======================================
// Get Student Registrations
// =======================================
const getRegistrationsByStudent = async (
  studentId
) => {

  const [rows] = await pool.query(
    `
    SELECT *

    FROM tbl_event_registrations

    WHERE
      student_id = ?

    ORDER BY
      registration_id DESC
    `,
    [studentId]
  );

  return rows;

};

// =======================================
// Get Staff Registrations
// =======================================
const getRegistrationsByStaff = async (
  staffId
) => {

  const [rows] = await pool.query(
    `
    SELECT *

    FROM tbl_event_registrations

    WHERE
      staff_id = ?

    ORDER BY
      registration_id DESC
    `,
    [staffId]
  );

  return rows;

};

// =======================================
// Get Parent Registrations
// =======================================
const getRegistrationsByParent = async (
  parentId
) => {

  const [rows] = await pool.query(
    `
    SELECT *

    FROM tbl_event_registrations

    WHERE
      parent_id = ?

    ORDER BY
      registration_id DESC
    `,
    [parentId]
  );

  return rows;

};

// =======================================
// Module Exports
// =======================================
module.exports = {

  createEventRegistration,

  getAllEventRegistrations,

  getEventRegistrationById,

  updateEventRegistration,

  deleteEventRegistration,

  checkDuplicateRegistration,

  getRegistrationCountByEvent,

  getRegistrationsByEvent,

  getRegistrationsByStudent,

  getRegistrationsByStaff,

  getRegistrationsByParent,

};