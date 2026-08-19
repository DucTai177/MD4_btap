/**
 * Tạo danh sách HATEOAS links dựa trên trạng thái đơn hàng
 * @param {Object} order - Thông tin đơn hàng
 * @returns {Object} Khối _links
 */
const generateOrderLinks = (order) => {
  const links = {
    self: {
      href: `/api/v2/orders/${order.id}`,
      method: "GET",
    },
    customer: {
      href: `/api/v2/users/${order.userId}`,
      method: "GET",
    },
  };

  // Chỉ thêm link cancel nếu đơn hàng đang ở trạng thái "pending"
  if (order.status.toLowerCase() === "pending") {
    links.cancel = {
      href: `/api/v2/orders/${order.id}/cancellation`,
      method: "POST",
    };
  }

  return links;
};

module.exports = { generateOrderLinks };
