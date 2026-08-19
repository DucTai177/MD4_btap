const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    // Trường mới được bổ sung
    stock: {
      type: Number,
    },
  },
  {
    timestamps: true,
    strict: false, // Cho phép tương thích với các document cũ khuyết thiếu trường
  },
);

module.exports = mongoose.model("Product", productSchema);
