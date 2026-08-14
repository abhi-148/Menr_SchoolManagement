const pool = require("../config/db");


// =========================================================
// STUDENT COUNT
// =========================================================

const getStudentCount = async (schoolId = null) => {

  let query = `
    SELECT COUNT(*) AS total_students
    FROM student
    WHERE status = 'ACTIVE'
  `;

  const params = [];

  if (schoolId) {
    query += ` AND school_id = ?`;
    params.push(schoolId);
  }

  const [rows] = await pool.query(
    query,
    params
  );

  return rows[0]?.total_students || 0;
};


// =========================================================
// STAFF COUNT
// =========================================================

const getStaffCount = async (schoolId = null) => {

  let query = `
    SELECT COUNT(*) AS total_staff
    FROM staff
    WHERE status = 'ACTIVE'
  `;

  const params = [];

  if (schoolId) {
    query += ` AND school_id = ?`;
    params.push(schoolId);
  }

  const [rows] = await pool.query(
    query,
    params
  );

  return rows[0]?.total_staff || 0;
};


// =========================================================
// TODAY ATTENDANCE SUMMARY
// =========================================================

const getAttendanceSummary = async (
  schoolId = null,
  date
) => {

  const attendanceDate =
    date ||
    new Date()
      .toISOString()
      .slice(0, 10);

  let query = `
    SELECT
      COUNT(*) AS total_marked,

      SUM(
        CASE
          WHEN a.status = 'PRESENT'
          THEN 1
          ELSE 0
        END
      ) AS present_count,

      SUM(
        CASE
          WHEN a.status = 'ABSENT'
          THEN 1
          ELSE 0
        END
      ) AS absent_count,

      SUM(
        CASE
          WHEN a.status = 'LATE'
          THEN 1
          ELSE 0
        END
      ) AS late_count

    FROM attendance a

    WHERE a.attendance_date = ?
  `;

  const params = [
    attendanceDate
  ];

  if (schoolId) {
    query += `
      AND a.school_id = ?
    `;

    params.push(
      schoolId
    );
  }

  const [rows] =
    await pool.query(
      query,
      params
    );

  return {
    date: attendanceDate,
    ...rows[0]
  };
};


// =========================================================
// ABSENT STUDENTS
// =========================================================

const getAbsentStudents = async (
  schoolId = null,
  date
) => {

  const attendanceDate =
    date ||
    new Date()
      .toISOString()
      .slice(0, 10);

  let query = `
    SELECT
      s.id,
      s.full_name,
      s.roll_number,
      s.phone,
      c.class_name,
      sec.section_name,
      a.attendance_date,
      a.status

    FROM attendance a

    INNER JOIN student s
      ON a.student_id = s.id

    LEFT JOIN school_classes sc
      ON s.school_class_id = sc.id

    LEFT JOIN classes c
      ON sc.class_id = c.id

    LEFT JOIN sections sec
      ON s.section_id = sec.id

    WHERE a.attendance_date = ?
      AND a.status = 'ABSENT'
  `;

  const params = [
    attendanceDate
  ];

  if (schoolId) {
    query += `
      AND a.school_id = ?
    `;

    params.push(
      schoolId
    );
  }

  query += `
    ORDER BY
      s.full_name ASC
  `;

  const [rows] =
    await pool.query(
      query,
      params
    );

  return rows;
};


// =========================================================
// PENDING FEES
// =========================================================

const getPendingFees = async (
  schoolId = null
) => {

  let query = `
    SELECT
      s.id AS student_id,
      s.full_name,
      s.roll_number,
      c.class_name,
      sec.section_name,

      f.amount,
      f.payment_date,
      f.status

    FROM fees f

    INNER JOIN student s
      ON f.student_id = s.id

    LEFT JOIN school_classes sc
      ON s.school_class_id = sc.id

    LEFT JOIN classes c
      ON sc.class_id = c.id

    LEFT JOIN sections sec
      ON s.section_id = sec.id

    WHERE
      (
        UPPER(f.status) IN (
          'PENDING',
          'UNPAID',
          'DUE'
        )
      )
  `;

  const params = [];

  if (schoolId) {
    query += `
      AND f.school_id = ?
    `;

    params.push(
      schoolId
    );
  }

  query += `
    ORDER BY
      s.full_name ASC
  `;

  const [rows] =
    await pool.query(
      query,
      params
    );

  return rows;
};


// =========================================================
// MARKS / RESULTS
// =========================================================

const getRecentMarks = async (
  schoolId = null,
  limit = 20
) => {

  let query = `
    SELECT
      sm.id,
      sm.student_id,
      s.full_name,
      s.roll_number,

      e.exam_name,
      sub.subject_name,

      sm.max_marks,
      sm.obtained_marks,
      sm.remarks

    FROM student_marks sm

    INNER JOIN student s
      ON sm.student_id = s.id

    INNER JOIN exams e
      ON sm.exam_id = e.id

    INNER JOIN subjects sub
      ON sm.subject_id = sub.id
  `;

  const params = [];

  if (schoolId) {
    query += `
      WHERE s.school_id = ?
    `;

    params.push(
      schoolId
    );
  }

  query += `
    ORDER BY
      sm.id DESC
    LIMIT ?
  `;

  params.push(
    Number(limit)
  );

  const [rows] =
    await pool.query(
      query,
      params
    );

  return rows;
};


// =========================================================
// SUBJECTS
// =========================================================

const getSubjects = async () => {

  const [rows] =
    await pool.query(
      `
      SELECT
        id,
        subject_name,
        subject_code,
        status

      FROM subjects

      ORDER BY
        subject_name ASC
      `
    );

  return rows;
};


// =========================================================
// ANNOUNCEMENTS
// =========================================================

const getRecentAnnouncements = async (
  schoolId = null,
  limit = 10
) => {

  let query = `
    SELECT
      id,
      title,
      description,
      audience,
      priority,
      publish_at,
      expires_at,
      status

    FROM announcements

    WHERE status = 'PUBLISHED'
      AND publish_at <= NOW()
      AND (
        expires_at IS NULL
        OR expires_at >= NOW()
      )
  `;

  const params = [];

  if (schoolId) {
    query += `
      AND (
        school_id = ?
        OR school_id IS NULL
      )
    `;

    params.push(
      schoolId
    );
  }

  query += `
    ORDER BY
      publish_at DESC
    LIMIT ?
  `;

  params.push(
    Number(limit)
  );

  const [rows] =
    await pool.query(
      query,
      params
    );

  return rows;
};


module.exports = {

  getStudentCount,

  getStaffCount,

  getAttendanceSummary,

  getAbsentStudents,

  getPendingFees,

  getRecentMarks,

  getSubjects,

  getRecentAnnouncements

};