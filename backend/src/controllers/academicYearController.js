const {
  createAcademicYearService,
  getAllAcademicYearsService,
  getAcademicYearByIdService,
  updateAcademicYearService,
  deleteAcademicYearService,
} = require("../services/academicYearService");

// ==========================================
// Create Academic Year
// ==========================================
const createAcademicYear = async (req, res) => {
  try {
    const result = await createAcademicYearService({
      ...req.body,
      created_by: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Academic Year created successfully.",
      data: result,
    });
  } catch (error) {
    console.log(
      "========== ACADEMIC YEAR CREATE ERROR =========="
    );
    console.log(error);
    console.log("MESSAGE =>", error.message);
    console.log("==============================================");

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Get All Academic Years
// ==========================================
const getAllAcademicYears = async (req, res) => {
  try {
    const data = await getAllAcademicYearsService(
      req.user
    );

    return res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    console.log(
      "========== ACADEMIC YEAR GET ALL ERROR =========="
    );
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Get Academic Year By ID
// ==========================================
const getAcademicYearById = async (req, res) => {
  try {
    const data =
      await getAcademicYearByIdService(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(
      "========== ACADEMIC YEAR GET ERROR =========="
    );
    console.log(error);

    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Update Academic Year
// ==========================================
const updateAcademicYear = async (req, res) => {
  try {
    await updateAcademicYearService(
      req.params.id,
      {
        ...req.body,
        updated_by: req.user.id,
      }
    );

    return res.status(200).json({
      success: true,
      message:
        "Academic Year Updated Successfully",
    });
  } catch (error) {
    console.log(
      "========== ACADEMIC YEAR UPDATE ERROR =========="
    );
    console.log(error);
    console.log("MESSAGE =>", error.message);
    console.log("==============================================");

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Delete Academic Year
// ==========================================
const deleteAcademicYear = async (req, res) => {
  try {
    await deleteAcademicYearService(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Academic Year Deleted Successfully",
    });
  } catch (error) {
    console.log(
      "========== ACADEMIC YEAR DELETE ERROR =========="
    );
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Export
// ==========================================
module.exports = {
  createAcademicYear,
  getAllAcademicYears,
  getAcademicYearById,
  updateAcademicYear,
  deleteAcademicYear,
};