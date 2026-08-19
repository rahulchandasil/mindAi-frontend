import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../features/auth/authSlice";
import { loginUser } from "../features/auth/authAPI";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const [googleError, setGoogleError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("error") === "google_auth_failed") {
      setGoogleError("Unable to sign in with Google. Please try again.");
    }
  }, [location]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched", // Validates immediately when a user clicks away for a professional feel
  });

  const onSubmit = async (data) => {
    try {
      dispatch(loginStart());
      const response = await loginUser(data);

      const user = response.data;

      localStorage.setItem("token", user.token);

      dispatch(
        loginSuccess({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token: user.token,
        }),
      );

      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "therapist") {
        navigate("/therapist");
      } else {
        navigate("/chat");
      }
    } catch (err) {
      dispatch(
        loginFailure(
          err.response?.data?.message || "Invalid email or password",
        ),
      );
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Column: Brand Column (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-tr from-indigo-900 via-indigo-950 to-slate-900 p-12 flex-col justify-between relative overflow-hidden">
        {/* Soft abstract ambient background glows */}
        <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-2.5 z-10">
          <div className="w-9 h-9 rounded-xl bg-indigo-500 flex items-center justify-center text-white font-black text-xl shadow-md shadow-indigo-500/20">
            M
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            MindAI
          </span>
        </div>

        <div className="max-w-md z-10 space-y-4">
          <h2 className="text-4xl font-extrabold text-white tracking-tight leading-tight">
            AI-driven mental health support & analysis.
          </h2>
          <p className="text-indigo-200/80 leading-relaxed text-sm">
            Bridging clinical workflows with secure analytics to deliver
            proactive mental healthcare.
          </p>
        </div>

        <div className="text-xs text-indigo-300/50 z-10 font-mono">
          &copy; {new Date().getFullYear()} MindAI Inc. All rights reserved.
        </div>
      </div>

      {/* Right Column: Interactive Login Core Box Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-16 bg-slate-50/30">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md space-y-8 bg-white lg:bg-transparent p-6 sm:p-8 lg:p-0 rounded-2xl border border-gray-100 lg:border-none shadow-sm lg:shadow-none"
        >
          {/* Form Header */}
          <div className="space-y-2">
            {/* Mobile Branding Logo */}
            <div className="flex lg:hidden items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-base">
                M
              </div>
              <span className="text-lg font-bold text-gray-900 tracking-tight">
                MindAI
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              Welcome back
            </h1>
            <p className="text-sm text-gray-500">
              Enter your credentials to access your secure portal.
            </p>
          </div>

          {/* Form Core Elements Container */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Server API Error Notification Box */}
            {error && (
              <div className="p-3.5 bg-red-50 border border-red-200 text-xs font-semibold text-red-600 rounded-xl flex items-center gap-2 animate-shake">
                <svg
                  className="w-4 h-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}
            {googleError && (
              <div className="p-3.5 bg-red-50 border border-red-200 text-xs font-semibold text-red-600 rounded-xl flex items-center gap-2 animate-shake">
                <svg
                  className="w-4 h-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>{googleError}</span>
              </div>
            )}

            {/* Email Field Container Row */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 tracking-wide uppercase">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  disabled={loading}
                  placeholder="name@company.com"
                  className={`w-full text-sm bg-white border rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all shadow-sm ${
                    errors.email
                      ? "border-red-300 focus:ring-red-500/20 focus:border-red-500"
                      : "border-gray-200 focus:ring-indigo-500/20 focus:border-indigo-600"
                  }`}
                  {...register("email", {
                    required: "Please supply a valid email addresses",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email format structure",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-red-600 text-xs font-medium mt-1 pl-1 flex items-center gap-1">
                  <span>{errors.email.message}</span>
                </p>
              )}
            </div>

            {/* Password Field Container Row */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-gray-700 tracking-wide uppercase">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-700 transition"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  disabled={loading}
                  placeholder="••••••••"
                  className={`w-full text-sm bg-white border rounded-xl pl-4 pr-12 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all shadow-sm ${
                    errors.password
                      ? "border-red-300 focus:ring-red-500/20 focus:border-red-500"
                      : "border-gray-200 focus:ring-indigo-500/20 focus:border-indigo-600"
                  }`}
                  {...register("password", {
                    required: "Password input constraint cannot be blank",
                  })}
                />
                {/* Visibility Eye Interactive Button */}
                <button
                  type="button"
                  tabIndex="-1"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded transition"
                >
                  {showPassword ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-600 text-xs font-medium mt-1 pl-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Interactive Dispatch Core Form Actions Trigger Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm py-3 px-4 rounded-xl shadow-md shadow-indigo-600/10 hover:shadow-lg hover:shadow-indigo-600/20 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Authenticating...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="relative flex items-center justify-center my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative px-4 bg-white lg:bg-transparent text-sm text-gray-500 font-medium">
                OR
              </div>
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={() => {
                window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
              }}
              className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium text-sm py-3 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
          </form>

          {/* Footer Subtext Block */}
          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-semibold hover:text-indigo-700 transition"
            >
              Create an account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
