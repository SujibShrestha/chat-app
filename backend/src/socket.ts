import { Server } from "socket.io";
import http from "http";
import type { IUser } from "./models/user.model.js";

const setupSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("setup", (userId: string) => {
      socket.join(userId);
      socket.emit("connected");
    });

    socket.on("join chat", (chatId: string) => {
      socket.join(chatId);
    });

    socket.on("new message", (message) => {
      const chat = message.chat;

      if (!chat.users) return;
      chat.user.foreach((user: IUser) => {
        if (user._id === message.sender._id) return;

        socket.to(user._id.toString()).emit("message received", message);
      });
    });
  });
};

export default setupSocket;
