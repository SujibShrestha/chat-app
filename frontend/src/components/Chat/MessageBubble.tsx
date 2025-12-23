import { sendMessage, fetchChat } from "../../api/api";
import { AuthContext } from "../../context/AuthContext";
import type { IMessage, IChat } from "@/types";
import { useState, useEffect, useContext, useRef } from "react";

const MessageBubble = ({ chat }: { chat: IChat | null }) => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load messages when chat or user changes
  useEffect(() => {
    if (!user || !chat?._id) return;

    const loadMessages = async () => {
      setLoading(true);
      try {
        const res = await fetchChat( user.token); // Pass chatId
        setMessages(res.data ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [chat, user]);

  // Send a new message
  const handleSend = async () => {
    if (!newMessage.trim() || !user || !chat?._id) return;

    try {
      const res = await sendMessage(user.token, {
        content: newMessage,
        chatId: chat._id,
      });

      if (res?.data) {
        setMessages((prev) => [...prev, res.data]);
        setNewMessage("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!chat) {
    return (
      <div className="flex items-center justify-center text-gray-500 h-full ml-[20vw]">
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <section className="ml-[20vw] flex flex-col h-[calc(100vh-2rem)] p-4">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto mb-4">
        {loading && <p className="text-sm text-gray-400">Loading...</p>}
        {messages.map((msg: IMessage,index) => (
          <div
            key={index}
            className={`flex mb-2 ${
              msg.sender?._id === user?._id ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-xl ${
                msg.sender?._id === user?._id
                  ? "bg-indigo-500 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-900 rounded-bl-none"
              }`}
            >
              <div className="text-sm font-semibold mb-1">
                {msg.sender?.name ?? "Unknown"}
              </div>
              <div className="text-sm">{msg.content}</div>
              <div className="text-xs text-gray-400 mt-1 text-right">
                {msg.updatedAt
                  ? new Date(msg.updatedAt).toLocaleTimeString()
                  : ""}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-xl font-semibold transition"
        >
          Send
        </button>
      </div>
    </section>
  );
};

export default MessageBubble;
