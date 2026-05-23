import { Users } from "lucide-react";

function ContactList({ contacts, isLoading, onSelectContact }) {
  if (isLoading) {
    return (
      <div className="flex-1 overflow-y-auto space-y-2 p-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 bg-slate-700 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (!contacts || contacts.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
        <Users size={48} className="opacity-50 mb-2" />
        <p>No contacts available</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {contacts.map((contact) => (
        <button
          key={contact._id}
          onClick={() => onSelectContact(contact)}
          className="w-full p-4 text-left border-b border-slate-700 transition hover:bg-slate-700 hover:bg-opacity-50"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={contact.profilePic || "/avatar-placeholder.png"}
                alt={contact.fullName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">{contact.fullName}</p>
              <p className="text-sm text-slate-400">Online</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

export default ContactList;
