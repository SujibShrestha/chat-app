  import mongoose, { Schema } from "mongoose";
import type { Document, Types } from "mongoose";

export interface IChat extends Document{
  chatName: string;
  isGroupChat: boolean;
  users: Types.ObjectId[];
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
