const feeDiscountRepository = require("../repositories/feeDiscountRepository");

// ================= CREATE =================

const createFeeDiscountService = async (data) => {

  if (
    !data.fee_structure_id ||
    !data.discount_name ||
    !data.discount_type ||
    !data.discount_value
  ) {
    throw new Error("All required fields are mandatory.");
  }

  data.status = data.status || "ACTIVE";

  return await feeDiscountRepository.createFeeDiscount(data);

};

// ================= GET ALL =================

const getAllFeeDiscountsService = async () => {

  return await feeDiscountRepository.getAllFeeDiscounts();

};

// ================= GET BY ID =================

const getFeeDiscountByIdService = async (id) => {

  const discount =
    await feeDiscountRepository.getFeeDiscountById(id);

  if (!discount) {
    throw new Error("Fee Discount not found.");
  }

  return discount;

};

// ================= UPDATE =================

const updateFeeDiscountService = async (
  id,
  data
) => {

  const discount =
    await feeDiscountRepository.getFeeDiscountById(id);

  if (!discount) {
    throw new Error("Fee Discount not found.");
  }

  return await feeDiscountRepository.updateFeeDiscount(
    id,
    data
  );

};

// ================= DELETE =================

const deleteFeeDiscountService = async (id) => {

  const discount =
    await feeDiscountRepository.getFeeDiscountById(id);

  if (!discount) {
    throw new Error("Fee Discount not found.");
  }

  return await feeDiscountRepository.deleteFeeDiscount(id);

};

module.exports = {

  createFeeDiscountService,

  getAllFeeDiscountsService,

  getFeeDiscountByIdService,

  updateFeeDiscountService,

  deleteFeeDiscountService

};