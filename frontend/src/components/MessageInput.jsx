import { Send } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

function MessageInput() {
  const { sendMessage, selectedUser } = useAuthStore();
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedUser) return;

    setIsSending(true);
    try {
      await sendMessage(selectedUser._id, message);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="border-t border-slate-700 p-4 bg-slate-800 bg-opacity-50">
      <form onSubmit={handleSend} className="flex gap-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          disabled={isSending}
          className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isSending || !message.trim()}
          className="bg-gradient-to-r from-pink-500 to-cyan-500 text-white p-2 rounded-lg hover:from-pink-600 hover:to-cyan-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
