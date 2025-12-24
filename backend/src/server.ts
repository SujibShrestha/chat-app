
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import {setupSocket} from "./socket.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js"
import chatRoute from "./routes/chat.route.js"
import http from "http";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;
connectDB();
const server = http.createServer(app)

//Middleware
app.use(express.json());
app.use(cors());
setupSocket(server)

//Routes
app.use("/api/auth", authRoute);
app.use("/api/users",userRoute);
app.use("/api/chat",chatRoute);
app.use("/api/message",messageRoute);


app.get("/", (req: Request, res: Response) => {
  res.send("Api is running...");
});


server.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
