const pool = require("../config/db");

// Create Fee Structure
// Create Fee Structure
const createFeeStructure = async (data) => {

  const [result] = await pool.query(
    `INSERT INTO fee_structures
    (
      school_id,
      batch_id,
      academic_year_id,
      total_amount,
      due_date,
      late_fee_rules,
      payment_type,
      number_of_installments,
      status,
      active_key,
      created_by,
      updated_by
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.school_id,
      data.batch_id,
      data.academic_year_id,
      data.total_amount,
      data.due_date,
      data.late_fee_rules
        ? JSON.stringify(data.late_fee_rules)
        : null,
      data.payment_type,
      data.number_of_installments,
      data.status || "active",
      data.active_key,
      data.created_by,
      data.updated_by || null
    ]
  );

  return result;
};

// Get All
// Get All
const getAllFeeStructures = async () => {

  const [rows] = await pool.query(`
    SELECT
      fs.id,

      fs.school_id,
      s.school_name,

      fs.batch_id,
      b.batch_code,

      fs.academic_year_id,
      ay.academic_year_name,

      fs.total_amount,
      fs.due_date,
      fs.payment_type,
      fs.number_of_installments,
      fs.status

    FROM fee_structures fs

    LEFT JOIN school s
      ON s.id = fs.school_id

    LEFT JOIN tbl_batches b
      ON b.batch_id = fs.batch_id

    LEFT JOIN academic_years ay
      ON ay.id = fs.academic_year_id

    ORDER BY fs.id DESC
  `);

  return rows;
};

// Get By Class
const getFeeStructuresByClass =
async (schoolClassId) => {

  const [rows] = await pool.query(
    `
    SELECT *
    FROM fee_structures
    WHERE school_class_id = ?
    `,
    [schoolClassId]
  );

  return rows;
};

// Update
const updateFeeStructure = async (id, data) => {

  const [result] = await pool.query(
    `
    UPDATE fee_structures
    SET
      school_id=?,
      batch_id=?,
      academic_year_id=?,
      total_amount=?,
      due_date=?,
      late_fee_rules=?,
      payment_type=?,
      number_of_installments=?,
      status=?,
      active_key=?,
      updated_by=?,
      updated_at=NOW()
    WHERE id=?
    `,
    [
      data.school_id,
      data.batch_id,
      data.academic_year_id,
      data.total_amount,
      data.due_date,
      data.late_fee_rules
        ? JSON.stringify(data.late_fee_rules)
        : null,
      data.payment_type,
      data.number_of_installments,
      data.status,
      data.active_key,
      data.updated_by,
      id
    ]
  );

  return result;
};

// Delete
const deleteFeeStructure =
async (id) => {

  const [result] = await pool.query(
    `
    DELETE FROM fee_structures
    WHERE id = ?
    `,
    [id]
  );

  return result;
};

module.exports = {
  createFeeStructure,
  getAllFeeStructures,
  getFeeStructuresByClass,
  updateFeeStructure,
  deleteFeeStructure
};