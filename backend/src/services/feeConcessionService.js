const feeConcessionRepository = require("../repositories/feeConcessionRepository");

// ================= CREATE =================

const createFeeConcessionService = async (data) => {

  if (
    !data.student_id ||
    !data.fee_structure_id ||
    !data.concession_name ||
    !data.concession_mode ||
    !data.concession_value
  ) {
    throw new Error("All required fields are mandatory.");
  }

  data.status = data.status || "ACTIVE";

  return await feeConcessionRepository.createFeeConcession(data);
};

// ================= GET ALL =================

const getAllFeeConcessionsService = async () => {

  return await feeConcessionRepository.getAllFeeConcessions();
};

// ================= GET BY ID =================

const getFeeConcessionByIdService = async (id) => {

  const concession =
    await feeConcessionRepository.getFeeConcessionById(id);

  if (!concession) {
    throw new Error("Fee Concession not found.");
  }

  return concession;
};

// ================= UPDATE =================

const updateFeeConcessionService = async (
  id,
  data
) => {

  const concession =
    await feeConcessionRepository.getFeeConcessionById(id);

  if (!concession) {
    throw new Error("Fee Concession not found.");
  }

  return await feeConcessionRepository.updateFeeConcession(
    id,
    data
  );
};

// ================= DELETE =================

const deleteFeeConcessionService = async (id) => {

  const concession =
    await feeConcessionRepository.getFeeConcessionById(id);

  if (!concession) {
    throw new Error("Fee Concession not found.");
  }

  return await feeConcessionRepository.deleteFeeConcession(id);
};

module.exports = {

  createFeeConcessionService,

  getAllFeeConcessionsService,

  getFeeConcessionByIdService,

  updateFeeConcessionService,

  deleteFeeConcessionService,

};