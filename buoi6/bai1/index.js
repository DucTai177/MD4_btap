const mongoose = require("mongoose");
const Product = require("./Product");

// Thay đổi URI nếu dùng MongoDB Atlas hoặc cổng khác
const MONGO_URI = "mongodb://127.0.0.1:27017/ecommerce_db";

async function runTest() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Kết nối MongoDB thành công!\n");

    // --- TEST 1: LƯU SẢN PHẨM HỢP LỆ ---
    console.log("--- TEST 1: LƯU SẢN PHẨM HỢP LỆ ---");
    const validProduct = new Product({
      name: "Bàn phím cơ không dây",
      price: 850000,
      category: "Phụ kiện máy tính",
    });

    const savedProduct = await validProduct.save();
    console.log("=> LƯU THÀNH CÔNG sản phẩm hợp lệ:");
    console.log(`ID: ${savedProduct._id}`);
    console.log(`Tạo lúc: ${savedProduct.createdAt}\n`);

    // --- TEST 2: LƯU SẢN PHẨM VI PHẠM VALIDATION ---
    console.log("--- TEST 2: LƯU SẢN PHẨM VI PHẠM VALIDATION ---");
    console.log("=> Đang cố gắng lưu sản phẩm lỗi vào DB...\n");

    const invalidProduct = new Product({
      name: "Chu", // Vi phạm: ít hơn 5 ký tự
      price: -50000, // Vi phạm: số âm
      category: "Phụ kiện",
    });

    await invalidProduct.save();
  } catch (error) {
    if (error.name === "ValidationError") {
      console.log("[!] BẮT ĐƯỢC LỖI VALIDATION:");
      for (const field in error.errors) {
        console.log(
          ` - Lỗi ở trường '${field}': ${error.errors[field].message}`,
        );
      }
    } else {
      console.error("[!] LỖI KHÁC:", error.message);
    }
  } finally {
    await mongoose.disconnect();
    console.log("\nĐã đóng kết nối MongoDB.");
  }
}

runTest();
