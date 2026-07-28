const {
  createFeeStructure,
  getAllFeeStructures,
  getFeeStructuresByClass,
  updateFeeStructure,
  deleteFeeStructure
} = require("../repositories/feeStructureRepository");

// Create
const createFeeStructureService = async (data) => {

  data.status = data.status || "active";

  // Active Key Generate
  data.active_key = `${data.school_id}_${data.batch_id}`;

  return await createFeeStructure(data);

};

// Get All
const getAllFeeStructuresService = async () => {

  return await getAllFeeStructures();

};

// Get By Class (Temporary)
// Isko Phase-2 me Get By Batch karenge
const getFeeStructuresByClassService = async (schoolClassId) => {

  return await getFeeStructuresByClass(schoolClassId);

};

// Update
const updateFeeStructureService = async (id, data) => {

  data.active_key = `${data.school_id}_${data.batch_id}`;

  return await updateFeeStructure(id, data);

};

// Delete
const deleteFeeStructureService = async (id) => {

  return await deleteFeeStructure(id);

};

module.exports = {
  createFeeStructureService,
  getAllFeeStructuresService,
  getFeeStructuresByClassService,
  updateFeeStructureService,
  deleteFeeStructureService
};