const express = require("express");
const { loginLimiter } = require("./middlewares/rateLimiter");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API Đăng nhập có áp dụng chốt chặn loginLimiter
app.post("/api/auth/login", loginLimiter, (req, res) => {
  const { username, password } = req.body;

  // Giả lập logic kiểm tra đăng nhập
  if (username === "admin" && password === "123456") {
    return res.status(200).json({
      status: 200,
      message: "Login successful!",
    });
  }

  return res.status(401).json({
    status: 401,
    message: "Invalid username or password",
  });
});

// Các route thông thường khác (không bị giới hạn bởi loginLimiter)
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
