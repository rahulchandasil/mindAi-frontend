import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { chatWithAI } from "../../features/chat/chatApi";

const ChatInput = ({ loadMessages, loadConversations }) => {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const textareaRef = useRef(null);

  const { activeConversation } = useSelector((state) => state.conversation);

  // Automatically grow the input field vertically for longer multi-line prompts
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [message]);

  const handleSendMessage = async () => {
    if (!message.trim() || sending) return;

    if (!activeConversation) {
      return; // Handled gracefully by the layout wrapper empty-state
    }

    try {
      setSending(true);
      const userText = message.trim();
      setMessage("");

      await chatWithAI(activeConversation._id, userText);

      await loadMessages();
      await loadConversations();
    } catch (error) {
      console.error("Failed to transmit user text stream:", error);
    } finally {
      setSending(false);
      // Refocus input after message completes dispatch
      setTimeout(() => textareaRef.current?.focus(), 50);
    }
  };

  const handleKeyDown = (e) => {
    // Submit on Enter keypress, but allow manual linebreaks via Shift + Enter keys
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="relative w-full flex flex-col bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl transition-all focus-within:bg-slate-800 focus-within:border-indigo-500/50 focus-within:shadow-indigo-500/10">
      
      {/* Floating Status Indicator Overlay */}
      {sending && (
        <div className="absolute -top-10 left-4 bg-slate-800 text-slate-200 text-[11px] font-medium px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2.5 border border-white/10 animate-fade-in-up z-20">
          <div className="flex gap-1 items-center justify-center">
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
          </div>
          <span>MindAI is typing...</span>
        </div>
      )}

      {/* Row Controls Wrapper Box */}
      <div className="flex items-end gap-3 py-3 px-4">
        {/* Dynamic Textarea (Replaces static single-line input field) */}
        <textarea
          ref={textareaRef}
          rows="1"
          value={message}
          disabled={sending}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Share your thoughts or ask a question..."
          className="flex-1 max-h-40 bg-transparent text-sm text-slate-200 placeholder-slate-500/80 focus:outline-none resize-none py-1.5 min-h-[28px] leading-relaxed dynamic-scrollbar"
        />

        {/* Action Button Trigger Box */}
        <button
          onClick={handleSendMessage}
          disabled={sending || !message.trim()}
          className="h-8 w-8 shrink-0 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:hover:bg-indigo-600 text-white rounded-lg flex items-center justify-center transition-all shadow-sm shadow-indigo-600/20 disabled:cursor-not-allowed mb-0.5"
          title="Send Message"
        >
          {sending ? (
            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 transform rotate-45 translate-x-[-1px] translate-y-[1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
