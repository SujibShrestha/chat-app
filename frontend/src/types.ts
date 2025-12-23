export interface IUser {
    _id: string;
    name: string;
  email: string;
  token: string;
}

export interface IChat {
  _id: string;
  chatName?: string;
  isGroupChat: boolean;
  users: IUser[];
  latestMessage?: string;
}

export interface IMessage {
  sender: IUser;
  content: string;
  chat: IChat;
  createdAt: string;
  updatedAt: string;
}
