import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../features/auth/authAPI";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched", // Validates immediately as the user moves through fields
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      navigate("/login");
    } catch (error) {
      setError("root", {
        message: error.response?.data?.message || "Registration failed. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Column: Brand Column (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-tr from-indigo-900 via-indigo-950 to-slate-900 p-12 flex-col justify-between relative overflow-hidden">
        {/* Ambient background glows matching login layout */}
        <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-2.5 z-10">
          <div className="w-9 h-9 rounded-xl bg-indigo-500 flex items-center justify-center text-white font-black text-xl shadow-md shadow-indigo-500/20">
            M
          </div>
          <span className="text-xl font-bold text-white tracking-tight">MindAI</span>
        </div>

        <div className="max-w-md z-10 space-y-4">
          <h2 className="text-4xl font-extrabold text-white tracking-tight leading-tight">
            Begin your journey to balanced mental health.
          </h2>
          <p className="text-indigo-200/80 leading-relaxed text-sm">
            Create your account to access personalized AI-driven support, secure clinician-backed tools, and real-time care metrics.
          </p>
        </div>

        <div className="text-xs text-indigo-300/50 z-10 font-mono">
          &copy; {new Date().getFullYear()} MindAI Inc. All rights reserved.
        </div>
      </div>

      {/* Right Column: Registration Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-16 bg-slate-50/30">
        <div className="w-full max-w-md space-y-8 bg-white lg:bg-transparent p-6 sm:p-8 lg:p-0 rounded-2xl border border-gray-100 lg:border-none shadow-sm lg:shadow-none">
          
          {/* Header */}
          <div className="space-y-2">
            {/* Mobile Branding Logo */}
            <div className="flex lg:hidden items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-base">
                M
              </div>
              <span className="text-lg font-bold text-gray-900 tracking-tight">MindAI</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              Create an account
            </h1>
            <p className="text-sm text-gray-500">
              Get started with your secure mental health workspace.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Root API Error Alert Box */}
            {errors.root && (
              <div className="p-3.5 bg-red-50 border border-red-200 text-xs font-semibold text-red-600 rounded-xl flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{errors.root.message}</span>
              </div>
            )}

            {/* Name Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 tracking-wide uppercase">
                Full Name
              </label>
              <input
                type="text"
                disabled={isSubmitting}
                placeholder="John Doe"
                className={`w-full text-sm bg-white border rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all shadow-sm ${
                  errors.name
                    ? "border-red-300 focus:ring-red-500/20 focus:border-red-500"
                    : "border-gray-200 focus:ring-indigo-500/20 focus:border-indigo-600"
                }`}
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-600 text-xs font-medium mt-1 pl-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 tracking-wide uppercase">
                Email Address
              </label>
              <input
                type="email"
                disabled={isSubmitting}
                placeholder="name@company.com"
                className={`w-full text-sm bg-white border rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all shadow-sm ${
                  errors.email
                    ? "border-red-300 focus:ring-red-500/20 focus:border-red-500"
                    : "border-gray-200 focus:ring-indigo-500/20 focus:border-indigo-600"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email format structure",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-600 text-xs font-medium mt-1 pl-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 tracking-wide uppercase">
                Password
              </label>
              <input
                type="password"
                disabled={isSubmitting}
                placeholder="••••••••"
                className={`w-full text-sm bg-white border rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all shadow-sm ${
                  errors.password
                    ? "border-red-300 focus:ring-red-500/20 focus:border-red-500"
                    : "border-gray-200 focus:ring-indigo-500/20 focus:border-indigo-600"
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-600 text-xs font-medium mt-1 pl-1">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 tracking-wide uppercase">
                Confirm Password
              </label>
              <input
                type="password"
                disabled={isSubmitting}
                placeholder="••••••••"
                className={`w-full text-sm bg-white border rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all shadow-sm ${
                  errors.confirmPassword
                    ? "border-red-300 focus:ring-red-500/20 focus:border-red-500"
                    : "border-gray-200 focus:ring-indigo-500/20 focus:border-indigo-600"
                }`}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) => value === password || "The passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-600 text-xs font-medium mt-1 pl-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm py-3 px-4 rounded-xl shadow-md shadow-indigo-600/10 hover:shadow-lg hover:shadow-indigo-600/20 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed pt-3"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Creating Account...</span>
                </>
              ) : (
                "Get Started"
              )}
            </button>
          </form>

          {/* Footer Subtext Block */}
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 font-semibold hover:text-indigo-700 transition">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;