export interface IUser {
  name: string;
  email: string;
  token: string;
}

export interface IChat {
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
