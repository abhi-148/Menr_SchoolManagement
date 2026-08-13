import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

import { resetPassword } from "../../services/authService";

function ResetPassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    token: "",
    password: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.token.trim()) {
      alert("Please enter your reset token.");
      return;
    }

    if (!formData.password.trim()) {
      alert("Please enter your new password.");
      return;
    }

    if (formData.password.length < 6) {
      alert(
        "Password must be at least 6 characters long."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await resetPassword({
        token: formData.token.trim(),
        password: formData.password,
      });

      console.log(
        "Reset Password Response:",
        response
      );

      const message =
        response?.data?.data?.message ||
        response?.data?.message ||
        "Password reset successfully.";

      alert(message);

      navigate("/login");

    } catch (error) {
      console.error(
        "Reset Password Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Unable to reset password. Please check your token."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center px-4 py-8">

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">

          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 shadow-xl shadow-blue-600/30 mb-4">
            <GraduationCap
              size={34}
              className="text-white"
            />
          </div>

          <h1 className="text-3xl font-bold text-white">
            SchoolMS
          </h1>

          <p className="text-slate-400 mt-2 text-sm">
            School Management System
          </p>

        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-7 sm:p-8">

          <button
            type="button"
            onClick={() => navigate("/login")}
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

          <div className="mb-7">

            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-4">
              <KeyRound
                size={24}
                className="text-green-600"
              />
            </div>

            <h2 className="text-2xl font-bold text-slate-800">
              Reset Password
            </h2>

            <p className="text-slate-500 text-sm mt-2 leading-6">
              Enter the reset token and create a new
              password for your account.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Reset Token */}
            <div>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Reset Token
              </label>

              <div className="relative">

                <KeyRound
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  name="token"
                  placeholder="Enter reset token"
                  value={formData.token}
                  onChange={handleChange}
                  className="
                    w-full
                    border border-slate-200
                    bg-slate-50
                    rounded-xl
                    pl-10 pr-4 py-3
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

            {/* New Password */}
            <div>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                New Password
              </label>

              <div className="relative">

                <LockKeyhole
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
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
                    border border-slate-200
                    bg-slate-50
                    rounded-xl
                    pl-10 pr-11 py-3
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
                    setShowPassword(!showPassword)
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

              <p className="text-xs text-slate-400 mt-2">
                Password must contain at least 6 characters.
              </p>

            </div>

            {/* Reset Button */}
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
                  <CheckCircle2 size={19} />
                  Reset Password
                </>
              )}

            </button>

          </form>

          <div className="mt-6 text-center">

            <p className="text-xs text-slate-400">
              Already have access?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-blue-600 font-medium hover:underline"
              >
                Back to Login
              </button>
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

export default ResetPassword;