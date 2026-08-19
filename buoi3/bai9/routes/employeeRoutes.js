import { Router } from "express";
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployeeAvatar,
} from "../controllers/employeeController.js";
import { uploadAvatar } from "../middlewares/upload.js";
import { AppError } from "../utils/AppError.js";
import multer from "multer";

const router = Router();

const handleUploadMiddleware = (req, res, next) => {
  uploadAvatar(req, res, (err) => {
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

router.get("/", getEmployees);
router.post("/", createEmployee);
router.get("/:id", getEmployeeById);
router.post("/:id/avatar", handleUploadMiddleware, updateEmployeeAvatar);

export default router;
