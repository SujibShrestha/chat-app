import { LogOut } from "lucide-react";
import Chatpage from "../components/Chat/Chatpage";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/auth");
  };

  return (
    <div className="m-0 p-0 min-h-screen">
      <nav className="h-10vh text-black bg-gray-300 w-full flex items-center p-5 justify-between ">
        <h1>Tele app</h1>
        <div>
          <Button className="cursor-pointer" onClick={logout}>
            <LogOut />
            Log out
          </Button>
        </div>
      </nav>

      <div className="flex items-center ">
        <Chatpage />
      </div>
    </div>
  );
};

export default Chat;
