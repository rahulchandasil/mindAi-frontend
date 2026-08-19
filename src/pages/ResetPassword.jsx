import { useForm } from "react-hook-form";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import {
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
} from "../features/auth/authSlice";

import { resetPassword } from "../features/auth/authAPI";

const ResetPassword = () => {
  const { token } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    resetPasswordLoading,
    resetPasswordSuccess: success,
    resetPasswordMessage,
    error,
  } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      dispatch(resetPasswordStart());

      const response = await resetPassword(token, data.password);

      dispatch(resetPasswordSuccess(response));

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (err) {
      dispatch(
        resetPasswordFailure(
          err.response?.data?.message || "Unable to reset password.",
        ),
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {!success ? (
          <>
            <h1 className="text-3xl font-bold mb-2">Reset Password</h1>

            <p className="text-gray-500 mb-6">Enter your new password.</p>

            {error && (
              <div className="mb-4 p-3 rounded bg-red-100 text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  className="w-full border rounded-lg p-3"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Minimum 8 characters",
                    },
                  })}
                />

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="w-full border rounded-lg p-3"
                  {...register("confirmPassword", {
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />

                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-sm text-indigo-600"
              >
                {showPassword ? "Hide Password" : "Show Password"}
              </button>

              <button
                disabled={resetPasswordLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg p-3"
              >
                {resetPasswordLoading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600">
              Password Updated
            </h2>

            <p className="mt-3">{resetPasswordMessage}</p>

            <p className="mt-2 text-gray-500">Redirecting to Login...</p>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link to="/login" className="text-indigo-600">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
