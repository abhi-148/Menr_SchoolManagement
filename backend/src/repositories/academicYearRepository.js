const pool = require("../config/db");

// Create
// ===============================
// Create Academic Year
// ===============================
const createAcademicYear = async (data) => {
  const [result] = await pool.query(
    `
    INSERT INTO academic_years (
      school_id,
      branch_id,
      academic_year_name,
      semester,
      start_date,
      end_date,
      is_current,
      status,
      created_by
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      data.school_id,
      data.branch_id,
      data.academic_year_name,
      data.semester,
      data.start_date,
      data.end_date,
      data.is_current,
      data.status,
      data.created_by,
    ]
  );

  return result;
};

// Get All
const getAllAcademicYears = async () => {

  const [rows] = await pool.query(
    `
  SELECT
ay.*,
s.school_name,
sb.branch_name
FROM academic_years ay
LEFT JOIN school s
ON ay.school_id = s.id
LEFT JOIN school_branches sb
ON ay.branch_id = sb.id
ORDER BY ay.id DESC
    `
  );

  return rows;
};

// Get By Id
const getAcademicYearById = async (id) => {

  const [rows] = await pool.query(
    `
    SELECT
      ay.*,
      s.school_name,
      sb.branch_name
    FROM academic_years ay
    LEFT JOIN school s
    ON ay.school_id = s.id
    LEFT JOIN school_branches sb
    ON ay.branch_id = sb.id
    WHERE ay.id = ?
    `,
    [id]
  );

  return rows[0];
};

// Update
const updateAcademicYear = async (
  id,
  data
) => {

  const [result] = await pool.query(
    `
    UPDATE academic_years
    SET
      academic_year_name = ?,
      start_date = ?,
      end_date = ?,
      status = ?,
      updated_by = ?,
      updated_at = NOW()
    WHERE id = ?
    `,
    [
      data.academic_year_name,
      data.start_date,
      data.end_date,
      data.status,
      data.updated_by,
      id
    ]
  );

  return result;
};

// Delete
const deleteAcademicYear = async (id) => {

  const [result] = await pool.query(
    `
    DELETE FROM academic_years
    WHERE id = ?
    `,
    [id]
  );

  return result;
};
// Get Academic Years By School
const getAcademicYearsBySchool = async (
  schoolId
) => {

  const [rows] = await pool.query(
    `
    SELECT
      ay.*,
      s.school_name,
      sb.branch_name
    FROM academic_years ay
    LEFT JOIN school s
    ON ay.school_id = s.id
    LEFT JOIN school_branches sb
    ON ay.branch_id = sb.id
    WHERE ay.school_id = ?
    ORDER BY ay.id DESC
    `,
    [schoolId]
  );

  return rows;

};

const checkDuplicateAcademicYear = async (
  schoolId,
  branchId,
  academicYearName
) => {
  const [rows] = await pool.query(
    `
    SELECT id
    FROM academic_years
    WHERE school_id = ?
      AND branch_id = ?
      AND academic_year_name = ?
    `,
    [schoolId, branchId, academicYearName]
  );

  return rows;
};


const getCurrentAcademicYear = async (
  schoolId,
  branchId
) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM academic_years
    WHERE school_id = ?
      AND branch_id = ?
      AND is_current = 1
    `,
    [schoolId, branchId]
  );

  return rows;
};
module.exports = {
  createAcademicYear,
  getAllAcademicYears,
  getAcademicYearsBySchool,
  getAcademicYearById,
  updateAcademicYear,
  deleteAcademicYear,
  checkDuplicateAcademicYear,
  getCurrentAcademicYear
};