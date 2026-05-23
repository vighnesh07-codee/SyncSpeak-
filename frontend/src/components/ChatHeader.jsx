import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useAuthStore();

  if (!selectedUser) return null;

  return (
    <div className="border-b border-slate-700 p-4 flex items-center justify-between bg-slate-800 bg-opacity-50">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={selectedUser.profilePic || "/avatar-placeholder.png"}
            alt={selectedUser.fullName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800" />
        </div>
        <div>
          <h2 className="text-white font-semibold">{selectedUser.fullName}</h2>
          <p className="text-xs text-slate-400">Online</p>
        </div>
      </div>
      <button
        onClick={() => setSelectedUser(null)}
        className="text-slate-400 hover:text-white transition"
      >
        <X size={20} />
      </button>
    </div>
  );
}

export default ChatHeader;
