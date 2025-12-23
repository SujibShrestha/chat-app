import { useState } from "react";
import MessageBubble from "./MessageBubble";
import type { IChat } from "@/types";
import ChatList from "./Chatlist";

const Chatpage = () => {
  const [selectedChat, newSelectedChat] = useState<IChat | null>(null);
  return (
    <div className="flex flex-col w-full min-h-[90vh]  text-black    ">
      <nav className="w-full h-[10vh] bg-gray-100 p-3 ">Account details</nav>
      <section className="h-[80vh]">
        <div className="h-[70vh] w-full flex">
          <ChatList onselectChat={newSelectedChat} />
          <MessageBubble chat={selectedChat} />
        </div>
      </section>
    </div>
  );
};

export default Chatpage;
