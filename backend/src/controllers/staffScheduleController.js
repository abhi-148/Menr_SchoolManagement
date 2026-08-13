const {
  createStaffScheduleService,
  getAllStaffSchedulesService,
  getStaffScheduleByIdService,
  updateStaffScheduleService,
  deleteStaffScheduleService,
  getStaffSchedulesByStaffService
} = require("../services/staffScheduleService");

// =========================================================
// CREATE STAFF SCHEDULE
// =========================================================

const createStaffSchedule = async (req, res) => {
  try {

    const result =
      await createStaffScheduleService(
        req.body,
        req.user
      );

    return res.status(201).json({
      success: true,
      message: "Staff Schedule Created Successfully",
      data: result
    });

  } catch (error) {

    console.error(
      "CREATE STAFF SCHEDULE ERROR:",
      error
    );

    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// =========================================================
// GET ALL STAFF SCHEDULES
// =========================================================

const getAllStaffSchedules = async (req, res) => {
  try {

    const schedules =
      await getAllStaffSchedulesService(
        req.user
      );

    return res.status(200).json({
      success: true,
      data: schedules
    });

  } catch (error) {

    console.error(
      "GET STAFF SCHEDULES ERROR:",
      error
    );

    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// =========================================================
// GET STAFF SCHEDULE BY ID
// =========================================================

const getStaffScheduleById = async (req, res) => {
  try {

    const schedule =
      await getStaffScheduleByIdService(
        req.params.id,
        req.user
      );

    return res.status(200).json({
      success: true,
      data: schedule
    });

  } catch (error) {

    console.error(
      "GET STAFF SCHEDULE ERROR:",
      error
    );

    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// =========================================================
// GET SCHEDULES BY STAFF
// =========================================================

const getStaffSchedulesByStaff = async (req, res) => {
  try {

    const schedules =
      await getStaffSchedulesByStaffService(
        req.params.staffId,
        req.user
      );

    return res.status(200).json({
      success: true,
      data: schedules
    });

  } catch (error) {

    console.error(
      "GET STAFF MEMBER SCHEDULE ERROR:",
      error
    );

    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// =========================================================
// UPDATE STAFF SCHEDULE
// =========================================================

const updateStaffSchedule = async (req, res) => {
  try {

    const result =
      await updateStaffScheduleService(
        req.params.id,
        req.body,
        req.user
      );

    return res.status(200).json({
      success: true,
      message: "Staff Schedule Updated Successfully",
      data: result
    });

  } catch (error) {

    console.error(
      "UPDATE STAFF SCHEDULE ERROR:",
      error
    );

    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// =========================================================
// DELETE STAFF SCHEDULE
// =========================================================

const deleteStaffSchedule = async (req, res) => {
  try {

    await deleteStaffScheduleService(
      req.params.id,
      req.user
    );

    return res.status(200).json({
      success: true,
      message: "Staff Schedule Deleted Successfully"
    });

  } catch (error) {

    console.error(
      "DELETE STAFF SCHEDULE ERROR:",
      error
    );

    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// =========================================================
// EXPORT
// =========================================================

module.exports = {

  createStaffSchedule,

  getAllStaffSchedules,

  getStaffScheduleById,

  getStaffSchedulesByStaff,

  updateStaffSchedule,

  deleteStaffSchedule

};