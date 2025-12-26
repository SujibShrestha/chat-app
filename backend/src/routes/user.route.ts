import express, { Router } from "express";
import verify from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { uploadAvatar } from "../controllers/userController.js";

const router: Router = express.Router();

router.get("/profile", verify, (req, res) => {
  res.json({
    message: "Protected route accesssed",
    user: (req as any).user,
  });
});

router.patch("/avatar",verify,upload.single("avatar"),uploadAvatar)

export default router;
