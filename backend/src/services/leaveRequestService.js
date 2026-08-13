const {
  createLeaveRequest,
  getAllLeaveRequests,
  getLeaveRequestsByStaff,
  getLeaveRequestById,
  updateLeaveRequest,
  reviewLeaveRequest,
  deleteLeaveRequest
} = require("../repositories/leaveRequestRepository");


// =========================================================
// CALCULATE TOTAL DAYS
// =========================================================

const calculateTotalDays = (
  startDate,
  endDate
) => {

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime())
  ) {
    throw new Error(
      "Invalid Start Date or End Date"
    );
  }

  if (end < start) {
    throw new Error(
      "End Date Cannot Be Before Start Date"
    );
  }

  const difference =
    end.getTime() -
    start.getTime();

  return (
    Math.floor(
      difference /
      (1000 * 60 * 60 * 24)
    ) + 1
  );
};


// =========================================================
// CREATE LEAVE REQUEST
// =========================================================

const createLeaveRequestService =
async (data) => {

  if (!data.staff_id) {
    throw new Error(
      "Staff ID is required"
    );
  }

  if (!data.leave_type) {
    throw new Error(
      "Leave Type is required"
    );
  }

  if (!data.start_date) {
    throw new Error(
      "Start Date is required"
    );
  }

  if (!data.end_date) {
    throw new Error(
      "End Date is required"
    );
  }

  const totalDays =
    calculateTotalDays(
      data.start_date,
      data.end_date
    );

  data.total_days =
    totalDays;

  return await createLeaveRequest(
    data
  );
};


// =========================================================
// GET ALL LEAVE REQUESTS
// =========================================================

const getAllLeaveRequestsService =
async (user) => {

  if (!user) {
    throw new Error(
      "Unauthorized"
    );
  }

  return await getAllLeaveRequests(
    user
  );

};


// =========================================================
// GET STAFF LEAVE REQUESTS
// =========================================================

const getLeaveRequestsByStaffService =
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

  return await getLeaveRequestsByStaff(
    staffId,
    user
  );

};


// =========================================================
// GET LEAVE REQUEST BY ID
// =========================================================

const getLeaveRequestByIdService =
async (
  id,
  user
) => {

  if (!user) {
    throw new Error(
      "Unauthorized"
    );
  }

  const leave =
    await getLeaveRequestById(
      id,
      user
    );

  if (!leave) {
    throw new Error(
      "Leave Request Not Found"
    );
  }

  return leave;

};


// =========================================================
// UPDATE LEAVE REQUEST
// =========================================================

const updateLeaveRequestService =
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

  const leave =
    await getLeaveRequestById(
      id,
      user
    );

  if (!leave) {
    throw new Error(
      "Leave Request Not Found"
    );
  }

  // Only the staff who created the request
  // should be able to update it.

  if (
    user.role === "STAFF" &&
    Number(leave.staff_id) !==
    Number(user.id)
  ) {
    throw new Error(
      "You Can Only Update Your Own Leave Request"
    );
  }

  if (
    leave.status !== "PENDING"
  ) {
    throw new Error(
      "Only Pending Leave Requests Can Be Updated"
    );
  }

  if (!data.leave_type) {
    throw new Error(
      "Leave Type is required"
    );
  }

  if (!data.start_date) {
    throw new Error(
      "Start Date is required"
    );
  }

  if (!data.end_date) {
    throw new Error(
      "End Date is required"
    );
  }

  const totalDays =
    calculateTotalDays(
      data.start_date,
      data.end_date
    );

  data.total_days =
    totalDays;

  return await updateLeaveRequest(
    id,
    data
  );

};


// =========================================================
// REVIEW LEAVE REQUEST
// =========================================================

const reviewLeaveRequestService =
async (
  id,
  status,
  reviewedBy,
  comments,
  user
) => {

  if (!user) {
    throw new Error(
      "Unauthorized"
    );
  }

  if (
    ![
      "SUPER_ADMIN",
      "SCHOOL_ADMIN"
    ].includes(user.role)
  ) {
    throw new Error(
      "Unauthorized"
    );
  }

  const leave =
    await getLeaveRequestById(
      id,
      user
    );

  if (!leave) {
    throw new Error(
      "Leave Request Not Found"
    );
  }

  if (
    ![
      "APPROVED",
      "REJECTED"
    ].includes(status)
  ) {
    throw new Error(
      "Invalid Leave Status"
    );
  }

  if (
    leave.status !== "PENDING"
  ) {
    throw new Error(
      "Leave Request Has Already Been Reviewed"
    );
  }

  return await reviewLeaveRequest(
    id,
    status,
    reviewedBy,
    comments
  );

};


// =========================================================
// DELETE LEAVE REQUEST
// =========================================================

const deleteLeaveRequestService =
async (
  id,
  user
) => {

  if (!user) {
    throw new Error(
      "Unauthorized"
    );
  }

  const leave =
    await getLeaveRequestById(
      id,
      user
    );

  if (!leave) {
    throw new Error(
      "Leave Request Not Found"
    );
  }

  // Staff can delete only own request

  if (
    user.role === "STAFF" &&
    Number(leave.staff_id) !==
    Number(user.id)
  ) {
    throw new Error(
      "You Can Only Delete Your Own Leave Request"
    );
  }

  if (
    leave.status !== "PENDING"
  ) {
    throw new Error(
      "Only Pending Leave Requests Can Be Deleted"
    );
  }

  return await deleteLeaveRequest(
    id
  );

};


// =========================================================
// EXPORT
// =========================================================

module.exports = {

  createLeaveRequestService,

  getAllLeaveRequestsService,

  getLeaveRequestsByStaffService,

  getLeaveRequestByIdService,

  updateLeaveRequestService,

  reviewLeaveRequestService,

  deleteLeaveRequestService

};