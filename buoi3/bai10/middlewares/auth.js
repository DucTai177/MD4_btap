import { AppError } from "../utils/AppError.js";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(new AppError("Chưa đăng nhập", 401));
  }

  const role = authHeader.trim().toLowerCase();
  req.user = {
    id: 1,
    role: role === "admin" ? "admin" : "user",
  };

  next();
};

export const authorize = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      return next(new AppError("Không đủ quyền truy cập", 403));
    }
    next();
  };
};
