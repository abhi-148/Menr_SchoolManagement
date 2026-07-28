const pool = require("../config/db");

// ================= CREATE =================
const createFeeInstallment = async (data) => {

  const [result] = await pool.query(
    `INSERT INTO fee_installments
    (
      fee_structure_id,
      installment_no,
      installment_name,
      amount,
      due_date,
      late_fee,
      status,
      created_by,
      updated_by
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.fee_structure_id,
      data.installment_no,
      data.installment_name,
      data.amount,
      data.due_date,
      data.late_fee,
      data.status,
      data.created_by,
      data.updated_by || null
    ]
  );

  return result;
};

// ================= GET ALL =================
const getAllFeeInstallments = async () => {

  const [rows] = await pool.query(`
    SELECT
      fi.id,

      fi.fee_structure_id,
      fs.total_amount,

      s.school_name,
      b.batch_code,
      ay.academic_year_name,

      fi.installment_no,
      fi.installment_name,
      fi.amount,
      fi.due_date,
      fi.late_fee,
      fi.status

    FROM fee_installments fi

    INNER JOIN fee_structures fs
      ON fs.id = fi.fee_structure_id

    LEFT JOIN school s
      ON s.id = fs.school_id

    LEFT JOIN tbl_batches b
      ON b.batch_id = fs.batch_id

    LEFT JOIN academic_years ay
      ON ay.id = fs.academic_year_id

    ORDER BY fi.installment_no ASC
  `);

  return rows;
};

// ================= GET BY FEE STRUCTURE =================
const getInstallmentsByFeeStructure = async (feeStructureId) => {

  const [rows] = await pool.query(
    `SELECT *
     FROM fee_installments
     WHERE fee_structure_id = ?
     ORDER BY installment_no ASC`,
    [feeStructureId]
  );

  return rows;
};

// ================= UPDATE =================
const updateFeeInstallment = async (id, data) => {

  const [result] = await pool.query(
    `UPDATE fee_installments
     SET
       fee_structure_id=?,
       installment_no=?,
       installment_name=?,
       amount=?,
       due_date=?,
       late_fee=?,
       status=?,
       updated_by=?,
       updated_at=NOW()
     WHERE id=?`,
    [
      data.fee_structure_id,
      data.installment_no,
      data.installment_name,
      data.amount,
      data.due_date,
      data.late_fee,
      data.status,
      data.updated_by,
      id
    ]
  );

  return result;
};

// ================= DELETE =================
const deleteFeeInstallment = async (id) => {

  const [result] = await pool.query(
    `DELETE
     FROM fee_installments
     WHERE id=?`,
    [id]
  );

  return result;
};

module.exports = {
  createFeeInstallment,
  getAllFeeInstallments,
  getInstallmentsByFeeStructure,
  updateFeeInstallment,
  deleteFeeInstallment
};