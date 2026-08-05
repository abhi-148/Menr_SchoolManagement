import api from "./api";

// ==============================
// Get All Registrations
// ==============================
export const getEventRegistrations = async () => {
  const response = await api.get(
    "/event-registrations"
  );

  return response.data;
};

// ==============================
// Get Registration By Id
// ==============================
export const getEventRegistrationById = async (
  id
) => {
  const response = await api.get(
    `/event-registrations/${id}`
  );

  return response.data;
};

// ==============================
// Create Registration
// ==============================
export const createEventRegistration = async (
  data
) => {
  const response = await api.post(
    "/event-registrations",
    data
  );

  return response.data;
};

// ==============================
// Update Registration
// ==============================
export const updateEventRegistration = async (
  id,
  data
) => {
  const response = await api.put(
    `/event-registrations/${id}`,
    data
  );

  return response.data;
};

// ==============================
// Delete Registration
// ==============================
export const deleteEventRegistration = async (
  id
) => {
  const response = await api.delete(
    `/event-registrations/${id}`
  );

  return response.data;
};

// ==============================
// Get Registrations By Event
// ==============================
export const getRegistrationsByEvent = async (
  eventId
) => {
  const response = await api.get(
    `/event-registrations/event/${eventId}`
  );

  return response.data;
};