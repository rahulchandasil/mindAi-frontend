import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "../features/auth/authSlice";
import { getProfile } from "../features/auth/authAPI";

const GoogleSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleGoogleLogin = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");

        if (!token) {
          throw new Error("No token provided");
        }

        // Save token immediately so api/axios.js interceptor attaches it to the profile request
        localStorage.setItem("token", token);

        const response = await getProfile();
        
        // Check if response is successful
        if (response && response.success && response.data) {
          const user = response.data;
          
          dispatch(
            loginSuccess({
              user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
              },
              token: token,
            })
          );

          // Route to appropriate dashboard
          if (user.role === "admin") {
            navigate("/admin");
          } else if (user.role === "therapist") {
            navigate("/therapist");
          } else {
            navigate("/chat");
          }
        } else {
          throw new Error("Invalid profile response");
        }
      } catch (error) {
        console.error("Google Auth Error:", error);
        localStorage.removeItem("token");
        dispatch(loginFailure("Google Authentication Failed"));
        navigate("/login?error=google_auth_failed");
      }
    };

    handleGoogleLogin();
  }, [location, navigate, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center space-y-4">
        <svg
          className="animate-spin h-8 w-8 text-indigo-600"
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
        <h2 className="text-xl font-semibold text-slate-800">Signing you in...</h2>
        <p className="text-sm text-slate-500">Please wait while we securely authenticate your account.</p>
      </div>
    </div>
  );
};

export default GoogleSuccess;
