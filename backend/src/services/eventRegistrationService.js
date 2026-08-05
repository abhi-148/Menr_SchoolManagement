const {

  createEventRegistration,

  getAllEventRegistrations,

  getEventRegistrationById,

  updateEventRegistration,

  deleteEventRegistration,

  checkDuplicateRegistration,

  getRegistrationCountByEvent,

  getRegistrationsByEvent,

} = require("../repositories/eventRegistrationRepository");

const {
  getEventById,
  updateEventRegistrationCounts,
} = require("../repositories/eventRepository");

// =======================================
// Create Event Registration
// =======================================
const createEventRegistrationService = async (
  data
) => {

  // Required Validations

  if (!data.event_id)
    throw new Error("Event is required.");

  if (!data.school_id)
    throw new Error("School is required.");

  if (!data.participant_type)
    throw new Error("Participant Type is required.");

  // Check Event Exists

  const event =
    await getEventById(data.event_id);

  if (!event) {
    throw new Error("Event not found.");
  }

  // Event Status

  if (
    event.status === "CANCELLED"
  ) {
    throw new Error(
      "Registration is closed for cancelled events."
    );
  }

  // Registration Deadline

  if (
    event.registration_deadline &&
    new Date() >
      new Date(event.registration_deadline)
  ) {
    throw new Error(
      "Registration deadline has expired."
    );
  }

  // Maximum Participants

  const total =
    await getRegistrationCountByEvent(
      data.event_id
    );

  if (
    event.max_participants &&
    total.total >= event.max_participants
  ) {
    throw new Error(
      "Maximum participant limit reached."
    );
  }

  // Default Values

data.registration_date =
  data.registration_date || new Date();

  data.registration_status =
    data.registration_status ||
    "REGISTERED";

  data.status =
    data.status ||
    "ACTIVE";

      // =======================================
  // Participant Validation
  // =======================================

  if (data.participant_type === "STUDENT") {

    if (!data.student_id) {
      throw new Error(
        "Student is required."
      );
    }

  }

  else if (data.participant_type === "STAFF") {

    if (!data.staff_id) {
      throw new Error(
        "Staff is required."
      );
    }

  }

  else if (data.participant_type === "PARENT") {

    if (!data.parent_id) {
      throw new Error(
        "Parent is required."
      );
    }

  }

  else {

    throw new Error(
      "Invalid participant type."
    );

  }

  // =======================================
  // Duplicate Registration Check
  // =======================================

  const duplicate =
    await checkDuplicateRegistration(

      data.event_id,

      data.participant_type,

      data.student_id || null,

      data.staff_id || null,

      data.parent_id || null

    );

  if (duplicate.length > 0) {

    throw new Error(
      "Participant already registered for this event."
    );

  }

  // =======================================
  // Create Registration
  // =======================================

  const registration = await createEventRegistration(
    data
  );

  // Update registration counts
  await updateEventRegistrationCounts(data.event_id);

  return registration;

};

// =======================================
// Get All Event Registrations
// =======================================
const getAllEventRegistrationsService = async () => {

  return await getAllEventRegistrations();

};

// =======================================
// Get Event Registration By Id
// =======================================
const getEventRegistrationByIdService = async (
  id
) => {

  const registration =
    await getEventRegistrationById(id);

  if (!registration) {

    throw new Error(
      "Event registration not found."
    );

  }

  return registration;

};

// =======================================
// Update Event Registration
// =======================================
const updateEventRegistrationService = async (
  id,
  data
) => {

  const existing =
    await getEventRegistrationById(id);

  if (!existing) {

    throw new Error(
      "Event registration not found."
    );

  }

  if (!data.participant_type) {
  throw new Error("Participant Type is required.");
}



 const result = await updateEventRegistration(
  id,
  data
);

// Registration counts update karo
await updateEventRegistrationCounts(existing.event_id);

return result;

};

// =======================================
// Delete Event Registration
// =======================================
const deleteEventRegistrationService = async (
  id
) => {

  const existing =
    await getEventRegistrationById(id);

  if (!existing) {

    throw new Error(
      "Event registration not found."
    );

  }

 const result = await deleteEventRegistration(id);

// Registration counts update karo
await updateEventRegistrationCounts(existing.event_id);

return result;

};

// =======================================
// Get Registrations By Event
// =======================================
const getRegistrationsByEventService = async (
  eventId
) => {

  return await getRegistrationsByEvent(
    eventId
  );

};

// =======================================
// Module Exports
// =======================================
module.exports = {

  createEventRegistrationService,

  getAllEventRegistrationsService,

  getEventRegistrationByIdService,

  updateEventRegistrationService,

  deleteEventRegistrationService,

  getRegistrationsByEventService,

};