const mongoose = require("mongoose");
const Store = require("./Store");

const MONGO_URI = "mongodb://127.0.0.1:27017/store_embedded_db";

async function run() {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("--- ĐANG TẠO MỚI CỬA HÀNG ---");

    // Tạo mới một Store với embedded object location
    const newStore = await Store.create({
      name: "Cửa hàng Tiện lợi 24/7",
      location: {
        street: "123 Đường Nguyễn Huệ",
        district: "Quận 1",
        city: "Hồ Chí Minh",
      },
    });

    console.log(
      "\n=> Tạo thành công! Cấu trúc JSON trả về thể hiện rõ quan hệ cha-con:",
    );
    console.log(newStore);
  } catch (error) {
    console.error("Lỗi khi tạo cửa hàng:", error);
  } finally {
    await mongoose.disconnect();
    console.log("\nĐã đóng kết nối MongoDB.");
  }
}

run();
