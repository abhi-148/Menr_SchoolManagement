const {
  createFeeStructureService,
  getAllFeeStructuresService,
  getFeeStructuresByClassService,
  updateFeeStructureService,
  deleteFeeStructureService
} = require("../services/feeStructureService");

// Create
const createFeeStructure = async (req, res) => {
  try {

    console.log("BODY =>", req.body);
    console.log("USER =>", req.user);

    const schoolId =
      req.user.schoolId ||
      req.user.school_id ||
      req.body.school_id;

    if (!schoolId) {
      return res.status(400).json({
        success: false,
        message: "School ID not found."
      });
    }

    const result = await createFeeStructureService({
      ...req.body,
      school_id: schoolId,
      created_by: req.user.id,
      created_by_role: req.user.role
    });

    return res.status(201).json({
      success: true,
      data: result
    });

  } catch (error) {

    console.error("Fee Structure Error =>", error);
    console.log("Resolved School ID =>", schoolId);
console.log("Request Body =>", req.body);

console.log({
  ...req.body,
  school_id: schoolId,
  created_by: req.user.id,
  created_by_role: req.user.role
});

    return res.status(500).json({
      success: false,
      message: error.message,
      sqlMessage: error.sqlMessage
    });

  }
};

// Get All
const getAllFeeStructures = async (req, res) => {

  try {

 const data =
await getAllFeeStructuresService();

    return res.status(200).json({
      success: true,
      data
    });

  } catch (error) {

    console.error(
      "Fee Structure Error =>",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
      sqlMessage: error.sqlMessage
    });

  }

};

// Get By Class
const getFeeStructuresByClass = async (req, res) => {

  try {

    const data =
      await getFeeStructuresByClassService(
        req.params.schoolClassId
      );

    return res.status(200).json({
      success: true,
      data
    });

  } catch (error) {

    console.error(
      "Fee Structure Error =>",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
      sqlMessage: error.sqlMessage
    });

  }

};

// Update
const updateFeeStructure = async (req, res) => {

  try {

    await updateFeeStructureService(
      req.params.id,
      {
        ...req.body,
        updated_by: req.user.id
      }
    );

    return res.status(200).json({
      success: true,
      message:
        "Fee Structure Updated Successfully"
    });

  } catch (error) {

    console.error(
      "Fee Structure Error =>",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
      sqlMessage: error.sqlMessage
    });

  }

};

// Delete
const deleteFeeStructure = async (req, res) => {

  try {

    await deleteFeeStructureService(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Fee Structure Deleted Successfully"
    });

  } catch (error) {

    console.error(
      "Fee Structure Error =>",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
      sqlMessage: error.sqlMessage
    });

  }

};

module.exports = {
  createFeeStructure,
  getAllFeeStructures,
  getFeeStructuresByClass,
  updateFeeStructure,
  deleteFeeStructure
};