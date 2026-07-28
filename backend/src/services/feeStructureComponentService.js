const {
  createFeeStructureComponent,
  getAllFeeStructureComponents,
  getComponentsByFeeStructure,
  updateFeeStructureComponent,
  deleteFeeStructureComponent
} = require("../repositories/feeStructureComponentRepository");

// Create
const createFeeStructureComponentService = async (data) => {

  data.status = data.status || "active";

  // Calculate Tax Amount
  const taxPercentage = Number(data.tax_percentage || 0);
  const amount = Number(data.amount);

  data.tax_amount = (amount * taxPercentage) / 100;
  data.final_amount = amount + data.tax_amount;

  return await createFeeStructureComponent(data);
};

// Get All
const getAllFeeStructureComponentsService = async () => {
  return await getAllFeeStructureComponents();
};

// Get By Fee Structure
const getComponentsByFeeStructureService = async (feeStructureId) => {
  return await getComponentsByFeeStructure(feeStructureId);
};

// Update
const updateFeeStructureComponentService = async (id, data) => {

  const taxPercentage = Number(data.tax_percentage || 0);
  const amount = Number(data.amount);

  data.tax_amount = (amount * taxPercentage) / 100;
  data.final_amount = amount + data.tax_amount;

  return await updateFeeStructureComponent(id, data);
};

// Delete
const deleteFeeStructureComponentService = async (id) => {
  return await deleteFeeStructureComponent(id);
};

module.exports = {
  createFeeStructureComponentService,
  getAllFeeStructureComponentsService,
  getComponentsByFeeStructureService,
  updateFeeStructureComponentService,
  deleteFeeStructureComponentService
};