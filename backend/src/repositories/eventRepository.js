const pool = require("../config/db");

// ==============================
// Create Event
// ==============================
const createEvent = async (data) => {
  const [result] = await pool.query(
    `
    INSERT INTO tbl_events (
        school_id,
        academic_year_id,
        school_branch_id,
        school_class_id,

        event_name,
        event_description,
        event_type,

        start_date,
        end_date,
        start_time,
        end_time,

        is_single_day,
        is_multiple_day,
        total_duration_hours,

        event_schedule,

        audience_type,
        target_batch_ids,
        target_parent_ids,
        target_staff_ids,

        venue,

        organizer_staff_ids,
        organizer_student_ids,

        budget,
        expected_participants,

        event_status,
        priority,

        is_holiday,
        affects_timetable,
        affected_timetables,

        cover_image,
        attachments,

        requires_registration,
        registration_deadline,
        max_participants,

        current_registrations,
        current_students,
        current_staff,
        current_parents,
        available_spots,
        is_registration_full,
        registration_status,

        chief_guests,

        status,
        created_by
    )
    VALUES (
        ?, ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?,
        ?,
        ?, ?, ?, ?,
        ?,
        ?, ?,
        ?, ?,
        ?, ?,
        ?, ?, ?,
        ?, ?,
        ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?,
        ?,
        ?, ?
    )
    `,
    [
      data.school_id,
      data.academic_year_id,
      data.school_branch_id,
      data.school_class_id,

      data.event_name,
      data.event_description,
      data.event_type,

      data.start_date,
      data.end_date,
      data.start_time,
      data.end_time,

      data.is_single_day,
      data.is_multiple_day,
      data.total_duration_hours,

      data.event_schedule,

      data.audience_type,
      data.target_batch_ids,
      data.target_parent_ids,
      data.target_staff_ids,

      data.venue,

      data.organizer_staff_ids,
      data.organizer_student_ids,

      data.budget,
      data.expected_participants,

      data.event_status,
      data.priority,

      data.is_holiday,
      data.affects_timetable,
      data.affected_timetables,

      data.cover_image,
      data.attachments,

      data.requires_registration,
      data.registration_deadline,
      data.max_participants,

      data.current_registrations,
      data.current_students,
      data.current_staff,
      data.current_parents,
      data.available_spots,
      data.is_registration_full,
      data.registration_status,

      data.chief_guests,

      data.status,
      data.created_by,
    ]
  );

  return result;
};

// ==============================
// Get All Events
// ==============================
// ==============================
// Get All Events
// ==============================
const getAllEvents = async (
  search = "",
  page = 1,
  limit = 10
) => {

  const offset = (page - 1) * limit;
  const searchValue = `%${search}%`;

  const [rows] = await pool.query(
    `
    SELECT

      e.*,

      sc.school_name,

      sb.branch_name

    FROM tbl_events e

    LEFT JOIN school sc
      ON sc.id = e.school_id

    LEFT JOIN school_branches sb
      ON sb.id = e.school_branch_id

    WHERE

      e.event_name LIKE ?

      OR e.event_type LIKE ?

      OR e.venue LIKE ?

      OR sb.branch_name LIKE ?

    ORDER BY e.start_date DESC

    LIMIT ?
    OFFSET ?
    `,
    [
      searchValue,
      searchValue,
      searchValue,
      searchValue,
      Number(limit),
      Number(offset),
    ]
  );

  return rows;
};

