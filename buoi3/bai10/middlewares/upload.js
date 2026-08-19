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
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError("Chỉ chấp nhận file ảnh JPEG/PNG/WEBP", 400), false);
  }
};

export const uploadThumbnail = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter,
}).single("thumbnail");
