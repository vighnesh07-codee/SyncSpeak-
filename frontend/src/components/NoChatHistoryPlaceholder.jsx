import { MessageCircle } from "lucide-react";

function NoChatHistoryPlaceholder() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
      <MessageCircle size={64} className="opacity-50 mb-4" />
      <h3 className="text-xl font-semibold text-white mb-2">No Chat History</h3>
      <p className="text-center max-w-xs">Start a new conversation by selecting a contact from the list</p>
    </div>
  );
}

export default NoChatHistoryPlaceholder;
