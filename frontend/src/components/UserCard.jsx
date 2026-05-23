import { MessageCircle } from "lucide-react";

function UserCard({ user, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 text-left border-b border-slate-700 transition flex items-center gap-3 ${
        isSelected
          ? "bg-slate-700 border-l-4 border-l-pink-500"
          : "hover:bg-slate-700 hover:bg-opacity-50"
      }`}
    >
      <div className="relative">
        <img
          src={user.profilePic || "/avatar-placeholder.png"}
          alt={user.fullName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-slate-800" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium truncate">{user.fullName}</p>
        <p className="text-xs text-slate-400">Online</p>
      </div>
      <MessageCircle size={16} className="text-slate-500" />
    </button>
  );
}

export default UserCard;
