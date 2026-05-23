import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "../components/ChatHeader";
import MessageInput from "../components/MessageInput";
import MessageList from "../components/MessageList";
import Sidebar from "../components/Sidebar";

function ChatPage() {
  const { selectedUser, getAllContacts, messages, getMessagesByUserId } = useChatStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessagesByUserId(selectedUser._id);
    }
  }, [selectedUser, getMessagesByUserId]);

  return (
    <div className="h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Chat Area */}
      <div className="flex-1 flex flex-col border-l border-slate-700">
        {selectedUser ? (
          <>
            <ChatHeader />
            <MessageList messages={messages} />
            <MessageInput />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400">
            <div className="text-center">
              <p className="text-xl">Select a user to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatPage;
