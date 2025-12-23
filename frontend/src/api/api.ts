import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_PORT}/api`,
});

console.log(`${import.meta.env.VITE_API_PORT}/api`);

const registerUser = (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return API.post("/auth/register", data);
};

const LoginUser = (data: { email: string; password: string }) => {
  return API.post("/auth/login", data);
};

const fetchChat = (token: string) => {
  return API.get("/chat", { headers: { Authorization: `Bearer ${token}` } });
};

const sendMessage = (
  token: string,
  message: { content: string; chatId: string }
) => {
  return API.post("/message", message, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const createChat = (token: string, userId: string) => {
  return API.post(
    "/chat",
    {  userId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const fetchMessages = (token: string, chatId: string) => {
  return API.get(`/message/${chatId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export { registerUser, LoginUser, fetchChat, sendMessage, createChat };
