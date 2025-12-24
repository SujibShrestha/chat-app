import { Message } from "../models/message.model.js";
import { Chat } from "../models/chat.model.js";
import type { Request, Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware.js";
import mongoose from "mongoose";
import {io} from "../socket.js";

const sendMessage = async(req:AuthRequest,res:Response)=>{
    const {content,chatId} = req.body 

    if (!content || !chatId) {
    return res.status(400).json({ message: "Invalid data" });
  }
    if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const message = await Message.create({
    sender:req.user._id,
    content:content,
    chat:chatId
})

     await Chat.findByIdAndUpdate(chatId,{
        latestMessage:content
     })

     const fullMessage = await Message.findById(message._id)
     .populate("sender","name email")
     .populate("chat");
 io.to(chatId.toString()).emit("message-received", fullMessage);

     return res.status(200).json(fullMessage)
}


const fetchMessage = async(req:AuthRequest,res:Response)=>{
    const messages = await Message.find({
        chat:new mongoose.Types.ObjectId(req.params.chatId),
    }) .populate("sender", "name email")
    .populate("chat");


    return   res.json(messages);
}

export {sendMessage,fetchMessage}