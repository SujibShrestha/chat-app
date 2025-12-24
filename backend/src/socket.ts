import { Server } from "socket.io";
import http from "http";

let io: Server;

const setupSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join-chat", (chatId: string) => {
      socket.join(chatId);
      console.log("Joined chat:", chatId);
    });

    socket.on("new-message", (message) => {
      const chatId = message.chat._id || message.chat;

      console.log("Emitting to chat:", chatId);

      socket.to(chatId).emit("message-received", message);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

export { setupSocket, io };
