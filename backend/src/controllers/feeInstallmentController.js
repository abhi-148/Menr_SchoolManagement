const {
  createFeeInstallmentService,
  getAllFeeInstallmentsService,
  getInstallmentsByFeeStructureService,
  updateFeeInstallmentService,
  deleteFeeInstallmentService
} = require("../services/feeInstallmentService");

// ================= CREATE =================
const createFeeInstallment = async (req, res) => {
  try {

    const result = await createFeeInstallmentService({
      ...req.body,
      created_by: req.user.id
    });

    return res.status(201).json({
      success: true,
      message: "Fee Installment Created Successfully",
      data: result
    });

  } catch (error) {

    console.error("Fee Installment Error =>", error);

    return res.status(500).json({
      success: false,
      message: error.message,
      sqlMessage: error.sqlMessage
    });

  }
};

// ================= GET ALL =================
const getAllFeeInstallments = async (req, res) => {
  try {

    const data =
      await getAllFeeInstallmentsService();

    return res.status(200).json({
      success: true,
      data
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// ================= GET BY FEE STRUCTURE =================
const getInstallmentsByFeeStructure = async (
  req,
  res
) => {

  try {

    const data =
      await getInstallmentsByFeeStructureService(
        req.params.feeStructureId
      );

    return res.status(200).json({
      success: true,
      data
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// ================= UPDATE =================
const updateFeeInstallment = async (
  req,
  res
) => {

  try {

    await updateFeeInstallmentService(
      req.params.id,
      {
        ...req.body,
        updated_by: req.user.id
      }
    );

    return res.status(200).json({
      success: true,
      message: "Fee Installment Updated Successfully"
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// ================= DELETE =================
const deleteFeeInstallment = async (
  req,
  res
) => {

  try {

    await deleteFeeInstallmentService(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Fee Installment Deleted Successfully"
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  createFeeInstallment,
  getAllFeeInstallments,
  getInstallmentsByFeeStructure,
  updateFeeInstallment,
  deleteFeeInstallment
};