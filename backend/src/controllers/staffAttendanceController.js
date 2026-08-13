const {
  createAttendanceService,
  getAllAttendanceService,
  getAttendanceByStaffService,
  getAttendanceByIdService,
  updateAttendanceService,
  deleteAttendanceService
} = require("../services/staffAttendanceService");


// =========================================================
// CREATE ATTENDANCE
// =========================================================

const createAttendance = async (req, res) => {

  try {

    const {
      staff_id,
      date,
      clock_in,
      clock_out,
      status
    } = req.body;


    const result =
      await createAttendanceService(

        {
          staff_id,
          date,
          clock_in,
          clock_out,
          status,

          created_by:
            req.user.id
        },

        req.user

      );


    return res.status(201).json({

      success: true,

      message:
        "Staff Attendance Created Successfully",

      data: result

    });

  } catch (error) {

    console.error(
      "CREATE ATTENDANCE ERROR:",
      error
    );

    return res.status(400).json({

      success: false,

      message:
        error.message

    });

  }

};


// =========================================================
// GET ALL ATTENDANCE
// =========================================================

const getAllAttendance = async (
  req,
  res
) => {

  try {

    const result =
      await getAllAttendanceService(
        req.user
      );


    return res.status(200).json({

      success: true,

      data: result

    });

  } catch (error) {

    console.error(
      "GET ATTENDANCE ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        error.message

    });

  }

};


// =========================================================
// GET ATTENDANCE BY STAFF
// =========================================================

const getAttendanceByStaff = async (
  req,
  res
) => {

  try {

    const result =
      await getAttendanceByStaffService(

        req.params.staffId,

        req.user

      );


    return res.status(200).json({

      success: true,

      data: result

    });

  } catch (error) {

    console.error(
      "GET STAFF ATTENDANCE ERROR:",
      error
    );

    return res.status(400).json({

      success: false,

      message:
        error.message

    });

  }

};


// =========================================================
// GET ATTENDANCE BY ID
// =========================================================

const getAttendanceById = async (
  req,
  res
) => {

  try {

    const result =
      await getAttendanceByIdService(

        req.params.id,

        req.user

      );


    return res.status(200).json({

      success: true,

      data: result

    });

  } catch (error) {

    console.error(
      "GET ATTENDANCE BY ID ERROR:",
      error
    );

    return res.status(404).json({

      success: false,

      message:
        error.message

    });

  }

};


// =========================================================
// UPDATE ATTENDANCE
// =========================================================

const updateAttendance = async (
  req,
  res
) => {

  try {

    const result =
      await updateAttendanceService(

        req.params.id,

        {
          ...req.body,

          updated_by:
            req.user.id
        },

        req.user

      );


    return res.status(200).json({

      success: true,

      message:
        "Staff Attendance Updated Successfully",

      data: result

    });

  } catch (error) {

    console.error(
      "UPDATE ATTENDANCE ERROR:",
      error
    );

    return res.status(400).json({

      success: false,

      message:
        error.message

    });

  }

};


// =========================================================
// DELETE ATTENDANCE
// =========================================================

const deleteAttendance = async (
  req,
  res
) => {

  try {

    const result =
      await deleteAttendanceService(

        req.params.id,

        req.user

      );


    return res.status(200).json({

      success: true,

      message:
        "Staff Attendance Deleted Successfully",

      data: result

    });

  } catch (error) {

    console.error(
      "DELETE ATTENDANCE ERROR:",
      error
    );

    return res.status(400).json({

      success: false,

      message:
        error.message

    });

  }

};


// =========================================================
// EXPORT
// =========================================================

module.exports = {

  createAttendance,

  getAllAttendance,

  getAttendanceByStaff,

  getAttendanceById,

  updateAttendance,

  deleteAttendance

};