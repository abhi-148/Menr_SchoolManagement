const pool = require("../config/db");

// =========================================================
// SUPER ADMIN DASHBOARD
// =========================================================

const getDashboardStats = async () => {

  // =======================================================
  // BASIC COUNTS
  // =======================================================

  const [schools] = await pool.query(`
    SELECT COUNT(*) AS totalSchools
    FROM school
  `);

  const [branches] = await pool.query(`
    SELECT COUNT(*) AS totalBranches
    FROM school_branches
  `);

  const [staff] = await pool.query(`
    SELECT COUNT(*) AS totalStaff
    FROM staff
  `);

  const [students] = await pool.query(`
    SELECT COUNT(*) AS totalStudents
    FROM student
  `);

  const [classes] = await pool.query(`
    SELECT COUNT(*) AS totalClasses
    FROM classes
  `);

  const [subjects] = await pool.query(`
    SELECT COUNT(*) AS totalSubjects
    FROM subjects
  `);

  const [staffTypes] = await pool.query(`
    SELECT COUNT(*) AS totalStaffTypes
    FROM staff_type
  `);

  const [departments] = await pool.query(`
    SELECT COUNT(*) AS totalDepartments
    FROM staff_department
  `);

  // =======================================================
  // ATTENDANCE
  // =======================================================

  const [present] = await pool.query(`
    SELECT COUNT(*) AS presentToday
    FROM attendance
    WHERE attendance_date = CURDATE()
      AND status = 'PRESENT'
  `);

  const [absent] = await pool.query(`
    SELECT COUNT(*) AS absentToday
    FROM attendance
    WHERE attendance_date = CURDATE()
      AND status = 'ABSENT'
  `);

  const presentToday =
    Number(present[0]?.presentToday || 0);

  const absentToday =
    Number(absent[0]?.absentToday || 0);

  const totalAttendance =
    presentToday + absentToday;

  const attendancePercentage =
    totalAttendance === 0
      ? 0
      : Number(
          ((presentToday * 100) / totalAttendance).toFixed(2)
        );

  // =======================================================
  // FEES
  // =======================================================

  const [todayCollection] = await pool.query(`
    SELECT
      COALESCE(SUM(amount_paid), 0) AS todayCollection
    FROM student_fee_payments
    WHERE DATE(payment_date) = CURDATE()
  `);

  const [totalCollection] = await pool.query(`
    SELECT
      COALESCE(SUM(amount_paid), 0) AS totalCollection
    FROM student_fee_payments
  `);

  const [feeStructures] = await pool.query(`
    SELECT COUNT(*) AS totalFeeStructures
    FROM fee_structures
  `);

  const [recentPayments] = await pool.query(`
    SELECT
      id,
      student_id,
      amount_paid,
      payment_date
    FROM student_fee_payments
    ORDER BY id DESC
    LIMIT 5
  `);

  // =======================================================
  // ACADEMIC YEARS
  // =======================================================

  const [academicYears] = await pool.query(`
    SELECT COUNT(*) AS totalAcademicYears
    FROM academic_years
  `);

  const [currentAcademicYear] = await pool.query(`
    SELECT
      id,
      academic_year_name,
      semester,
      start_date,
      end_date,
      is_current,
      status
    FROM academic_years
    WHERE is_current = 1
    ORDER BY id DESC
    LIMIT 1
  `);

  // =======================================================
  // ACADEMIC YEAR SESSIONS
  // =======================================================

  const [sessions] = await pool.query(`
    SELECT COUNT(*) AS totalSessions
    FROM tbl_academic_year_sessions
  `);

  const [currentSession] = await pool.query(`
    SELECT
      session_id,
      academic_year_id,
      session_name,
      session_number,
      start_date,
      end_date,
      is_current,
      status
    FROM tbl_academic_year_sessions
    WHERE is_current = 1
    ORDER BY session_id DESC
    LIMIT 1
  `);

  // =======================================================
  // LATEST STUDENTS
  // =======================================================

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

  // =======================================================
  // LATEST STAFF
  // =======================================================

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

  // =======================================================
  // ACTIVE / INACTIVE STUDENTS
  // =======================================================

  const [activeStudents] = await pool.query(`
    SELECT COUNT(*) AS count
    FROM student
    WHERE LOWER(status) = 'active'
  `);

  const [inactiveStudents] = await pool.query(`
    SELECT COUNT(*) AS count
    FROM student
    WHERE LOWER(status) = 'inactive'
  `);

  // =======================================================
  // ACTIVE / INACTIVE STAFF
  // =======================================================

  const [activeStaff] = await pool.query(`
    SELECT COUNT(*) AS count
    FROM staff
    WHERE LOWER(status) = 'active'
  `);

  const [inactiveStaff] = await pool.query(`
    SELECT COUNT(*) AS count
    FROM staff
    WHERE LOWER(status) = 'inactive'
  `);

  // =======================================================
  // RESULT
  // =======================================================

  return {

    statistics: {

      totalSchools:
        Number(schools[0]?.totalSchools || 0),

      totalBranches:
        Number(branches[0]?.totalBranches || 0),

      totalStaff:
        Number(staff[0]?.totalStaff || 0),

      totalStudents:
        Number(students[0]?.totalStudents || 0),

      totalClasses:
        Number(classes[0]?.totalClasses || 0),

      totalSubjects:
        Number(subjects[0]?.totalSubjects || 0),

      totalStaffTypes:
        Number(staffTypes[0]?.totalStaffTypes || 0),

      totalDepartments:
        Number(departments[0]?.totalDepartments || 0),

      presentToday,

      absentToday,

      attendancePercentage,

      todayCollection:
        Number(todayCollection[0]?.todayCollection || 0),

      totalCollection:
        Number(totalCollection[0]?.totalCollection || 0),

      totalFeeStructures:
        Number(feeStructures[0]?.totalFeeStructures || 0),

      totalAcademicYears:
        Number(academicYears[0]?.totalAcademicYears || 0),

      totalSessions:
        Number(sessions[0]?.totalSessions || 0),

      activeStudents:
        Number(activeStudents[0]?.count || 0),

      inactiveStudents:
        Number(inactiveStudents[0]?.count || 0),

      activeStaff:
        Number(activeStaff[0]?.count || 0),

      inactiveStaff:
        Number(inactiveStaff[0]?.count || 0)
    },

    currentAcademicYear:
      currentAcademicYear[0] || null,

    currentSession:
      currentSession[0] || null,

    latestStudents,

    latestStaff,

    recentPayments
  };
};


