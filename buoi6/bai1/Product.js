const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tên sản phẩm bắt buộc phải có"],
      minLength: [5, "Tên sản phẩm phải có tối thiểu 5 ký tự"],
    },
    price: {
      type: Number,
      required: [true, "Giá sản phẩm bắt buộc phải có"],
      min: [0, "Giá sản phẩm không được là số âm"],
    },
    category: {
      type: String,
      required: [true, "Danh mục sản phẩm bắt buộc phải có"],
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
