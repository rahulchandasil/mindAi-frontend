import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAlerts,
  updateAlertStatus,
  getConversationReview,
} from "../features/therapist/therapistApi";
import {
  setAlerts,
  setLoading,
  setError,
} from "../features/therapist/therapistSlice";
import ConversationReviewModal from "../components/dashboard/ConversationReviewModel";
import MainLayout from "../components/layout/MainLayout";

const TherapistDashboard = () => {
  const dispatch = useDispatch();
  const { alerts = [], loading, error } = useSelector((state) => state.therapist);
  
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [messages, setMessages] = useState([]);
  const [actioningId, setActioningId] = useState(null);

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    try {
      dispatch(setLoading());
      const data = await getAlerts();
      dispatch(setAlerts(data || []));
    } catch (err) {
      dispatch(
        setError(err.response?.data?.message || "Failed to load triage alerts")
      );
    }
  };

  const handleStatusChange = async (alertId, status) => {
    setActioningId(alertId);
    try {
      await updateAlertStatus(alertId, status);
      // Optimistic local state update to ensure zero layout-refresh lag
      dispatch(
        setAlerts(
          alerts.map((alert) =>
            alert._id === alertId ? { ...alert, status } : alert
          )
        )
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setActioningId(null);
    }
  };

  const handleViewConversation = async (alert) => {
    if (!alert?.conversation?._id) return;
    try {
      const data = await getConversationReview(alert.conversation._id);
      setMessages(data);
      setSelectedAlert(alert);
    } catch (err) {
      console.error("Failed to fetch conversation trail:", err);
    }
  };

  return (
    <MainLayout>
      <div className="flex-1 overflow-y-auto min-h-0 dynamic-scrollbar p-6 lg:p-10">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Dashboard Topbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/5">
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                Therapist Dashboard
              </h1>
              <p className="mt-2 text-sm text-indigo-200/70">
                Monitor incoming client stress alerts, evaluate history logs, and resolve triage items.
              </p>
            </div>
            <div className="inline-flex items-center gap-3 bg-slate-800/80 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-xl shadow-lg self-start sm:self-auto">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.6)]" />
              <span className="text-sm font-semibold text-slate-300 uppercase tracking-widest">
                Active Alerts: <span className="text-white font-bold ml-1">{alerts.length}</span>
              </span>
            </div>
          </div>

          {/* Global State Error Catch */}
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-sm text-red-400 rounded-2xl flex items-center justify-between backdrop-blur-sm">
              <span>{error}</span>
              <button onClick={loadAlerts} className="underline font-bold hover:text-red-300 transition">
                Force Reload
              </button>
            </div>
          )}

          {/* Main Alerts Queue */}
          <div className="space-y-4">
            {loading ? (
              /* Premium Bone Skeleton Fallback */
              [1, 2, 3].map((n) => (
                <div key={n} className="bg-slate-800/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 space-y-4 animate-pulse">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="h-4 w-40 bg-slate-700/50 rounded"></div>
                      <div className="h-3 w-56 bg-slate-700/30 rounded"></div>
                    </div>
                    <div className="h-6 w-20 bg-slate-700/50 rounded-full"></div>
                  </div>
                  <div className="h-4 w-5/6 bg-slate-700/30 rounded"></div>
                  <div className="h-10 w-64 bg-slate-700/40 rounded-xl pt-2"></div>
                </div>
              ))
            ) : alerts.length === 0 ? (
              <div className="bg-slate-800/40 backdrop-blur-xl border border-white/5 rounded-3xl p-16 text-center shadow-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-2xl mx-auto flex items-center justify-center text-emerald-400 shadow-inner mb-6">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">All Clear</h3>
                <p className="text-slate-400 font-medium max-w-md mx-auto">No pending triage flags found. The queue is completely empty right now.</p>
              </div>
            ) : (
              alerts.map((alert) => (
                <div
                  key={alert._id}
                  className="bg-slate-800/60 backdrop-blur-lg border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl hover:bg-slate-800/80 hover:border-indigo-500/30 transition-all flex flex-col md:flex-row md:items-start justify-between gap-6"
                >
                  {/* Left Column: User Profile & Flag Trigger Reason */}
                  <div className="space-y-4 max-w-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold shadow-lg">
                        {alert.user?.name ? alert.user.name.charAt(0).toUpperCase() : "?"}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg">{alert.user?.name || "Anonymous User"}</h3>
                        <p className="text-xs text-indigo-300/80">{alert.user?.email || "No contact info saved"}</p>
                      </div>
                    </div>
                    
                    <div className="bg-slate-900/50 border border-white/5 px-5 py-4 rounded-xl shadow-inner">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5 flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Flag Trigger Reason
                      </span>
                      <p className="text-sm text-slate-200 leading-relaxed font-medium">{alert.reason}</p>
                    </div>
                  </div>

                  {/* Right Column: Dynamic Status Indicators & Trigger Trays */}
                  <div className="flex flex-col justify-between items-end gap-4 shrink-0 min-w-[240px] w-full md:w-auto pt-4 md:pt-0 border-t border-white/5 md:border-none">
                    <div className="flex items-center justify-between md:justify-end w-full gap-3">
                      <span className="text-xs text-slate-400 md:hidden font-medium">Current Status</span>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border tracking-wider uppercase shadow-sm ${
                          alert.status === "resolved"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : alert.status === "reviewed"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            : "bg-red-500/10 text-red-400 border-red-500/30 animate-pulse"
                        }`}
                      >
                        {alert.status}
                      </span>
                    </div>

                    {/* Tactical Actions Dashboard Row */}
                    <div className="grid grid-cols-3 md:flex items-center gap-2 w-full mt-2">
                      <button
                        disabled={actioningId === alert._id || alert.status === "reviewed"}
                        onClick={() => handleStatusChange(alert._id, "reviewed")}
                        className="text-xs font-bold px-3 py-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl hover:bg-amber-500/20 disabled:opacity-40 disabled:hover:bg-amber-500/10 transition-all text-center"
                      >
                        Review
                      </button>
                      <button
                        disabled={actioningId === alert._id || alert.status === "resolved"}
                        onClick={() => handleStatusChange(alert._id, "resolved")}
                        className="text-xs font-bold px-3 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl disabled:opacity-40 disabled:hover:bg-emerald-600 shadow-lg shadow-emerald-600/20 transition-all text-center"
                      >
                        Resolve
                      </button>
                      <button
                        disabled={actioningId === alert._id}
                        onClick={() => handleViewConversation(alert)}
                        className="text-xs font-bold px-3 py-2.5 bg-slate-700/50 hover:bg-slate-700 border border-white/10 text-white rounded-xl shadow-sm transition-all text-center col-span-1 flex items-center justify-center gap-1.5"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Log
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Render Portal Modal for Client History Transcripts */}
      {selectedAlert && (
        <ConversationReviewModal
          alert={selectedAlert}
          messages={messages}
          onClose={() => setSelectedAlert(null)}
        />
      )}
    </MainLayout>
  );
};

export default TherapistDashboard;