import axios from "axios";

const API = axios.create({
  baseURL: ` ${import.meta.env.PORT}/api`,
});

const registerUser = (data: {
  name: string;
  email: string;
  password: string;
}) => {
  API.post("/auth/register", data);
};

const LoginUser = (data: { email: string; password: string }) => {
  API.post("/auth/login", data);
};

const fetchChat = (token: string) => {
 return API.get("/chat", { headers: { Authorization: `Bearer ${token}` } });
};

const sendMessage = (
  token: string,
  message: { content: string; chatId: string }
) => {
  API.post("/message", message, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export { registerUser, LoginUser, fetchChat, sendMessage };
