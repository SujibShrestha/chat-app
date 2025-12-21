const Sidebar = () => {
  return (
    <aside className="min-h-[90vh] w-[20vw] bg-amber-50 border-r border-amber-200 flex flex-col">
      
      {/* Header */}
      <div className="px-5 py-4 border-b border-amber-200">
        <h3 className="text-2xl font-extrabold text-gray-800">Chats</h3>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-2">
        
        {/* Chat Item */}
        <div className="flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-amber-100 transition">
          
  

          {/* Text */}
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-gray-800">Name</h4>
              <span className="text-xs text-gray-500">2:45 PM</span>
            </div>
            <p className="text-sm text-gray-600 truncate">
              Last message preview goes here...
            </p>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-amber-200 mx-2" />

      </div>
    </aside>
  );
};

export default Sidebar;
