import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import MessageBubble from "./MessageBubble";

const MessageList = () => {
  const { messages, loading } = useSelector((state) => state.message);
  const { activeConversation } = useSelector((state) => state.conversation);
  const bottomRef = useRef(null);

  // Smoothly pin viewport down when message item lengths shift
  useEffect(() => {
    if (messages.length > 0) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  if (messages.length === 0 && !loading) {
    return (
      <div className="flex-1 min-h-0 overflow-y-auto px-4 dynamic-scrollbar bg-transparent flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center p-6 animate-fade-in">
          <div className="max-w-md w-full bg-slate-800/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 text-center shadow-2xl shadow-black/20">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mx-auto mb-6 shadow-inner">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">
              Session Initialized Securely
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mx-auto">
              {activeConversation?.title 
                ? `Welcome to "${activeConversation.title}". `
                : "Welcome back. "}
              Share what's on your mind or ask a question to begin our consultation stream.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-0 overflow-y-auto px-4 dynamic-scrollbar bg-transparent">
      {/* 
        This wrapper naturally grows with the content. 
        It is NOT min-h-full, meaning the bottomRef stays exactly at the bottom of the messages.
      */}
      <div className="max-w-3xl mx-auto pt-6 pb-2">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <MessageBubble
              key={message._id || message.id || index}
              message={message}
            />
          ))}
        </div>
        
        {/* Anchor Node Scroll Target tightly bound to content */}
        <div ref={bottomRef} className="h-4 w-full shrink-0" />
      </div>
    </div>
  );
};

export default MessageList;