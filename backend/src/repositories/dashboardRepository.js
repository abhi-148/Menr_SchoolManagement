const pool = require("../config/db");

/* =========================================================
   SUPER ADMIN DASHBOARD
========================================================= */

const getDashboardStats = async () => {
  /* ---------- Statistics ---------- */

  const [schools] = await pool.query(`
    SELECT COUNT(*) AS totalSchools
    FROM school
  `);

  const [staff] = await pool.query(`
    SELECT COUNT(*) AS totalStaff
    FROM staff
  `);

  const [students] = await pool.query(`
    SELECT COUNT(*) AS totalStudents
    FROM student
  `);

  const [staffTypes] = await pool.query(`
    SELECT COUNT(*) AS totalStaffTypes
    FROM staff_type
  `);

  const [departments] = await pool.query(`
    SELECT COUNT(*) AS totalDepartments
    FROM staff_department
  `);

  /* ---------- Attendance ---------- */

  const [present] = await pool.query(`
    SELECT COUNT(*) AS presentToday
    FROM attendance
    WHERE attendance_date = CURDATE()
      AND status='PRESENT'
  `);

  const [absent] = await pool.query(`
    SELECT COUNT(*) AS absentToday
    FROM attendance
    WHERE attendance_date = CURDATE()
      AND status='ABSENT'
  `);

  const totalAttendance =
    Number(present[0].presentToday) +
    Number(absent[0].absentToday);

  const attendancePercentage =
    totalAttendance === 0
      ? 0
      : Number(
          (
            (present[0].presentToday * 100) /
            totalAttendance
          ).toFixed(2)
        );

  /* ---------- Fee Summary ---------- */

  const [todayCollection] = await pool.query(`
    SELECT
      COALESCE(SUM(amount_paid),0)
      AS todayCollection
    FROM student_fee_payments
    WHERE DATE(payment_date)=CURDATE()
  `);

  const [totalCollection] = await pool.query(`
    SELECT
      COALESCE(SUM(amount_paid),0)
      AS totalCollection
    FROM student_fee_payments
  `);

  const [feeStructures] = await pool.query(`
    SELECT COUNT(*) AS totalFeeStructures
    FROM fee_structures
  `);

  /* ---------- Latest Students ---------- */

  const [latestStudents] = await pool.query(`
    SELECT
      id,
      full_name,
      roll_number,
      class_name,
      section,
      status,
      created_at
    FROM student
    ORDER BY id DESC
    LIMIT 5
  `);

  // ===== Part 1B starts from here =====

    /* ---------- Latest Staff ---------- */

  const [latestStaff] = await pool.query(`
    SELECT
      id,
      full_name,
      designation,
      email,
      phone,
      status,
      created_at
    FROM staff
    ORDER BY id DESC
    LIMIT 5
  `);

  /* ---------- Dashboard Result ---------- */

  return {

    statistics: {

      totalSchools:
        schools[0].totalSchools,

      totalStaff:
        staff[0].totalStaff,

      totalStudents:
        students[0].totalStudents,

      totalStaffTypes:
        staffTypes[0].totalStaffTypes,

      totalDepartments:
        departments[0].totalDepartments,

      presentToday:
        present[0].presentToday,

      absentToday:
        absent[0].absentToday,

      attendancePercentage,

      todayCollection:
        todayCollection[0].todayCollection,

      totalCollection:
        totalCollection[0].totalCollection,

      totalFeeStructures:
        feeStructures[0].totalFeeStructures

    },

    latestStudents,

    latestStaff

  };

};


/* =========================================================
   SCHOOL ADMIN DASHBOARD
========================================================= */

const getSchoolDashboardStats = async (
  schoolId
) => {

  const [staff] = await pool.query(`
    SELECT COUNT(*) AS totalStaff
    FROM staff
    WHERE school_id = ?
  `,[schoolId]);

  const [students] = await pool.query(`
    SELECT COUNT(*) AS totalStudents
    FROM student
    WHERE school_id = ?
  `,[schoolId]);

  const [present] = await pool.query(`
    SELECT COUNT(*) AS presentToday
    FROM attendance a
    INNER JOIN student s
      ON a.student_id=s.id
    WHERE
      s.school_id=?
      AND a.status='PRESENT'
      AND a.attendance_date=CURDATE()
  `,[schoolId]);

  const [absent] = await pool.query(`
    SELECT COUNT(*) AS absentToday
    FROM attendance a
    INNER JOIN student s
      ON a.student_id=s.id
    WHERE
      s.school_id=?
      AND a.status='ABSENT'
      AND a.attendance_date=CURDATE()
  `,[schoolId]);

  const totalAttendance =
    Number(present[0].presentToday) +
    Number(absent[0].absentToday);

  const attendancePercentage =
    totalAttendance===0
      ?0
      :Number(
        (
          (present[0].presentToday*100)/
          totalAttendance
        ).toFixed(2)
      );

  // ===== Part 2 starts from here =====

    /* ---------- Today's Fee Collection ---------- */

  const [todayCollection] = await pool.query(
    `
    SELECT
      COALESCE(SUM(amount_paid),0)
      AS todayCollection
    FROM student_fee_payments sfp
    INNER JOIN student s
      ON sfp.student_id = s.id
    WHERE
      s.school_id = ?
      AND DATE(sfp.payment_date)=CURDATE()
    `,
    [schoolId]
  );

  /* ---------- Total Fee Collection ---------- */

  const [totalCollection] = await pool.query(
    `
    SELECT
      COALESCE(SUM(amount_paid),0)
      AS totalCollection
    FROM student_fee_payments sfp
    INNER JOIN student s
      ON sfp.student_id=s.id
    WHERE s.school_id=?
    `,
    [schoolId]
  );

  /* ---------- Latest Students ---------- */

  const [latestStudents] = await pool.query(
    `
    SELECT
      id,
      full_name,
      class_name,
      section,
      roll_number,
      status,
      created_at
    FROM student
    WHERE school_id=?
    ORDER BY id DESC
    LIMIT 5
    `,
    [schoolId]
  );

  /* ---------- Latest Staff ---------- */

  const [latestStaff] = await pool.query(
    `
    SELECT
      id,
      full_name,
      designation,
      email,
      phone,
      status,
      created_at
    FROM staff
    WHERE school_id=?
    ORDER BY id DESC
    LIMIT 5
    `,
    [schoolId]
  );

  return {

    statistics: {

      totalStaff:
        staff[0].totalStaff,

      totalStudents:
        students[0].totalStudents,

      presentToday:
        present[0].presentToday,

      absentToday:
        absent[0].absentToday,

      attendancePercentage,

      todayCollection:
        todayCollection[0].todayCollection,

      totalCollection:
        totalCollection[0].totalCollection

    },

    latestStudents,

    latestStaff

  };

};

module.exports = {

  getDashboardStats,

  getSchoolDashboardStats

};