const pool = require("../config/db");

// Create Student
const createStudent = async (studentData) => {

  const [result] = await pool.query(
    `INSERT INTO student
    (
      school_id,
      branch_id,
      school_class_id,
      section_id,
      full_name,
roll_number,
password,
gender,
      dob,
      father_name,
      mother_name,
      phone,
      address,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      studentData.school_id,
      studentData.branch_id,
      studentData.school_class_id,
      studentData.section_id,
      studentData.full_name,
      studentData.roll_number,
      studentData.password,
      studentData.gender,
      studentData.dob,
      studentData.father_name,
      studentData.mother_name,
      studentData.phone,
      studentData.address,
      studentData.status
    ]
  );

  return result;
};

// Get All Students
const getAllStudents = async () => {

  const [rows] = await pool.query(`
   SELECT
  s.id,
  s.school_id,
  s.branch_id,
  s.school_class_id,
  s.section_id,
  s.full_name,
  s.roll_number,
  s.gender,
  s.dob,
  s.father_name,
  s.mother_name,
  s.phone,
  s.address,
  s.status,
  s.created_at,
  s.updated_at,
  c.class_name,
  sec.section_name,
  sb.branch_name
    FROM student s
    LEFT JOIN school_classes sc
      ON s.school_class_id = sc.id
    LEFT JOIN classes c
      ON sc.class_id = c.id
    LEFT JOIN sections sec
      ON s.section_id = sec.id
    LEFT JOIN school_branches sb
      ON s.branch_id = sb.id
    ORDER BY s.id DESC
  `);

  return rows;
};

// Get Student By Id
const getStudentById = async (id) => {

  const [rows] = await pool.query(
    `
   SELECT
  s.id,
  s.school_id,
  s.branch_id,
  s.school_class_id,
  s.section_id,
  s.full_name,
  s.roll_number,
  s.gender,
  s.dob,
  s.father_name,
  s.mother_name,
  s.phone,
  s.address,
  s.status,
  s.created_at,
  s.updated_at,
  c.class_name,
  sec.section_name,
  sb.branch_name
    FROM student s
    LEFT JOIN school_classes sc
      ON s.school_class_id = sc.id
    LEFT JOIN classes c
      ON sc.class_id = c.id
    LEFT JOIN sections sec
      ON s.section_id = sec.id
    LEFT JOIN school_branches sb
      ON s.branch_id = sb.id
    WHERE s.id = ?
    `,
    [id]
  );

  return rows[0];
};

// Update Student
const updateStudent = async (id, data) => {

  const [result] = await pool.query(
    `
    UPDATE student
    SET
      full_name = ?,
      branch_id = ?,
      school_class_id = ?,
      section_id = ?,
      phone = ?,
      address = ?,
      updated_at = NOW()
    WHERE id = ?
    `,
    [
      data.full_name,
      data.branch_id,
      data.school_class_id,
      data.section_id,
      data.phone,
      data.address,
      id
    ]
  );

  return result;
};

// Update Status
const updateStudentStatus = async (id, status) => {

  const [result] = await pool.query(
    `
    UPDATE student
    SET status = ?
    WHERE id = ?
    `,
    [status, id]
  );

  return result;
};

// Pagination
const getStudentsWithPagination = async (limit, offset) => {

  const [rows] = await pool.query(
    `
   SELECT
  s.id,
  s.school_id,
  s.branch_id,
  s.school_class_id,
  s.section_id,
  s.full_name,
  s.roll_number,
  s.gender,
  s.dob,
  s.father_name,
  s.mother_name,
  s.phone,
  s.address,
  s.status,
  s.created_at,
  s.updated_at,
  c.class_name,
  sec.section_name,
  sb.branch_name
    FROM student s
    LEFT JOIN school_classes sc
      ON s.school_class_id = sc.id
    LEFT JOIN classes c
      ON sc.class_id = c.id
    LEFT JOIN sections sec
      ON s.section_id = sec.id
    LEFT JOIN school_branches sb
      ON s.branch_id = sb.id
    LIMIT ? OFFSET ?
    `,
    [Number(limit), Number(offset)]
  );

  return rows;
};

// Search Students
const searchStudents = async (search) => {

  const [rows] = await pool.query(
    `
   SELECT
  s.id,
  s.school_id,
  s.branch_id,
  s.school_class_id,
  s.section_id,
  s.full_name,
  s.roll_number,
  s.gender,
  s.dob,
  s.father_name,
  s.mother_name,
  s.phone,
  s.address,
  s.status,
  s.created_at,
  s.updated_at,
  c.class_name,
  sec.section_name,
  sb.branch_name
    FROM student s
    LEFT JOIN school_classes sc
      ON s.school_class_id = sc.id
    LEFT JOIN classes c
      ON sc.class_id = c.id
    LEFT JOIN sections sec
      ON s.section_id = sec.id
    LEFT JOIN school_branches sb
      ON s.branch_id = sb.id
    WHERE s.full_name LIKE ?
    `,
    [`%${search}%`]
  );

  return rows;
};

// Find Student By Roll Number
const findStudentByRollNumber = async (rollNumber) => {

  const [rows] = await pool.query(
    `SELECT *
     FROM student
     WHERE roll_number = ?`,
    [rollNumber]
  );

  return rows[0];
};

// Update Student Password
const updateStudentPassword = async (id, password) => {

  const [result] = await pool.query(
    `
    UPDATE student
    SET
      password = ?,
      updated_at = NOW()
    WHERE id = ?
    `,
    [password, id]
  );

  return result;
};

const getStudentPasswordById = async (id) => {

  const [rows] = await pool.query(
    `SELECT id, password
     FROM student
     WHERE id = ?`,
    [id]
  );

  return rows[0];
};
const getStudentsBySchool = async (
  schoolId
) => {

  const [rows] = await pool.query(`
    SELECT
      s.id,
      s.school_id,
      s.branch_id,
      s.school_class_id,
      s.section_id,
      s.full_name,
      s.roll_number,
      s.gender,
      s.dob,
      s.father_name,
      s.mother_name,
      s.phone,
      s.address,
      s.status,
      s.created_at,
      s.updated_at,
      c.class_name,
      sec.section_name,
      sb.branch_name
    FROM student s
    LEFT JOIN school_classes sc
      ON s.school_class_id = sc.id
    LEFT JOIN classes c
      ON sc.class_id = c.id
    LEFT JOIN sections sec
      ON s.section_id = sec.id
    LEFT JOIN school_branches sb
      ON s.branch_id = sb.id
    WHERE s.school_id = ?
    ORDER BY s.id DESC
  `,[schoolId]);

  return rows;

};

// Update Student School
const updateStudentSchool = async (
  studentId,
  schoolId
) => {

  const [result] = await pool.query(
    `
    UPDATE student
    SET
      school_id = ?,
      updated_at = NOW()
    WHERE id = ?
    `,
    [
      schoolId,
      studentId
    ]
  );

  return result;

};
// Update Student Branch
const updateStudentBranch = async (
  studentId,
  branchId,
  batchId
) => {

  const [result] = await pool.query(
    `
    UPDATE student
    SET
      branch_id = ?,
      batch_id = ?,
      updated_at = NOW()
    WHERE id = ?
    `,
    [
      branchId,
      batchId,
      studentId
    ]
  );

  return result;

};

// =========================================================
// STUDENT DASHBOARD
// =========================================================

const getStudentDashboardProfile = async (studentId) => {

  const [rows] = await pool.query(
    `
    SELECT
      s.id,
      s.school_id,
      s.branch_id,
      s.school_class_id,
      s.section_id,
      s.full_name,
      s.roll_number,
      s.gender,
      s.dob,
      s.phone,
      s.address,
      s.status,
      c.class_name,
      sec.section_name,
      sb.branch_name
    FROM student s

    LEFT JOIN school_classes sc
      ON s.school_class_id = sc.id

    LEFT JOIN classes c
      ON sc.class_id = c.id

    LEFT JOIN sections sec
      ON s.section_id = sec.id

    LEFT JOIN school_branches sb
      ON s.branch_id = sb.id

    WHERE s.id = ?
    `,
    [studentId]
  );

  return rows[0];
};


// Student Subjects
const getStudentDashboardSubjects = async (
  studentId
) => {

  const [rows] = await pool.query(
    `
    SELECT
      cs.id,
      cs.school_class_id,
      cs.subject_id,
      sub.subject_name,
      sub.subject_code,
      cs.status

    FROM student s

    INNER JOIN class_subjects cs
      ON cs.school_class_id = s.school_class_id

    INNER JOIN subjects sub
      ON sub.id = cs.subject_id

    WHERE
      s.id = ?
      AND cs.status = 'active'
      AND sub.status = 'active'

    ORDER BY sub.subject_name ASC
    `,
    [studentId]
  );

  return rows;
};


// Student Attendance Summary
const getStudentDashboardAttendance = async (
  studentId
) => {

  const [rows] = await pool.query(
    `
    SELECT

      COUNT(*) AS total_days,

      SUM(
        CASE
          WHEN status = 'PRESENT'
          THEN 1
          ELSE 0
        END
      ) AS present_days,

      SUM(
        CASE
          WHEN status = 'ABSENT'
          THEN 1
          ELSE 0
        END
      ) AS absent_days

    FROM attendance

    WHERE student_id = ?
    `,
    [studentId]
  );

  const data = rows[0] || {};

  const totalDays =
    Number(data.total_days || 0);

  const presentDays =
    Number(data.present_days || 0);

  const absentDays =
    Number(data.absent_days || 0);

  const percentage =
    totalDays > 0
      ? Number(
          (
            (presentDays / totalDays) *
            100
          ).toFixed(2)
        )
      : 0;

  return {
    total_days: totalDays,
    present_days: presentDays,
    absent_days: absentDays,
    percentage
  };
};


// Student Marks / Results
const getStudentDashboardMarks = async (
  studentId
) => {

  const [rows] = await pool.query(
    `
    SELECT

      sm.id,
      sm.exam_id,
      sm.student_id,
      sm.subject_id,

      e.exam_name,

      sub.subject_name,
      sub.subject_code,

      sm.max_marks,
      sm.obtained_marks,
      sm.remarks,

      CASE
        WHEN sm.max_marks > 0
        THEN ROUND(
          (
            sm.obtained_marks /
            sm.max_marks
          ) * 100,
          2
        )
        ELSE 0
      END AS percentage

    FROM student_marks sm

    INNER JOIN exams e
      ON e.id = sm.exam_id

    INNER JOIN subjects sub
      ON sub.id = sm.subject_id

    WHERE sm.student_id = ?

    ORDER BY sm.id DESC
    `,
    [studentId]
  );

  return rows;
};


// Student Fees
const getStudentDashboardFees = async (
  studentId
) => {

  const [feeRows] = await pool.query(
    `
    SELECT

      COALESCE(
        SUM(amount),
        0
      ) AS total_fee,

      COUNT(*) AS fee_records

    FROM fees

    WHERE student_id = ?
    `,
    [studentId]
  );


  const [paymentRows] = await pool.query(
    `
    SELECT

      COALESCE(
        SUM(amount_paid),
        0
      ) AS paid_amount

    FROM student_fee_payments

    WHERE student_id = ?
    `,
    [studentId]
  );


  const totalFee =
    Number(
      feeRows[0]?.total_fee || 0
    );

  const paidAmount =
    Number(
      paymentRows[0]?.paid_amount || 0
    );

  const dueAmount =
    Math.max(
      totalFee - paidAmount,
      0
    );


  let status = "PAID";

  if (dueAmount > 0) {
    status = "PENDING";
  }


  return {
    total_fee: totalFee,
    paid_amount: paidAmount,
    due_amount: dueAmount,
    status
  };
};
module.exports = {

  createStudent,
  getAllStudents,
  getStudentsBySchool,
  updateStudentSchool,
  updateStudentBranch,
  getStudentById,
  updateStudent,
  updateStudentStatus,
  getStudentsWithPagination,
  searchStudents,
  findStudentByRollNumber,
  updateStudentPassword,
  getStudentPasswordById,

  // Dashboard
  getStudentDashboardProfile,
  getStudentDashboardSubjects,
  getStudentDashboardAttendance,
  getStudentDashboardMarks,
  getStudentDashboardFees

};