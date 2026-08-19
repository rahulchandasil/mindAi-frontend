import React from "react";

const MessageBubble = ({ message }) => {
  const isUser = message.sender === "user";

  // Formats standard backend timestamp into a clean, human-readable time (e.g., "10:42 AM")
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    return new Date(timestamp).toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className={`flex w-full mb-4 items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}>
      
      {/* Bot Icon Avatar (Only displays on the AI side) */}
      {!isUser && (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-inner mb-1">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
      )}

      {/* Bubble Shell Container */}
      <div className={`flex flex-col max-w-[75%] md:max-w-[70%] group`}>
        
        {/* Core Text Box Area */}
        <div
          className={`px-5 py-3 rounded-2xl text-sm leading-relaxed tracking-wide transition-all ${
            isUser
              ? "bg-gradient-to-tr from-indigo-500 to-violet-600 text-white rounded-br-none shadow-lg shadow-indigo-500/20"
              : "bg-slate-800/80 backdrop-blur-md border border-white/10 text-slate-200 rounded-bl-none shadow-md shadow-black/10"
          }`}
        >
          {/* 
            whitespace-pre-line ensures that paragraph breaks (\n) sent by the 
            AI render as actual clean visual line breaks on the user's screen.
          */}
          <p className="whitespace-pre-line break-words font-normal">
            {message.content}
          </p>
        </div>

        {/* Dynamic Micro-Metadata Row (Reveals smoothly on layout) */}
        <span
          className={`text-[10px] font-medium mt-1.5 px-1 block tracking-wide select-none ${
            isUser ? "text-right text-indigo-400/70" : "text-left text-slate-500"
          }`}
        >
          {formatTime(message.createdAt || message.timestamp || new Date())}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;