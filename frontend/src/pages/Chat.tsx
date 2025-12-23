
import Chatpage from '../components/Chat/Chatpage'

const Chat = () => {
  return (
      <div className='m-0 p-0 min-h-screen'>
    <nav className='h-10vh text-black bg-gray-300 w-full flex items-center p-5 justify-between '>
      <h1>Tele app</h1>
      <div>Profile</div>
    </nav>

    <div className='flex items-center '>
      
      <Chatpage/>
    </div>
    </div>
  )
}

export default Chat