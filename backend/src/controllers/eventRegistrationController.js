const {

  createEventRegistrationService,

  getAllEventRegistrationsService,

  getEventRegistrationByIdService,

  updateEventRegistrationService,

  deleteEventRegistrationService,

  getRegistrationsByEventService,

} = require("../services/eventRegistrationService");

// =======================================
// Create Event Registration
// =======================================
const createEventRegistration = async (
  req,
  res
) => {

  try {

    let schoolId;

    if (req.user.role === "SUPER_ADMIN") {

      schoolId = req.body.school_id;

      if (!schoolId) {

        return res.status(400).json({

          success: false,

          message: "School is required.",

        });

      }

    }

    else {

      schoolId =
        req.user.schoolId ||
        req.user.school_id;

    }

    const result =
      await createEventRegistrationService({

        ...req.body,

        school_id: schoolId,

       created_by_staff_id:
  req.user.role === "STAFF" ||
  req.user.role === "SCHOOL_ADMIN" ||
  req.user.role === "SUPER_ADMIN"
    ? req.user.id
    : null,

created_by_student_id:
  req.user.role === "STUDENT"
    ? req.user.id
    : null,

      });

    return res.status(201).json({

      success: true,

      message:
        "Event Registration created successfully.",

      data: result,

    });

  }

  catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// =======================================
// Get All Event Registrations
// =======================================
const getAllEventRegistrations =
  async (
    req,
    res
  ) => {

    try {

      const data =
        await getAllEventRegistrationsService();

      return res.status(200).json({

        success: true,

        count: data.length,

        data,

      });

    }

    catch (error) {

      return res.status(500).json({

        success: false,

        message: error.message,

      });

    }

  };

  // =======================================
// Get Event Registration By Id
// =======================================
const getEventRegistrationById = async (
  req,
  res
) => {

  try {

    const registration =
      await getEventRegistrationByIdService(
        req.params.id
      );

    return res.status(200).json({

      success: true,

      data: registration,

    });

  }

  catch (error) {

    return res.status(404).json({

      success: false,

      message: error.message,

    });

  }

};

// =======================================
// Update Event Registration
// =======================================
const updateEventRegistration = async (
  req,
  res
) => {

  try {

    await updateEventRegistrationService(

      req.params.id,

      {

        ...req.body,

      updated_by_staff_id:
  req.user.role === "STAFF" ||
  req.user.role === "SCHOOL_ADMIN" ||
  req.user.role === "SUPER_ADMIN"
    ? req.user.id
    : null,

updated_by_student_id:
  req.user.role === "STUDENT"
    ? req.user.id
    : null,

      }

    );

    return res.status(200).json({

      success: true,

      message:
        "Event Registration updated successfully.",

    });

  }

  catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// =======================================
// Delete Event Registration
// =======================================
const deleteEventRegistration = async (
  req,
  res
) => {

  try {

    await deleteEventRegistrationService(
      req.params.id
    );

    return res.status(200).json({

      success: true,

      message:
        "Event Registration deleted successfully.",

    });

  }

  catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// =======================================
// Get Registrations By Event
// =======================================
const getRegistrationsByEvent = async (
  req,
  res
) => {

  try {

    const data =
      await getRegistrationsByEventService(
        req.params.eventId
      );

    return res.status(200).json({

      success: true,

      count: data.length,

      data,

    });

  }

  catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// =======================================
// Module Exports
// =======================================
module.exports = {

  createEventRegistration,

  getAllEventRegistrations,

  getEventRegistrationById,

  updateEventRegistration,

  deleteEventRegistration,

  getRegistrationsByEvent,

};