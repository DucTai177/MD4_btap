import express from "express";
import { AppError } from "./utils/AppError.js";

const app = express();
const PORT = 3000;

app.use(express.json());

const users = [
  { id: 1, name: "Nguyen Van A", email: "vana@example.com" },
  { id: 2, name: "Tran Thi B", email: "thib@example.com" },
];

app.get("/users/secret", (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(new AppError("Chưa xác thực", 401));
  }
  return res.status(200).json({
    success: true,
    data: { secret: "Dữ liệu bí mật đã được xác thực" },
  });
});

app.get("/users/:id", (req, res, next) => {
  const userId = Number(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return next(new AppError("Không tìm thấy user", 404));
  }

  return res.status(200).json({
    success: true,
    data: user,
  });
});

app.post("/users", (req, res, next) => {
  const { name, email } = req.body;

  if (!email) {
    return next(new AppError("Thiếu trường email", 400));
  }

  const newUser = {
    id: users.length + 1,
    name: name || "Anonymous",
    email,
  };
  users.push(newUser);

  return res.status(201).json({
    success: true,
    data: newUser,
  });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    message: err.message || "Lỗi hệ thống",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
