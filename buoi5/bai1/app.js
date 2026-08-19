const express = require("express");
const { Op } = require("sequelize");
const sequelize = require("./config/database");
const Product = require("./models/Product");

const app = express();
const PORT = 3000;

app.use(express.json());

// GET /api/v1/products
app.get("/api/v1/products", async (req, res) => {
  try {
    let { page = 1, limit = 10, keyword, sort } = req.query;

    // 1. Ép kiểu page và limit về số nguyên, chặn giá trị <= 0
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);

    if (isNaN(page) || page <= 0) {
      page = 1;
    }

    // Giới hạn limit tối đa 50 và mặc định 10 nếu không hợp lệ
    if (isNaN(limit) || limit <= 0) {
      limit = 10;
    } else if (limit > 50) {
      limit = 50;
    }

    const offset = (page - 1) * limit;

    // 2. Xử lý tìm kiếm gần đúng theo tên sản phẩm bằng Op.like
    const whereClause = {};
    if (keyword && keyword.trim() !== "") {
      whereClause.name = {
        [Op.like]: `%${keyword.trim()}%`,
      };
    }

    // 3. Xử lý sắp xếp: price_asc, price_desc, mặc định id_desc
    let orderClause = [["id", "DESC"]];
    if (sort === "price_asc") {
      orderClause = [["price", "ASC"]];
    } else if (sort === "price_desc") {
      orderClause = [["price", "DESC"]];
    }

    // 4. Truy vấn với findAndCountAll
    const { rows: products, count: total } = await Product.findAndCountAll({
      where: whereClause,
      order: orderClause,
      limit: limit,
      offset: offset,
    });

    const totalPages = Math.ceil(total / limit);

    // 5. Trả response theo đúng chuẩn
    return res.status(200).json({
      success: true,
      data: products,
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});
