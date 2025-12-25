import type { Request, Response } from "express";
import { Chat } from "../models/chat.model.js";
import { User } from "../models/user.model.js";
import type { AuthRequest } from "../middlewares/auth.middleware.js";

const accessChat = async (req: AuthRequest, res: Response) => {
  const { name } = req.body;

  // Validate input
  if (!name) {
    return res.status(400).json({ message: "User name is required" });
  }

  // Validate authentication
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }


    // Find the recipient by name
    const recipient = await User.findOne({ name });
  
    if (!recipient) {
      return res.status(404).json({ message: "User not found" });
    }
 console.log(recipient)
    // Prevent chatting with self
    if (recipient._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "You cannot chat with yourself" });
    }

    // Check if chat already exists
    let chat = await Chat.findOne({
      isGroupChat: false,
      users: { $all: [req.user._id, recipient._id] },
    }).populate("users");

    if (chat) {
      return res.json(chat);
    }

    // Otherwise create chat
    const newChat = await Chat.create({
      chatName: recipient.name,
      isGroupChat: false,
      users: [req.user._id, recipient._id],
    });

    const fullChat = await Chat.findById(newChat._id).populate("users");

    return res.status(201).json(fullChat);
 
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
