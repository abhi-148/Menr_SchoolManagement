const feeDiscountService = require("../services/feeDiscountService");

// ================= CREATE =================

const createFeeDiscount = async (req, res) => {

  try {

    const data = {
      ...req.body,
      created_by: req.user.id,
      updated_by: req.user.id,
    };

    const result =
      await feeDiscountService.createFeeDiscountService(data);

    res.status(201).json({
      success: true,
      message: "Fee Discount created successfully.",
      data: result,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};

// ================= GET ALL =================

const getAllFeeDiscounts = async (req, res) => {
  try {
    const result =
      await feeDiscountService.getAllFeeDiscountsService();

    res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {

    console.error("Fee Discount Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================= GET BY ID =================

const getFeeDiscountById = async (req, res) => {

  try {

    const result =
      await feeDiscountService.getFeeDiscountByIdService(
        req.params.id
      );

    res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {

    res.status(404).json({
      success: false,
      message: error.message,
    });

  }

};

// ================= UPDATE =================

const updateFeeDiscount = async (req, res) => {

  try {

    const data = {
      ...req.body,
      updated_by: req.user.id,
    };

    const result =
      await feeDiscountService.updateFeeDiscountService(
        req.params.id,
        data
      );

    res.status(200).json({
      success: true,
      message: "Fee Discount updated successfully.",
      data: result,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};

// ================= DELETE =================

const deleteFeeDiscount = async (req, res) => {

  try {

    await feeDiscountService.deleteFeeDiscountService(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Fee Discount deleted successfully.",
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};

module.exports = {

  createFeeDiscount,

  getAllFeeDiscounts,

  getFeeDiscountById,

  updateFeeDiscount,

  deleteFeeDiscount,

};