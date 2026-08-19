require("dotenv").config();
const express = require("express");
const { authenticateToken } = require("./middlewares/authMiddleware");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Giả lập danh sách users
const mockUsersList = [
  { id: "user_101", name: "Nguyen Van A", role: "admin" },
  { id: "user_102", name: "Tran Thi B", role: "user" },
];

// Endpoint được bảo vệ bởi middleware authenticateToken
app.get("/api/users", authenticateToken, (req, res) => {
  // req.user chứa payload đã giải mã từ token
  res.status(200).json({
    status: 200,
    message: "Get all users successfully",
    requester: req.user,
    data: mockUsersList,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
