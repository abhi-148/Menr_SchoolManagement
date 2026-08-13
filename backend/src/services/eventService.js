const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  checkDuplicateEvent,
  checkDuplicateEventForUpdate,
} = require("../repositories/eventRepository");

// ===============================
// Helper - Calculate Duration
// ===============================
const calculateDurationHours = (
  startDate,
  endDate,
  startTime,
  endTime
) => {
  try {
    const start = new Date(
      `${startDate}T${startTime || "00:00:00"}`
    );

    const end = new Date(
      `${endDate}T${endTime || "00:00:00"}`
    );

    const diff =
      (end - start) / (1000 * 60 * 60);

    return diff > 0
      ? Number(diff.toFixed(2))
      : 0;

  } catch {

    return 0;

  }
};

// ===============================
// Create Event
// ===============================
const createEventService = async (data) => {

  console.log("========== EVENT CREATE ==========");
  console.log(data);
  console.log("==================================");

  // Required Validation

  if (!data.school_id)
    throw new Error("School is required.");

  if (!data.academic_year_id)
    throw new Error("Academic Year is required.");

  if (!data.school_branch_id)
    throw new Error("School Branch is required.");

  if (!data.event_name)
    throw new Error("Event Name is required.");

  if (!data.event_type)
    throw new Error("Event Type is required.");

  if (!data.start_date)
    throw new Error("Start Date is required.");

  if (!data.end_date)
    throw new Error("End Date is required.");

  // Date Validation

  if (
    new Date(data.end_date) <
    new Date(data.start_date)
  ) {
    throw new Error(
      "End Date cannot be before Start Date."
    );
  }

  // Time Validation

  if (
    data.start_date === data.end_date &&
    data.start_time &&
    data.end_time &&
    data.end_time <= data.start_time
  ) {
    throw new Error(
      "End Time must be greater than Start Time."
    );
  }

  // Duplicate Validation

  const duplicateEvent =
    await checkDuplicateEvent(
      data.school_id,
      data.school_branch_id,
      data.event_name,
      data.start_date
    );

  if (duplicateEvent.length > 0) {

    throw new Error(
      "An event with the same name already exists on this date."
    );

  }

  // Single / Multiple Day

  data.is_single_day =
    data.start_date === data.end_date;

  data.is_multiple_day =
    !data.is_single_day;

  // Duration

  data.total_duration_hours =
    calculateDurationHours(
      data.start_date,
      data.end_date,
      data.start_time,
      data.end_time
    );

  // Registration Defaults

  data.current_registrations = 0;
  data.current_students = 0;
  data.current_staff = 0;
  data.current_parents = 0;

  data.available_spots =
    Number(data.max_participants) || 0;

  data.is_registration_full = false;

  data.registration_status =
    data.registration_status || "OPEN";

  // Default Values

  data.event_status =
    data.event_status || "DRAFT";

  data.priority =
    data.priority || "MEDIUM";

  data.status =
    data.status || "ACTIVE";

  data.expected_participants =
    Number(data.expected_participants) || 0;

  data.budget =
    Number(data.budget) || 0;

  console.log("========== FINAL DATA ==========");
  console.log(data);
  console.log("================================");

  return await createEvent(data);

};

// ===============================
// Get All Events
// ===============================
const getAllEventsService = async (
  search,
  page,
  limit
) => {

  return await getAllEvents(
    search,
    page,
    limit
  );

};

// ===============================
// Get Event By ID
// ===============================
const getEventByIdService = async (
  id
) => {

  const event =
    await getEventById(id);

  if (!event) {

    throw new Error(
      "Event not found."
    );

  }

  return event;

};

// ===============================
// Update Event
// ===============================
const updateEventService = async (
  id,
  data
) => {

  const existing =
    await getEventById(id);

  if (!existing) {

    throw new Error(
      "Event not found."
    );

  }

  const duplicate =
    await checkDuplicateEventForUpdate(
      id,
      existing.school_id,
      data.school_branch_id,
      data.event_name,
      data.start_date
    );

  if (duplicate.length > 0) {

    throw new Error(
      "Another event with the same name already exists."
    );

  }

  if (
    new Date(data.end_date) <
    new Date(data.start_date)
  ) {

    throw new Error(
      "End Date cannot be before Start Date."
    );

  }

  if (
    data.start_date === data.end_date &&
    data.start_time &&
    data.end_time &&
    data.end_time <= data.start_time
  ) {

    throw new Error(
      "End Time must be greater than Start Time."
    );

  }

  data.is_single_day =
    data.start_date === data.end_date;

  data.is_multiple_day =
    !data.is_single_day;

  data.total_duration_hours =
    calculateDurationHours(
      data.start_date,
      data.end_date,
      data.start_time,
      data.end_time
    );

  return await updateEvent(
    id,
    data
  );

};

// ===============================
// Delete Event
// ===============================
const deleteEventService = async (
  id
) => {

  const existing =
    await getEventById(id);

  if (!existing) {

    throw new Error(
      "Event not found."
    );

  }

  return await deleteEvent(id);

};

// ===============================
// Exports
// ===============================
module.exports = {

  createEventService,

  getAllEventsService,

  getEventByIdService,

  updateEventService,

  deleteEventService,

};