import { ArrowLeft, Settings } from "lucide-react";

function ProfileHeader({ user, onBack, onSettings }) {
  return (
    <div className="bg-slate-800 border-b border-slate-700 p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="text-slate-400 hover:text-white transition"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-3">
          <img
            src={user?.profilePic || "/avatar-placeholder.png"}
            alt={user?.fullName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h2 className="text-white font-semibold">{user?.fullName}</h2>
            <p className="text-sm text-slate-400">Profile</p>
          </div>
        </div>
      </div>
      <button
        onClick={onSettings}
        className="text-slate-400 hover:text-white transition"
      >
        <Settings size={24} />
      </button>
    </div>
  );
}

export default ProfileHeader;
