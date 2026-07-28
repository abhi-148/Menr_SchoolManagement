const db = require("../config/db");

// ================= CREATE =================

const createFeeConcession = async (data) => {

  const sql = `
    INSERT INTO student_fee_concessions
    (
      student_id,
      fee_structure_id,
      concession_name,
      concession_mode,
      concession_value,
      remarks,
      status,
      created_by,
      updated_by
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    data.student_id,
    data.fee_structure_id,
    data.concession_name,
    data.concession_mode,
    data.concession_value,
    data.remarks,
    data.status,
    data.created_by,
    data.updated_by
  ];

  const [result] = await db.query(sql, values);

  return result;
};

// ================= GET ALL =================

const getAllFeeConcessions = async () => {

  const sql = `
    SELECT

      fc.*,

      st.student_name,

      fs.total_amount

    FROM student_fee_concessions fc

    LEFT JOIN student st
      ON fc.student_id = st.id

    LEFT JOIN fee_structures fs
      ON fc.fee_structure_id = fs.id

    ORDER BY fc.id DESC
  `;

  const [rows] = await db.query(sql);

  return rows;
};

// ================= GET BY ID =================

const getFeeConcessionById = async (id) => {

  const [rows] = await db.query(
    `
      SELECT *
      FROM student_fee_concessions
      WHERE id=?
    `,
    [id]
  );

  return rows[0];
};

// ================= UPDATE =================

const updateFeeConcession = async (id, data) => {

  const sql = `
    UPDATE student_fee_concessions
    SET

      student_id=?,
      fee_structure_id=?,
      concession_name=?,
      concession_mode=?,
      concession_value=?,
      remarks=?,
      status=?,
      updated_by=?

    WHERE id=?
  `;

  const values = [
    data.student_id,
    data.fee_structure_id,
    data.concession_name,
    data.concession_mode,
    data.concession_value,
    data.remarks,
    data.status,
    data.updated_by,
    id
  ];

  const [result] = await db.query(sql, values);

  return result;
};

// ================= DELETE =================

const deleteFeeConcession = async (id) => {

  const [result] = await db.query(
    `
      DELETE
      FROM student_fee_concessions
      WHERE id=?
    `,
    [id]
  );

  return result;
};

module.exports = {

  createFeeConcession,

  getAllFeeConcessions,

  getFeeConcessionById,

  updateFeeConcession,

  deleteFeeConcession

};