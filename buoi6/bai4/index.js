const mongoose = require("mongoose");
const Product = require("./models/Product");
const Order = require("./models/Order");

const MONGO_URI = "mongodb://127.0.0.1:27017/populate_practice_db";

async function run() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Kết nối MongoDB thành công!\n");

    // 1. Dọn dẹp dữ liệu cũ
    await Order.deleteMany({});
    await Product.deleteMany({});

    // 2. Tạo một sản phẩm mẫu
    const sampleProduct = await Product.create({
      name: "MacBook Air M3 16GB",
      price: 27990000,
      category: "Laptop",
    });
    console.log("=> Đã tạo Product mẫu:", sampleProduct._id);

    // 3. Tạo một đơn hàng tham chiếu tới Product vừa tạo
    const sampleOrder = await Order.create({
      order_code: "ORD-2026-9901",
      product_id: sampleProduct._id,
      quantity: 1,
      total_price: 27990000,
    });
    console.log("=> Đã tạo Order mẫu:", sampleOrder._id);
    console.log("\n-----------------------------------------\n");

    // 4. Lấy thông tin đơn hàng kèm Populate tự động nạp thông tin Product
    console.log('--- KẾT QUẢ TRUY VẤN VỚI .populate("product_id") ---');
    const populatedOrder = await Order.findById(sampleOrder._id).populate(
      "product_id",
    );

    console.dir(populatedOrder, { depth: null });
  } catch (error) {
    console.error("Lỗi khi thực hiện:", error);
  } finally {
    await mongoose.disconnect();
    console.log("\nĐã đóng kết nối MongoDB.");
  }
}

run();
