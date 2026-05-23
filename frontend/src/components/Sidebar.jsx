import { MessageCircle, LogOut, Search } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

function Sidebar() {
  const { users, selectedUser, setSelectedUser, logout, authUser } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-64 bg-slate-800 border-r border-slate-700 h-screen flex flex-col">
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="text-pink-500" size={24} />
          <h1 className="text-white font-bold text-xl">Sync Speak</h1>
        </div>
        <div className="text-sm text-slate-400">
          Welcome, <span className="text-white font-semibold">{authUser?.fullName}</span>
        </div>
      </div>

      <div className="p-4 border-b border-slate-700">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-pink-500 transition"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredUsers.length === 0 ? (
          <div className="p-4 text-center text-slate-400">
            <p>No users found</p>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-4 text-left border-b border-slate-700 transition ${
                selectedUser?._id === user._id
                  ? "bg-slate-700 border-l-4 border-l-pink-500"
                  : "hover:bg-slate-700 hover:bg-opacity-50"
              }`}
            >
              <div className="flex items-center gap-3">
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
                  <p className="text-xs text-slate-400 truncate">Online</p>
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
