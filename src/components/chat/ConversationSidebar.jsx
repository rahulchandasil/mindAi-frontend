import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setLoading,
  setConversations,
  setError,
  addConversation,
  setActiveConversation,
} from "../../features/conversation/conversationSlice";

import {
  getConversations,
  createConversation,
  getConversationById,
} from "../../features/conversation/conversationApi";

const ConversationSidebar = () => {
  const dispatch = useDispatch();
  const [creating, setCreating] = useState(false);

  const { conversations, activeConversation, loading } = useSelector(
    (state) => state.conversation
  );

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      dispatch(setLoading());
      const data = await getConversations();
      dispatch(setConversations(data));
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message || "Failed to load conversations"
        )
      );
    }
  };

  const handleCreateConversation = async () => {
    if (creating) return;
    try {
      setCreating(true);
      const newConversation = await createConversation();
      dispatch(addConversation(newConversation));
      dispatch(setActiveConversation(newConversation));
    } catch (error) {
      console.error("Error launching conversation channel stream:", error);
    } finally {
      setCreating(false);
    }
  };

  const handleSelectConversation = async (conversationId) => {
    try {
      const conversation = await getConversationById(conversationId);
      dispatch(setActiveConversation(conversation));
    } catch (error) {
      console.error("Error retrieving individual room log attributes:", error);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-transparent">
      {/* Sidebar Header / Action Anchor Control Box */}
      <div className="p-4 shrink-0 border-b border-white/5">
        <button
          onClick={handleCreateConversation}
          disabled={creating}
          className="w-full bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm font-semibold py-3 px-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {creating ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Creating...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              <span>New Consultation</span>
            </>
          )}
        </button>
      </div>

      {/* Main Historical Room Streams Container Box */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1.5 dynamic-scrollbar">
        {loading && conversations.length === 0 ? (
          /* Loading Skeleton State */
          <div className="space-y-3 p-2 animate-pulse">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-14 bg-slate-100 rounded-xl w-full" />
            ))}
          </div>
        ) : conversations.length === 0 ? (
          /* Empty Room Fallback Graphic Context Box */
          <div className="text-center py-12 px-4">
            <div className="w-12 h-12 bg-white/5 rounded-2xl mx-auto flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <p className="text-xs text-slate-400 font-medium">No prior session history found</p>
          </div>
        ) : (
          conversations.map((conv) => {
            const isSelected = activeConversation?._id === conv._id;
            return (
              <div
                key={conv._id}
                onClick={() => handleSelectConversation(conv._id)}
                className={`group w-full text-left p-3.5 rounded-xl cursor-pointer transition-all duration-300 border flex items-start gap-3 ${
                  isSelected
                    ? "bg-indigo-500/10 border-indigo-500/20 shadow-sm"
                    : "bg-transparent border-transparent hover:bg-white/5 hover:border-white/10"
                }`}
              >
                {/* Visual Avatar Identifier Accent Block */}
                <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  isSelected 
                    ? "bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30" 
                    : "bg-slate-800 text-slate-400 group-hover:text-slate-200 group-hover:bg-slate-700"
                }`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>

                {/* Meta Text Informational Stream Node */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex justify-between items-baseline gap-2">
                    <p className={`text-sm font-semibold truncate ${
                      isSelected ? "text-indigo-200" : "text-slate-300"
                    }`}>
                      {conv.title || "Untitled Session Workspace"}
                    </p>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate font-medium">
                    {conv.updatedAt 
                      ? new Date(conv.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
                      : "Recent active logs"}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ConversationSidebar;
