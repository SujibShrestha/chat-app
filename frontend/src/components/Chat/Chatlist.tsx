import { useEffect, useState, useContext } from "react";
import { createChat, fetchChat } from "../../api/api";
import { AuthContext } from "../../context/AuthContext";
import type { IChat } from "../../types";
import type { AxiosResponse } from "axios";

const ChatList = ({
  onselectChat,
}: {
  onselectChat: (chat: IChat) => void;
}) => {
  const { user } = useContext(AuthContext);
  const [chats, setChats] = useState<IChat[]>([]);
  const [search,setSearch] = useState("");

  useEffect(() => {
    if (!user) return;
    fetchChat(user.token).then((res: AxiosResponse) => setChats(res.data));

    

  }, [user]);

  const handleCreateChat =  async()=>{
    if(!search || !user) return;
    const timer =  setTimeout(async()=>{
    const res = await createChat(user.token,search);
    setChats((prev)=>[res.data,...prev]);
    onselectChat(res.data);
    setSearch("")
  },1000)
return () => clearTimeout(timer);
}

  return (
    <aside className="w-[20vw] border-r p-4 space-y-2">
         <div className="flex gap-1 flex-nowrap mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter user ID"
          className=""
        />
        <button onClick={handleCreateChat} className="bg-green-500 hover:bg-green-800 py-2 px-3 rounded-lg">
          New
        </button>
      </div>
      {chats.map((chat) => (
        <div
          key={chat._id}
          onClick={() => onselectChat(chat)}
          className="cursor-pointer p-3 rounded-lg hover:bg-gray-200"
        >
          {
         
          chat.isGroupChat ? chat.chatName : "Direct Chat"}
        </div>
      ))}
    </aside>
  );
};

export default ChatList;
