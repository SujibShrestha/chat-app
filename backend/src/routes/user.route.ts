import express, { Router } from "express";
import verify from "../middlewares/auth.middleware.js";

const router: Router = express.Router();

router.get("/profile", verify, (req, res) => {
  res.json({
    message: "Protected route accesssed",
    user: (req as any).user,
  });
});

export default router;
