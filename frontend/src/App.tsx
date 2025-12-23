
import { useEffect, useRef } from 'react'
import './App.css'
import socket from './socket';
import { Socket } from 'socket.io-client';

import Chat from './pages/Chat';
import { Login } from './components/Auth/Login';
import Auth from './components/Auth/Auth';
function App() {
const clientSocket = useRef<Socket | null>(null);
  useEffect(()=>{
   clientSocket.current = socket;
   socket.connect();
  },[])

  return (
   <div>
    <Auth/>
    {/* <Chat/> */}
   </div>
     
  )
}

export default App
