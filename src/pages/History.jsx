import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getConversations } from "../features/conversation/conversationApi";
import MainLayout from "../components/layout/MainLayout";

const History = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await getConversations();
      setConversations(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="w-full h-full overflow-y-auto">
        <div className="p-8 max-w-5xl mx-auto h-full flex flex-col relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
            <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Conversation History
            </h1>
            <p className="text-slate-400 mt-1">Review your past consultations and AI analysis</p>
          </div>
        </motion.div>

        {loading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map(i => <div key={i} className="h-24 bg-white/5 rounded-2xl w-full" />)}
          </div>
        ) : conversations.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900/50 backdrop-blur-md rounded-3xl border border-white/5 p-12 text-center shadow-xl shadow-black/20"
          >
            <div className="w-16 h-16 bg-white/5 rounded-2xl mx-auto flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No History Found</h3>
            <p className="text-slate-400">You haven't started any consultations yet.</p>
          </motion.div>
        ) : (
          <div className="grid gap-4">
            {conversations.map((conversation, i) => (
              <motion.div
                key={conversation._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group bg-slate-900/40 backdrop-blur-sm rounded-2xl border border-white/5 p-6 hover:bg-white/5 transition-all duration-300 hover:border-white/10 hover:shadow-xl cursor-pointer"
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h2 className="font-bold text-xl text-slate-100 group-hover:text-indigo-300 transition-colors">
                      {conversation.title || "Untitled Session"}
                    </h2>
                    <p className="text-sm text-slate-400 mt-1 font-medium">
                      {new Date(conversation.updatedAt).toLocaleString(undefined, {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                      })}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <span className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-3 py-1 rounded-lg text-sm font-semibold">
                      Mood: {conversation.moodScore || "N/A"}
                    </span>
                    <span className={`px-3 py-1 rounded-lg text-sm font-semibold capitalize border ${
                      conversation.riskLevel === 'high' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                      conversation.riskLevel === 'medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                      'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }`}>
                      {conversation.riskLevel || "Low"} Risk
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      </div>
    </MainLayout>
  );
};

export default History;
