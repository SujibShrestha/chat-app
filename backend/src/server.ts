import express, { type Application, type Request, type Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 4400;

//Middleware
app.use(express.json());
app.use(cors());

app.get("/", (req:Request, res:Response) => {
  res.send("Api is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
