const {
  createAcademicYearSessionService,
  getAllAcademicYearSessionsService,
  getAcademicYearSessionByIdService,
  updateAcademicYearSessionService,
  deleteAcademicYearSessionService,
  getCurrentAcademicYearSessionService,
} = require("../services/academicYearSessionService");

// ==========================================
// Create Academic Year Session
// ==========================================
const createAcademicYearSession = async (
  req,
  res
) => {
  try {

    const result =
      await createAcademicYearSessionService({
        ...req.body,
        created_by: req.user.id,
      });

    return res.status(201).json({
      success: true,
      message:
        "Academic Year Session created successfully.",
      data: result,
    });

  } catch (error) {

    console.log(
      "========== ACADEMIC YEAR SESSION ERROR =========="
    );

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Get All Academic Year Sessions
// ==========================================
const getAllAcademicYearSessions = async (
  req,
  res
) => {
  try {

    const {
      academic_year_id,
    } = req.query;

    const data =
      await getAllAcademicYearSessionsService(
        academic_year_id || null
      );

    return res.status(200).json({
      success: true,
      count: data.length,
      data,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Get Current Session
// ==========================================
const getCurrentAcademicYearSession = async (
  req,
  res
) => {
  try {

    const {
      academic_year_id,
    } = req.query;

    if (!academic_year_id) {
      return res.status(400).json({
        success: false,
        message:
          "Academic Year ID is required.",
      });
    }

    const data =
      await getCurrentAcademicYearSessionService(
        academic_year_id
      );

    return res.status(200).json({
      success: true,
      data,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Get Session By ID
// ==========================================
const getAcademicYearSessionById = async (
  req,
  res
) => {
  try {

    const data =
      await getAcademicYearSessionByIdService(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      data,
    });

  } catch (error) {

    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Update Academic Year Session
// ==========================================
const updateAcademicYearSession = async (
  req,
  res
) => {
  try {

    await updateAcademicYearSessionService(
      req.params.id,
      {
        ...req.body,
        updated_by: req.user.id,
      }
    );

    return res.status(200).json({
      success: true,
      message:
        "Academic Year Session updated successfully.",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Delete Academic Year Session
// ==========================================
const deleteAcademicYearSession = async (
  req,
  res
) => {
  try {

    await deleteAcademicYearSessionService(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Academic Year Session deleted successfully.",
    });

  } catch (error) {

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
  createAcademicYearSession,
  getAllAcademicYearSessions,
  getCurrentAcademicYearSession,
  getAcademicYearSessionById,
  updateAcademicYearSession,
  deleteAcademicYearSession,
};