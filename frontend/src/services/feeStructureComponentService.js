import api from "./api";

// Get All Components
export const getFeeStructureComponents = async () => {
  const response = await api.get("/fee-structure-components");
  return response.data;
};

// Get Components By Fee Structure
export const getComponentsByFeeStructure = async (feeStructureId) => {
  const response = await api.get(
    `/fee-structure-components/fee-structure/${feeStructureId}`
  );

  return response.data;
};

// Create Component
export const createFeeStructureComponent = async (data) => {
  const response = await api.post(
    "/fee-structure-components",
    data
  );

  return response.data;
};

// Update Component
export const updateFeeStructureComponent = async (
  id,
  data
) => {
  const response = await api.put(
    `/fee-structure-components/${id}`,
    data
  );

  return response.data;
};

// Delete Component
export const deleteFeeStructureComponent = async (
  id
) => {
  const response = await api.delete(
    `/fee-structure-components/${id}`
  );

  return response.data;
};