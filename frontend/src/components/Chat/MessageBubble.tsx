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

 const handleMessageReceived = (newMsg:IMessage) => {
    if (newMsg.chat._id === chat._id) {
      setMessages((prev) => [...prev, newMsg]);
    }
  };
socket.on("message-received", handleMessageReceived);
  return () => {
    socket.off("message-received",handleMessageReceived);
  };
}, [chat]);

  const handleSend = async () => {
    if (!newMessage.trim() || !user || !chat) return;

    const res = await sendMessage(user.token, {
      content: newMessage,
      chatId: chat._id,
    });
 socket.emit("new-message", res.data);
    setMessages((prev) => [...prev, res.data]);
    setNewMessage("");
  };

  if (!chat) {
    return (
      <div className="flex items-center justify-center w-[80vw] text-gray-500 h-full">
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <section className="my-4 p-4 w-full h-full flex flex-col">
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto w-full">
        {loading && (
          <div className="flex justify-center items-center h-full">
            <Spinner className="w-7 h-7" />
          </div>
        )}

        {messages.map((msg,index) => (
          <div
            key={index}
            className={`chat ${
              msg.sender?._id === user?._id ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-header flex justify-between gap-2">
              {msg.sender?.name}
              <time className="text-xs opacity-50">
                {new Date(msg.updatedAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>
            </div>
            <div
              className={`chat-bubble ${
                msg.sender?._id === user?._id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex justify-center items-center gap-2 mt-5">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full p-2 border border-gray-500 outline-none rounded-lg"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-green-500 hover:bg-green-800 cursor-pointer px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </section>
  );
};

export default MessageBubble;
