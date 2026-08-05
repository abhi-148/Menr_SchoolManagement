const pool = require("../config/db");

// ==========================================
// Create Branch
// ==========================================
const createBranch = async (data) => {
  const [result] = await pool.query(
    `
    INSERT INTO tbl_school_branches (

        school_id,

        branch_code,

        branch_name,

        branch_type,

        address,

        city,

        state,

        country,

        pincode,

        phone,

        email,

        principal_name,

        establishment_date,

        status,

        created_by

    )

    VALUES(

        ?,?,?,?,?,?,
        ?,?,?,?,?,?,
        ?,?,?

    )
`,
    [
      data.school_id,

      data.branch_code,

      data.branch_name,

      data.branch_type,

      data.address,

      data.city,

      data.state,

      data.country,

      data.pincode,

      data.phone,

      data.email,

      data.principal_name,

      data.establishment_date,

      data.status,

      data.created_by,
    ]
  );

  return result;
};

// ==========================================
// Get All Branches
// ==========================================
const getAllBranches = async () => {
  const [rows] = await pool.query(`
        SELECT

            b.*,

            s.school_name

        FROM tbl_school_branches b

        INNER JOIN school s

            ON s.id=b.school_id

        ORDER BY

            b.branch_name ASC
    `);

  return rows;
};

// ==========================================
// Get Branch By Id
// ==========================================
const getBranchById = async (id) => {
  const [rows] = await pool.query(
    `
        SELECT

            b.*,

            s.school_name

        FROM tbl_school_branches b

        INNER JOIN school s

            ON s.id=b.school_id

        WHERE

            b.branch_id=?
`,
    [id]
  );

  return rows[0];
};

// ==========================================
// Update Branch
// ==========================================
const updateBranch = async (id, data) => {
  const [result] = await pool.query(
    `
        UPDATE tbl_school_branches

        SET

            branch_code=?,

            branch_name=?,

            branch_type=?,

            address=?,

            city=?,

            state=?,

            country=?,

            pincode=?,

            phone=?,

            email=?,

            principal_name=?,

            establishment_date=?,

            status=?,

            updated_by=?,

            updated_at=NOW()

        WHERE

            branch_id=?
`,
    [
      data.branch_code,

      data.branch_name,

      data.branch_type,

      data.address,

      data.city,

      data.state,

      data.country,

      data.pincode,

      data.phone,

      data.email,

      data.principal_name,

      data.establishment_date,

      data.status,

      data.updated_by,

      id,
    ]
  );

  return result;
};

// ==========================================
// Delete Branch
// ==========================================
const deleteBranch = async (id) => {
  const [result] = await pool.query(
    `
        DELETE FROM

            tbl_school_branches

        WHERE

            branch_id=?
`,
    [id]
  );

  return result;
};

module.exports = {
  createBranch,
  getAllBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
};