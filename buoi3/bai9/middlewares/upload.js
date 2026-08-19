import multer from "multer";
import path from "node:path";
import fs from "node:fs";
import { AppError } from "../utils/AppError.js";

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const cleanOriginalName = path
      .basename(file.originalname)
      .replace(/\s+/g, "-");
    cb(null, `${Date.now()}-${cleanOriginalName}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new AppError("Chỉ chấp nhận file ảnh", 400), false);
  }
};

export const uploadAvatar = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter,
}).single("avatar");
