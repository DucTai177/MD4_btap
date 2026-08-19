const sequelize = require("../config/database");
const Product = require("../models/Product");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const sampleProducts = [
    { name: "Sách Lập Trình Node.js", price: 150000 },
    { name: "Sách Thiết Kế RESTful API", price: 180000 },
    { name: "Sách Clean Code", price: 250000 },
    { name: "Sách Tối Ưu Hóa Database", price: 210000 },
    { name: "Sách Cấu Trúc Dữ Liệu & Giải Thuật", price: 190000 },
    { name: "Bàn Phím Cơ Không Dây", price: 850000 },
    { name: "Chuột Gaming RGB", price: 450000 },
    { name: "Tai Nghe Chống Ồn", price: 1200000 },
    { name: "Sách Học Sâu và AI", price: 320000 },
    { name: "Lót Chuột Cỡ Lớn", price: 80000 },
    { name: "Sách Thiết Kế Hệ Thống Phân Tán", price: 290000 },
    { name: "Màn Hình 24 Inch 144Hz", price: 3100000 },
    { name: "Sách Lập Trình Hướng Đối Tượng", price: 160000 },
  ];

  await Product.bulkCreate(sampleProducts);
  console.log("Seeding data thành công!");
  process.exit();
};

seedDatabase();
