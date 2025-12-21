import MessageBubble from "./MessageBubble"
import MessageInput from "./MessageInput"

const Chatpage = () => {
  return (
   <div className="flex flex-col w-[80vw] min-h-[90vh] bg-amber-50 text-black p-5  ">
   <nav className="w-full h-10vh bg-gray-100 p-3 ">
    Account details
   </nav>
   <section>
    <div  className="h-[70vh]">
      <MessageBubble/>
    </div>
    <div>
      <MessageInput/>
    </div>
   </section>
   </div>
  )
}

export default Chatpage