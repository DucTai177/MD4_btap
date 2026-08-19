const express = require("express");
const users = require("./data/users");
const orders = require("./data/orders");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/api/v1/users/:userId/orders", (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const { status, limit = 5 } = req.query;

  // 1. Kiểm tra userId có tồn tại không
  const userExists = users.some((u) => u.id === userId);
  if (!userExists) {
    return res.status(404).json({
      success: false,
      code: "USER_NOT_FOUND",
      message: `User with id ${req.params.userId} not found`,
    });
  }

  // 2. Lọc đơn hàng theo userId
  let userOrders = orders.filter((order) => order.userId === userId);

  // 3. Lọc theo query status (nếu có truyền)
  if (status) {
    userOrders = userOrders.filter(
      (order) => order.status.toLowerCase() === status.toLowerCase(),
    );
  }

  // 4. Giới hạn số lượng bản ghi (limit mặc định = 5)
  const parsedLimit = parseInt(limit, 10) > 0 ? parseInt(limit, 10) : 5;
  const resultData = userOrders.slice(0, parsedLimit);

  // 5. Trả kết quả theo chuẩn
  return res.status(200).json({
    success: true,
    data: resultData,
    meta: {
      total: resultData.length,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
