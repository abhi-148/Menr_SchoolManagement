import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useSearchParams
} from "react-router-dom";

import {
  KeyRound,
  LockKeyhole,
  Eye,
  EyeOff,
  GraduationCap,
  ArrowLeft,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import {
  resetPassword
} from "../../services/authService";


function ResetPassword() {

  const navigate = useNavigate();

  const [
    searchParams
  ] = useSearchParams();


  const [formData, setFormData] =
    useState({
      token: "",
      password: "",
      confirmPassword: "",
    });


  const [showPassword, setShowPassword] =
    useState(false);


  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);


  const [loading, setLoading] =
    useState(false);


  const [invalidToken, setInvalidToken] =
    useState(false);


  const [success, setSuccess] =
    useState(false);


  // =========================================================
  // READ TOKEN FROM URL
  // =========================================================

  useEffect(() => {

    const token =
      searchParams.get("token");


    if (!token) {

      setInvalidToken(true);

      return;

    }


    setFormData((prev) => ({
      ...prev,
      token
    }));

    setInvalidToken(false);

  }, [searchParams]);


  // =========================================================
  // HANDLE INPUT
  // =========================================================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };


  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    const token =
      formData.token.trim();

    const password =
      formData.password;

    const confirmPassword =
      formData.confirmPassword;


    if (!token) {

      alert(
        "Invalid or missing reset link."
      );

      return;

    }


    if (!password) {

      alert(
        "Please enter your new password."
      );

      return;

    }


    if (password.length < 6) {

      alert(
        "Password must be at least 6 characters long."
      );

      return;

    }


    if (
      password !==
      confirmPassword
    ) {

      alert(
        "Passwords do not match."
      );

      return;

    }


    try {

      setLoading(true);


      const response =
        await resetPassword({

          token,

          password

        });


      console.log(
        "Reset Password Response:",
        response
      );


      setSuccess(true);


      setFormData({
        token: "",
        password: "",
        confirmPassword: "",
      });


      setTimeout(() => {

        navigate("/login");

      }, 2000);


    } catch (error) {

      console.error(
        "Reset Password Error:",
        error
      );


      alert(
        error.response?.data?.message ||
        error.message ||
        "Unable to reset password. Please try again."
      );

    } finally {

      setLoading(false);

    }

  };


  // =========================================================
  // INVALID TOKEN
  // =========================================================

  if (invalidToken) {

    return (

      <div className="
        min-h-screen
        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-blue-950
        flex
        items-center
        justify-center
        px-4
        py-8
      ">

        <div className="
          bg-white
          rounded-2xl
          shadow-2xl
          p-8
          w-full
          max-w-md
          text-center
        ">

          <div className="
            w-14
            h-14
            mx-auto
            rounded-2xl
            bg-red-50
            text-red-600
            flex
            items-center
            justify-center
            mb-5
          ">

            <KeyRound size={26} />

          </div>


          <h2 className="
            text-2xl
            font-bold
            text-slate-800
          ">
            Invalid Reset Link
          </h2>


          <p className="
            text-slate-500
            text-sm
            mt-2
            leading-6
          ">
            This password reset link is missing or invalid.
            Please request a new reset link.
          </p>


          <button
            onClick={() =>
              navigate("/forgot-password")
            }
            className="
              mt-6
              w-full
              bg-blue-600
              hover:bg-blue-700
              text-white
              font-semibold
              py-3
              rounded-xl
              transition
            "
          >
            Request New Reset Link
          </button>


          <button
            onClick={() =>
              navigate("/login")
            }
            className="
              mt-3
              w-full
              border
              border-slate-200
              text-slate-600
              font-medium
              py-3
              rounded-xl
              hover:bg-slate-50
              transition
            "
          >
            Back to Login
          </button>

        </div>

      </div>

    );

  }


  return (

    <div className="
      min-h-screen
      bg-gradient-to-br
      from-slate-950
      via-slate-900
      to-blue-950
      flex
      items-center
      justify-center
      px-4
      py-8
    ">


      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="
        absolute
        inset-0
        overflow-hidden
        pointer-events-none
      ">

        <div className="
          absolute
          -top-32
          -right-32
          w-96
          h-96
          bg-blue-600/20
          rounded-full
          blur-3xl
        " />


        <div className="
          absolute
          -bottom-32
          -left-32
          w-96
          h-96
          bg-indigo-600/20
          rounded-full
          blur-3xl
        " />

      </div>


      <div className="
        relative
        w-full
        max-w-md
      ">


        {/* ===================================================
            LOGO
        =================================================== */}

        <div className="
          text-center
          mb-8
        ">

          <div className="
            inline-flex
            items-center
            justify-center
            w-16
            h-16
            rounded-2xl
            bg-blue-600
            shadow-xl
            shadow-blue-600/30
            mb-4
          ">

            <GraduationCap
              size={34}
              className="text-white"
            />

          </div>


          <h1 className="
            text-3xl
            font-bold
            text-white
          ">
            SchoolMS
          </h1>


          <p className="
            text-slate-400
            mt-2
            text-sm
          ">
            School Management System
          </p>

        </div>


        {/* ===================================================
            CARD
        =================================================== */}

        <div className="
          bg-white
          rounded-2xl
          shadow-2xl
          p-7
          sm:p-8
        ">


          {/* BACK */}

          {!success && (

            <button
              type="button"
              onClick={() =>
                navigate("/login")
              }
              className="
                flex
                items-center
                gap-2
                text-sm
                text-slate-500
                hover:text-blue-600
                transition
                mb-6
              "
            >

              <ArrowLeft size={17} />

              Back to Login

            </button>

          )}


          {/* HEADER */}

          <div className="
            mb-7
            text-center
          ">

            <div
              className={`
                w-12
                h-12
                mx-auto
                rounded-xl
                flex
                items-center
                justify-center
                mb-4

                ${
                  success
                    ? "bg-green-50"
                    : "bg-blue-50"
                }
              `}
            >

              {success ? (

                <CheckCircle2
                  size={24}
                  className="text-green-600"
                />

              ) : (

                <KeyRound
                  size={24}
                  className="text-blue-600"
                />

              )}

            </div>


            <h2 className="
              text-2xl
              font-bold
              text-slate-800
            ">

              {success
                ? "Password Reset Successful"
                : "Reset Password"}

            </h2>


            <p className="
              text-slate-500
              text-sm
              mt-2
              leading-6
            ">

              {success
                ? "Your password has been updated successfully. Redirecting you to login..."
                : "Create a new secure password for your account."}

            </p>

          </div>


          {/* =================================================
              SUCCESS
          ================================================= */}

          {success ? (

            <div className="
              bg-green-50
              border
              border-green-200
              rounded-xl
              p-5
              text-center
            ">

              <CheckCircle2
                size={28}
                className="
                  text-green-600
                  mx-auto
                  mb-3
                "
              />


              <p className="
                text-sm
                font-semibold
                text-green-800
              ">
                Password updated successfully.
              </p>


              <p className="
                text-xs
                text-green-700
                mt-1
              ">
                Redirecting to login...
              </p>

            </div>

          ) : (

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >


              {/* TOKEN */}

              <div>

                <label className="
                  block
                  text-sm
                  font-medium
                  text-slate-700
                  mb-2
                ">
                  Reset Token
                </label>


                <div className="
                  flex
                  items-center
                  gap-2
                  bg-slate-50
                  border
                  border-slate-200
                  rounded-xl
                  px-4
                  py-3
                ">

                  <KeyRound
                    size={18}
                    className="text-slate-400"
                  />


                  <span className="
                    text-xs
                    text-slate-500
                    truncate
                  ">
                    Secure reset token received
                  </span>

                </div>


                <p className="
                  text-xs
                  text-green-600
                  mt-2
                ">
                  Reset token loaded automatically from your email link.
                </p>

              </div>


              {/* NEW PASSWORD */}

              <div>

                <label className="
                  block
                  text-sm
                  font-medium
                  text-slate-700
                  mb-2
                ">
                  New Password
                </label>


                <div className="relative">

                  <LockKeyhole
                    size={19}
                    className="
                      absolute
                      left-3
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
                  />


                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    placeholder="Enter new password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    className="
                      w-full
                      border
                      border-slate-200
                      bg-slate-50
                      rounded-xl
                      pl-10
                      pr-11
                      py-3
                      text-slate-800
                      outline-none
                      transition
                      focus:bg-white
                      focus:border-blue-500
                      focus:ring-4
                      focus:ring-blue-500/10
                    "
                    required
                  />


                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                      hover:text-slate-700
                    "
                  >

                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}

                  </button>

                </div>


                <p className="
                  text-xs
                  text-slate-400
                  mt-2
                ">
                  Password must contain at least 6 characters.
                </p>

              </div>


              {/* CONFIRM PASSWORD */}

              <div>

                <label className="
                  block
                  text-sm
                  font-medium
                  text-slate-700
                  mb-2
                ">
                  Confirm Password
                </label>


                <div className="relative">

                  <LockKeyhole
                    size={19}
                    className="
                      absolute
                      left-3
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
                  />


                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    placeholder="Confirm new password"
                    value={
                      formData.confirmPassword
                    }
                    onChange={handleChange}
                    autoComplete="new-password"
                    className="
                      w-full
                      border
                      border-slate-200
                      bg-slate-50
                      rounded-xl
                      pl-10
                      pr-11
                      py-3
                      text-slate-800
                      outline-none
                      transition
                      focus:bg-white
                      focus:border-blue-500
                      focus:ring-4
                      focus:ring-blue-500/10
                    "
                    required
                  />


                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                      hover:text-slate-700
                    "
                  >

                    {showConfirmPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}

                  </button>

                </div>

              </div>


              {/* SUBMIT */}

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  flex
                  items-center
                  justify-center
                  gap-2
                  bg-green-600
                  hover:bg-green-700
                  disabled:bg-green-400
                  disabled:cursor-not-allowed
                  text-white
                  font-semibold
                  py-3
                  rounded-xl
                  shadow-lg
                  shadow-green-600/20
                  transition
                "
              >

                {loading ? (

                  <>

                    <Loader2
                      size={19}
                      className="animate-spin"
                    />

                    Resetting...

                  </>

                ) : (

                  <>

                    <CheckCircle2
                      size={19}
                    />

                    Reset Password

                  </>

                )}

              </button>

            </form>

          )}


          {/* =================================================
              FOOTER
          ================================================= */}

          {!success && (

            <div className="
              mt-6
              text-center
            ">

              <p className="
                text-xs
                text-slate-400
              ">

                Remember your password?{" "}

                <button
                  type="button"
                  onClick={() =>
                    navigate("/login")
                  }
                  className="
                    text-blue-600
                    font-medium
                    hover:underline
                  "
                >

                  Back to Login

                </button>

              </p>

            </div>

          )}

        </div>

      </div>

    </div>

  );

}


export default ResetPassword;