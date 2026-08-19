const { sequelize, Category, Product } = require("../models");

const seedData = async () => {
  await sequelize.sync({ force: true });

  console.log("Đang nạp 50 categories và 500 products...");
  const categoriesData = [];
  for (let i = 1; i <= 50; i++) {
    categoriesData.push({ id: i, name: `Danh mục ${i}` });
  }
  await Category.bulkCreate(categoriesData);

  const productsData = [];
  let productId = 1;
  for (let catId = 1; catId <= 50; catId++) {
    for (let p = 1; p <= 10; p++) {
      productsData.push({
        id: productId++,
        name: `Sản phẩm ${catId}-${p}`,
        price: 50000 + p * 10000,
        categoryId: catId,
      });
    }
  }
  await Product.bulkCreate(productsData);

  console.log("Seeding hoàn tất: 50 Categories và 500 Products!");
  process.exit();
};

seedData();
