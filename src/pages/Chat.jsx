import { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import MainLayout from "../components/layout/MainLayout";
import ConversationSidebar from "../components/chat/ConversationSidebar";
import MessageList from "../components/chat/MessageList";
import ChatInput from "../components/chat/ChatInput";

import { getMessages } from "../features/message/messageAPI";
import {
  setMessages,
  setLoading,
  setError,
} from "../features/message/messageSlice";

import {
  getConversations,
} from "../features/conversation/conversationAPI";

import {
  setConversations,
} from "../features/conversation/conversationSlice";

const Chat = () => {
  const dispatch = useDispatch();

  const { activeConversation } = useSelector(
    (state) => state.conversation
  );

  const { error } = useSelector(
    (state) => state.message
  );

  // Load all messages
  const loadMessages = async () => {
    if (!activeConversation) return;

    try {
      dispatch(setLoading());

      const data = await getMessages(
        activeConversation._id
      );

      dispatch(setMessages(data));
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message ||
            "Failed to load messages."
        )
      );
    }
  };

  // Refresh conversation sidebar
  const loadConversations = async () => {
    try {
      const data = await getConversations();

      dispatch(setConversations(data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [activeConversation]);

  return (
    <MainLayout>
      <div className="flex flex-1 w-full h-full min-h-0 overflow-hidden relative">

        {/* Sidebar */}
        <div className="w-[280px] shrink-0 border-r border-white/5 bg-slate-900/60 backdrop-blur-md hidden md:flex flex-col">
          <ConversationSidebar />
        </div>

        {/* Chat Area */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 flex flex-col bg-slate-900/40 relative z-10 min-w-0 min-h-0"
        >

          {activeConversation ? (
            <>
              {/* Header */}
              <div className="h-14 shrink-0 border-b border-white/5 bg-slate-900/60 backdrop-blur-md px-6 flex items-center justify-between z-20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <h2 className="font-semibold text-[15px] text-slate-200">
                    {activeConversation.title}
                  </h2>
                </div>

                <span className="text-[10px] font-semibold tracking-wide text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 uppercase">
                  Encrypted
                </span>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-500/10 border-b border-red-500/20 text-red-400 p-3 text-sm text-center backdrop-blur-sm z-20">
                  {error}
                </div>
              )}

              {/* Messages Viewport */}
              <MessageList />

              {/* Composer Container */}
              <div className="shrink-0 w-full px-4 pb-6 pt-2 bg-gradient-to-t from-slate-900 via-slate-900/95 to-transparent z-20">
                <div className="max-w-3xl mx-auto">
                  <ChatInput
                    loadMessages={loadMessages}
                    loadConversations={loadConversations}
                  />
                  <div className="text-center mt-3 text-[11px] text-slate-500 font-medium">
                    MindAI can make mistakes. Consider verifying important information.
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-6">
              <div className="text-center p-8 max-w-md w-full bg-slate-800/40 backdrop-blur-xl border border-white/5 rounded-3xl shadow-2xl shadow-black/20">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl mx-auto flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 mb-6">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight mb-2">
                  Welcome 👋
                </h2>
                <p className="text-indigo-200/70 text-sm leading-relaxed">
                  Select a conversation from the sidebar or start a new chat to begin your session.
                </p>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Chat;