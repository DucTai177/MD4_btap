const sequelize = require("../config/database");
const Product = require("./Product");
const Order = require("./Order");
const OrderItem = require("./OrderItem");

// Quan hệ nhiều - nhiều ở cả 2 chiều qua bảng trung gian order_items
Order.belongsToMany(Product, { through: OrderItem, foreignKey: "orderId" });
Product.belongsToMany(Order, { through: OrderItem, foreignKey: "productId" });

Order.hasMany(OrderItem, { foreignKey: "orderId" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

Product.hasMany(OrderItem, { foreignKey: "productId" });
OrderItem.belongsTo(Product, { foreignKey: "productId" });

module.exports = {
  sequelize,
  Product,
  Order,
  OrderItem,
};
