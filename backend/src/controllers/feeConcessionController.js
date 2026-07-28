const feeConcessionService = require("../services/feeConcessionService");

// ================= CREATE =================

const createFeeConcession = async (req, res) => {

  try {

    const data = {
      ...req.body,
      created_by: req.user.id,
      updated_by: req.user.id,
    };

    const result =
      await feeConcessionService.createFeeConcessionService(data);

    res.status(201).json({
      success: true,
      message: "Fee Concession created successfully.",
      data: result,
    });

  } catch (error) {

    console.error("Create Fee Concession Error:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};

// ================= GET ALL =================

const getAllFeeConcessions = async (req, res) => {

  try {

    const result =
      await feeConcessionService.getAllFeeConcessionsService();

    res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {

    console.error("Get Fee Concessions Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ================= GET BY ID =================

const getFeeConcessionById = async (req, res) => {

  try {

    const result =
      await feeConcessionService.getFeeConcessionByIdService(
        req.params.id
      );

    res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {

    console.error("Get Fee Concession Error:", error);

    res.status(404).json({
      success: false,
      message: error.message,
    });

  }

};

// ================= UPDATE =================

const updateFeeConcession = async (req, res) => {

  try {

    const data = {
      ...req.body,
      updated_by: req.user.id,
    };

    const result =
      await feeConcessionService.updateFeeConcessionService(
        req.params.id,
        data
      );

    res.status(200).json({
      success: true,
      message: "Fee Concession updated successfully.",
      data: result,
    });

  } catch (error) {

    console.error("Update Fee Concession Error:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};

// ================= DELETE =================

const deleteFeeConcession = async (req, res) => {

  try {

    await feeConcessionService.deleteFeeConcessionService(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Fee Concession deleted successfully.",
    });

  } catch (error) {

    console.error("Delete Fee Concession Error:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};

module.exports = {

  createFeeConcession,

  getAllFeeConcessions,

  getFeeConcessionById,

  updateFeeConcession,

  deleteFeeConcession,

};