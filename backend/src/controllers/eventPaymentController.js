const {

  createEventPaymentService,

  getAllEventPaymentsService,

  getEventPaymentByIdService,

  updateEventPaymentService,

  deleteEventPaymentService,

  getPaymentsByRegistrationService,

} = require("../services/eventPaymentService");

// =======================================
// Create Payment
// =======================================
const createEventPayment = async (
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
      await createEventPaymentService({

        ...req.body,

        school_id: schoolId,

        created_by: req.user.id,

      });

    return res.status(201).json({

      success: true,

      message:
        "Event Payment created successfully.",

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
// Get All Payments
// =======================================
const getAllEventPayments = async (
  req,
  res
) => {

  try {

    const data =
      await getAllEventPaymentsService();

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
// Get Payment By Id
// =======================================
const getEventPaymentById = async (
  req,
  res
) => {

  try {

    const payment =
      await getEventPaymentByIdService(
        req.params.id
      );

    return res.status(200).json({

      success: true,

      data: payment,

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
// Update Payment
// =======================================
const updateEventPayment = async (
  req,
  res
) => {

  try {

    await updateEventPaymentService(

      req.params.id,

      req.body

    );

    return res.status(200).json({

      success: true,

      message:
        "Event Payment updated successfully.",

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
// Delete Payment
// =======================================
const deleteEventPayment = async (
  req,
  res
) => {

  try {

    await deleteEventPaymentService(
      req.params.id
    );

    return res.status(200).json({

      success: true,

      message:
        "Event Payment deleted successfully.",

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
// Get Payments By Registration
// =======================================
const getPaymentsByRegistration = async (
  req,
  res
) => {

  try {

    const data =
      await getPaymentsByRegistrationService(
        req.params.registrationId
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

  createEventPayment,

  getAllEventPayments,

  getEventPaymentById,

  updateEventPayment,

  deleteEventPayment,

  getPaymentsByRegistration,

};