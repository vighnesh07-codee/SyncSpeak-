import { MessageSquare } from "lucide-react";

function NoConversationPlaceholder() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 bg-linear-to-br from-slate-900 to-slate-800">
      <MessageSquare size={64} className="opacity-50 mb-4" />
      <h3 className="text-2xl font-bold text-white mb-2">Start a Conversation</h3>
      <p className="text-center max-w-md text-slate-400">Select a contact from your list or start a new chat to begin messaging</p>
    </div>
  );
}

export default NoConversationPlaceholder;
