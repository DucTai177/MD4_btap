import { Router } from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  deletePost,
} from "../controllers/postController.js";
import { authenticate, authorize } from "../middlewares/auth.js";
import { uploadThumbnail } from "../middlewares/upload.js";
import { AppError } from "../utils/AppError.js";
import multer from "multer";

const router = Router();

const handleUploadMiddleware = (req, res, next) => {
  uploadThumbnail(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return next(
          new AppError("File vượt quá dung lượng cho phép (2MB)", 400),
        );
      }
      return next(new AppError(err.message, 400));
    } else if (err) {
      return next(err);
    }
    next();
  });
};

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", handleUploadMiddleware, createPost);
router.delete("/:id", authenticate, authorize("admin"), deletePost);

export default router;
