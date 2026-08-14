const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const transporter =
  require("../config/mailConfig");

const generatePassword =
  require("../utils/passwordGenerator");

const {
  createStaff,
  getAllStaff,
  getStaffBySchool,
  findStaffByEmail,
  findStaffById,
  getStaffPasswordById,
  updateStaffPassword,
  updateStaff,
  deleteStaff
} = require("../repositories/staffRepository");

// Create Staff
const createStaffService = async (
  staffData
) => {

  const existingStaff =
    await findStaffByEmail(
      staffData.email
    );

  if (existingStaff) {
    throw new Error(
      "Email Already Exists"
    );
  }

  const password =
    generatePassword();

  const hashedPassword =
    await bcrypt.hash(
      password,
      10
    );

  staffData.password =
    hashedPassword;

  staffData.status =
    "ACTIVE";

  await createStaff(
    staffData
  );

  await transporter.sendMail({
    from:
      process.env.EMAIL_USER,

    to:
      staffData.email,

    subject:
      "School Management Login Credentials",

    html: `
      <h2>
        Welcome To School Management System
      </h2>

      <p>
        Your account has been created.
      </p>

      <p>
        <b>Email:</b>
        ${staffData.email}
      </p>

      <p>
        <b>Password:</b>
        ${password}
      </p>

      <p>
        Please login and change your password.
      </p>
    `
  });

  return {
    message:
      "Staff Created Successfully",
    password
  };
};

// Get All Staff
const getAllStaffService =
async (user) => {

  if (
    user.role === "SUPER_ADMIN"
  ) {

    return await getAllStaff();

  }

  if (
    user.role === "SCHOOL_ADMIN"
  ) {

    return await getStaffBySchool(
      user.schoolId
    );

  }

  throw new Error(
    "Unauthorized"
  );

};

// Login Staff
const loginStaffService = async (
  email,
  password
) => {

  const normalizedEmail =
    email.trim().toLowerCase();

  const staff =
    await findStaffByEmail(
      normalizedEmail
    );

  if (!staff) {
    throw new Error(
      "Invalid Email or Password"
    );
  }

  const isMatch =
    await bcrypt.compare(
      password,
      staff.password
    );

  if (!isMatch) {
    throw new Error(
      "Invalid Email or Password"
    );
  }

  const token = jwt.sign(
    {
      id: staff.id,
      schoolId: staff.school_id,
      role: "STAFF"
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d"
    }
  );

  return token;
};

// Staff Profile
const getStaffProfileService = async (
  staffId
) => {

  const staff =
    await findStaffById(staffId);

  if (!staff) {
    throw new Error(
      "Staff Not Found"
    );
  }

  return staff;

};

// Change Staff Password
const changeStaffPasswordService =
async (
  staffId,
  oldPassword,
  newPassword
) => {

  const staff =
    await getStaffPasswordById(
      staffId
    );

  if (!staff) {
    throw new Error(
      "Staff Not Found"
    );
  }

  const isMatch =
    await bcrypt.compare(
      oldPassword,
      staff.password
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

  await updateStaffPassword(
    staffId,
    hashedPassword
  );

  return {
    message:
      "Password Changed Successfully"
  };

};

// Update Staff
const updateStaffService =
  async (
    id,
    data
  ) => {

    return await updateStaff(
      id,
      data
    );

  };

// Delete Staff
const deleteStaffService =
  async (id) => {

    return await deleteStaff(
      id
    );

  };

module.exports = {
  createStaffService,
  getAllStaffService,
  loginStaffService,
  getStaffProfileService,
  changeStaffPasswordService,
  updateStaffService,
  deleteStaffService
};