import express, { Router } from "express";
import verify from "../middlewares/auth.middleware.js";
import { fetchChat, accessChat } from "../controllers/chatController.js";

const router: Router = express.Router();

router.post("/", verify, accessChat);
router.get("/", verify, fetchChat);

export default router;
