const mongoose = require("mongoose");
const Product = require("./models/Product");

const MONGO_URI = "mongodb://127.0.0.1:27017/missing_fields_db";

async function run() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Kết nối MongoDB thành công!\n");

    // 1. Dọn dẹp dữ liệu cũ và tạo tập dữ liệu mẫu ban đầu
    await Product.deleteMany({});

    // Tạo trực tiếp qua collection để giả lập các document CŨ hoàn toàn không có trường stock
    await Product.collection.insertMany([
      { name: "Chuột Gaming RGB", price: 450000, category: "Phụ kiện" },
      { name: "Bàn phím cơ TKL", price: 850000, category: "Phụ kiện" },
      {
        name: "Màn hình 27 Inch 2K",
        price: 5200000,
        category: "Màn hình",
        stock: 5,
      }, // Document mới (đã có stock)
    ]);

    console.log("--- DANH SÁCH SẢN PHẨM TRƯỚC KHI XỬ LÝ ---");
    const beforeProducts = await Product.find({});
    console.log(beforeProducts);
    console.log("\n-----------------------------------------\n");

    // 2. Tìm tất cả sản phẩm khuyết trường stock ($exists: false) và cập nhật stock = 10
    console.log("--- ĐANG QUÉT VÀ BỔ SUNG TRƯỜNG STOCK KHUYẾT THIẾU ---");
    const updateResult = await Product.updateMany(
      { stock: { $exists: false } },
      { $set: { stock: 10 } },
    );

    console.log(
      `=> Đã tìm thấy: ${updateResult.matchedCount} document(s) khuyết thiếu`,
    );
    console.log(
      `=> Đã cập nhật thành công: ${updateResult.modifiedCount} document(s)\n`,
    );

    // 3. Hiển thị lại dữ liệu sau khi cập nhật
    console.log("--- DANH SÁCH SẢN PHẨM SAU KHI CẬP NHẬT ---");
    const afterProducts = await Product.find({});
    console.log(afterProducts);
  } catch (error) {
    console.error("Lỗi khi thực thi script:", error);
  } finally {
    await mongoose.disconnect();
    console.log("\nĐã đóng kết nối MongoDB.");
  }
}

run();
