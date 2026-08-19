import express from "express";
import multer from "multer";
import path from "node:path";
import fs from "node:fs";

const app = express();
const PORT = 3000;

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
    cb(new Error("INVALID_FILE_TYPE"), false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter,
}).single("avatar");

app.post("/upload/avatar", (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          message: "File vượt quá dung lượng cho phép (2MB)",
        });
      }
      return res.status(400).json({
        message: err.message,
      });
    } else if (err) {
      if (err.message === "INVALID_FILE_TYPE") {
        return res.status(400).json({
          message: "Chỉ chấp nhận file ảnh JPEG/PNG/WEBP",
        });
      }
      return res.status(400).json({
        message: err.message,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Vui lòng chọn file avatar để upload",
      });
    }

    return res.status(200).json({
      message: "Upload thành công",
      filename: req.file.filename,
      size: req.file.size,
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
