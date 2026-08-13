const {
  createAttendance,
  getAllAttendance,
  getAttendanceByStaff,
  findAttendanceById,
  updateAttendance,
  deleteAttendance
} = require("../repositories/staffAttendanceRepository");


// =========================================================
// CREATE ATTENDANCE
// =========================================================

const createAttendanceService = async (
  data,
  user
) => {

  if (!data.staff_id) {
    throw new Error(
      "Staff ID is required"
    );
  }

  if (!data.date) {
    throw new Error(
      "Attendance Date is required"
    );
  }


  // STAFF can only create own attendance
  if (
    user &&
    user.role === "STAFF" &&
    Number(data.staff_id) !==
    Number(user.id)
  ) {

    throw new Error(
      "You Can Only Mark Your Own Attendance"
    );

  }


  // Check existing attendance
  const existingAttendance =
    await getAttendanceByStaff(
      data.staff_id,
      user
    );


  const alreadyMarked =
    existingAttendance.find(
      (attendance) =>
        String(attendance.date)
          .substring(0, 10) ===
        String(data.date)
          .substring(0, 10)
    );


  if (alreadyMarked) {

    throw new Error(
      "Attendance Already Exists For This Date"
    );

  }


  if (!data.status) {

    data.status =
      "PRESENT";

  }


  const allowedStatuses = [
    "PRESENT",
    "ABSENT",
    "LATE",
    "LEAVE",
    "HALF_DAY"
  ];


  if (
    !allowedStatuses.includes(
      data.status
    )
  ) {

    throw new Error(
      "Invalid Attendance Status"
    );

  }


  return await createAttendance(
    data
  );

};


// =========================================================
// GET ALL ATTENDANCE
// =========================================================

const getAllAttendanceService =
async (user) => {

  if (!user) {

    throw new Error(
      "Unauthorized"
    );

  }


  return await getAllAttendance(
    user
  );

};


// =========================================================
// GET ATTENDANCE BY STAFF
// =========================================================

const getAttendanceByStaffService =
async (
  staffId,
  user
) => {

  if (!staffId) {

    throw new Error(
      "Staff ID is required"
    );

  }


  if (!user) {

    throw new Error(
      "Unauthorized"
    );

  }


  // STAFF can only see own attendance
  if (
    user.role === "STAFF" &&
    Number(staffId) !==
    Number(user.id)
  ) {

    throw new Error(
      "You Can Only View Your Own Attendance"
    );

  }


  return await getAttendanceByStaff(
    staffId,
    user
  );

};


// =========================================================
// GET ATTENDANCE BY ID
// =========================================================

const getAttendanceByIdService =
async (
  id,
  user
) => {

  if (!user) {

    throw new Error(
      "Unauthorized"
    );

  }


  const attendance =
    await findAttendanceById(
      id,
      user
    );


  if (!attendance) {

    throw new Error(
      "Attendance Not Found"
    );

  }


  return attendance;

};


// =========================================================
// UPDATE ATTENDANCE
// =========================================================

const updateAttendanceService =
async (
  id,
  data,
  user
) => {

  if (!user) {

    throw new Error(
      "Unauthorized"
    );

  }


  const attendance =
    await findAttendanceById(
      id,
      user
    );


  if (!attendance) {

    throw new Error(
      "Attendance Not Found"
    );

  }


  // STAFF can only update own attendance
  if (
    user.role === "STAFF" &&
    Number(attendance.staff_id) !==
    Number(user.id)
  ) {

    throw new Error(
      "You Can Only Update Your Own Attendance"
    );

  }


  if (!data.date) {

    throw new Error(
      "Attendance Date is required"
    );

  }


  const allowedStatuses = [
    "PRESENT",
    "ABSENT",
    "LATE",
    "LEAVE",
    "HALF_DAY"
  ];


  if (
    data.status &&
    !allowedStatuses.includes(
      data.status
    )
  ) {

    throw new Error(
      "Invalid Attendance Status"
    );

  }


  return await updateAttendance(
    id,
    data
  );

};


// =========================================================
// DELETE ATTENDANCE
// =========================================================

const deleteAttendanceService =
async (
  id,
  user
) => {

  if (!user) {

    throw new Error(
      "Unauthorized"
    );

  }


  const attendance =
    await findAttendanceById(
      id,
      user
    );


  if (!attendance) {

    throw new Error(
      "Attendance Not Found"
    );

  }


  // STAFF can only delete own attendance
  if (
    user.role === "STAFF" &&
    Number(attendance.staff_id) !==
    Number(user.id)
  ) {

    throw new Error(
      "You Can Only Delete Your Own Attendance"
    );

  }


  return await deleteAttendance(
    id
  );

};


// =========================================================
// EXPORT
// =========================================================

module.exports = {

  createAttendanceService,

  getAllAttendanceService,

  getAttendanceByStaffService,

  getAttendanceByIdService,

  updateAttendanceService,

  deleteAttendanceService

};