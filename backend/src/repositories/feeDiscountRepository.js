const db = require("../config/db");

// ================= CREATE =================

const createFeeDiscount = async (data) => {

  const sql = `
    INSERT INTO fee_discounts
    (
      fee_structure_id,
      discount_name,
      discount_type,
      discount_value,
      start_date,
      end_date,
      status,
      created_by,
      updated_by
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    data.fee_structure_id,
    data.discount_name,
    data.discount_type,
    data.discount_value,
    data.start_date,
    data.end_date,
    data.status,
    data.created_by,
    data.updated_by
  ];

  const [result] = await db.query(sql, values);

  return result;

};

// ================= GET ALL =================

const getAllFeeDiscounts = async () => {

  const sql = `
    SELECT

      fd.*,

      fs.total_amount,

      s.school_name,

      b.batch_code,

      ay.academic_year_name

    FROM fee_discounts fd

    INNER JOIN fee_structures fs
      ON fd.fee_structure_id = fs.id

    LEFT JOIN school s
      ON fs.school_id = s.id

    LEFT JOIN tbl_batches b
ON fs.batch_id = b.batch_id

    LEFT JOIN academic_years ay
      ON fs.academic_year_id = ay.id

    ORDER BY fd.id DESC
  `;

  const [rows] = await db.query(sql);

  return rows;

};

// ================= GET BY ID =================

const getFeeDiscountById = async (id) => {

  const [rows] = await db.query(

    `
      SELECT *
      FROM fee_discounts
      WHERE id=?
    `,

    [id]

  );

  return rows[0];

};

// ================= UPDATE =================

const updateFeeDiscount = async (id, data) => {

  const sql = `
    UPDATE fee_discounts
    SET

      fee_structure_id=?,
      discount_name=?,
      discount_type=?,
      discount_value=?,
      start_date=?,
      end_date=?,
      status=?,
      updated_by=?

    WHERE id=?
  `;

  const values = [

    data.fee_structure_id,
    data.discount_name,
    data.discount_type,
    data.discount_value,
    data.start_date,
    data.end_date,
    data.status,
    data.updated_by,
    id

  ];

  const [result] = await db.query(sql, values);

  return result;

};

// ================= DELETE =================

const deleteFeeDiscount = async (id) => {

  const [result] = await db.query(

    `
      DELETE
      FROM fee_discounts
      WHERE id=?
    `,

    [id]

  );

  return result;

};

module.exports = {

  createFeeDiscount,

  getAllFeeDiscounts,

  getFeeDiscountById,

  updateFeeDiscount,

  deleteFeeDiscount

};