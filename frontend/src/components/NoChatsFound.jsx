import { Search } from "lucide-react";

function NoChatsFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
      <Search size={64} className="opacity-50 mb-4" />
      <h3 className="text-xl font-semibold text-white mb-2">No Chats Found</h3>
      <p className="text-center max-w-xs">No chats match your search. Try a different search term</p>
    </div>
  );
}

export default NoChatsFound;
