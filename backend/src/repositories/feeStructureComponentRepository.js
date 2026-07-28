const pool = require("../config/db");

// Create Component
const createFeeStructureComponent = async (data) => {

  const [result] = await pool.query(
    `
    INSERT INTO fee_structure_components
    (
      fee_structure_id,
      component_name,
      amount,
      tax_percentage,
      tax_amount,
      final_amount,
      status,
      created_by,
      updated_by
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      data.fee_structure_id,
      data.component_name,
      data.amount,
      data.tax_percentage || 0,
      data.tax_amount || 0,
      data.final_amount,
      data.status || "active",
      data.created_by,
      data.updated_by || null
    ]
  );

  return result;
};

// Get All Components
const getAllFeeStructureComponents = async () => {

  const [rows] = await pool.query(`
    SELECT
      fsc.id,
      fsc.fee_structure_id,
      fsc.component_name,
      fsc.amount,
      fsc.tax_percentage,
      fsc.tax_amount,
      fsc.final_amount,
      fsc.status,
      fs.total_amount
    FROM fee_structure_components fsc
    INNER JOIN fee_structures fs
      ON fs.id = fsc.fee_structure_id
    ORDER BY fsc.id DESC
  `);

  return rows;
};

// Get Components By Fee Structure
const getComponentsByFeeStructure = async (feeStructureId) => {

  const [rows] = await pool.query(
    `
    SELECT *
    FROM fee_structure_components
    WHERE fee_structure_id = ?
    ORDER BY id ASC
    `,
    [feeStructureId]
  );

  return rows;
};

// Update Component
const updateFeeStructureComponent = async (id, data) => {

  const [result] = await pool.query(
    `
    UPDATE fee_structure_components
    SET
      component_name = ?,
      amount = ?,
      tax_percentage = ?,
      tax_amount = ?,
      final_amount = ?,
      status = ?,
      updated_by = ?,
      updated_at = NOW()
    WHERE id = ?
    `,
    [
      data.component_name,
      data.amount,
      data.tax_percentage,
      data.tax_amount,
      data.final_amount,
      data.status,
      data.updated_by,
      id
    ]
  );

  return result;
};

// Delete Component
const deleteFeeStructureComponent = async (id) => {

  const [result] = await pool.query(
    `
    DELETE FROM fee_structure_components
    WHERE id = ?
    `,
    [id]
  );

  return result;
};

module.exports = {
  createFeeStructureComponent,
  getAllFeeStructureComponents,
  getComponentsByFeeStructure,
  updateFeeStructureComponent,
  deleteFeeStructureComponent
};