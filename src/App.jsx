import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import TherapistDashboard from "./pages/TherapistDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import UserManagement from "./pages/UserManagement";
import AdminAlerts from "./pages/AdminAlerts";
import Profile from "./pages/Profile";
import History from "./pages/History";
import Analytics from "./pages/Analytics";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./routes/ProtectedRoutes";
import RoleRoute from "./routes/RoleRoutes";
import GoogleSuccess from "./pages/GoogleSuccess";

import { getProfile } from "./features/auth/authApi";
import { fetchUserStart, fetchUserSuccess, fetchUserFailure } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const { token, user, isInitializing } = useSelector((state) => state.auth);

  useEffect(() => {
    const initializeAuth = async () => {
      // Only fetch if we have a token but no user (e.g. after refresh)
      if (token && !user) {
        try {
          dispatch(fetchUserStart());
          const response = await getProfile();
          // response contains { success: true, data: user }
          dispatch(fetchUserSuccess(response.data));
        } catch (error) {
          console.error("Failed to restore session:", error);
          dispatch(fetchUserFailure());
        }
      } else if (!token && isInitializing) {
        dispatch(fetchUserFailure());
      }
    };

    initializeAuth();
  }, [dispatch, token, user, isInitializing]);

  if (isInitializing && !user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
          <p className="text-indigo-200 font-medium tracking-wide">Restoring session...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/therapist"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["therapist"]}>
                <TherapistDashboard />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["admin"]}>
                <UserManagement />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/alerts"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["admin"]}>
                <AdminAlerts />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/auth/google/success" element={<GoogleSuccess />} />
        
        {/* Catch-all redirect for broken or legacy routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
