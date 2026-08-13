const {
  createLeaveRequestService,
  getAllLeaveRequestsService,
  getLeaveRequestsByStaffService,
  getLeaveRequestByIdService,
  updateLeaveRequestService,
  reviewLeaveRequestService,
  deleteLeaveRequestService
} = require("../services/leaveRequestService");


// =========================================================
// CREATE LEAVE REQUEST
// =========================================================

const createLeaveRequest = async (req, res) => {

  try {

    const result =
      await createLeaveRequestService({

        ...req.body,

        staff_id: req.user.id

      });

    return res.status(201).json({

      success: true,

      message:
        "Leave Request Created Successfully",

      data: result

    });

  } catch (error) {

    console.error(
      "CREATE LEAVE REQUEST ERROR:",
      error
    );

    return res.status(400).json({

      success: false,

      message: error.message

    });

  }

};


// =========================================================
// GET ALL LEAVE REQUESTS
// SUPER_ADMIN → All
// SCHOOL_ADMIN → Own School
// =========================================================

const getAllLeaveRequests = async (
  req,
  res
) => {

  try {

    const result =
      await getAllLeaveRequestsService(
        req.user
      );

    return res.status(200).json({

      success: true,

      data: result

    });

  } catch (error) {

    console.error(
      "GET LEAVE REQUESTS ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message: error.message

    });

  }

};


// =========================================================
// GET MY LEAVE REQUESTS
// =========================================================

const getMyLeaveRequests = async (
  req,
  res
) => {

  try {

    const result =
      await getLeaveRequestsByStaffService(
        req.user.id,
        req.user
      );

    return res.status(200).json({

      success: true,

      data: result

    });

  } catch (error) {

    console.error(
      "GET MY LEAVE REQUESTS ERROR:",
      error
    );

    return res.status(400).json({

      success: false,

      message: error.message

    });

  }

};


// =========================================================
// GET LEAVE REQUEST BY ID
// =========================================================

const getLeaveRequestById = async (
  req,
  res
) => {

  try {

    const result =
      await getLeaveRequestByIdService(
        req.params.id,
        req.user
      );

    return res.status(200).json({

      success: true,

      data: result

    });

  } catch (error) {

    console.error(
      "GET LEAVE REQUEST ERROR:",
      error
    );

    return res.status(404).json({

      success: false,

      message: error.message

    });

  }

};


// =========================================================
// UPDATE LEAVE REQUEST
// =========================================================

const updateLeaveRequest = async (
  req,
  res
) => {

  try {

    const result =
      await updateLeaveRequestService(

        req.params.id,

        {
          ...req.body,

          staff_id:
            req.user.id
        },

        req.user

      );

    return res.status(200).json({

      success: true,

      message:
        "Leave Request Updated Successfully",

      data: result

    });

  } catch (error) {

    console.error(
      "UPDATE LEAVE REQUEST ERROR:",
      error
    );

    return res.status(400).json({

      success: false,

      message: error.message

    });

  }

};


// =========================================================
// REVIEW LEAVE REQUEST
// SUPER_ADMIN / SCHOOL_ADMIN
// =========================================================

const reviewLeaveRequest = async (
  req,
  res
) => {

  try {

    const {
      status,
      comments
    } = req.body;


    const result =
      await reviewLeaveRequestService(

        req.params.id,

        status,

        req.user.id,

        comments,

        req.user

      );


    return res.status(200).json({

      success: true,

      message:
        `Leave Request ${status} Successfully`,

      data: result

    });

  } catch (error) {

    console.error(
      "REVIEW LEAVE REQUEST ERROR:",
      error
    );

    return res.status(400).json({

      success: false,

      message: error.message

    });

  }

};


// =========================================================
// DELETE LEAVE REQUEST
// =========================================================

const deleteLeaveRequest = async (
  req,
  res
) => {

  try {

    const result =
      await deleteLeaveRequestService(

        req.params.id,

        req.user

      );


    return res.status(200).json({

      success: true,

      message:
        "Leave Request Deleted Successfully",

      data: result

    });

  } catch (error) {

    console.error(
      "DELETE LEAVE REQUEST ERROR:",
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

  createLeaveRequest,

  getAllLeaveRequests,

  getMyLeaveRequests,

  getLeaveRequestById,

  updateLeaveRequest,

  reviewLeaveRequest,

  deleteLeaveRequest

};