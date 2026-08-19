const express = require("express");
const orders = require("./data/orders");
const { generateOrderLinks } = require("./utils/links");

const app = express();
const PORT = 3000;

app.use(express.json());

// GET /api/v2/orders/:id
app.get("/api/v2/orders/:id", (req, res) => {
  const orderId = parseInt(req.params.id, 10);
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return res.status(404).json({
      success: false,
      code: "ORDER_NOT_FOUND",
      message: `Order with id ${req.params.id} not found`,
    });
  }

  // Ghép dữ liệu order với khối _links được sinh tự động
  return res.status(200).json({
    success: true,
    data: {
      ...order,
      _links: generateOrderLinks(order),
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
