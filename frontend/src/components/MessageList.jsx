import { useAuthStore } from "../store/useAuthStore";
import { useEffect, useRef } from "react";

function MessageList({ messages }) {
  const { authUser, selectedUser } = useAuthStore();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!messages || messages.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto p-4 flex items-center justify-center">
        <p className="text-slate-400">No messages yet. Start a conversation!</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg) => {
        const isOwn = msg.senderId === authUser?._id;
        return (
          <div key={msg._id} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                isOwn
                  ? "bg-linear-to-r from-pink-500 to-cyan-500 text-white"
                  : "bg-slate-700 text-slate-100"
              }`}
            >
              <p>{msg.text}</p>
              <p className={`text-xs mt-1 ${isOwn ? "text-pink-100" : "text-slate-400"}`}>
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;
