const {

  createEventPayment,

  getAllEventPayments,

  getEventPaymentById,

  updateEventPayment,

  deleteEventPayment,

  getPaymentsByRegistration,

  checkDuplicateTransaction,

} = require("../repositories/eventPaymentRepository");

const {

  getEventRegistrationById,

} = require("../repositories/eventRegistrationRepository");

// =======================================
// Create Event Payment
// =======================================
const createEventPaymentService = async (
  data
) => {

  // Required Validation

  if (!data.school_id)
    throw new Error("School is required.");

  if (!data.registration_id)
    throw new Error("Registration is required.");

  if (!data.amount)
    throw new Error("Amount is required.");

  if (!data.payment_method)
    throw new Error("Payment Method is required.");

  // Registration Exists

  const registration =
    await getEventRegistrationById(
      data.registration_id
    );

  if (!registration) {

    throw new Error(
      "Registration not found."
    );

  }

  // Duplicate Transaction

  if (data.transaction_id) {

    const duplicate =
      await checkDuplicateTransaction(
        data.transaction_id
      );

    if (duplicate.length > 0) {

      throw new Error(
        "Transaction ID already exists."
      );

    }

  }

  // Default Values

  data.payment_status =
    data.payment_status ||
    "COMPLETED";

  data.payment_date =
    data.payment_date ||
    new Date();

  data.status =
    data.status ||
    "ACTIVE";

  return await createEventPayment(
    data
  );

};

// =======================================
// Get All Payments
// =======================================
const getAllEventPaymentsService =
async () => {

  return await getAllEventPayments();

};

// =======================================
// Get Payment By Id
// =======================================
const getEventPaymentByIdService =
async (id) => {

  const payment =
    await getEventPaymentById(id);

  if (!payment) {

    throw new Error(
      "Payment not found."
    );

  }

  return payment;

};

// =======================================
// Update Payment
// =======================================
const updateEventPaymentService =
async (
  id,
  data
) => {

  const existing =
    await getEventPaymentById(id);

  if (!existing) {

    throw new Error(
      "Payment not found."
    );

  }

  return await updateEventPayment(
    id,
    data
  );

};

// =======================================
// Delete Payment
// =======================================
const deleteEventPaymentService =
async (id) => {

  const existing =
    await getEventPaymentById(id);

  if (!existing) {

    throw new Error(
      "Payment not found."
    );

  }

  return await deleteEventPayment(id);

};

// =======================================
// Get Payments By Registration
// =======================================
const getPaymentsByRegistrationService =
async (
  registrationId
) => {

  return await getPaymentsByRegistration(
    registrationId
  );

};

// =======================================
// Module Exports
// =======================================
module.exports = {

  createEventPaymentService,

  getAllEventPaymentsService,

  getEventPaymentByIdService,

  updateEventPaymentService,

  deleteEventPaymentService,

  getPaymentsByRegistrationService,

};