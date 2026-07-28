const {
  createFeeInstallment,
  getAllFeeInstallments,
  getInstallmentsByFeeStructure,
  updateFeeInstallment,
  deleteFeeInstallment
} = require("../repositories/feeInstallmentRepository");

// ================= CREATE =================
const createFeeInstallmentService = async (data) => {

  // Default Status
  data.status = data.status || "ACTIVE";

  // Validation
  if (!data.fee_structure_id) {
    throw new Error("Fee Structure is required");
  }

  if (!data.installment_no) {
    throw new Error("Installment Number is required");
  }

  if (!data.installment_name) {
    throw new Error("Installment Name is required");
  }

  if (!data.amount) {
    throw new Error("Amount is required");
  }

  if (!data.due_date) {
    throw new Error("Due Date is required");
  }

  data.late_fee = data.late_fee || 0;

  return await createFeeInstallment(data);
};

// ================= GET ALL =================
const getAllFeeInstallmentsService = async () => {
  return await getAllFeeInstallments();
};

// ================= GET BY FEE STRUCTURE =================
const getInstallmentsByFeeStructureService = async (
  feeStructureId
) => {

  return await getInstallmentsByFeeStructure(
    feeStructureId
  );

};

// ================= UPDATE =================
const updateFeeInstallmentService = async (
  id,
  data
) => {

  data.status = data.status || "ACTIVE";
  data.late_fee = data.late_fee || 0;

  return await updateFeeInstallment(
    id,
    data
  );

};

// ================= DELETE =================
const deleteFeeInstallmentService = async (
  id
) => {

  return await deleteFeeInstallment(id);

};

module.exports = {
  createFeeInstallmentService,
  getAllFeeInstallmentsService,
  getInstallmentsByFeeStructureService,
  updateFeeInstallmentService,
  deleteFeeInstallmentService
};