import API from "./api";

// ================= GET ALL =================

export const getFeeConcessions = async () => {

  const response = await API.get(
    "/fee-concessions"
  );

  return response.data;

};

// ================= GET BY ID =================

export const getFeeConcessionById = async (
  id
) => {

  const response = await API.get(
    `/fee-concessions/${id}`
  );

  return response.data;

};

// ================= CREATE =================

export const createFeeConcession = async (
  data
) => {

  const response = await API.post(
    "/fee-concessions",
    data
  );

  return response.data;

};

// ================= UPDATE =================

export const updateFeeConcession = async (
  id,
  data
) => {

  const response = await API.put(
    `/fee-concessions/${id}`,
    data
  );

  return response.data;

};

// ================= DELETE =================

export const deleteFeeConcession = async (
  id
) => {

  const response = await API.delete(
    `/fee-concessions/${id}`
  );

  return response.data;

};