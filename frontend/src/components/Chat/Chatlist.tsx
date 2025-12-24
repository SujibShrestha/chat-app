import { useEffect, useState, useContext } from "react";
import { createChat, fetchChat } from "../../api/api";
import { AuthContext } from "../../context/AuthContext";
import type { IChat } from "../../types";
import type { AxiosResponse } from "axios";
import { useDebounce } from "use-debounce";

import { Spinner } from "../ui/spinner";

const ChatList = ({
  onselectChat,
}: {
  onselectChat: (chat: IChat) => void;
}) => {
  const { user } = useContext(AuthContext);
  const [chats, setChats] = useState<IChat[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [debouncevalue] = useDebounce(search, 8000);
  useEffect(() => {
    if (!user) return;
   const loadChats = async () => {
      setLoading(true);
      try {
        const res: AxiosResponse = await fetchChat(user.token);
        setChats(res.data);
      } catch (err) {
        console.error("Failed to fetch chats:", err);
      } finally {
        setLoading(false);
      }
    };

    loadChats();
  }, [user]);

  const handleCreateChat = async () => {
    if (!debouncevalue || !user) return;

    const res = await createChat(user.token, debouncevalue);
    setChats((prev) => [res.data, ...prev]);
    onselectChat(res.data);
    setSearch("");
  };

  return (

    

    <aside className="w-[20vw] min-h-[80%] border-r p-4 space-y-2">
     { loading?(<div className="flex justify-center h-full items-center"><Spinner className="w-7 h-7"/></div>):( <div>
      <div className="flex gap-1 flex-nowrap mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter user ID"
          className=""
        />
        <button
          onClick={handleCreateChat}
          className="bg-green-500 hover:bg-green-800 py-2 px-3 rounded-lg"
        >
          New
        </button>
      </div>
      {chats.map((chat) => (
        <div
          key={chat._id}
          onClick={() => onselectChat(chat)}
          className="cursor-pointer p-3 rounded-lg hover:bg-gray-200"
        >
          {chat.isGroupChat ? chat.chatName : "Direct Chat"}
        </div>
      ))}
   </div> )}
    </aside>
  
  );
};

export default ChatList;
