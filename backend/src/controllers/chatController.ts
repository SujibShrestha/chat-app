import type { Request, Response } from "express";
import { Chat } from "../models/chat.model.js";
import { User } from "../models/user.model.js";
import type { AuthRequest } from "../middlewares/auth.middleware.js";

const accessChat = async (req: AuthRequest, res: Response) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User Id is required" });
  }
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  let chat = await Chat.findOne({
    isGroupChat: false,
    users: { $all: [req.user._id, userId] },
  }).populate("users");

  if (chat) {
    return res.json(chat);
  }
 const recipient = await User.findById(userId)
 if(!recipient) return;
  const newChat = await Chat.create({
    chatName: recipient.name,
    isGroupChat: false,
    users: [req.user._id, userId],
  });

  const fullChat = await Chat.findById(newChat._id).populate("users");
  res.status(201).json(fullChat);
};

const fetchChat = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const chats = await Chat.find({
    users: { $elemMatch: { $eq: req.user._id } },
  })
    .populate("users")
    .sort({ updatedAt: -1 });

  return res.json(chats);
};

export { fetchChat, accessChat };
