import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFailure,
} from "../features/auth/authSlice";

import { forgotPassword } from "../features/auth/authApi";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const {
    forgotPasswordLoading,
    forgotPasswordSuccess: success,
    forgotPasswordMessage,
    error,
  } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    try {
      dispatch(forgotPasswordStart());

      const response = await forgotPassword(data.email);

      dispatch(
        forgotPasswordSuccess({
          message: response.message,
        })
      );
    } catch (err) {
      dispatch(
        forgotPasswordFailure(
          err.response?.data?.message ||
            "Something went wrong. Please try again."
        )
      );
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-tr from-indigo-900 via-indigo-950 to-slate-900 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl" />

        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl" />

        <div className="flex items-center gap-3 z-10">
          <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white font-bold">
            M
          </div>

          <span className="text-white text-xl font-bold">
            MindAI
          </span>
        </div>

        <div className="max-w-md z-10">
          <h2 className="text-4xl font-bold text-white leading-tight">
            Recover your account securely.
          </h2>

          <p className="mt-4 text-indigo-200">
            Enter your registered email address and we'll send you a secure password reset link.
          </p>
        </div>

        <p className="text-indigo-300 text-sm">
          © {new Date().getFullYear()} MindAI
        </p>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex justify-center items-center bg-slate-50 px-6 py-10">

        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-8">

          {!success ? (
            <>
              <div className="mb-8">

                <div className="flex lg:hidden items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                    M
                  </div>

                  <span className="font-bold text-lg">
                    MindAI
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900">
                  Forgot Password
                </h1>

                <p className="mt-2 text-gray-500 text-sm">
                  Enter your email address below to receive a password reset link.
                </p>

              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <div>

                  <label className="block text-xs uppercase font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="name@example.com"
                    className={`w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 transition ${
                      errors.email
                        ? "border-red-400 focus:ring-red-200"
                        : "border-gray-300 focus:ring-indigo-300"
                    }`}
                    {...register("email", {
                      required: "Email is required",

                      pattern: {
                        value:
                          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,

                        message: "Invalid email address",
                      },
                    })}
                  />

                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.email.message}
                    </p>
                  )}

                </div>

                <button
                  disabled={forgotPasswordLoading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white py-3 rounded-xl font-semibold transition"
                >
                  {forgotPasswordLoading
                    ? "Sending Reset Link..."
                    : "Send Reset Link"}
                </button>

              </form>
            </>
          ) : (
            <div className="text-center">

              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">

                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>

              </div>

              <h2 className="mt-6 text-2xl font-bold">
                Check Your Email
              </h2>

              <p className="mt-3 text-gray-500">
                {forgotPasswordMessage}
              </p>

              <Link
                to="/login"
                className="mt-8 inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition"
              >
                Back to Login
              </Link>

            </div>
          )}

          <div className="mt-8 text-center">

            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              ← Back to Login
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;