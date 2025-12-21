import io from 'socket.io-client'

const socket =  io(import.meta.env.PORT);
  
export default socket