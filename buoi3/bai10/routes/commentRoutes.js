import { Router } from "express";
import {
  createComment,
  getCommentsByPost,
} from "../controllers/commentController.js";
import { authenticate } from "../middlewares/auth.js";

const router = Router();

router.post("/", authenticate, createComment);
router.get("/post/:postId", getCommentsByPost);

export default router;
