const express = require("express");
const { sequelize, Category, Product } = require("./models");
const queryCounter = require("./middlewares/queryCounter");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(queryCounter);

// 1. GET /api/v1/report/slow - Bị lỗi N+1 Query
app.get("/api/v1/report/slow", async (req, res) => {
  try {
    // Query 1: Lấy 50 categories (1 query)
    const categories = await Category.findAll();

    // Query N: Chạy vòng lặp gọi Product.findAll() cho từng category (50 queries)
    const data = await Promise.all(
      categories.map(async (cat) => {
        const products = await Product.findAll({
          where: { categoryId: cat.id },
        });
        return {
          id: cat.id,
          name: cat.name,
          products: products.map((p) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            categoryId: p.categoryId,
          })),
        };
      }),
    );

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

// 2. GET /api/v1/report/fast - Khắc phục bằng Eager Loading
app.get("/api/v1/report/fast", async (req, res) => {
  try {
    // Chỉ dùng 1 lời gọi Category.findAll kèm include (Sinh ra đúng 1 câu LEFT OUTER JOIN)
    const categories = await Category.findAll({
      include: [
        {
          model: Product,
          as: "products",
          attributes: ["id", "name", "price", "categoryId"],
        },
      ],
    });

    const data = categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      products: cat.products,
    }));

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});
