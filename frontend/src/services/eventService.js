import api from "./api";

// Get All Events
// Get All Events
export const getEvents = async (
  search = "",
  page = 1,
  limit = 10
) => {

  const response = await api.get(
    `/events?search=${search}&page=${page}&limit=${limit}`
  );

  return response.data;

};
// Create Event
export const createEvent = async (data) => {
  const response = await api.post("/events", data);
  return response.data;
};

// Update Event
export const updateEvent = async (id, data) => {
  const response = await api.put(`/events/${id}`, data);
  return response.data;
};

// Delete Event
export const deleteEvent = async (id) => {
  const response = await api.delete(`/events/${id}`);
  return response.data;
};

// Get Event By Id
export const getEventById = async (id) => {
  const response = await api.get(`/events/${id}`);
  return response.data;
};