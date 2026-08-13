const {
  createAcademicYearSession,
  getAllAcademicYearSessions,
  getAcademicYearSessionById,
  updateAcademicYearSession,
  deleteAcademicYearSession,
  checkDuplicateAcademicYearSession,
  getCurrentAcademicYearSession,
  resetCurrentAcademicYearSessions,
} = require("../repositories/academicYearSessionRepository");

// ==========================================
// Create Academic Year Session
// ==========================================
const createAcademicYearSessionService = async (
  data
) => {

  // ------------------------------------------
  // Required Validations
  // ------------------------------------------

  if (!data.academic_year_id) {
    throw new Error(
      "Academic Year is required."
    );
  }

  if (!data.session_name) {
    throw new Error(
      "Session Name is required."
    );
  }

  if (
    data.session_number === undefined ||
    data.session_number === null ||
    data.session_number === ""
  ) {
    throw new Error(
      "Session Number is required."
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

  // ------------------------------------------
  // Date Validation
  // ------------------------------------------

  if (
    new Date(data.start_date) >=
    new Date(data.end_date)
  ) {
    throw new Error(
      "Start Date must be before End Date."
    );
  }

  // ------------------------------------------
  // Normalize Values
  // ------------------------------------------

  data.session_number =
    Number(data.session_number);

  if (
    Number.isNaN(data.session_number)
  ) {
    throw new Error(
      "Session Number must be a valid number."
    );
  }

  data.is_current =
    Number(data.is_current) || 0;

  if (
    data.is_current !== 0 &&
    data.is_current !== 1
  ) {
    throw new Error(
      "Is Current must be 0 or 1."
    );
  }

  data.status =
    data.status || "ACTIVE";

  // ------------------------------------------
  // Duplicate Validation
  // ------------------------------------------

  const duplicate =
    await checkDuplicateAcademicYearSession(
      data.academic_year_id,
      data.session_name,
      data.session_number
    );

  if (duplicate.length > 0) {
    throw new Error(
      "Session with the same name or session number already exists."
    );
  }

  // ------------------------------------------
  // Current Session Handling
  // ------------------------------------------

  if (data.is_current === 1) {

    await resetCurrentAcademicYearSessions(
      data.academic_year_id
    );
  }

  // ------------------------------------------
  // Create
  // ------------------------------------------

  return await createAcademicYearSession(
    data
  );
};

// ==========================================
// Get All Academic Year Sessions
// ==========================================
const getAllAcademicYearSessionsService =
  async (academicYearId = null) => {

    return await getAllAcademicYearSessions(
      academicYearId
    );
  };

// ==========================================
// Get Academic Year Session By ID
// ==========================================
const getAcademicYearSessionByIdService =
  async (id) => {

    if (!id) {
      throw new Error(
        "Session ID is required."
      );
    }

    const session =
      await getAcademicYearSessionById(
        id
      );

    if (!session) {
      throw new Error(
        "Academic Year Session not found."
      );
    }

    return session;
  };

// ==========================================
// Update Academic Year Session
// ==========================================
const updateAcademicYearSessionService = async (
  id,
  data
) => {

    // ------------------------------------------
    // Existing Session
    // ------------------------------------------

    const existing =
      await getAcademicYearSessionById(
        id
      );

    if (!existing) {
      throw new Error(
        "Academic Year Session not found."
      );
    }

    // ------------------------------------------
    // Required Validations
    // ------------------------------------------

    if (!data.academic_year_id) {
      throw new Error(
        "Academic Year is required."
      );
    }

    if (!data.session_name) {
      throw new Error(
        "Session Name is required."
      );
    }

    if (
      data.session_number === undefined ||
      data.session_number === null ||
      data.session_number === ""
    ) {
      throw new Error(
        "Session Number is required."
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

    // ------------------------------------------
    // Date Validation
    // ------------------------------------------

    if (
      new Date(data.start_date) >=
      new Date(data.end_date)
    ) {
      throw new Error(
        "Start Date must be before End Date."
      );
    }

    // ------------------------------------------
    // Normalize Values
    // ------------------------------------------

    data.session_number =
      Number(data.session_number);

    if (
      Number.isNaN(data.session_number)
    ) {
      throw new Error(
        "Session Number must be a valid number."
      );
    }

    data.is_current =
      Number(data.is_current) || 0;

    if (
      data.is_current !== 0 &&
      data.is_current !== 1
    ) {
      throw new Error(
        "Is Current must be 0 or 1."
      );
    }

    data.status =
      data.status || "ACTIVE";

    // ------------------------------------------
    // Duplicate Validation
    // ------------------------------------------

    const duplicate =
      await checkDuplicateAcademicYearSession(
        data.academic_year_id,
        data.session_name,
        data.session_number,
        id
      );

    if (duplicate.length > 0) {
      throw new Error(
        "Another session with the same name or session number already exists."
      );
    }

    // ------------------------------------------
    // Current Session Handling
    // ------------------------------------------

    if (data.is_current === 1) {

      await resetCurrentAcademicYearSessions(
        data.academic_year_id,
        id
      );
    }

    // ------------------------------------------
    // Update
    // ------------------------------------------

    return await updateAcademicYearSession(
      id,
      data
    );
  };

// ==========================================
// Delete Academic Year Session
// ==========================================
const deleteAcademicYearSessionService =
  async (id) => {

    if (!id) {
      throw new Error(
        "Session ID is required."
      );
    }

    const existing =
      await getAcademicYearSessionById(
        id
      );

    if (!existing) {
      throw new Error(
        "Academic Year Session not found."
      );
    }

    return await deleteAcademicYearSession(
      id
    );
  };

// ==========================================
// Get Current Academic Year Session
// ==========================================
const getCurrentAcademicYearSessionService =
  async (academicYearId) => {

    if (!academicYearId) {
      throw new Error(
        "Academic Year is required."
      );
    }

    return await getCurrentAcademicYearSession(
      academicYearId
    );
  };

// ==========================================
// Export
// ==========================================
module.exports = {
  createAcademicYearSessionService,
  getAllAcademicYearSessionsService,
  getAcademicYearSessionByIdService,
  updateAcademicYearSessionService,
  deleteAcademicYearSessionService,
  getCurrentAcademicYearSessionService,
};