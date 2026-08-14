import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Mail,
  GraduationCap,
  ArrowLeft,
  Send,
  Loader2,
  CheckCircle2
} from "lucide-react";

import { forgotPassword } from "../../services/authService";


function ForgotPassword() {

  const navigate = useNavigate();


  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);


  const handleSubmit = async (e) => {

    e.preventDefault();

    const normalizedEmail =
      email.trim().toLowerCase();


    if (!normalizedEmail) {

      alert(
        "Please enter your email address."
      );

      return;

    }


    try {

      setLoading(true);
      setSuccess(false);


      const response =
        await forgotPassword(
          normalizedEmail
        );


      console.log(
        "Forgot Password Response:",
        response
      );


      setSuccess(true);

      setEmail("");


    } catch (error) {

      console.error(
        "Forgot Password Error:",
        error
      );


      alert(
        error.response?.data?.message ||
        error.message ||
        "Unable to process your request."
      );

    } finally {

      setLoading(false);

    }

  };


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


        {/* Logo */}

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


        {/* Card */}

        <div className="
          bg-white
          rounded-2xl
          shadow-2xl
          p-7
          sm:p-8
        ">


          {/* Back */}

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


          {/* Header */}

          <div className="mb-7">

            <div className="
              w-12
              h-12
              rounded-xl
              bg-blue-50
              flex
              items-center
              justify-center
              mb-4
            ">

              {success ? (

                <CheckCircle2
                  size={24}
                  className="text-green-600"
                />

              ) : (

                <Mail
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
                ? "Check Your Email"
                : "Forgot Password?"}

            </h2>


            <p className="
              text-slate-500
              text-sm
              mt-2
              leading-6
            ">

              {success
                ? "A password reset link has been sent to your registered email address."
                : "Enter your registered email address and we will send you a secure password reset link."}

            </p>

          </div>


          {!success ? (

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >


              {/* Email */}

              <div>

                <label className="
                  block
                  text-sm
                  font-medium
                  text-slate-700
                  mb-2
                ">
                  Email Address
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
                    type="email"
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                    autoComplete="email"
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


              {/* Submit */}

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
                  transition
                "
              >

                {loading ? (

                  <>

                    <Loader2
                      size={19}
                      className="animate-spin"
                    />

                    Sending...

                  </>

                ) : (

                  <>

                    <Send size={18} />

                    Send Reset Link

                  </>

                )}

              </button>

            </form>

          ) : (

            <div className="
              bg-green-50
              border
              border-green-200
              rounded-xl
              p-5
            ">

              <div className="
                flex
                items-start
                gap-3
              ">

                <CheckCircle2
                  size={20}
                  className="
                    text-green-600
                    mt-0.5
                    flex-shrink-0
                  "
                />

                <div>

                  <p className="
                    text-sm
                    font-semibold
                    text-green-800
                  ">
                    Reset link sent successfully.
                  </p>

                  <p className="
                    text-xs
                    text-green-700
                    mt-1
                    leading-5
                  ">
                    Open your email and click the
                    <strong> Reset Password </strong>
                    button. The link will expire in
                    15 minutes.
                  </p>

                </div>

              </div>

            </div>

          )}


          {/* Footer */}

          <div className="
            mt-6
            text-center
          ">

            <button
              type="button"
              onClick={() =>
                navigate("/login")
              }
              className="
                text-sm
                text-blue-600
                font-medium
                hover:underline
              "
            >

              Back to Login

            </button>

          </div>


        </div>

      </div>

    </div>

  );

}


export default ForgotPassword;