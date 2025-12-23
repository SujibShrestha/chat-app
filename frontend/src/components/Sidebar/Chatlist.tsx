 import { useEffect,useState,useContext } from "react";
 import { fetchChat } from "../../api/api";
 import { AuthContext } from "../../context/AuthContext";
import type { IChat } from "../../types";
import type { AxiosResponse } from "axios";

 const ChatList = ({selectChat}:{selectChat:(chat:IChat)=>void})=>{
    
    const {user} = useContext(AuthContext);
    const [chats,setChats]= useState<IChat[]>([]);

    useEffect(()=>{
        if(!user) return;
        fetchChat(user.token).then((res:AxiosResponse)=>setChats(res.data))
    },[])
    
    return (
<div>

</div>
    )
 }