const mongoose = require("mongoose");
const Product = require("./Product");

const MONGO_URI = "mongodb://127.0.0.1:27017/ecommerce_logic_db";

async function run() {
  try {
    await mongoose.connect(MONGO_URI);


    await Product.deleteMany({});
    await Product.create([
      { name: "Dell XPS 13", price: 15000, category: "Laptop" },
      { name: "MacBook Pro 16", price: 35000, category: "Laptop" }, // > 20.000 -> loại
      { name: "iPhone 14 Pro", price: 18000, category: "Mobile" },
      { name: "Samsung Galaxy S24 Ultra", price: 24000, category: "Mobile" }, // > 20.000 -> loại
      { name: "iPad Pro M2", price: 19000, category: "Tablet" }, // Không thuộc Laptop/Mobile -> loại
    ]);


    const products = await Product.find({
      $or: [{ category: "Laptop" }, { category: "Mobile" }],
      price: { $lt: 20000 },
    });

  

    console.log("=> Danh sách Sản phẩm (Laptop / Mobile) có giá < 20.000:");
    console.log(products);
  } catch (error) {
    console.error("Lỗi truy vấn:", error);
  } finally {
    await mongoose.disconnect();
  }
}

run();
