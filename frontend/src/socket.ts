import io from 'socket.io-client'

const socket =  io(import.meta.env.PORT,{autoConnect:false});
  
export default socket