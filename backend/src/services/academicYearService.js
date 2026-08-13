const pool = require("../config/db");

const {
  createAcademicYear,
  getAllAcademicYears,
  getAcademicYearsBySchool,
  getAcademicYearById,
  updateAcademicYear: updateAcademicYearRepository,
  deleteAcademicYear,
  checkDuplicateAcademicYear,
  getCurrentAcademicYear,
} = require("../repositories/academicYearRepository");

// ==========================================
// Create Academic Year
// ==========================================
const createAcademicYearService = async (data) => {

  // Default values
 data.status = String(data.status || "active").toLowerCase();
  data.is_current = Number(data.is_current) || 0;

  // Required validation
  if (!data.school_id) {
    throw new Error("School is required.");
  }

  if (!data.branch_id) {
    throw new Error("Branch is required.");
  }

  if (!data.academic_year_name) {
    throw new Error(
      "Academic Year Name is required."
    );
  }

  if (!data.start_date) {
    throw new Error(
      "Start Date is required."
    );
  }

  if (!data.end_date) {
    throw new Error(
      "End Date is required."
    );
  }

  // Date validation
  if (
    new Date(data.start_date) >=
    new Date(data.end_date)
  ) {
    throw new Error(
      "Start Date must be before End Date."
    );
  }

  // Duplicate validation
  const duplicate =
    await checkDuplicateAcademicYear(
      data.school_id,
      data.branch_id,
      data.academic_year_name
    );

  if (duplicate.length > 0) {
    throw new Error(
      "Academic Year already exists."
    );
  }

  // Only one current academic year
  if (data.is_current === 1) {

    await pool.query(
      `
      UPDATE academic_years
      SET is_current = 0
      WHERE school_id = ?
        AND branch_id = ?
      `,
      [
        data.school_id,
        data.branch_id,
      ]
    );
  }

  return await createAcademicYear(data);
};

// ==========================================
// Get All Academic Years
// ==========================================
const getAllAcademicYearsService =
  async (user) => {

    if (user.role === "SUPER_ADMIN") {
      return await getAllAcademicYears();
    }

    if (user.role === "SCHOOL_ADMIN") {
      return await getAcademicYearsBySchool(
        user.schoolId ||
        user.school_id
      );
    }

    throw new Error(
      "Unauthorized"
    );
  };

// ==========================================
// Get Academic Year By ID
// ==========================================
const getAcademicYearByIdService =
  async (id) => {

    const academicYear =
      await getAcademicYearById(id);

    if (!academicYear) {
      throw new Error(
        "Academic Year not found."
      );
    }

    return academicYear;
  };

// ==========================================
// Update Academic Year
// ==========================================
const updateAcademicYearService =
  async (
    id,
    data
  ) => {

    const existing =
      await getAcademicYearById(id);

    if (!existing) {
      throw new Error(
        "Academic Year not found."
      );
    }

    // Required validation
    if (!data.academic_year_name) {
      throw new Error(
        "Academic Year Name is required."
      );
    }

    if (!data.start_date) {
      throw new Error(
        "Start Date is required."
      );
    }

    if (!data.end_date) {
      throw new Error(
        "End Date is required."
      );
    }

    // Date validation
    if (
      new Date(data.start_date) >=
      new Date(data.end_date)
    ) {
      throw new Error(
        "Start Date must be before End Date."
      );
    }

    // Normalize values
  data.is_current =
  data.is_current === true ||
  data.is_current === 1 ||
  data.is_current === "1"
    ? 1
    : 0;

data.status =
  String(data.status || "active").toLowerCase();

if (!["active", "inactive"].includes(data.status)) {
  throw new Error(
    "Status must be active or inactive."
  );
}

data.school_id =
  data.school_id || existing.school_id;

data.branch_id =
  data.branch_id || existing.branch_id;

if (!["active", "inactive"].includes(data.status)) {
  throw new Error(
    "Status must be active or inactive."
  );
}

data.is_current =
  data.is_current === true ||
  data.is_current === 1 ||
  data.is_current === "1"
    ? 1
    : 0;

    // If this academic year becomes current,
    // make other academic years non-current.
    if (data.is_current === 1) {

      await pool.query(
        `
        UPDATE academic_years
        SET is_current = 0
        WHERE school_id = ?
          AND branch_id = ?
          AND id <> ?
        `,
        [
          existing.school_id,
          existing.branch_id,
          id,
        ]
      );
    }

    return await updateAcademicYearRepository(
      id,
      data
    );
  };

// ==========================================
// Delete Academic Year
// ==========================================
const deleteAcademicYearService =
  async (id) => {

    const existing =
      await getAcademicYearById(id);

    if (!existing) {
      throw new Error(
        "Academic Year not found."
      );
    }

    return await deleteAcademicYear(id);
  };

// ==========================================
// Get Current Academic Year
// ==========================================
const getCurrentAcademicYearService =
  async (
    schoolId,
    branchId
  ) => {

    if (!schoolId) {
      throw new Error(
        "School is required."
      );
    }

    if (!branchId) {
      throw new Error(
        "Branch is required."
      );
    }

    return await getCurrentAcademicYear(
      schoolId,
      branchId
    );
  };

// ==========================================
// Export
// ==========================================
module.exports = {
  createAcademicYearService,
  getAllAcademicYearsService,
  getAcademicYearByIdService,
  updateAcademicYearService,
  deleteAcademicYearService,
  getCurrentAcademicYearService,
};