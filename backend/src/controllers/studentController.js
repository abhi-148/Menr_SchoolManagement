const {
  createStudentService,
  getAllStudentsService,
  getStudentByIdService,
  updateStudentService,
  updateStudentStatusService,
  getStudentsWithPaginationService,
  searchStudentsService,
  loginStudentService,
  changeStudentPasswordService,
  getStudentDashboardService
} = require("../services/studentService");

const createStudent = async (req, res) => {
  try {

    const result =
      await createStudentService(
        req.body
      );

    return res.status(201).json({
      success: true,
      data: result
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const getAllStudents = async (req, res) => {
  try {

  const students =
  await getAllStudentsService(
    req.user
  );

    return res.status(200).json({
      success: true,
      data: students
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
// =========================================================
// STUDENT DASHBOARD
// =========================================================

const getStudentDashboard = async (
  req,
  res
) => {

  try {

    const dashboard =
      await getStudentDashboardService(
        req.user.id
      );


    return res.status(200).json({

      success: true,

      data: dashboard

    });

  } catch (error) {

    console.error(
      "STUDENT DASHBOARD ERROR:",
      error
    );


    return res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

const getStudentById = async (req, res) => {
  try {

    const student =
      await getStudentByIdService(
        req.params.id
      );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student Not Found"
      });
    }

    return res.status(200).json({
      success: true,
      data: student
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const updateStudent = async (req, res) => {
  try {

    await updateStudentService(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message:
        "Student Updated Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const updateStudentStatus = async (
  req,
  res
) => {

  try {

    await updateStudentStatusService(
      req.params.id,
      req.body.status
    );

    return res.status(200).json({
      success: true,
      message:
        "Student Status Updated Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const getStudentsWithPagination =
async (req, res) => {

  try {

    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 10;

    const offset =
      (page - 1) * limit;

    const students =
      await getStudentsWithPaginationService(
        limit,
        offset
      );

    return res.status(200).json({
      success: true,
      data: students
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const searchStudents = async (
  req,
  res
) => {

  try {

    const students =
      await searchStudentsService(
        req.query.search
      );

    return res.status(200).json({
      success: true,
      data: students
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// Student Login
const loginStudent = async (req, res) => {

  try {

    const {
      roll_number,
      password
    } = req.body;

    const token =
      await loginStudentService(
        roll_number,
        password
      );

    return res.status(200).json({
      success: true,
      token,
      role: "STUDENT"
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });

  }

};

// Student Profile
const getStudentProfile = async (req, res) => {

  try {

    const student =
      await getStudentByIdService(
        req.user.id
      );

    return res.status(200).json({
      success: true,
      data: student
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });

  }

};

// Update Student Profile
const updateStudentProfile = async (req, res) => {

  try {

    await updateStudentService(
      req.user.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message:
        "Profile Updated Successfully"
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });

  }

};

// Change Password
const changeStudentPassword = async (req, res) => {

  try {

    const {
      oldPassword,
      newPassword
    } = req.body;

    const result =
      await changeStudentPasswordService(
        req.user.id,
        oldPassword,
        newPassword
      );

    return res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  updateStudentProfile,
  updateStudentStatus,
  getStudentsWithPagination,
  searchStudents,
  loginStudent,
  getStudentProfile,
  getStudentDashboard,
  changeStudentPassword
};