const pool = require("../config/db");

// ==========================================
// Create Academic Year Session
// ==========================================
const createAcademicYearSession = async (data) => {
  const [result] = await pool.query(
    `
    INSERT INTO tbl_academic_year_sessions (
      academic_year_id,
      session_name,
      session_number,
      start_date,
      end_date,
      is_current,
      status,
      created_by
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      data.academic_year_id,
      data.session_name,
      data.session_number,
      data.start_date,
      data.end_date,
      data.is_current,
      data.status,
      data.created_by,
    ]
  );

  return result;
};

// ==========================================
// Get All Academic Year Sessions
// ==========================================
const getAllAcademicYearSessions = async (
  academicYearId = null
) => {
  let query = `
    SELECT
      s.*,
      ay.academic_year_name
    FROM tbl_academic_year_sessions s
   LEFT JOIN academic_years ay
  ON ay.id = s.academic_year_id
  `;

  const params = [];

  if (academicYearId) {
    query += `
      WHERE s.academic_year_id = ?
    `;

    params.push(academicYearId);
  }

  query += `
    ORDER BY
      s.session_number ASC,
      s.session_id ASC
  `;

  const [rows] = await pool.query(
    query,
    params
  );

  return rows;
};

// ==========================================
// Get Academic Year Session By ID
// ==========================================
const getAcademicYearSessionById = async (
  id
) => {
  const [rows] = await pool.query(
    `
    SELECT
      s.*,
      ay.academic_year_name
    FROM tbl_academic_year_sessions s
    LEFT JOIN tbl_academic_years ay
      ON ay.academic_year_id = s.academic_year_id
    WHERE s.session_id = ?
    `,
    [id]
  );

  return rows[0];
};

// ==========================================
// Update Academic Year Session
// ==========================================
const updateAcademicYearSession = async (
  id,
  data
) => {
  const [result] = await pool.query(
    `
    UPDATE tbl_academic_year_sessions
    SET
      academic_year_id = ?,
      session_name = ?,
      session_number = ?,
      start_date = ?,
      end_date = ?,
      is_current = ?,
      status = ?,
      updated_by = ?,
      updated_at = NOW()
    WHERE session_id = ?
    `,
    [
      data.academic_year_id,
      data.session_name,
      data.session_number,
      data.start_date,
      data.end_date,
      data.is_current,
      data.status,
      data.updated_by,
      id,
    ]
  );

  return result;
};

// ==========================================
// Delete Academic Year Session
// ==========================================
const deleteAcademicYearSession = async (
  id
) => {
  const [result] = await pool.query(
    `
    DELETE FROM tbl_academic_year_sessions
    WHERE session_id = ?
    `,
    [id]
  );

  return result;
};

// ==========================================
// Check Duplicate Session
// ==========================================
const checkDuplicateAcademicYearSession =
  async (
    academicYearId,
    sessionName,
    sessionNumber,
    excludeId = null
  ) => {
    let query = `
      SELECT
        session_id
      FROM tbl_academic_year_sessions
      WHERE academic_year_id = ?
        AND (
          session_name = ?
          OR session_number = ?
        )
    `;

    const params = [
      academicYearId,
      sessionName,
      sessionNumber,
    ];

    if (excludeId !== null) {
      query += `
        AND session_id <> ?
      `;

      params.push(excludeId);
    }

    const [rows] = await pool.query(
      query,
      params
    );

    return rows;
  };

// ==========================================
// Get Current Academic Year Session
// ==========================================
const getCurrentAcademicYearSession = async (
  academicYearId
) => {
  const [rows] = await pool.query(
    `
    SELECT
      s.*,
      ay.academic_year_name
    FROM tbl_academic_year_sessions s
    LEFT JOIN tbl_academic_years ay
      ON ay.academic_year_id = s.academic_year_id
    WHERE s.academic_year_id = ?
      AND s.is_current = 1
      AND s.status = 'ACTIVE'
    ORDER BY s.session_number ASC
    `,
    [academicYearId]
  );

  return rows;
};

// ==========================================
// Reset Current Sessions
// ==========================================
const resetCurrentAcademicYearSessions =
  async (
    academicYearId,
    excludeId = null
  ) => {
    let query = `
      UPDATE tbl_academic_year_sessions
      SET
        is_current = 0,
        updated_at = NOW()
      WHERE academic_year_id = ?
    `;

    const params = [
      academicYearId,
    ];

    if (excludeId !== null) {
      query += `
        AND session_id <> ?
      `;

      params.push(excludeId);
    }

    await pool.query(
      query,
      params
    );
  };

// ==========================================
// Export
// ==========================================
module.exports = {
  createAcademicYearSession,
  getAllAcademicYearSessions,
  getAcademicYearSessionById,
  updateAcademicYearSession,
  deleteAcademicYearSession,
  checkDuplicateAcademicYearSession,
  getCurrentAcademicYearSession,
  resetCurrentAcademicYearSessions,
};