// =========================================================
// SCHOOL ADMIN DASHBOARD
// =========================================================

// =========================================================
// SCHOOL ADMIN DASHBOARD
// =========================================================

const getSchoolDashboardStats = async (schoolId) => {

  // =======================================================
  // BASIC COUNTS
  // =======================================================

  const [branches] = await pool.query(`
    SELECT COUNT(*) AS totalBranches
    FROM school_branches
    WHERE school_id = ?
  `, [schoolId]);


  const [staff] = await pool.query(`
    SELECT COUNT(*) AS totalStaff
    FROM staff
    WHERE school_id = ?
  `, [schoolId]);


  const [students] = await pool.query(`
    SELECT COUNT(*) AS totalStudents
    FROM student
    WHERE school_id = ?
  `, [schoolId]);


  // School-specific classes
  const [classes] = await pool.query(`
    SELECT COUNT(*) AS totalClasses
    FROM school_classes
    WHERE school_id = ?
  `, [schoolId]);


  const [subjects] = await pool.query(`
    SELECT COUNT(*) AS totalSubjects
    FROM subjects
  `);


  const [staffTypes] = await pool.query(`
    SELECT COUNT(*) AS totalStaffTypes
    FROM staff_type
  `);


  const [departments] = await pool.query(`
    SELECT COUNT(*) AS totalDepartments
    FROM staff_department
  `);


  // =======================================================
  // ATTENDANCE
  // =======================================================

  const [present] = await pool.query(`
    SELECT COUNT(*) AS presentToday

    FROM attendance a

    INNER JOIN student s
      ON a.student_id = s.id

    WHERE s.school_id = ?
      AND a.status = 'PRESENT'
      AND a.attendance_date = CURDATE()
  `, [schoolId]);


  const [absent] = await pool.query(`
    SELECT COUNT(*) AS absentToday

    FROM attendance a

    INNER JOIN student s
      ON a.student_id = s.id

    WHERE s.school_id = ?
      AND a.status = 'ABSENT'
      AND a.attendance_date = CURDATE()
  `, [schoolId]);


  const presentToday =
    Number(
      present[0]?.presentToday || 0
    );


  const absentToday =
    Number(
      absent[0]?.absentToday || 0
    );


  const totalAttendance =
    presentToday + absentToday;


  const attendancePercentage =
    totalAttendance === 0
      ? 0
      : Number(
          (
            (presentToday * 100) /
            totalAttendance
          ).toFixed(2)
        );


  // =======================================================
  // FEES
  // =======================================================

  const [todayCollection] =
    await pool.query(`
      SELECT
        COALESCE(
          SUM(sfp.amount_paid),
          0
        ) AS todayCollection

      FROM student_fee_payments sfp

      INNER JOIN student s
        ON sfp.student_id = s.id

      WHERE s.school_id = ?
        AND DATE(
          sfp.payment_date
        ) = CURDATE()
    `, [schoolId]);


  const [totalCollection] =
    await pool.query(`
      SELECT
        COALESCE(
          SUM(sfp.amount_paid),
          0
        ) AS totalCollection

      FROM student_fee_payments sfp

      INNER JOIN student s
        ON sfp.student_id = s.id

      WHERE s.school_id = ?
    `, [schoolId]);


  const [feeStructures] =
    await pool.query(`
      SELECT COUNT(*) AS totalFeeStructures
      FROM fee_structures
    `);


  // =======================================================
  // RECENT PAYMENTS
  // =======================================================

  const [recentPayments] =
    await pool.query(`
      SELECT

        sfp.id,

        sfp.student_id,

        s.full_name AS student_name,

        s.roll_number,

        sfp.fee_structure_id,

        fs.fee_type,

        sfp.amount_paid,

        sfp.payment_date,

        sfp.payment_mode,

        sfp.receipt_no,

        sfp.remarks

      FROM student_fee_payments sfp

      INNER JOIN student s
        ON s.id = sfp.student_id

      LEFT JOIN fee_structures fs
        ON fs.id = sfp.fee_structure_id

      WHERE s.school_id = ?

      ORDER BY sfp.id DESC

      LIMIT 5
    `, [schoolId]);


  // =======================================================
  // LATEST STUDENTS
  // =======================================================

  const [latestStudents] =
    await pool.query(`
      SELECT

        s.id,

        s.full_name,

        s.roll_number,

        s.status,

        s.created_at,

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

      LIMIT 5
    `, [schoolId]);


  // =======================================================
  // LATEST STAFF
  // =======================================================

  const [latestStaff] =
    await pool.query(`
      SELECT

        id,

        full_name,

        designation,

        email,

        phone,

        status,

        created_at

      FROM staff

      WHERE school_id = ?

      ORDER BY id DESC

      LIMIT 5
    `, [schoolId]);


  // =======================================================
  // ACTIVE / INACTIVE STUDENTS
  // =======================================================

  const [activeStudents] =
    await pool.query(`
      SELECT COUNT(*) AS count

      FROM student

      WHERE school_id = ?

        AND LOWER(status) = 'active'
    `, [schoolId]);


  const [inactiveStudents] =
    await pool.query(`
      SELECT COUNT(*) AS count

      FROM student

      WHERE school_id = ?

        AND LOWER(status) = 'inactive'
    `, [schoolId]);


  // =======================================================
  // ACTIVE / INACTIVE STAFF
  // =======================================================

  const [activeStaff] =
    await pool.query(`
      SELECT COUNT(*) AS count

      FROM staff

      WHERE school_id = ?

        AND LOWER(status) = 'active'
    `, [schoolId]);


  const [inactiveStaff] =
    await pool.query(`
      SELECT COUNT(*) AS count

      FROM staff

      WHERE school_id = ?

        AND LOWER(status) = 'inactive'
    `, [schoolId]);


  // =======================================================
  // SCHOOL & BRANCH WISE DATA
  // =======================================================

  const [branchWiseData] =
    await pool.query(`
      SELECT

        sb.id AS branchId,

        sb.branch_name AS branchName,

        sb.branch_code AS branchCode,

        sb.school_id AS schoolId,

        s.school_name AS schoolName,

        (
          SELECT COUNT(*)

          FROM student st

          WHERE st.branch_id = sb.id
        ) AS totalStudents,

        (
          SELECT COUNT(*)

          FROM staff sf

          WHERE sf.branch_id = sb.id
        ) AS totalStaff

      FROM school_branches sb

      INNER JOIN school s
        ON s.id = sb.school_id

      WHERE sb.school_id = ?

        AND LOWER(sb.status) = 'active'

      ORDER BY
        sb.branch_name
    `, [schoolId]);


  // =======================================================
  // UPCOMING EVENTS
  // =======================================================

  const [upcomingEvents] =
    await pool.query(`
      SELECT

        e.id,

        e.event_name,

        e.event_type,

        e.event_date,

        e.start_time,

        e.end_time,

        e.venue,

        e.organizer,

        e.status,

        s.school_name AS schoolName,

        sb.branch_name AS branchName

      FROM events e

      LEFT JOIN school s
        ON s.id = e.school_id

      LEFT JOIN school_branches sb
        ON sb.id = e.branch_id

      WHERE e.school_id = ?

        AND e.event_date >= CURDATE()

      ORDER BY
        e.event_date ASC,
        e.start_time ASC

      LIMIT 5
    `, [schoolId]);


  // =======================================================
  // RESULT
  // =======================================================

  return {

    statistics: {

      totalBranches:
        Number(
          branches[0]?.totalBranches || 0
        ),

      totalStaff:
        Number(
          staff[0]?.totalStaff || 0
        ),

      totalStudents:
        Number(
          students[0]?.totalStudents || 0
        ),

      totalClasses:
        Number(
          classes[0]?.totalClasses || 0
        ),

      totalSubjects:
        Number(
          subjects[0]?.totalSubjects || 0
        ),

      totalStaffTypes:
        Number(
          staffTypes[0]?.totalStaffTypes || 0
        ),

      totalDepartments:
        Number(
          departments[0]?.totalDepartments || 0
        ),

      presentToday,

      absentToday,

      attendancePercentage,

      todayCollection:
        Number(
          todayCollection[0]?.todayCollection || 0
        ),

      totalCollection:
        Number(
          totalCollection[0]?.totalCollection || 0
        ),

      totalFeeStructures:
        Number(
          feeStructures[0]?.totalFeeStructures || 0
        ),

      activeStudents:
        Number(
          activeStudents[0]?.count || 0
        ),

      inactiveStudents:
        Number(
          inactiveStudents[0]?.count || 0
        ),

      activeStaff:
        Number(
          activeStaff[0]?.count || 0
        ),

      inactiveStaff:
        Number(
          inactiveStaff[0]?.count || 0
        )

    },

    latestStudents,

    latestStaff,

    recentPayments,

    branchWiseData,

    upcomingEvents

  };

};


module.exports = {
  getDashboardStats,
  getSchoolDashboardStats
};