// ==============================
// Get Event By ID
// ==============================
const getEventById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM tbl_events
    WHERE event_id = ?
    `,
    [id]
  );

  return rows[0];
};

// ==============================
// Update Event
// ==============================
const updateEvent = async (id, data) => {
  const [result] = await pool.query(
    `
    UPDATE tbl_events
    SET

        academic_year_id=?,
        school_branch_id=?,
        school_class_id=?,

        event_name=?,
        event_description=?,
        event_type=?,

        start_date=?,
        end_date=?,
        start_time=?,
        end_time=?,

        is_single_day=?,
        is_multiple_day=?,
        total_duration_hours=?,

        audience_type=?,

        venue=?,

        budget=?,

        expected_participants=?,

        priority=?,

        is_holiday=?,

        affects_timetable=?,

        requires_registration=?,

        registration_deadline=?,

        max_participants=?,

        event_status=?,

        status=?,

        updated_by=?,

        updated_at=NOW()

    WHERE event_id=?
    `,
    [
      data.academic_year_id,
      data.school_branch_id,
      data.school_class_id,

      data.event_name,
      data.event_description,
      data.event_type,

      data.start_date,
      data.end_date,
      data.start_time,
      data.end_time,

      data.is_single_day,
      data.is_multiple_day,
      data.total_duration_hours,

      data.audience_type,

      data.venue,

      data.budget,

      data.expected_participants,

      data.priority,

      data.is_holiday,

      data.affects_timetable,

      data.requires_registration,

      data.registration_deadline,

      data.max_participants,

      data.event_status,

      data.status,

      data.updated_by,

      id,
    ]
  );

  return result;
};

// ==============================
// Delete Event
// ==============================
const deleteEvent = async (id) => {
  const [result] = await pool.query(
    `
    DELETE FROM tbl_events
    WHERE event_id=?
    `,
    [id]
  );

  return result;
};

// ==============================
// Get Event Registration Summary
// ==============================
const getEventRegistrationSummary = async (eventId) => {

  const [rows] = await pool.query(
    `
    SELECT

      COUNT(*) AS total,

      SUM(
        CASE
          WHEN participant_type='STUDENT'
          THEN 1 ELSE 0
        END
      ) AS students,

      SUM(
        CASE
          WHEN participant_type='STAFF'
          THEN 1 ELSE 0
        END
      ) AS staff,

      SUM(
        CASE
          WHEN participant_type='PARENT'
          THEN 1 ELSE 0
        END
      ) AS parents

    FROM tbl_event_registrations

    WHERE
      event_id=?
      AND status='ACTIVE'
    `,
    [eventId]
  );

  return rows[0];

};

// ==============================
// Update Registration Counts
// ==============================
const updateEventRegistrationCounts = async (
  eventId
) => {

  const event = await getEventById(eventId);

  if (!event) return;

  const summary =
    await getEventRegistrationSummary(
      eventId
    );

  const total =
    Number(summary.total) || 0;

  const students =
    Number(summary.students) || 0;

  const staff =
    Number(summary.staff) || 0;

  const parents =
    Number(summary.parents) || 0;

  const available =
    Math.max(
      (event.max_participants || 0) - total,
      0
    );

  const full =
    available === 0 &&
    event.max_participants > 0;

  await pool.query(
    `
    UPDATE tbl_events
    SET

      current_registrations=?,

      current_students=?,

      current_staff=?,

      current_parents=?,

      available_spots=?,

      is_registration_full=?

    WHERE event_id=?
    `,
    [
      total,
      students,
      staff,
      parents,
      available,
      full,
      eventId,
    ]
  );

};

// ==============================
// Check Duplicate Event
// ==============================
const checkDuplicateEvent = async (
  schoolId,
  branchId,
  eventName,
  eventDate
) => {

  const [rows] = await pool.query(
    `
    SELECT id
  FROM tbl_events
    WHERE school_id = ?
      AND branch_id = ?
      AND event_name = ?
      AND event_date = ?
    `,
    [
      schoolId,
      branchId,
      eventName,
      eventDate,
    ]
  );

  return rows;

};

// ==============================
// Check Duplicate Event For Update
// ==============================
const checkDuplicateEventForUpdate = async (
  id,
  schoolId,
  branchId,
  eventName,
  eventDate
) => {

  const [rows] = await pool.query(
    `
    SELECT id
   FROM tbl_events
    WHERE school_id = ?
      AND branch_id = ?
      AND event_name = ?
      AND event_date = ?
      AND id <> ?
    `,
    [
      schoolId,
      branchId,
      eventName,
      eventDate,
      id,
    ]
  );

  return rows;

};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  checkDuplicateEvent,
  checkDuplicateEventForUpdate,

  getEventRegistrationSummary,
  updateEventRegistrationCounts,
};