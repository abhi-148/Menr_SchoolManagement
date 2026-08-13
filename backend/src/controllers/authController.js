const {
  loginSuperAdminService,
  changePasswordService,
  getProfileService,
  updateProfileService,
  forgotPasswordService,
  resetPasswordService,
  signupService,
  verifyEmailService,
  resendVerificationOtpService
} = require("../services/authService");


// =========================================================
// LOGIN
// =========================================================

const login = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;


    const result =
      await loginSuperAdminService(
        email,
        password
      );


    return res.status(200).json({

      success: true,

      token:
        result.token,

      role:
        result.role

    });

  } catch (error) {

    console.error(
      "Login Error:",
      error
    );


    return res.status(400).json({

      success: false,

      message:
        error.message

    });

  }

};


// =========================================================
// SIGNUP
// =========================================================

const signup = async (req, res) => {

  try {

    const {
      full_name,
      email,
      password
    } = req.body;


    const result =
      await signupService(
        full_name,
        email,
        password
      );


    return res.status(201).json({

      success: true,

      message:
        result.message,

      data: {

        userId:
          result.userId,

        email:
          result.email,

        requiresVerification:
          result.requiresVerification

      }

    });

  } catch (error) {

    console.error(
      "Signup Error:",
      error
    );


    return res.status(400).json({

      success: false,

      message:
        error.message

    });

  }

};


// =========================================================
// VERIFY EMAIL OTP
// =========================================================

const verifyEmail = async (req, res) => {

  try {

    const {
      userId,
      email,
      otp
    } = req.body;


    const result =
      await verifyEmailService(
        userId,
        email,
        otp
      );


    return res.status(200).json({

      success: true,

      message:
        result.message,

      data: {

        verified:
          result.verified

      }

    });

  } catch (error) {

    console.error(
      "Email Verification Error:",
      error
    );


    return res.status(400).json({

      success: false,

      message:
        error.message

    });

  }

};


// =========================================================
// RESEND VERIFICATION OTP
// =========================================================

const resendVerificationOtp = async (
  req,
  res
) => {

  try {

    const {
      email
    } = req.body;


    const result =
      await resendVerificationOtpService(
        email
      );


    return res.status(200).json({

      success: true,

      message:
        result.message

    });

  } catch (error) {

    console.error(
      "Resend OTP Error:",
      error
    );


    return res.status(400).json({

      success: false,

      message:
        error.message

    });

  }

};


// =========================================================
// CHANGE PASSWORD
// =========================================================

const changePassword = async (
  req,
  res
) => {

  try {

    const {
      oldPassword,
      newPassword
    } = req.body;


    const result =
      await changePasswordService(
        req.user.id,
        oldPassword,
        newPassword
      );


    return res.status(200).json({

      success: true,

      data:
        result

    });

  } catch (error) {

    return res.status(400).json({

      success: false,

      message:
        error.message

    });

  }

};


// =========================================================
// GET PROFILE
// =========================================================

const getProfile =
  async (req, res) => {

    try {

      const profile =
        await getProfileService(
          req.user.id
        );


      return res.status(200).json({

        success: true,

        data:
          profile

      });

    } catch (error) {

      return res.status(400).json({

        success: false,

        message:
          error.message

      });

    }

  };


// =========================================================
// UPDATE PROFILE
// =========================================================

const updateProfile =
  async (req, res) => {

    try {

      const {
        full_name,
        email
      } = req.body;


      const result =
        await updateProfileService(
          req.user.id,
          full_name,
          email
        );


      return res.status(200).json({

        success: true,

        data:
          result

      });

    } catch (error) {

      return res.status(400).json({

        success: false,

        message:
          error.message

      });

    }

  };


// =========================================================
// FORGOT PASSWORD
// =========================================================

const forgotPassword =
  async (req, res) => {

    try {

      const {
        email
      } = req.body;


      const result =
        await forgotPasswordService(
          email
        );


      return res.status(200).json({

        success: true,

        data:
          result

      });

    } catch (error) {

      return res.status(400).json({

        success: false,

        message:
          error.message

      });

    }

  };


// =========================================================
// RESET PASSWORD
// =========================================================

const resetPassword =
  async (req, res) => {

    try {

      const {
        token,
        password
      } = req.body;


      const result =
        await resetPasswordService(
          token,
          password
        );


      return res.status(200).json({

        success: true,

        data:
          result

      });

    } catch (error) {

      return res.status(400).json({

        success: false,

        message:
          error.message

      });

    }

  };


// =========================================================
// EXPORT
// =========================================================

module.exports = {

  login,

  signup,

  verifyEmail,

  resendVerificationOtp,

  changePassword,

  getProfile,

  updateProfile,

  forgotPassword,

  resetPassword

};