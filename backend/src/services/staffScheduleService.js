const {
  createStaffSchedule,
  getAllStaffSchedules,
  getStaffSchedulesBySchool,
  getStaffScheduleById,
  updateStaffSchedule,
  deleteStaffSchedule,
  getStaffSchedulesByStaff
} = require("../repositories/staffScheduleRepository");

// =========================================================
// CREATE STAFF SCHEDULE
// =========================================================

const createStaffScheduleService = async (
  data,
  user
) => {

  // -------------------------------------------------------
  // Basic validation
  // -------------------------------------------------------

  if (!data.staff_id) {
    throw new Error("Staff is required");
  }

  if (!data.period_id) {
    throw new Error("Period is required");
  }

  if (!data.class_id) {
    throw new Error("Class is required");
  }

  if (!data.batch_id) {
    throw new Error("Batch is required");
  }

  if (!data.subject_id) {
    throw new Error("Subject is required");
  }

  if (!data.day_of_week) {
    throw new Error("Day of week is required");
  }

  if (!data.room || !data.room.trim()) {
    throw new Error("Room is required");
  }

  // -------------------------------------------------------
  // Role based school validation
  // -------------------------------------------------------

  if (user.role === "SCHOOL_ADMIN") {

    if (!user.schoolId) {
      throw new Error("School ID not found");
    }

    data.school_id = user.schoolId;
  }

  // -------------------------------------------------------
  // Created By
  // -------------------------------------------------------

  data.created_by = user.id;

  // -------------------------------------------------------
  // Status
  // -------------------------------------------------------

  data.status = data.status || "active";

  return await createStaffSchedule(data);
};


// =========================================================
// GET ALL STAFF SCHEDULES
// =========================================================

const getAllStaffSchedulesService = async (
  user
) => {

  if (user.role === "SUPER_ADMIN") {

    return await getAllStaffSchedules();

  }

  if (user.role === "SCHOOL_ADMIN") {

    if (!user.schoolId) {
      throw new Error("School ID not found");
    }

    return await getStaffSchedulesBySchool(
      user.schoolId
    );

  }

  throw new Error("Unauthorized");
};


// =========================================================
// GET STAFF SCHEDULE BY ID
// =========================================================

const getStaffScheduleByIdService = async (
  scheduleId,
  user
) => {

  if (!scheduleId) {
    throw new Error("Schedule ID is required");
  }

  const schedule =
    await getStaffScheduleById(
      scheduleId
    );

  if (!schedule) {
    throw new Error(
      "Staff Schedule Not Found"
    );
  }

  // -------------------------------------------------------
  // School Admin security check
  // -------------------------------------------------------

  if (user.role === "SCHOOL_ADMIN") {

    if (
      Number(schedule.school_id) !==
      Number(user.schoolId)
    ) {
      throw new Error(
        "Unauthorized access to this schedule"
      );
    }

  }

  return schedule;
};


// =========================================================
// UPDATE STAFF SCHEDULE
// =========================================================

const updateStaffScheduleService = async (
  scheduleId,
  data,
  user
) => {

  if (!scheduleId) {
    throw new Error("Schedule ID is required");
  }

  // -------------------------------------------------------
  // Required fields
  // -------------------------------------------------------

  if (!data.staff_id) {
    throw new Error("Staff is required");
  }

  if (!data.period_id) {
    throw new Error("Period is required");
  }

  if (!data.class_id) {
    throw new Error("Class is required");
  }

  if (!data.batch_id) {
    throw new Error("Batch is required");
  }

  if (!data.subject_id) {
    throw new Error("Subject is required");
  }

  if (!data.day_of_week) {
    throw new Error(
      "Day of week is required"
    );
  }

  if (!data.room || !data.room.trim()) {
    throw new Error("Room is required");
  }

  // -------------------------------------------------------
  // Existing schedule
  // -------------------------------------------------------

  const existingSchedule =
    await getStaffScheduleById(
      scheduleId
    );

  if (!existingSchedule) {
    throw new Error(
      "Staff Schedule Not Found"
    );
  }

  // -------------------------------------------------------
  // School Admin security
  // -------------------------------------------------------

  if (user.role === "SCHOOL_ADMIN") {

    if (
      Number(existingSchedule.school_id) !==
      Number(user.schoolId)
    ) {
      throw new Error(
        "Unauthorized access to this schedule"
      );
    }

  }

  // -------------------------------------------------------
  // Updated By
  // -------------------------------------------------------

  data.updated_by = user.id;

  data.status =
    data.status || "active";

  return await updateStaffSchedule(
    scheduleId,
    data
  );
};


// =========================================================
// DELETE STAFF SCHEDULE
// =========================================================

const deleteStaffScheduleService = async (
  scheduleId,
  user
) => {

  if (!scheduleId) {
    throw new Error(
      "Schedule ID is required"
    );
  }

  const schedule =
    await getStaffScheduleById(
      scheduleId
    );

  if (!schedule) {
    throw new Error(
      "Staff Schedule Not Found"
    );
  }

  // -------------------------------------------------------
  // School Admin security
  // -------------------------------------------------------

  if (user.role === "SCHOOL_ADMIN") {

    if (
      Number(schedule.school_id) !==
      Number(user.schoolId)
    ) {
      throw new Error(
        "Unauthorized access to this schedule"
      );
    }

  }

  return await deleteStaffSchedule(
    scheduleId
  );
};


// =========================================================
// GET SCHEDULES BY STAFF
// =========================================================

const getStaffSchedulesByStaffService = async (
  staffId,
  user
) => {

  if (!staffId) {
    throw new Error(
      "Staff ID is required"
    );
  }

  // -------------------------------------------------------
  // School Admin can only access own school staff
  // -------------------------------------------------------

  if (user.role === "SCHOOL_ADMIN") {

    const schedules =
      await getStaffSchedulesByStaff(
        staffId
      );

    return schedules.filter(
      (schedule) =>
        Number(schedule.school_id) ===
        Number(user.schoolId)
    );
  }

  if (user.role === "SUPER_ADMIN") {

    return await getStaffSchedulesByStaff(
      staffId
    );

  }

  throw new Error("Unauthorized");
};


// =========================================================
// EXPORT
// =========================================================

module.exports = {

  createStaffScheduleService,

  getAllStaffSchedulesService,

  getStaffScheduleByIdService,

  updateStaffScheduleService,

  deleteStaffScheduleService,

  getStaffSchedulesByStaffService

};