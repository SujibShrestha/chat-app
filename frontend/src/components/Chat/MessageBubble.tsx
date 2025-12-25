import { sendMessage, fetchMessages } from "../../api/api";
import { AuthContext } from "../../context/AuthContext";
import type { IMessage, IChat } from "@/types";
import { useState, useEffect, useContext, useRef } from "react";
import { Spinner } from "../ui/spinner";
import socket from "../../socket";

const MessageBubble = ({ chat }: { chat: IChat | null }) => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState<string>("");

  // Ref to scroll to bottom
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load messages when chat changes
  useEffect(() => {
    if (!user || !chat) return;

    const loadMessages = async () => {
      setLoading(true);
      try {
        const res = await fetchMessages(user.token, chat._id);
        setMessages(res.data);
      } finally {
        setLoading(false);
        // scroll to bottom after messages load
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    };

    loadMessages();
  }, [chat, user]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!chat) return;

    socket.emit("join-chat", chat._id);

    const handleMessageReceived = (newMsg: IMessage) => {
      if (newMsg.chat._id === chat._id) {
        setMessages((prev) => [...prev, newMsg]);
      }
    };
    socket.on("message-received", handleMessageReceived);
    return () => {
      socket.off("message-received", handleMessageReceived);
    };
  }, [chat]);

  const handleSend = async () => {
    if (!newMessage.trim() || !user || !chat) return;

    const res = await sendMessage(user.token, {
      content: newMessage,
      chatId: chat._id,
    });
    socket.emit("new-message", res.data);
    
    setNewMessage("");
  };
  if (!chat) {
    return (
      <div className="flex items-center  justify-center w-full min-h-[90vh] text-gray-500 h-full">
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <section className=" w-full  min-h-[85vh] bg-white m-3 flex flex-col rounded-lg">
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto w-full">
        {loading && (
          <div className="flex justify-center items-center h-full">
            <Spinner className="w-7 h-7" />
          </div>
        )}
     <div className="w-full flex justify-center font-mono mb-8 gradient  text-white font-semibold text-2xl p-5 rounded-xl shadow-lg tracking-wide">
  {messages[0]?.sender.name}
</div>

<div className="mx-8 max-sm:mx-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat ${
              msg.sender?._id === user?._id ? "chat-end" : "chat-start"
            }`}
          >
<div
              className={`chat-bubble ${
                msg.sender?._id === user?._id
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
            <div className="chat-header font-semibold flex justify-between gap-2">
              {msg.sender.name}
              
            </div>
            
              {msg.content}
              <div className="flex  justify-end"><time className=" chat-header opacity-50">
                {new Date(msg.updatedAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time></div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
     <div className="flex mx-9 mb-3 justify-center items-center gap-3 mt-5">
  <input
    type="text"
    placeholder="Type a message..."
    className="w-full p-3 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-900 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
    value={newMessage}
    onChange={(e) => setNewMessage(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && handleSend()}
  />

  <button
    onClick={handleSend}
    className="px-5 py-3 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-600 active:scale-95 shadow-md transition"
  >
    Send
  </button>
</div>

    </section>
  );
};

export default MessageBubble;
