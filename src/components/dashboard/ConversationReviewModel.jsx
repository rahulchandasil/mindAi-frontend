import TherapistNote from "./TherapistNote";

const ConversationReviewModal = ({
  alert,
  messages,
  onClose,
}) => {
  if (!alert) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-11/12 max-w-5xl h-[90vh] rounded-xl shadow-xl flex flex-col">

        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            Conversation Review
          </h2>

          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">

          {/* Alert Information */}
          <div className="p-4 border-b">
            <p>
              <strong>User:</strong> {alert.user?.name}
            </p>

            <p>
              <strong>Risk:</strong> {alert.reason}
            </p>

            <p>
              <strong>Status:</strong> {alert.status}
            </p>
          </div>

          {/* Messages */}
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-3">
              Conversation
            </h3>

            <div className="h-80 overflow-y-auto border rounded-lg p-4 bg-gray-50 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`max-w-[75%] p-3 rounded-lg ${
                    msg.sender === "user"
                      ? "ml-auto bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  <p>{msg.content}</p>

                  <small>{msg.sender}</small>
                </div>
              ))}
            </div>
          </div>

          {/* Therapist Notes */}
          <div className="border-t p-4">
            <TherapistNote
              conversationId={alert.conversation._id}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ConversationReviewModal;