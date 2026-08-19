require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json()); // Middleware để parse JSON body

// Dữ liệu mock (giả lập database)
const mockUser = {
  id: "user_101",
  email: "admin@gmail.com",
  password: "password123", // Trong thực tế, password phải được mã hóa (bcrypt)
  role: "admin",
};

// Khai báo endpoint: POST /api/auth/login
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  // 1. Kiểm tra email và mật khẩu
  if (email !== mockUser.email || password !== mockUser.password) {
    return res.status(401).json({
      status: 401,
      message: "Email hoặc mật khẩu không chính xác",
    });
  }

  // 2. Tạo Payload (Tuyệt đối không đưa password vào payload)
  const payload = {
    userId: mockUser.id,
    role: mockUser.role,
  };

  // 3. Khởi tạo Access Token (tuổi thọ ngắn)
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
  });

  // 4. Khởi tạo Refresh Token (tuổi thọ dài)
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  });

  // 5. Trả về kết quả
  return res.status(200).json({
    status: 200,
    message: "Login successful",
    data: {
      accessToken: `Bearer ${accessToken}`,
      refreshToken: `Bearer ${refreshToken}`,
    },
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
