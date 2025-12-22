import mongoose, { Schema } from "mongoose";
import type { IChat } from "./chat.model.js";
import type { IUser } from "./user.model.js";

interface IMessage {
  sender: IUser | mongoose.Types.ObjectId;
  content: string;
  chat: IChat | mongoose.Types.ObjectId ;
}

const messageSchema = new Schema<IMessage>(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String, required: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true },
  },
  {
    timestamps: true,
  }
);

export const Message = mongoose.model<IMessage>("Message", messageSchema);
