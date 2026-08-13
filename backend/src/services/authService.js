const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const transporter = require("../config/mailConfig");

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

  verifySuperAdminEmail,
  saveSuperAdminVerificationOtp,
  findSuperAdminByIdForVerification,

  createEmailVerificationToken,
  findEmailVerificationToken,
  incrementVerificationAttempts,
  deleteEmailVerificationToken
} = require("../repositories/authRepository");


// =========================================================
// HELPER - GENERATE OTP
// =========================================================

const generateOtp = () => {

  return crypto
    .randomInt(100000, 1000000)
    .toString();

};


// =========================================================
// HELPER - SEND VERIFICATION OTP
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
          Thank you for creating your account.
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

        <p style="color:#6b7280;font-size:13px;">
          School Management System
        </p>

      </div>
    `
  });

};


// =========================================================
// CREATE DEFAULT SUPER ADMIN
// =========================================================

const createDefaultSuperAdmin = async () => {

  const email =
    process.env.SUPER_ADMIN_EMAIL;


  const existingAdmin =
    await findSuperAdminByEmail(email);


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

    email:
      email,

    password:
      hashedPassword,

    status:
      "ACTIVE",

    // Default admin is already trusted
    is_verified:
      1

  });


  console.log(
    "Default Super Admin Created"
  );

};


// =========================================================
// LOGIN
// =========================================================

const loginSuperAdminService = async (
  email,
  password
) => {

  if (!email || !password) {

    throw new Error(
      "Email and password are required."
    );

  }


  // =======================================================
  // SUPER ADMIN LOGIN
  // =======================================================

  const admin =
    await loginSuperAdmin(email);


  if (admin) {

    const isMatch =
      await bcrypt.compare(
        password,
        admin.password
      );


    if (!isMatch) {

      throw new Error(
        "Invalid Password"
      );

    }


    // Email verification check

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
        "SUPER_ADMIN"

    };

  }


  // =======================================================
  // SCHOOL ADMIN LOGIN
  // =======================================================

  const school =
    await findSchoolAdminByEmail(email);


  if (!school) {

    throw new Error(
      "Invalid Email"
    );

  }


  const isMatch =
    await bcrypt.compare(
      password,
      school.admin_password
    );


  if (!isMatch) {

    throw new Error(
      "Invalid Password"
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
      "SCHOOL_ADMIN"

  };

};


// =========================================================
// SIGNUP
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


  if (password.length < 6) {

    throw new Error(
      "Password must be at least 6 characters."
    );

  }


  const normalizedEmail =
    email.trim().toLowerCase();


  // Check existing account

  const existingAdmin =
    await findSuperAdminByEmail(
      normalizedEmail
    );


  if (existingAdmin) {

    if (
      Number(existingAdmin.is_verified) === 1
    ) {

      throw new Error(
        "An account with this email already exists."
      );

    }

    // If account exists but is not verified,
    // generate a fresh OTP.

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


  // Hash password

  const hashedPassword =
    await bcrypt.hash(
      password,
      10
    );


  // Create account

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


  // Generate OTP

  const otp =
    generateOtp();


  const expiresAt =
    new Date(
      Date.now() +
      10 * 60 * 1000
    );


  // Save OTP in super_admin

  await saveSuperAdminVerificationOtp(
    userId,
    otp,
    expiresAt
  );


  // Send email

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

  if (!userId && !email) {

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
        email
      );

  }


  if (!user) {

    throw new Error(
      "Account not found."
    );

  }


  if (
    Number(user.is_verified) === 1
  ) {

    return {

      verified:
        true,

      message:
        "Email is already verified."

    };

  }


  // =======================================================
  // Check OTP from super_admin
  // =======================================================

  if (
    !user.verification_otp
  ) {

    throw new Error(
      "OTP not found. Please request a new OTP."
    );

  }


  // Check expiry

  if (
    !user.otp_expires_at ||
    new Date(user.otp_expires_at) < new Date()
  ) {

    throw new Error(
      "OTP has expired. Please request a new OTP."
    );

  }


  // Compare OTP

  if (
    String(user.verification_otp) !==
    String(otp)
  ) {

    throw new Error(
      "Invalid OTP."
    );

  }


  // Verify account

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
      email.trim().toLowerCase();


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
// CHANGE PASSWORD
// =========================================================

const changePasswordService = async (
  userId,
  oldPassword,
  newPassword
) => {

  if (!oldPassword || !newPassword) {

    throw new Error(
      "Old password and new password are required."
    );

  }


  if (newPassword.length < 6) {

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

  if (!full_name || !email) {

    throw new Error(
      "Name and email are required."
    );

  }


  await updateSuperAdminProfile(
    userId,
    full_name,
    email
  );


  return {

    message:
      "Profile Updated Successfully"

  };

};


// =========================================================
// FORGOT PASSWORD
// =========================================================

const forgotPasswordService =
  async (email) => {

    if (!email) {

      throw new Error(
        "Email is required."
      );

    }


    const admin =
      await findSuperAdminByEmail(
        email.trim().toLowerCase()
      );


    if (!admin) {

      throw new Error(
        "Email Not Found"
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


    await saveResetToken(
      email,
      token,
      expiresAt
    );


    await transporter.sendMail({

      from:
        process.env.EMAIL_USER,

      to:
        email,

      subject:
        "Reset Password - School Management System",

      html: `
        <div style="
          font-family:Arial;
          max-width:600px;
          margin:auto;
          padding:30px;
          border:1px solid #ddd;
          border-radius:12px;
        ">

          <h2>
            Password Reset Request
          </h2>

          <p>
            We received a request to reset your password.
          </p>

          <p>
            Use the following reset token:
          </p>

          <div style="
            background:#f3f4f6;
            padding:15px;
            word-break:break-all;
            border-radius:8px;
          ">
            ${token}
          </div>

          <p>
            This token expires in
            <strong>15 minutes</strong>.
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
// RESET PASSWORD
// =========================================================

const resetPasswordService =
  async (
    token,
    password
  ) => {

    if (!token || !password) {

      throw new Error(
        "Reset token and password are required."
      );

    }


    if (password.length < 6) {

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


    // Check expiry

    if (
      !resetToken.expires_at ||
      new Date(resetToken.expires_at) < new Date()
    ) {

      await deleteResetToken(
        token
      );

      throw new Error(
        "Reset token has expired."
      );

    }


    const admin =
      await findSuperAdminByEmail(
        resetToken.email
      );


    if (!admin) {

      throw new Error(
        "Admin Not Found"
      );

    }


    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );


    await updateSuperAdminPassword(
      admin.id,
      hashedPassword
    );


    await deleteResetToken(
      token
    );


    return {

      message:
        "Password Reset Successfully"

    };

  };


// =========================================================
// EXPORT
// =========================================================

module.exports = {

  createDefaultSuperAdmin,

  loginSuperAdminService,

  signupService,

  verifyEmailService,

  resendVerificationOtpService,

  changePasswordService,

  getProfileService,

  updateProfileService,

  forgotPasswordService,

  resetPasswordService

};