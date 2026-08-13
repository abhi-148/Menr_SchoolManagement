const {
  createStaffType,
  getAllStaffTypes,
  getStaffTypesBySchool,
  updateStaffType,
  updateStaffTypeBySchool,
  deleteStaffType,
  deleteStaffTypeBySchool
} = require(
  "../repositories/staffTypeRepository"
);
const createStaffTypeService =
async (data) => {

  if (
    data.created_by_role ===
    "SCHOOL_ADMIN"
  ) {

    data.school_id =
      data.schoolId;

  }

  data.status =
    "ACTIVE";

  return await createStaffType(
    data
  );

};

const getAllStaffTypesService =
async (user) => {

  if (
    user.role === "SUPER_ADMIN"
  ) {

    return await getAllStaffTypes();

  }

  if (
    user.role === "SCHOOL_ADMIN"
  ) {

    return await getStaffTypesBySchool(
      user.schoolId
    );

  }

  throw new Error(
    "Unauthorized"
  );

};
const updateStaffTypeService =
async (
  id,
  data,
  user
) => {

  if (
    user.role === "SUPER_ADMIN"
  ) {

    return await updateStaffType(
      id,
      data
    );

  }

  if (
    user.role === "SCHOOL_ADMIN"
  ) {

    return await updateStaffTypeBySchool(
      id,
      data,
      user.schoolId
    );

  }

  throw new Error(
    "Unauthorized"
  );

};

const deleteStaffTypeService =
async (
  id,
  user
) => {

  if (
    user.role === "SUPER_ADMIN"
  ) {

    return await deleteStaffType(
      id
    );

  }

  if (
    user.role === "SCHOOL_ADMIN"
  ) {

    return await deleteStaffTypeBySchool(
      id,
      user.schoolId
    );

  }

  throw new Error(
    "Unauthorized"
  );

};
module.exports = {
createStaffTypeService,
getAllStaffTypesService,
updateStaffTypeService,
deleteStaffTypeService
};