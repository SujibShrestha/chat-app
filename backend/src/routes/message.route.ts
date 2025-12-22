import express, { Router } from "express";
import verify from "../middlewares/auth.middleware.js";
import { sendMessage, fetchMessage } from "../controllers/messageController.js";

const router: Router = express.Router();

router.post("/", verify, sendMessage);
router.get("/:chatId", verify, fetchMessage);

export default router;
