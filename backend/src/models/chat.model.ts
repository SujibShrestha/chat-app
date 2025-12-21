  import mongoose, { Schema } from "mongoose";
import type { IUser } from "./user.model.js";

export interface IChat {
  chatName: string;
  isGroupChat: boolean;
  users: IUser[];
  latestMessage?: string;
}

const chatSchema = new Schema({
  chatName: { type: String, trim: true },
  isGroupChat: { type: Boolean, default: false },
  users: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ],
  latestMessage: { type: String },
},{
  timestamps:true
});

export const Chat = mongoose.model<IChat>("Chat", chatSchema);
