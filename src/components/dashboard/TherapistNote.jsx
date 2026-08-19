import { useEffect, useState } from "react";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../../features/therapistNote/therapistNoteApi";

const TherapistNotes = ({ conversationId }) => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (conversationId) {
      loadNotes();
    }
  }, [conversationId]);

  const loadNotes = async () => {
    try {
      setLoading(true);
      const data = await getNotes(conversationId);
      setNotes(data);
    } catch (err) {
      console.error("Failed to load historical consultation documentation:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!note.trim() || submitting) return;

    try {
      setSubmitting(true);
      if (editingId) {
        await updateNote(editingId, note);
      } else {
        await createNote(conversationId, note);
      }

      setNote("");
      setEditingId(null);
      await loadNotes();
    } catch (err) {
      console.error("Failed to persist practitioner record entry:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNote("");
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setNote(item.note);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this clinical record?")) return;
    try {
      await deleteNote(id);
      await loadNotes();
    } catch (err) {
      console.error("Failed to purge specified item node segment:", err);
    }
  };

  return (
    <div className="mt-8 border-t border-slate-200 pt-6 max-w-4xl mx-auto px-4 select-none">
      
      {/* Title Segment */}
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h2 className="text-base font-bold text-slate-800 tracking-tight">
          Clinical Practitioner Log
        </h2>
      </div>

      {/* Note Editor Area */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm space-y-3">
        <textarea
          rows={4}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Document clinical milestones, behavioral insights, or action points here..."
          className="w-full text-sm border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-slate-400 bg-slate-50/30 transition-all resize-none"
        />

        <div className="flex items-center justify-end gap-2">
          {editingId && (
            <button
              onClick={handleCancelEdit}
              disabled={submitting}
              className="text-xs font-semibold text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-4 py-2 rounded-xl transition"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={!note.trim() || submitting}
            className="text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2 rounded-xl transition flex items-center gap-1.5 shadow-sm shadow-indigo-600/10"
          >
            {submitting && (
              <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            )}
            <span>{editingId ? "Update Entry" : "Commit Record"}</span>
          </button>
        </div>
      </div>

      {/* Historical List Logs Container */}
      <div className="mt-6 space-y-3.5">
        {loading && notes.length === 0 ? (
          <div className="space-y-3 animate-pulse">
            <div className="h-24 bg-slate-100 rounded-2xl w-full" />
            <div className="h-24 bg-slate-100 rounded-2xl w-full" />
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
            <p className="text-xs text-slate-400 font-medium"> No clinical records logged for this session yet.</p>
          </div>
        ) : (
          notes.map((item) => (
            <div
              key={item._id}
              className="border border-slate-200/80 rounded-2xl p-4 bg-white shadow-sm hover:border-slate-300 transition flex items-start justify-between gap-4 group"
            >
              <div className="space-y-2 min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600 shrink-0">
                    {item.therapist?.name ? item.therapist.name.charAt(0).toUpperCase() : "P"}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-700 truncate leading-none mb-0.5">
                      {item.therapist?.name || "Practitioner"}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium tracking-wide">
                      {new Date(item.createdAt).toLocaleString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed pl-1">
                  {item.note}
                </p>
              </div>

              {/* Action Controls Menu Overlay */}
              <div className="flex items-center gap-1 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition"
                  title="Modify Entry"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition"
                  title="Remove Entry"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-16v4M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TherapistNotes;