const express = require("express");
const { sequelize, Product, Order, OrderItem } = require("./models");

const app = express();
const PORT = 3000;

app.use(express.json());

// POST /api/v1/orders
app.post("/api/v1/orders", async (req, res) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Danh sách sản phẩm (items) không hợp lệ",
    });
  }

  // Khởi tạo một Transaction
  const t = await sequelize.transaction();

  try {
    let totalAmount = 0;
    const orderItemsToCreate = [];
    const productsToUpdate = [];

    // 1. Kiểm tra tồn kho của từng sản phẩm trong danh sách items
    for (const item of items) {
      const product = await Product.findByPk(item.productId, {
        transaction: t,
      });

      if (!product) {
        await t.rollback();
        return res.status(404).json({
          success: false,
          code: "PRODUCT_NOT_FOUND",
          message: `Sản phẩm với ID ${item.productId} không tồn tại`,
        });
      }

      if (product.stock < item.qty) {
        // Rollback nếu không đủ tồn kho và trả về mã 409
        await t.rollback();
        return res.status(409).json({
          success: false,
          code: "OUT_OF_STOCK",
          message: `Sản phẩm '${product.name}' không đủ tồn kho (Còn lại: ${product.stock}, Yêu cầu: ${item.qty})`,
        });
      }

      totalAmount += product.price * item.qty;
      orderItemsToCreate.push({
        productId: product.id,
        quantity: item.qty,
        price: product.price,
      });
      productsToUpdate.push({ product, qty: item.qty });
    }

    // 2. Tạo bản ghi trong bảng orders
    const newOrder = await Order.create(
      {
        totalAmount,
        status: "completed",
      },
      { transaction: t },
    );

    // 3. Tạo các bản ghi order_items tương ứng
    const orderItemsWithOrderId = orderItemsToCreate.map((item) => ({
      ...item,
      orderId: newOrder.id,
    }));
    await OrderItem.bulkCreate(orderItemsWithOrderId, { transaction: t });

    // 4. Trừ stock của từng product bằng decrement
    for (const { product, qty } of productsToUpdate) {
      await product.decrement("stock", { by: qty, transaction: t });
    }

    // Cam kết ghi dữ liệu (Commit transaction)
    await t.commit();

    return res.status(201).json({
      success: true,
      message: "Đặt hàng thành công",
      data: {
        orderId: newOrder.id,
        totalAmount,
        items: orderItemsToCreate,
      },
    });
  } catch (error) {
    // Tự động rollback nếu có bất kỳ lỗi nào xảy ra
    await t.rollback();
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Lỗi hệ thống khi thực hiện đặt hàng",
    });
  }
});

// Endpoint hỗ trợ kiểm tra dữ liệu tables
app.get("/api/v1/debug-data", async (req, res) => {
  const products = await Product.findAll();
  const orders = await Order.findAll({ include: [OrderItem] });
  const orderItems = await OrderItem.findAll();
  return res.json({ products, orders, orderItems });
});

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});
