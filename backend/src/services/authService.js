const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const transporter =
  require("../config/mailConfig");

const {
  saveResetToken,
  findResetToken,
  deleteResetToken,

  findSuperAdminByEmail,
  createSuperAdmin,
  loginSuperAdmin,
  findSuperAdminById,
  updateSuperAdminPassword,
  updateSuperAdminProfile,

 findSchoolAdminByEmail,
updateSchoolAdminPassword,

  verifySuperAdminEmail,
  saveSuperAdminVerificationOtp,
  findSuperAdminByIdForVerification,

  createEmailVerificationToken,
  findEmailVerificationToken,
  incrementVerificationAttempts,
  deleteEmailVerificationToken
} = require("../repositories/authRepository");

const {
  findStaffByEmail,
  getStaffPasswordById,
  updateStaffPassword,
  findStaffById
} = require("../repositories/staffRepository");

const {
  findStudentByEmail,
  findStudentByRollNumber,
  getStudentPasswordById,
  updateStudentPassword,
  getStudentById
} = require("../repositories/studentRepository");


// =========================================================
// HELPERS
// =========================================================

const generateOtp = () => {

  return crypto
    .randomInt(
      100000,
      1000000
    )
    .toString();

};


const normalizeEmail = (
  email
) => {

  return String(
    email || ""
  )
    .trim()
    .toLowerCase();

};


// =========================================================
// SEND VERIFICATION OTP
// =========================================================

