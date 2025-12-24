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
  const [sidebar,setSidebar] = useState(true)


  const handleSidebar= ()=>{
    setSidebar(!sidebar)
  }

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

    
<aside
  className={`min-h-[85vh] max-sm:mt-25 mt-3 z-10  rounded-lg  p-4
    bg-white font-mono
    transition-all duration-300
    ${sidebar ? "w-70 md:w-70" : "w-16 md:w-15 max-sm:bg-transparent "} 
    fixed md:relative top-0 left-0`}
>
  {/* Header with toggle */}
  <div className="flex justify-between items-center mb-4">
  {sidebar?(  <p className="font-bold text-2xl font-mono">Chats</p>):""}
    <label className="btn btn-circle swap swap-rotate w-8 h-8">
      <input type="checkbox" onClick={handleSidebar} />

      {/* hamburger icon */}
      <svg
        className="swap-on fill-current w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
      </svg>

      {/* close icon */}
      <svg
        className="swap-off fill-current w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
      </svg>
    </label>
  </div>

  {/* Sidebar content */}
  {loading ? (
    <div className="flex justify-center items-center h-full">
      <Spinner className="w-7 h-7" />
    </div>
  ) : (
    <div className={`space-y-4 ${!sidebar ? "hidden" : ""}`}>
      {/* Search and New Chat */}
      <div className="flex gap-2 w-full">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter user ID"
          className="flex-1 min-w-0 border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleCreateChat}
          className="bg-green-500 hover:bg-green-700 text-white py-2 px-3 rounded-lg transition-colors "
        >
          New
        </button>
      </div>

      {/* Chat List */}
      <div className="flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-200px)]">
        {chats.map((chat) => (
          <div
            key={chat._id}
            onClick={() => onselectChat(chat)}
            className="cursor-pointer p-3 rounded-lg hover:bg-gray-200 transition-colors truncate"
          >
            {sidebar ? (!chat.isGroupChat ? chat.chatName : "Direct Chat") : (
              <span className="text-xs text-black truncate">
                {chat.isGroupChat ? chat.chatName : "D"}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )}
</aside>

  );
};

export default ChatList;
