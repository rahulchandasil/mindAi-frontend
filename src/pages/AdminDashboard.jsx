import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDashboardStats } from "../features/admin/adminApi";
import { setLoading, setStats, setError } from "../features/admin/adminSlice";
import MainLayout from "../components/layout/MainLayout";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      dispatch(setLoading());
      const data = await getDashboardStats();
      dispatch(setStats(data));
    } catch (err) {
      dispatch(
        setError(
          err.response?.data?.message || "Failed to load dashboard metrics",
        ),
      );
    }
  };

  return (
    <MainLayout>
      <div className="flex-1 overflow-y-auto min-h-0 dynamic-scrollbar p-6 lg:p-10">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Premium inline error component with a retry button */}
          {error && (
            <div className="bg-red-500/10 p-4 rounded-xl border border-red-500/20 max-w-md mx-auto text-center mb-6">
              <h3 className="text-red-400 font-semibold mb-1">System Error</h3>
              <p className="text-sm text-red-300/80 mb-4">{error}</p>
              <button
                onClick={loadStats}
                className="text-xs font-bold bg-red-600/20 border border-red-500/30 text-red-400 px-4 py-2 rounded-lg hover:bg-red-600/30 transition-colors"
              >
                Retry Connection
              </button>
            </div>
          )}

          {/* Top Welcome / Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-white/5 pb-6 mb-8">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white">
                Admin Dashboard
              </h1>
              <p className="mt-2 text-sm text-indigo-200/70">
                Real-time analytics, user metrics, and active system alerts.
              </p>
            </div>
            <div className="flex items-center gap-3 self-start sm:self-auto">
              <Link
                to="/admin/users"
                className="inline-flex items-center justify-center bg-slate-800/60 hover:bg-slate-700/80 border border-white/10 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-lg transition-all group backdrop-blur-md"
              >
                Manage Users
                <svg
                  className="w-4 h-4 ml-2 text-indigo-400 transform group-hover:translate-x-0.5 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                to="/admin/alerts"
                className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all group"
              >
                Manage Alerts
                <svg
                  className="w-4 h-4 ml-2 transform group-hover:translate-x-0.5 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {loading || !stats ? (
            /* Skeleton Grid System */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="bg-slate-800/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 space-y-4 animate-pulse"
                >
                  <div className="flex justify-between items-center">
                    <div className="h-4 w-24 bg-slate-700/50 rounded"></div>
                    <div className="h-8 w-8 bg-slate-700/30 rounded-xl"></div>
                  </div>
                  <div className="h-10 w-20 bg-slate-700/40 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : (
            /* Active Metrics Display */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Total Users */}
              <div className="bg-slate-800/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-xl relative overflow-hidden hover:bg-slate-800/80 transition-colors group">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Total Users
                  </h3>
                  <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                </div>
                <p className="text-4xl font-black text-white">
                  {stats.totalUsers}
                </p>
              </div>

              {/* Conversations */}
              <div className="bg-slate-800/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-xl relative overflow-hidden hover:bg-slate-800/80 transition-colors group">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Conversations
                  </h3>
                  <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                </div>
                <p className="text-4xl font-black text-white">
                  {stats.totalConversations}
                </p>
              </div>

              {/* Total Messages */}
              <div className="bg-slate-800/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-xl relative overflow-hidden hover:bg-slate-800/80 transition-colors group">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Total Messages
                  </h3>
                  <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <p className="text-4xl font-black text-white">
                  {stats.totalMessages}
                </p>
              </div>

              {/* Total Alerts */}
              <div className="bg-gradient-to-br from-indigo-500/10 to-violet-500/5 backdrop-blur-xl border border-indigo-500/20 rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-indigo-500/40 transition-colors">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl group-hover:bg-indigo-500/20 transition-colors"></div>
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-widest">
                    Total Alerts
                  </h3>
                  <div className="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                </div>
                <p className="text-4xl font-black text-white relative z-10">
                  {stats.totalAlerts}
                </p>
              </div>

              {/* Pending Alerts */}
              <div className="bg-gradient-to-br from-red-500/10 to-rose-500/5 backdrop-blur-xl border border-red-500/20 rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-red-500/40 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold text-red-400/80 uppercase tracking-widest">
                    Pending Alerts
                  </h3>
                  <div className="p-2.5 bg-red-500/20 text-red-400 rounded-xl border border-red-500/30 animate-pulse">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                </div>
                <p className="text-4xl font-black text-red-400">
                  {stats.pendingAlerts}
                </p>
              </div>

              {/* Resolved Alerts */}
              <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/5 backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold text-emerald-400/80 uppercase tracking-widest">
                    Resolved Alerts
                  </h3>
                  <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <p className="text-4xl font-black text-emerald-400">
                  {stats.resolvedAlerts}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
