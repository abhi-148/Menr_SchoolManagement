const pool = require("../config/db");

// =======================================
// Create Event Payment
// =======================================
const createEventPayment = async (data) => {

  const [result] = await pool.query(
    `
    INSERT INTO tbl_event_payments (

      school_id,
      registration_id,
      deposited_to_school_bank_id,

      amount,
      payment_method,
      transaction_id,

      payment_status,
      payment_date,

      remarks,

      status,

      created_by

    )

    VALUES
    (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )
    `,
    [

      data.school_id,

      data.registration_id,

      data.deposited_to_school_bank_id,

      data.amount,

      data.payment_method,

      data.transaction_id,

      data.payment_status,

      data.payment_date,

      data.remarks,

      data.status,

      data.created_by,

    ]
  );

  return result;

};

// =======================================
// Get All Payments
// =======================================
const getAllEventPayments = async () => {

  const [rows] = await pool.query(
    `
    SELECT

      ep.*,

      e.event_name,

      er.participant_type

    FROM tbl_event_payments ep

    LEFT JOIN tbl_event_registrations er
      ON er.registration_id = ep.registration_id

    LEFT JOIN tbl_events e
      ON e.event_id = er.event_id

    ORDER BY
      ep.event_payment_id DESC
    `
  );

  return rows;

};

// =======================================
// Get Payment By Id
// =======================================
const getEventPaymentById = async (id) => {

  const [rows] = await pool.query(
    `
    SELECT *

    FROM tbl_event_payments

    WHERE event_payment_id = ?
    `,
    [id]
  );

  return rows[0];

};

// =======================================
// Update Payment
// =======================================
const updateEventPayment = async (
  id,
  data
) => {

  const [result] = await pool.query(
    `
    UPDATE tbl_event_payments

    SET

      deposited_to_school_bank_id=?,

      amount=?,

      payment_method=?,

      transaction_id=?,

      payment_status=?,

      payment_date=?,

      remarks=?,

      status=?,

      updated_at=NOW()

    WHERE event_payment_id=?
    `,
    [

      data.deposited_to_school_bank_id,

      data.amount,

      data.payment_method,

      data.transaction_id,

      data.payment_status,

      data.payment_date,

      data.remarks,

      data.status,

      id,

    ]
  );

  return result;

};

// =======================================
// Delete Payment
// =======================================
const deleteEventPayment = async (id) => {

  const [result] = await pool.query(
    `
    DELETE

    FROM tbl_event_payments

    WHERE event_payment_id=?
    `,
    [id]
  );

  return result;

};

// =======================================
// Get Payments By Registration
// =======================================
const getPaymentsByRegistration = async (
  registrationId
) => {

  const [rows] = await pool.query(
    `
    SELECT *

    FROM tbl_event_payments

    WHERE registration_id=?

    ORDER BY event_payment_id DESC
    `,
    [registrationId]
  );

  return rows;

};

// =======================================
// Check Duplicate Transaction
// =======================================
const checkDuplicateTransaction = async (
  transactionId
) => {

  const [rows] = await pool.query(
    `
    SELECT event_payment_id

    FROM tbl_event_payments

    WHERE transaction_id=?
    `,
    [transactionId]
  );

  return rows;

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

  checkDuplicateTransaction,

};