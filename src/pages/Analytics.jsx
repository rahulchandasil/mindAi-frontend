import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAnalytics,
} from "../features/analytic/analyticsApi";

import {
  setLoading,
  setAnalytics,
  setError,
} from "../features/analytic/analyticSlice";
import MainLayout from "../components/layout/MainLayout";

const Analytics = () => {
  const dispatch = useDispatch();

  const {
    analytics,
    loading,
    error,
  } = useSelector((state) => state.analytics);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      dispatch(setLoading());
      const data = await getAnalytics();
      dispatch(setAnalytics(data));
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message ||
            "Failed to load analytics"
        )
      );
    }
  };

  return (
    <MainLayout>
      <div className="flex-1 overflow-y-auto min-h-0 dynamic-scrollbar p-6 lg:p-10">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/5">
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                Mood Analytics
              </h1>
              <p className="mt-2 text-sm text-indigo-200/70">
                Aggregated system statistics and user sentiment breakdowns.
              </p>
            </div>
            <button onClick={loadAnalytics} className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-500/20 transition-all font-semibold text-sm">
              <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh Data
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-sm text-red-400 rounded-2xl flex items-center justify-between backdrop-blur-sm">
              <span>{error}</span>
            </div>
          )}

          {loading && !analytics ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(n => (
                <div key={n} className="bg-slate-800/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 h-32 animate-pulse">
                  <div className="h-4 w-24 bg-slate-700/50 rounded mb-4"></div>
                  <div className="h-10 w-16 bg-slate-700/40 rounded"></div>
                </div>
              ))}
            </div>
          ) : analytics ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <div className="bg-gradient-to-br from-indigo-500/10 to-violet-500/10 backdrop-blur-xl border border-indigo-500/20 rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-indigo-500/40 transition-colors">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-indigo-500/20 rounded-full blur-xl group-hover:bg-indigo-500/30 transition-colors"></div>
                <h3 className="text-sm font-semibold text-indigo-300 uppercase tracking-wider mb-2">Average Mood</h3>
                <p className="text-5xl font-black text-white">{analytics.averageMood || "0"}</p>
              </div>

              <div className="bg-slate-800/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-xl relative overflow-hidden hover:bg-slate-800/80 transition-colors">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Total Conversations</h3>
                <p className="text-5xl font-black text-white">{analytics.totalConversations || "0"}</p>
              </div>

              <div className="bg-slate-800/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-xl relative overflow-hidden hover:bg-slate-800/80 transition-colors">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Total Alerts</h3>
                <p className="text-5xl font-black text-white">{analytics.totalAlerts || "0"}</p>
              </div>

              <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/5 backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-6 shadow-xl relative overflow-hidden hover:border-emerald-500/40 transition-colors">
                <h3 className="text-sm font-semibold text-emerald-400/80 uppercase tracking-wider mb-2">Low Risk</h3>
                <p className="text-5xl font-black text-emerald-400">{analytics.lowRisk || "0"}</p>
              </div>

              <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/5 backdrop-blur-xl border border-amber-500/20 rounded-3xl p-6 shadow-xl relative overflow-hidden hover:border-amber-500/40 transition-colors">
                <h3 className="text-sm font-semibold text-amber-400/80 uppercase tracking-wider mb-2">Medium Risk</h3>
                <p className="text-5xl font-black text-amber-400">{analytics.mediumRisk || "0"}</p>
              </div>

              <div className="bg-gradient-to-br from-red-500/10 to-rose-500/5 backdrop-blur-xl border border-red-500/20 rounded-3xl p-6 shadow-xl relative overflow-hidden hover:border-red-500/40 transition-colors">
                <h3 className="text-sm font-semibold text-red-400/80 uppercase tracking-wider mb-2">High Risk</h3>
                <p className="text-5xl font-black text-red-500">{analytics.highRisk || "0"}</p>
              </div>

            </div>
          ) : null}
        </div>
      </div>
    </MainLayout>
  );
};

export default Analytics;