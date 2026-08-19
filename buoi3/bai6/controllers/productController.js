import * as ProductModel from "../models/Product.js";

export const getProducts = (req, res) => {
  const productList = ProductModel.getAll();
  return res.status(200).json({
    success: true,
    data: productList,
  });
};

export const createProduct = (req, res) => {
  const { name, price, quantity } = req.body;

  if (!name || price === undefined || quantity === undefined) {
    return res.status(400).json({
      success: false,
      message: "Vui lòng cung cấp đầy đủ: name, price, quantity",
    });
  }

  const newProduct = ProductModel.create({ name, price, quantity });
  return res.status(201).json({
    success: true,
    data: newProduct,
  });
};
