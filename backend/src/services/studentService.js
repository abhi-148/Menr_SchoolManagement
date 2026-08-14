const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  createStudent,
  getAllStudents,
  getStudentsBySchool,
  getStudentById,
  updateStudent,
  updateStudentStatus,
  getStudentsWithPagination,
  searchStudents,
  findStudentByRollNumber,
  updateStudentPassword,
  getStudentPasswordById,

  getStudentDashboardProfile,
  getStudentDashboardSubjects,
  getStudentDashboardAttendance,
  getStudentDashboardMarks,
  getStudentDashboardFees

} = require("../repositories/studentRepository");

const createStudentService = async (studentData) => {

  const defaultPassword =
    process.env.DEFAULT_STUDENT_PASSWORD || "Student@123";

  const hashedPassword =
    await bcrypt.hash(defaultPassword, 10);

  studentData.password = hashedPassword;

  studentData.status = "ACTIVE";

  await createStudent(studentData);

  return {
    message: "Student Created Successfully",
    defaultPassword
  };
};

const getAllStudentsService = async (
  user
) => {

  if (
    user.role === "SUPER_ADMIN"
  ) {

    return await getAllStudents();

  }

  if (
    user.role === "SCHOOL_ADMIN"
  ) {

    return await getStudentsBySchool(
      user.schoolId
    );

  }

  throw new Error(
    "Unauthorized"
  );

};

const getStudentByIdService = async (
  id
) => {

  return await getStudentById(id);

};

const updateStudentService = async (
  id,
  data
) => {

  return await updateStudent(
    id,
    data
  );

};

const updateStudentStatusService = async (
  id,
  status
) => {

  return await updateStudentStatus(
    id,
    status
  );

};

const getStudentsWithPaginationService =
async (
  limit,
  offset
) => {

  return await getStudentsWithPagination(
    limit,
    offset
  );

};

const searchStudentsService = async (
  search
) => {

  return await searchStudents(
    search
  );

};
// Student Login
const loginStudentService = async (
  rollNumber,
  password
) => {

  const student =
    await findStudentByRollNumber(
      rollNumber
    );

  if (!student) {
    throw new Error(
      "Invalid Roll Number"
    );
  }

  const isMatch =
    await bcrypt.compare(
      password,
      student.password
    );

  if (!isMatch) {
    throw new Error(
      "Invalid Password"
    );
  }

  const token = jwt.sign(
    {
      id: student.id,
      school_id: student.school_id,
      branch_id: student.branch_id,
      role: "STUDENT"
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d"
    }
  );

  return token;
};

// Change Student Password
const changeStudentPasswordService = async (
  studentId,
  oldPassword,
  newPassword
) => {

  const student =
  await getStudentPasswordById(studentId);

  if (!student) {
    throw new Error(
      "Student Not Found"
    );
  }

  const isMatch =
    await bcrypt.compare(
      oldPassword,
      student.password
    );

  if (!isMatch) {
    throw new Error(
      "Old Password Incorrect"
    );
  }

  const hashedPassword =
    await bcrypt.hash(
      newPassword,
      10
    );

  await updateStudentPassword(
    studentId,
    hashedPassword
  );

  return {
    message:
      "Password Changed Successfully"
  };
};

// =========================================================
// STUDENT DASHBOARD SERVICE
// =========================================================

const getStudentDashboardService = async (
  studentId
) => {

  const profile =
    await getStudentDashboardProfile(
      studentId
    );


  if (!profile) {

    throw new Error(
      "Student Not Found"
    );

  }


  const subjects =
    await getStudentDashboardSubjects(
      studentId
    );


  const attendance =
    await getStudentDashboardAttendance(
      studentId
    );


  const marks =
    await getStudentDashboardMarks(
      studentId
    );


  const fees =
    await getStudentDashboardFees(
      studentId
    );


  return {

    profile,

    subjects,

    attendance,

    marks,

    fees

  };

};
module.exports = {
  createStudentService,
  getAllStudentsService,
  getStudentByIdService,
  updateStudentService,
  updateStudentStatusService,
  getStudentsWithPaginationService,
  searchStudentsService,
  loginStudentService,
  getStudentDashboardService,
  changeStudentPasswordService
};