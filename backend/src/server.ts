import { createServer } from "node:http";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { Server } from "socket.io";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;
const io = new Server();
connectDB();

//Middleware
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/auth", authRoute);
app.use("/api/users",userRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Api is running...");
});

io.on("connection", (socket) => {
  console.log("a user is connected");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
