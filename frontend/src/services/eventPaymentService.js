import api from "./api";

// Get All
export const getEventPayments = async () => {
  const res = await api.get("/event-payments");
  return res.data;
};

// Get By Id
export const getEventPaymentById = async (id) => {
  const res = await api.get(`/event-payments/${id}`);
  return res.data;
};

// Create
export const createEventPayment = async (data) => {
  const res = await api.post("/event-payments", data);
  return res.data;
};

// Update
export const updateEventPayment = async (id, data) => {
  const res = await api.put(`/event-payments/${id}`, data);
  return res.data;
};

// Delete
export const deleteEventPayment = async (id) => {
  const res = await api.delete(`/event-payments/${id}`);
  return res.data;
};

// Registration Payments
export const getPaymentsByRegistration = async (registrationId) => {
  const res = await api.get(
    `/event-payments/registration/${registrationId}`
  );
  return res.data;
};