import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  GraduationCap,
  ArrowRight,
  Loader2,
  ShieldCheck,
} from "lucide-react";

import { loginUser } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";


function Login() {

  const navigate = useNavigate();

  const {
    login
  } = useContext(AuthContext);


  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });


  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);


  // =========================================================
  // HANDLE CHANGE
  // =========================================================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };


  // =========================================================
  // LOGIN
  // =========================================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    const loginValue =
      formData.email.trim();

    const password =
      formData.password;


    if (!loginValue) {

      alert(
        "Please enter your email or roll number."
      );

      return;

    }


    if (!password) {

      alert(
        "Please enter your password."
      );

      return;

    }


    try {

      setLoading(true);


      const response =
        await loginUser({

          email:
            loginValue,

          password

        });


      console.log(
        "Login API Response:",
        response
      );


      // =====================================================
      // VALIDATE RESPONSE
      // =====================================================

      if (!response?.success) {

        throw new Error(
          response?.message ||
          "Login failed."
        );

      }


      if (!response?.token) {

        throw new Error(
          "Token was not received from server."
        );

      }


      if (!response?.role) {

        throw new Error(
          "User role was not received from server."
        );

      }


      const allowedRoles = [
        "SUPER_ADMIN",
        "SCHOOL_ADMIN",
        "STAFF",
        "STUDENT"
      ];


      if (
        !allowedRoles.includes(
          response.role
        )
      ) {

        throw new Error(
          "Invalid user role."
        );

      }


      // =====================================================
      // SAVE AUTH
      // =====================================================

      login(
        response.token,
        response.role,
        response.schoolId
      );


      // =====================================================
      // REDIRECT
      // =====================================================

      navigate(
        "/dashboard",
        {
          replace: true
        }
      );


    } catch (error) {

      console.error(
        "Login Error:",
        error
      );


      alert(
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please check your credentials."
      );


    } finally {

      setLoading(false);

    }

  };


  // =========================================================
  // UI
  // =========================================================

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


      {/* Background */}

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
            BRAND
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


          <div className="mb-7">

            <div className="
              flex
              items-center
              gap-2
              text-blue-600
              text-sm
              font-medium
              mb-2
            ">

              <ShieldCheck
                size={17}
              />

              Secure Login

            </div>


            <h2 className="
              text-2xl
              font-bold
              text-slate-800
            ">
              Welcome Back
            </h2>


            <p className="
              text-slate-500
              text-sm
              mt-1
            ">
              Sign in to continue to your dashboard
            </p>

          </div>


          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >


            {/* =================================================
                EMAIL / ROLL NUMBER
            ================================================= */}

            <div>

              <label className="
                block
                text-sm
                font-medium
                text-slate-700
                mb-2
              ">
                Email / Roll Number
              </label>


              <div className="relative">

                <Mail
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
                  type="text"
                  name="email"
                  placeholder="Enter email or roll number"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="username"
                  className="
                    w-full
                    border
                    border-slate-200
                    bg-slate-50
                    rounded-xl
                    pl-10
                    pr-4
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

              </div>

            </div>


            {/* =================================================
                PASSWORD
            ================================================= */}

            <div>

              <div className="
                flex
                items-center
                justify-between
                mb-2
              ">

                <label className="
                  block
                  text-sm
                  font-medium
                  text-slate-700
                ">
                  Password
                </label>


                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      "/forgot-password"
                    )
                  }
                  className="
                    text-sm
                    font-medium
                    text-blue-600
                    hover:text-blue-700
                    hover:underline
                  "
                >
                  Forgot Password?
                </button>

              </div>


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
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
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

            </div>


            {/* =================================================
                LOGIN BUTTON
            ================================================= */}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                flex
                items-center
                justify-center
                gap-2
                bg-blue-600
                hover:bg-blue-700
                disabled:bg-blue-400
                disabled:cursor-not-allowed
                text-white
                font-semibold
                py-3
                rounded-xl
                shadow-lg
                shadow-blue-600/20
                transition-all
                duration-200
              "
            >

              {loading ? (

                <>

                  <Loader2
                    size={20}
                    className="animate-spin"
                  />

                  Signing in...

                </>

              ) : (

                <>

                  Sign In

                  <ArrowRight
                    size={19}
                  />

                </>

              )}

            </button>

          </form>


          {/* =================================================
              INFO
          ================================================= */}

          <div className="
            mt-7
            pt-5
            border-t
            border-slate-100
            text-center
          ">

            <p className="
              text-xs
              text-slate-400
            ">
              Secure access for Super Admin,
              School Admin, Staff and Students.
            </p>

          </div>

        </div>

      </div>

    </div>

  );

}


export default Login;