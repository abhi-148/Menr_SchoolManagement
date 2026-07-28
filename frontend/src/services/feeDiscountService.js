import API from "./api";

// ================= GET ALL =================

export const getFeeDiscounts = async () => {

  const response = await API.get(
    "/fee-discounts"
  );

  return response.data;

};

// ================= GET BY ID =================

export const getFeeDiscountById = async (
  id
) => {

  const response = await API.get(
    `/fee-discounts/${id}`
  );

  return response.data;

};

// ================= CREATE =================

export const createFeeDiscount = async (
  data
) => {

  const response = await API.post(
    "/fee-discounts",
    data
  );

  return response.data;

};

// ================= UPDATE =================

export const updateFeeDiscount = async (
  id,
  data
) => {

  const response = await API.put(
    `/fee-discounts/${id}`,
    data
  );

  return response.data;

};

// ================= DELETE =================

export const deleteFeeDiscount = async (
  id
) => {

  const response = await API.delete(
    `/fee-discounts/${id}`
  );

  return response.data;

};