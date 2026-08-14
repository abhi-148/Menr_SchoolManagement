import api from "./api";


// =========================================================
// LOGIN - ALL ROLES
// SUPER_ADMIN
// SCHOOL_ADMIN
// STAFF
// STUDENT
// =========================================================

export const loginUser = async (data) => {

  const loginValue =
    String(
      data?.email || ""
    ).trim();

  const password =
    data?.password || "";


  if (!loginValue || !password) {

    throw new Error(
      "Email / Roll Number and password are required."
    );

  }


  try {

    const response =
      await api.post(
        "/auth/login",
        {
          email: loginValue,
          password
        }
      );


    return response.data;

  } catch (error) {

    throw new Error(
      error.response?.data?.message ||
      "Invalid Email / Roll Number or Password"
    );

  }

};


// =========================================================
// FORGOT PASSWORD
// ALL ROLES
// =========================================================

export const forgotPassword = async (
  email
) => {

  if (!email?.trim()) {

    throw new Error(
      "Email is required."
    );

  }


  const response =
    await api.post(
      "/auth/forgot-password",
      {
        email:
          email.trim().toLowerCase()
      }
    );


  return response.data;

};


// =========================================================
// RESET PASSWORD
// ALL ROLES
// =========================================================

export const resetPassword = async (
  data
) => {

  if (!data?.token?.trim()) {

    throw new Error(
      "Reset token is required."
    );

  }


  if (!data?.password) {

    throw new Error(
      "New password is required."
    );

  }


  const response =
    await api.post(
      "/auth/reset-password",
      {
        token:
          data.token.trim(),

        password:
          data.password
      }
    );


  return response.data;

};


// =========================================================
// SIGNUP
// SUPER ADMIN
// =========================================================

export const signupUser = async (
  data
) => {

  const full_name =
    data?.full_name?.trim();

  const email =
    data?.email?.trim().toLowerCase();

  const password =
    data?.password || "";


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


  const response =
    await api.post(
      "/auth/signup",
      {
        full_name,
        email,
        password
      }
    );


  return response.data;

};


// =========================================================
// VERIFY EMAIL
// =========================================================

export const verifyEmail = async (
  data
) => {

  const response =
    await api.post(
      "/auth/verify-email",
      {
        userId:
          data?.userId,

        email:
          data?.email
            ?.trim()
            .toLowerCase(),

        otp:
          data?.otp
      }
    );


  return response.data;

};


// =========================================================
// RESEND VERIFICATION OTP
// =========================================================

export const resendVerificationOtp =
async (
  email
) => {

  const response =
    await api.post(
      "/auth/resend-verification",
      {
        email:
          email
            ?.trim()
            .toLowerCase()
      }
    );


  return response.data;

};


// =========================================================
// GET PROFILE
// =========================================================

export const getProfile =
async () => {

  const response =
    await api.get(
      "/auth/profile"
    );


  return response.data;

};


// =========================================================
// UPDATE PROFILE
// =========================================================

export const updateProfile =
async (
  data
) => {

  const response =
    await api.put(
      "/auth/profile",
      data
    );


  return response.data;

};


// =========================================================
// CHANGE PASSWORD
// =========================================================

export const changePassword =
async (
  data
) => {

  const response =
    await api.post(
      "/auth/change-password",
      {
        oldPassword:
          data?.oldPassword,

        newPassword:
          data?.newPassword
      }
    );


  return response.data;

};