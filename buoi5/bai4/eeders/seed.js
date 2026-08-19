const { sequelize, Product, Order, OrderItem } = require("../models");

const seedData = async () => {
  await sequelize.sync({ force: true });

  await Product.bulkCreate([
    { id: 1, name: "Bàn Phím Cơ Không Dây", price: 850000, stock: 10 },
    { id: 2, name: "Chuột Gaming RGB", price: 450000, stock: 5 },
    { id: 3, name: "Tai Nghe Chống Ồn", price: 1200000, stock: 2 },
    { id: 4, name: "Lót Chuột Cỡ Lớn", price: 80000, stock: 20 },
    { id: 5, name: "Màn Hình 24 Inch 144Hz", price: 3100000, stock: 3 },
  ]);

  console.log("Seeding dữ liệu ban đầu thành công!");
  process.exit();
};

seedData();
