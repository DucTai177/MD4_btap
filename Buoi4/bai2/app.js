const express = require("express");
const users = require("./data/users");
const orders = require("./data/orders");

const app = express();
const PORT = 3000;

// Middleware parse JSON
app.use(express.json());

// Xử lý lỗi JSON sai định dạng (Malformed JSON) -> Trả về 400
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      code: "INVALID_JSON",
      message: "Malformed JSON payload",
    });
  }
  next();
});

// GET /api/v1/users/:userId/orders (Hỗ trợ kiểm tra limit)
app.get("/api/v1/users/:userId/orders", (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const { status, limit } = req.query;

  // Kiểm tra user tồn tại
  const userExists = users.some((u) => u.id === userId);
  if (!userExists) {
    return res.status(404).json({
      success: false,
      code: "USER_NOT_FOUND",
      message: `User with id ${req.params.userId} not found`,
    });
  }

  // Trường hợp biên: Limit vượt giới hạn (> 50) hoặc không hợp lệ (<= 0)
  if (limit !== undefined) {
    const parsedLimit = parseInt(limit, 10);
    if (isNaN(parsedLimit) || parsedLimit <= 0 || parsedLimit > 50) {
      return res.status(400).json({
        success: false,
        code: "INVALID_LIMIT",
        message: "Limit must be a positive number and cannot exceed 50",
      });
    }
  }

  let userOrders = orders.filter((order) => order.userId === userId);

  if (status) {
    userOrders = userOrders.filter(
      (order) => order.status.toLowerCase() === status.toLowerCase(),
    );
  }

  const finalLimit = limit ? parseInt(limit, 10) : 5;
  const resultData = userOrders.slice(0, finalLimit);

  return res.status(200).json({
    success: true,
    data: resultData,
    meta: {
      total: resultData.length,
    },
  });
});

// POST /api/v1/users/:userId/orders (Kiểm tra Body rỗng / thiếu trường)
app.post("/api/v1/users/:userId/orders", (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const { total, status } = req.body;

  // Trường hợp biên: Body rỗng hoặc thiếu total/status
  if (
    !req.body ||
    Object.keys(req.body).length === 0 ||
    total === undefined ||
    !status
  ) {
    return res.status(400).json({
      success: false,
      code: "EMPTY_OR_INVALID_BODY",
      message: "Request body cannot be empty and must include total and status",
    });
  }

  const newOrder = {
    id: orders.length + 1,
    userId,
    status,
    total,
  };
  orders.push(newOrder);

  return res.status(201).json({
    success: true,
    data: newOrder,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
