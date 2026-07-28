import API from "./api";

// ================= GET ALL =================
export const getFeeInstallments = async () => {
  const response = await API.get("/fee-installments");
  return response.data;
};

// ================= GET BY FEE STRUCTURE =================
export const getInstallmentsByFeeStructure = async (
  feeStructureId
) => {
  const response = await API.get(
    `/fee-installments/fee-structure/${feeStructureId}`
  );

  return response.data;
};

// ================= CREATE =================
export const createFeeInstallment = async (data) => {
  const response = await API.post(
    "/fee-installments",
    data
  );

  return response.data;
};

// ================= UPDATE =================
export const updateFeeInstallment = async (
  id,
  data
) => {
  const response = await API.put(
    `/fee-installments/${id}`,
    data
  );

  return response.data;
};

// ================= DELETE =================
export const deleteFeeInstallment = async (id) => {
  const response = await API.delete(
    `/fee-installments/${id}`
  );

  return response.data;
};