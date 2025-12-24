import { LogOut } from "lucide-react";
import Chatpage from "../components/Chat/Chatpage";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"

const Chat = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/auth");
  };

  return (
    <div className="min-h-screen">
     <nav className="h-[10vh] bg-[#0E4749] w-full flex items-center justify-between px-6 shadow-md">
  <div className="flex items-center gap-3">
    <img
      src={logo}
      className="w-11 h-11 rounded-full border border-white/40 shadow"
      alt="Logo"
    />
    <h1 className="font-bold text-2xl text-white tracking-wide select-none">
      Teleapp
    </h1>
  </div>

  <Button
    className="flex items-center gap-2 bg-white text-[#0E4749] hover:bg-gray-200 transition rounded-xl px-4 py-2 shadow"
    onClick={logout}
  >
    <LogOut className="w-4 h-4" />
    Log out
  </Button>
</nav>


      <div className="flex items-center ">
        <Chatpage />
      </div>
    </div>
  );
};

export default Chat;