const sendVerificationOtpEmail = async (
  email,
  fullName,
  otp
) => {

  await transporter.sendMail({

    from:
      process.env.EMAIL_USER,

    to:
      email,

    subject:
      "Verify Your School Management Account",

    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: auto;
        padding: 30px;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
      ">

        <h2 style="color:#2563eb;">
          Welcome to School Management System
        </h2>

        <p>
          Hello <strong>${fullName}</strong>,
        </p>

        <p>
          Please use the OTP below to verify your email address.
        </p>

        <div style="
          background:#eff6ff;
          padding:20px;
          text-align:center;
          border-radius:10px;
          margin:25px 0;
        ">

          <h1 style="
            letter-spacing:8px;
            color:#1d4ed8;
            margin:0;
          ">
            ${otp}
          </h1>

        </div>

        <p>
          This OTP will expire in
          <strong>10 minutes</strong>.
        </p>

        <p>
          If you did not create this account,
          you can safely ignore this email.
        </p>

        <hr />

        <p style="
          color:#6b7280;
          font-size:13px;
        ">
          School Management System
        </p>

      </div>
    `

  });

};


// =========================================================
// DEFAULT SUPER ADMIN
// =========================================================

const createDefaultSuperAdmin =
async () => {

  const email =
    normalizeEmail(
      process.env.SUPER_ADMIN_EMAIL
    );


  if (!email) {
    return;
  }


  const existingAdmin =
    await findSuperAdminByEmail(
      email
    );


  if (existingAdmin) {

    console.log(
      "Super Admin Already Exists"
    );

    return;

  }


  const hashedPassword =
    await bcrypt.hash(
      process.env.SUPER_ADMIN_PASSWORD,
      10
    );


  await createSuperAdmin({

    full_name:
      "Super Admin",

    email,

    password:
      hashedPassword,

    status:
      "ACTIVE",

    is_verified:
      1

  });


  console.log(
    "Default Super Admin Created"
  );

};


// =========================================================
// LOGIN
// SUPER ADMIN + SCHOOL ADMIN
// =========================================================

const loginSuperAdminService =
async (
  email,
  password
) => {

  if (
    !email ||
    !password
  ) {

    throw new Error(
      "Email and password are required."
    );

  }


  const normalizedEmail =
    normalizeEmail(email);


  // =======================================================
  // SUPER ADMIN
  // =======================================================

  const admin =
    await loginSuperAdmin(
      normalizedEmail
    );


  if (admin) {

    const isMatch =
      await bcrypt.compare(
        password,
        admin.password
      );


    if (!isMatch) {

      throw new Error(
        "Invalid Email or Password"
      );

    }


    if (
      Number(admin.is_verified) !== 1
    ) {

      throw new Error(
        "Please verify your email before login."
      );

    }


    return {

      token:
        jwt.sign(
          {
            id:
              admin.id,

            role:
              "SUPER_ADMIN"
          },

          process.env.JWT_SECRET,

          {
            expiresIn:
              "1d"
          }
        ),

      role:
        "SUPER_ADMIN",

      schoolId:
        null

    };

  }


  // =======================================================
  // SCHOOL ADMIN
  // =======================================================

  const school =
    await findSchoolAdminByEmail(
      normalizedEmail
    );


  if (school) {

    const isMatch =
      await bcrypt.compare(
        password,
        school.admin_password
      );


    if (!isMatch) {

      throw new Error(
        "Invalid Email or Password"
      );

    }


    return {

      token:
        jwt.sign(
          {
            id:
              school.id,

            schoolId:
              school.id,

            role:
              "SCHOOL_ADMIN"
          },

          process.env.JWT_SECRET,

          {
            expiresIn:
              "1d"
          }
        ),

      role:
        "SCHOOL_ADMIN",

      schoolId:
        school.id

    };

  }


  throw new Error(
    "Invalid Email or Password"
  );

};


// =========================================================
// UNIFIED ROLE LOGIN
// SUPER ADMIN / SCHOOL ADMIN / STAFF / STUDENT
// =========================================================

const loginAnyUserService =
async (
  loginValue,
  password
) => {

  if (
    !loginValue ||
    !password
  ) {

    throw new Error(
      "Email / Roll Number and password are required."
    );

  }


  const value =
    String(
      loginValue
    )
      .trim();


  // =======================================================
  // SUPER ADMIN / SCHOOL ADMIN
  // =======================================================

  if (
    value.includes("@")
  ) {

    try {

      return await loginSuperAdminService(
        value,
        password
      );

    } catch (error) {

      // Continue to Staff / Student
      // if email belongs to them.
    }


    // =====================================================
    // STAFF
    // =====================================================

    const staff =
      await findStaffByEmail(
        normalizeEmail(value)
      );


    if (staff) {

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


      if (
        String(staff.status)
          .toUpperCase() !==
        "ACTIVE"
      ) {

        throw new Error(
          "Your staff account is inactive."
        );

      }


      return {

        token:
          jwt.sign(
            {
              id:
                staff.id,

              schoolId:
                staff.school_id,

              role:
                "STAFF"
            },

            process.env.JWT_SECRET,

            {
              expiresIn:
                "1d"
            }
          ),

        role:
          "STAFF",

        schoolId:
          staff.school_id

      };

    }


    // =====================================================
    // STUDENT BY EMAIL
    // =====================================================

    const studentByEmail =
      await findStudentByEmail(
        normalizeEmail(value)
      );


    if (studentByEmail) {

      const isMatch =
        await bcrypt.compare(
          password,
          studentByEmail.password
        );


      if (!isMatch) {

        throw new Error(
          "Invalid Email or Password"
        );

      }


      return {

        token:
          jwt.sign(
            {
              id:
                studentByEmail.id,

              schoolId:
                studentByEmail.school_id,

              branchId:
                studentByEmail.branch_id,

              role:
                "STUDENT"
            },

            process.env.JWT_SECRET,

            {
              expiresIn:
                "1d"
            }
          ),

        role:
          "STUDENT",

        schoolId:
          studentByEmail.school_id

      };

    }

  }


  // =======================================================
  // STUDENT BY ROLL NUMBER
  // =======================================================

  const student =
    await findStudentByRollNumber(
      value
    );


  if (student) {

    const isMatch =
      await bcrypt.compare(
        password,
        student.password
      );


    if (!isMatch) {

      throw new Error(
        "Invalid Email / Roll Number or Password"
      );

    }


    return {

      token:
        jwt.sign(
          {
            id:
              student.id,

            schoolId:
              student.school_id,

            branchId:
              student.branch_id,

            role:
              "STUDENT"
          },

          process.env.JWT_SECRET,

          {
            expiresIn:
              "1d"
          }
        ),

      role:
        "STUDENT",

      schoolId:
        student.school_id

    };

  }


  throw new Error(
    "Invalid Email / Roll Number or Password"
  );

};


// =========================================================
// SIGNUP
// SUPER ADMIN
// =========================================================

const signupService = async (
  full_name,
  email,
  password
) => {

  if (!full_name) {

    throw new Error(
      "Full name is required."
    );

  }


  if (!email) {

    throw new Error(
      "Email is required."
    );

  }


  if (!password) {

    throw new Error(
      "Password is required."
    );

  }


  if (
    password.length < 6
  ) {

    throw new Error(
      "Password must be at least 6 characters."
    );

  }


  const normalizedEmail =
    normalizeEmail(email);


  const existingAdmin =
    await findSuperAdminByEmail(
      normalizedEmail
    );


  if (existingAdmin) {

    if (
      Number(
        existingAdmin.is_verified
      ) === 1
    ) {

      throw new Error(
        "An account with this email already exists."
      );

    }


    const otp =
      generateOtp();


    const expiresAt =
      new Date(
        Date.now() +
        10 * 60 * 1000
      );


    await saveSuperAdminVerificationOtp(
      existingAdmin.id,
      otp,
      expiresAt
    );


    await sendVerificationOtpEmail(
      existingAdmin.email,
      existingAdmin.full_name,
      otp
    );


    return {

      userId:
        existingAdmin.id,

      email:
        existingAdmin.email,

      requiresVerification:
        true,

      message:
        "Account already exists but is not verified. A new OTP has been sent to your email."

    };

  }


  const hashedPassword =
    await bcrypt.hash(
      password,
      10
    );


  const result =
    await createSuperAdmin({

      full_name:
        full_name.trim(),

      email:
        normalizedEmail,

      password:
        hashedPassword,

      status:
        "ACTIVE",

      is_verified:
        0

    });


  const userId =
    result.insertId;


  const otp =
    generateOtp();


  const expiresAt =
    new Date(
      Date.now() +
      10 * 60 * 1000
    );


  await saveSuperAdminVerificationOtp(
    userId,
    otp,
    expiresAt
  );


  await sendVerificationOtpEmail(
    normalizedEmail,
    full_name.trim(),
    otp
  );


  return {

    userId,

    email:
      normalizedEmail,

    requiresVerification:
      true,

    message:
      "Account created successfully. Verification OTP has been sent to your email."

  };

};


// =========================================================
// VERIFY EMAIL
// =========================================================

const verifyEmailService = async (
  userId,
  email,
  otp
) => {

  if (
    !userId &&
    !email
  ) {

    throw new Error(
      "User ID or email is required."
    );

  }


  if (!otp) {

    throw new Error(
      "OTP is required."
    );

  }


  let user;


  if (userId) {

    user =
      await findSuperAdminByIdForVerification(
        userId
      );

  } else {

    user =
      await findSuperAdminByEmail(
        normalizeEmail(email)
      );

  }


  if (!user) {

    throw new Error(
      "Account not found."
    );

  }


  if (
    Number(
      user.is_verified
    ) === 1
  ) {

    return {

      verified:
        true,

      message:
        "Email is already verified."

    };

  }


  if (
    !user.verification_otp
  ) {

    throw new Error(
      "OTP not found. Please request a new OTP."
    );

  }


  if (
    !user.otp_expires_at ||
    new Date(
      user.otp_expires_at
    ) < new Date()
  ) {

    throw new Error(
      "OTP has expired. Please request a new OTP."
    );

  }


  if (
    String(
      user.verification_otp
    ) !==
    String(otp)
  ) {

    throw new Error(
      "Invalid OTP."
    );

  }


  await verifySuperAdminEmail(
    user.id
  );


  return {

    verified:
      true,

    message:
      "Email verified successfully. You can now login."

  };

};


// =========================================================
// RESEND VERIFICATION OTP
// =========================================================

const resendVerificationOtpService =
async (email) => {

  if (!email) {

    throw new Error(
      "Email is required."
    );

  }


  const normalizedEmail =
    normalizeEmail(email);


  const user =
    await findSuperAdminByEmail(
      normalizedEmail
    );


  if (!user) {

    throw new Error(
      "Account not found."
    );

  }


  if (
    Number(user.is_verified) === 1
  ) {

    throw new Error(
      "Email is already verified."
    );

  }


  const otp =
    generateOtp();


  const expiresAt =
    new Date(
      Date.now() +
      10 * 60 * 1000
    );


  await saveSuperAdminVerificationOtp(
    user.id,
    otp,
    expiresAt
  );


  await sendVerificationOtpEmail(
    user.email,
    user.full_name,
    otp
  );


  return {

    message:
      "A new verification OTP has been sent to your email."

  };

};


// =========================================================
// CHANGE PASSWORD - SUPER ADMIN
// =========================================================

const changePasswordService = async (
  userId,
  oldPassword,
  newPassword
) => {

  if (
    !oldPassword ||
    !newPassword
  ) {

    throw new Error(
      "Old password and new password are required."
    );

  }


  if (
    newPassword.length < 6
  ) {

    throw new Error(
      "New password must be at least 6 characters."
    );

  }


  const admin =
    await findSuperAdminById(
      userId
    );


  if (!admin) {

    throw new Error(
      "Admin Not Found"
    );

  }


  const isMatch =
    await bcrypt.compare(
      oldPassword,
      admin.password
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


  await updateSuperAdminPassword(
    userId,
    hashedPassword
  );


  return {

    message:
      "Password Changed Successfully"

  };

};


// =========================================================
// GET PROFILE
// =========================================================

const getProfileService =
async (userId) => {

  const admin =
    await findSuperAdminById(
      userId
    );


  if (!admin) {

    throw new Error(
      "Admin Not Found"
    );

  }


  return {

    id:
      admin.id,

    full_name:
      admin.full_name,

    email:
      admin.email,

    status:
      admin.status,

    is_verified:
      admin.is_verified

  };

};


// =========================================================
// UPDATE PROFILE
// =========================================================

const updateProfileService = async (
  userId,
  full_name,
  email
) => {

  if (
    !full_name ||
    !email
  ) {

    throw new Error(
      "Name and email are required."
    );

  }


  await updateSuperAdminProfile(
    userId,
    full_name,
    normalizeEmail(email)
  );


  return {

    message:
      "Profile Updated Successfully"

  };

};


// =========================================================
// FIND RESET USER
// =========================================================

const findResetUser = async (
  resetToken
) => {

  const {
    user_type,
    user_id,
    email
  } = resetToken;


  if (
    user_type ===
    "SUPER_ADMIN"
  ) {

    return await findSuperAdminById(
      user_id
    );

  }


  if (
    user_type ===
    "SCHOOL_ADMIN"
  ) {

    return await findSchoolAdminByEmail(
      email
    );

  }


  if (
    user_type ===
    "STAFF"
  ) {

    return await findStaffById(
      user_id
    );

  }


  if (
    user_type ===
    "STUDENT"
  ) {

    return await getStudentById(
      user_id
    );

  }


  return null;

};


// =========================================================
// FORGOT PASSWORD - ALL ROLES
// =========================================================

const forgotPasswordService =
async (email) => {

  if (!email) {

    throw new Error(
      "Email is required."
    );

  }


  const normalizedEmail =
    normalizeEmail(email);


  let userType = null;
  let userId = null;
  let fullName = "User";


  // =======================================================
  // SUPER ADMIN
  // =======================================================

  const superAdmin =
    await findSuperAdminByEmail(
      normalizedEmail
    );


  if (superAdmin) {

    userType =
      "SUPER_ADMIN";

    userId =
      superAdmin.id;

    fullName =
      superAdmin.full_name ||
      "Super Admin";

  }


  // =======================================================
  // SCHOOL ADMIN
  // =======================================================

  if (!userType) {

    const school =
      await findSchoolAdminByEmail(
        normalizedEmail
      );


    if (school) {

      userType =
        "SCHOOL_ADMIN";

      userId =
        school.id;

      fullName =
        school.school_name ||
        "School Admin";

    }

  }


  // =======================================================
  // STAFF
  // =======================================================

  if (!userType) {

    const staff =
      await findStaffByEmail(
        normalizedEmail
      );


    if (staff) {

      userType =
        "STAFF";

      userId =
        staff.id;

      fullName =
        staff.full_name ||
        "Staff Member";

    }

  }


  // =======================================================
  // STUDENT
  // =======================================================

  if (!userType) {

    const student =
      await findStudentByEmail(
        normalizedEmail
      );


    if (student) {

      userType =
        "STUDENT";

      userId =
        student.id;

      fullName =
        student.full_name ||
        "Student";

    }

  }


  if (!userType) {

    throw new Error(
      "No account found with this email."
    );

  }


  const token =
    crypto
      .randomBytes(32)
      .toString("hex");


  const expiresAt =
    new Date(
      Date.now() +
      15 * 60 * 1000
    );

    const frontendUrl =
  process.env.FRONTEND_URL ||
  "http://localhost:5173";

const resetLink =
  `${frontendUrl}/reset-password?token=${token}`;


  await saveResetToken(
    userType,
    userId,
    normalizedEmail,
    token,
    expiresAt
  );


  await transporter.sendMail({

    from:
      process.env.EMAIL_USER,

    to:
      normalizedEmail,

    subject:
      "Reset Password - School Management System",

    html: `
  <div style="
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: auto;
    padding: 30px;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    background: #ffffff;
  ">

    <h2 style="
      color:#2563eb;
      margin-bottom: 20px;
    ">
      Password Reset Request
    </h2>

    <p>
      Hello <strong>${fullName}</strong>,
    </p>

    <p>
      We received a request to reset your password.
    </p>

    <p>
      Click the button below to create a new password.
    </p>

    <div style="
      text-align:center;
      margin:30px 0;
    ">

      <a
        href="${resetLink}"
        style="
          display:inline-block;
          background:#2563eb;
          color:#ffffff;
          text-decoration:none;
          padding:14px 24px;
          border-radius:8px;
          font-weight:bold;
        "
      >
        Reset Password
      </a>

    </div>

    <p style="
      color:#6b7280;
      font-size:13px;
    ">
      This reset link will expire in
      <strong>15 minutes</strong>.
    </p>

    <p style="
      color:#6b7280;
      font-size:13px;
    ">
      If the button does not work, copy this link into your browser:
    </p>

    <p style="
      word-break:break-all;
      color:#2563eb;
      font-size:12px;
    ">
      ${resetLink}
    </p>

    <hr style="
      margin:25px 0;
      border:none;
      border-top:1px solid #e5e7eb;
    " />

    <p style="
      color:#9ca3af;
      font-size:12px;
      text-align:center;
    ">
      School Management System
    </p>

  </div>
`

  });


  return {

    message:
      "Password reset token has been sent to your email."

  };

};


// =========================================================
// RESET PASSWORD - ALL ROLES
// =========================================================

const resetPasswordService =
async (
  token,
  password
) => {

  if (
    !token ||
    !password
  ) {

    throw new Error(
      "Reset token and password are required."
    );

  }


  if (
    password.length < 6
  ) {

    throw new Error(
      "Password must be at least 6 characters."
    );

  }


  const resetToken =
    await findResetToken(
      token
    );


  if (!resetToken) {

    throw new Error(
      "Invalid Reset Token"
    );

  }


  if (
    !resetToken.expires_at ||
    new Date(
      resetToken.expires_at
    ) < new Date()
  ) {

    await deleteResetToken(
      token
    );

    throw new Error(
      "Reset token has expired."
    );

  }


  const user =
    await findResetUser(
      resetToken
    );


  if (!user) {

    await deleteResetToken(
      token
    );

    throw new Error(
      "Account Not Found"
    );

  }


  const hashedPassword =
    await bcrypt.hash(
      password,
      10
    );


  // =======================================================
  // UPDATE CORRECT USER TABLE
  // =======================================================

  if (
    resetToken.user_type ===
    "SUPER_ADMIN"
  ) {

    await updateSuperAdminPassword(
      resetToken.user_id,
      hashedPassword
    );

  }


  else if (
    resetToken.user_type ===
    "STAFF"
  ) {

    await updateStaffPassword(
      resetToken.user_id,
      hashedPassword
    );

  }


  else if (
    resetToken.user_type ===
    "STUDENT"
  ) {

    await updateStudentPassword(
      resetToken.user_id,
      hashedPassword
    );

  }

else if (
  resetToken.user_type ===
  "SCHOOL_ADMIN"
) {

  await updateSchoolAdminPassword(
    resetToken.user_id,
    hashedPassword
  );

}


  else {

    throw new Error(
      "Unsupported account type."
    );

  }


  await deleteResetToken(
    token
  );


  return {

    message:
      "Password Reset Successfully"

  };

};


// =========================================================
// EXPORTS
// =========================================================

module.exports = {

  createDefaultSuperAdmin,

  loginSuperAdminService,

  loginAnyUserService,

  signupService,

  verifyEmailService,

  resendVerificationOtpService,

  changePasswordService,

  getProfileService,

  updateProfileService,

  forgotPasswordService,

  resetPasswordService

};