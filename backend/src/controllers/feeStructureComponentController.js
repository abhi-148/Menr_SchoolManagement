const {
  createFeeStructureComponentService,
  getAllFeeStructureComponentsService,
  getComponentsByFeeStructureService,
  updateFeeStructureComponentService,
  deleteFeeStructureComponentService
} = require("../services/feeStructureComponentService");

// Create
const createFeeStructureComponent = async (req, res) => {

  try {

    const result =
      await createFeeStructureComponentService({
        ...req.body,
        created_by: req.user.id
      });

    return res.status(201).json({
      success: true,
      message: "Fee Structure Component Created Successfully",
      data: result
    });

  } catch (error) {

    console.error("Fee Structure Component Error =>", error);

    return res.status(500).json({
      success: false,
      message: error.message,
      sqlMessage: error.sqlMessage
    });

  }

};

// Get All
const getAllFeeStructureComponents = async (req, res) => {

  try {

    const data =
      await getAllFeeStructureComponentsService();

    return res.status(200).json({
      success: true,
      data
    });

  } catch (error) {

    console.error("Fee Structure Component Error =>", error);

    return res.status(500).json({
      success: false,
      message: error.message,
      sqlMessage: error.sqlMessage
    });

  }

};

// Get By Fee Structure
const getComponentsByFeeStructure = async (req, res) => {

  try {

    const data =
      await getComponentsByFeeStructureService(
        req.params.feeStructureId
      );

    return res.status(200).json({
      success: true,
      data
    });

  } catch (error) {

    console.error("Fee Structure Component Error =>", error);

    return res.status(500).json({
      success: false,
      message: error.message,
      sqlMessage: error.sqlMessage
    });

  }

};

// Update
const updateFeeStructureComponent = async (req, res) => {

  try {

    await updateFeeStructureComponentService(
      req.params.id,
      {
        ...req.body,
        updated_by: req.user.id
      }
    );

    return res.status(200).json({
      success: true,
      message: "Fee Structure Component Updated Successfully"
    });

  } catch (error) {

    console.error("Fee Structure Component Error =>", error);

    return res.status(500).json({
      success: false,
      message: error.message,
      sqlMessage: error.sqlMessage
    });

  }

};

// Delete
const deleteFeeStructureComponent = async (req, res) => {

  try {

    await deleteFeeStructureComponentService(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Fee Structure Component Deleted Successfully"
    });

  } catch (error) {

    console.error("Fee Structure Component Error =>", error);

    return res.status(500).json({
      success: false,
      message: error.message,
      sqlMessage: error.sqlMessage
    });

  }

};

module.exports = {
  createFeeStructureComponent,
  getAllFeeStructureComponents,
  getComponentsByFeeStructure,
  updateFeeStructureComponent,
  deleteFeeStructureComponent
};