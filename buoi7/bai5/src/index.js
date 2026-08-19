require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Giả lập Database lưu trữ Refresh Token hợp lệ
let refreshTokensDB = [];

// 1. API Đăng nhập (Lưu Refresh Token vào DB khi login thành công)
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;

  // Mock xác thực đơn giản
  if (username !== "admin" || password !== "123456") {
    return res.status(401).json({
      status: 401,
      message: "Invalid credentials",
    });
  }

  const payload = { userId: "user_101", role: "admin" };

  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  });

  // Lưu Refresh Token vào DB giả lập
  refreshTokensDB.push(refreshToken);

  return res.status(200).json({
    status: 200,
    message: "LOGIN_SUCCESSFUL",
    data: {
      accessToken: `Bearer ${accessToken}`,
      refreshToken: `Bearer ${refreshToken}`,
    },
  });
});

// 2. API Refresh Token: POST /api/auth/refresh-token
app.post("/api/auth/refresh-token", (req, res) => {
  const rawRefreshToken = req.body.refreshToken;

  if (!rawRefreshToken) {
    return res.status(400).json({
      status: 400,
      message: "REFRESH_TOKEN_REQUIRED",
    });
  }

  // Tách tiền tố "Bearer " nếu client truyền kèm
  const refreshToken = rawRefreshToken.startsWith("Bearer ")
    ? rawRefreshToken.split(" ")[1]
    : rawRefreshToken;

  // Bước A: Kiểm tra xem Refresh Token có tồn tại trong DB không
  if (!refreshTokensDB.includes(refreshToken)) {
    return res.status(403).json({
      status: 403,
      message: "REFRESH_TOKEN_NOT_FOUND_OR_REVOKED",
    });
  }

  // Bước B: Xác thực chữ ký và thời hạn của Refresh Token
  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET,
    (err, decodedUser) => {
      if (err) {
        return res.status(403).json({
          status: 403,
          message: "INVALID_OR_EXPIRED_REFRESH_TOKEN",
          errors: err.message,
        });
      }

      // Bước C: Ký một Access Token mới từ thông tin người dùng
      const newPayload = {
        userId: decodedUser.userId,
        role: decodedUser.role,
      };

      const newAccessToken = jwt.sign(
        newPayload,
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m" },
      );

      // Bước D: Trả về Access Token mới
      return res.status(200).json({
        status: 200,
        message: "SUCCESS",
        data: {
          accessToken: `Bearer ${newAccessToken}`,
        },
      });
    },
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
