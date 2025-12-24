import {  useState } from "react";
import MessageBubble from "./MessageBubble";
import type { IChat } from "@/types";
import ChatList from "./Chatlist";


const Chatpage = () => {
  const [selectedChat, newSelectedChat] = useState<IChat | null>(null);
 
  return (
    <div className="flex flex-col w-full min-h-[80vh] overflow-hidden text-black    ">
     
      <section className=" overflow-hidden flex">
       
          <ChatList onselectChat={newSelectedChat} />
          <MessageBubble chat={selectedChat} />
        
      </section>
    </div>
  );
};

export default Chatpage;
