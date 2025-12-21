const MessageInput = () => {
  return (
    <div className="flex justify-center items-center gap-2">
      <input type="text" placeholder="Type a message..." className="w-[100vh] p-2 border bordergray\
       outline-none rounded-lg" />
      <button className="bg-green-500 px-4 py-2 rounded-lg">Send</button>
    </div>
  );
};

export default MessageInput;
