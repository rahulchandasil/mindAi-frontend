import { useEffect, useState } from "react";

import {
  getAlerts,
  updateAlertStatus,
  getConversationReview,
  getTherapists,
  assignTherapist,
} from "../features/therapist/therapistApi";

import ConversationReviewModal from "../components/dashboard/ConversationReviewModel";
import MainLayout from "../components/layout/MainLayout";

const AdminAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const [selectedAlert, setSelectedAlert] = useState(null);
  const [messages, setMessages] = useState([]);
  const [therapists, setTherapists] = useState([]);
  const [selectedTherapists, setSelectedTherapists] = useState({});
  const [loading, setLoading] = useState(false);

  const loadAlerts = async () => {
    try {
      setLoading(true);
      const data = await getAlerts();
      setAlerts(data);
    } catch (err) {
      console.error("Critical: Failed to sync incoming risk incidents:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (id, newStatus) => {
    try {
      await updateAlertStatus(id, newStatus);
      await loadAlerts();
    } catch (err) {
      console.error("Failed to transition target status record state:", err);
    }
  };

  const handleViewConversation = async (alert) => {
    try {
      const data = await getConversationReview(alert.conversation._id);
      setMessages(data);
      setSelectedAlert(alert);
    } catch (err) {
      console.error("Failed to parse log payloads for targeted session review:", err);
    }
  };

  const loadTherapists = async () => {
    try {
      const data = await getTherapists();
      setTherapists(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to pull eligible practitioners directory metrics:", err);
    }
  };

  const handleAssign = async (alertId) => {
    try {
      const therapistId = selectedTherapists[alertId];
      if (!therapistId) {
        alert("Please select a licensed medical practitioner first.");
        return;
      }
      await assignTherapist(alertId, therapistId);
      await loadAlerts();
    } catch (err) {
      console.error("Assignment validation structural failure:", err);
    }
  };

  useEffect(() => {
    loadAlerts();
    loadTherapists();
  }, []);

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch = alert.user?.name
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = status === "all" || alert.status === status;
    return matchesSearch && matchesStatus;
  });

  return (
    <MainLayout>
      <div className="flex-1 overflow-y-auto min-h-0 dynamic-scrollbar p-6 lg:p-10 select-none">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Upper Brand Control Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-6 border-b border-white/5">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white">
                Incident Response Desk
              </h1>
              <p className="mt-2 text-sm text-indigo-200/70">
                Monitor and distribute high-priority psychiatric triggers and risk anomalies.
              </p>
            </div>
            <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg backdrop-blur-md">
              Active Filter Yield: <span className="text-white ml-1">{filteredAlerts.length} Units</span>
            </span>
          </div>

          {/* Modern High-Impact Core Metric Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {[
              { title: "Gross Volumetric Log", count: alerts.length, style: "text-white bg-slate-800/60 border-white/10" },
              { title: "Pending Dispatch", count: alerts.filter((a) => a.status === "pending").length, style: "text-amber-400 bg-amber-500/5 border-amber-500/20" },
              { title: "Under Active Review", count: alerts.filter((a) => a.status === "reviewed").length, style: "text-indigo-400 bg-indigo-500/5 border-indigo-500/20" },
              { title: "Resolved / Archived", count: alerts.filter((a) => a.status === "resolved").length, style: "text-emerald-400 bg-emerald-500/5 border-emerald-500/20" },
            ].map((metric, i) => (
              <div key={i} className={`p-6 rounded-3xl border shadow-xl backdrop-blur-md flex flex-col justify-between transition-colors hover:bg-slate-800/80 ${metric.style}`}>
                <h3 className="text-[11px] font-bold uppercase tracking-widest opacity-80">{metric.title}</h3>
                <p className="text-4xl font-black tracking-tight mt-3">{metric.count}</p>
              </div>
            ))}
          </div>

          {/* Advanced Filter Interface Row */}
          <div className="bg-slate-800/40 backdrop-blur-xl border border-white/5 rounded-3xl p-5 shadow-2xl flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Filter patient records by catalog name..."
                className="w-full text-sm border border-white/10 rounded-xl pl-5 pr-5 py-3 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 bg-slate-900/60 text-white transition-all placeholder-slate-500 shadow-inner"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="text-sm border border-white/10 rounded-xl px-5 py-3 focus:outline-none focus:border-indigo-500/50 bg-slate-900/80 text-white font-semibold cursor-pointer shadow-inner"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option className="bg-slate-900 text-white" value="all">Display All Statuses</option>
              <option className="bg-slate-900 text-white" value="pending">Pending Triages Only</option>
              <option className="bg-slate-900 text-white" value="reviewed">Reviewed Cases Only</option>
              <option className="bg-slate-900 text-white" value="resolved">Resolved Closed Indexes</option>
            </select>
          </div>

          {/* Main Historical Room Streams Container Box */}
          <div className="space-y-4">
            {loading && filteredAlerts.length === 0 ? (
              <div className="space-y-4 animate-pulse">
                {[1, 2].map((n) => <div key={n} className="h-44 bg-slate-800/40 border border-white/5 rounded-3xl w-full" />)}
              </div>
            ) : filteredAlerts.length === 0 ? (
              <div className="bg-slate-800/40 backdrop-blur-xl border border-white/5 rounded-3xl p-16 text-center shadow-2xl">
                <p className="text-sm font-medium text-slate-400">No matching threat anomalies logged inside parameters.</p>
              </div>
            ) : (
              filteredAlerts.map((alert) => (
                <div key={alert._id} className="bg-slate-800/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 lg:p-8 shadow-xl hover:bg-slate-800/80 hover:border-white/10 transition-all flex flex-col lg:flex-row justify-between gap-8 items-start">
                  
                  {/* Left Column: Data Informational Stack */}
                  <div className="space-y-6 min-w-0 flex-1 w-full">
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-xl uppercase tracking-widest animate-pulse shadow-sm shadow-red-500/10">
                        🚨 High Risk Flag
                      </span>
                      <span className={`text-xs font-bold px-3 py-1.5 rounded-xl uppercase tracking-widest border shadow-sm ${
                        alert.status === "pending"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-amber-500/10"
                          : alert.status === "reviewed"
                          ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-indigo-500/10"
                          : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-emerald-500/10"
                      }`}>
                        {alert.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm border-b border-white/5 pb-6">
                      <p className="text-indigo-200/80 truncate"><strong className="font-bold text-white tracking-wide block mb-1">User node:</strong> {alert.user?.name || "Unidentified Account"}</p>
                      <p className="text-indigo-200/80 truncate"><strong className="font-bold text-white tracking-wide block mb-1">Routing Email:</strong> {alert.user?.email || "N/A"}</p>
                      <p className="text-slate-300 md:col-span-2 mt-2"><strong className="font-bold text-white tracking-wide block mb-2 text-xs uppercase text-slate-400">Trigger Reason:</strong> <span className="text-slate-200 bg-slate-900/60 px-4 py-3 rounded-xl border border-white/5 block shadow-inner leading-relaxed">{alert.reason}</span></p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs font-medium text-slate-400">
                      <p className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-500" />
                        Assigned Practitioner: <span className="text-white font-bold">{alert.assignedTherapist?.name || "Unassigned"}</span>
                      </p>
                      <p className="bg-slate-900/50 px-3 py-1.5 rounded-lg border border-white/5">{new Date(alert.createdAt).toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Right Column: Inline Action Anchor Control Dashboard */}
                  <div className="flex flex-wrap lg:flex-col items-stretch gap-3 w-full lg:w-64 shrink-0 pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/5 lg:pl-8">
                    
                    {/* Dynamic Group Assignment Element Form */}
                    <div className="flex gap-2 w-full">
                      <select
                        className="flex-1 text-xs border border-white/10 rounded-xl px-3 h-10 bg-slate-900/80 text-white font-bold cursor-pointer focus:border-indigo-500/50 shadow-inner"
                        value={selectedTherapists[alert._id] || ""}
                        onChange={(e) =>
                          setSelectedTherapists({
                            ...selectedTherapists,
                            [alert._id]: e.target.value,
                          })
                        }
                      >
                        <option className="bg-slate-900 text-white" value="">Select Therapist</option>
                        {therapists.map ((t) => (
                          <option className="bg-slate-900 text-white" key={t._id} value={t._id}>{t.name}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleAssign(alert._id)}
                        className="h-10 px-4 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20"
                      >
                        Assign
                      </button>
                    </div>

                    {/* Primary Evaluation & Review Stream Control Buttons */}
                    <button
                      onClick={() => handleViewConversation(alert)}
                      className="w-full h-10 bg-slate-700/50 hover:bg-slate-700 text-white border border-white/10 font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Inspect Transcripts
                    </button>

                    <div className="grid grid-cols-2 gap-2 w-full mt-2">
                      <button
                        onClick={() => handleStatus(alert._id, "reviewed")}
                        className="h-10 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-400 font-bold text-xs rounded-xl transition-all shadow-lg shadow-amber-500/5"
                      >
                        Reviewed
                      </button>
                      <button
                        onClick={() => handleStatus(alert._id, "resolved")}
                        className="h-10 bg-emerald-600/80 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-emerald-600/20"
                      >
                        Resolved
                      </button>
                    </div>

                  </div>

                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Global Thread Modal Sheet */}
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

export default AdminAlerts;