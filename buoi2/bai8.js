import EventEmitter from "node:events";

export class NotificationCenter extends EventEmitter {
  emit(event, ...args) {
    try {
      return super.emit(event, ...args);
    } catch (err) {
      return super.emit("error", err);
    }
  }
}

export const nc = new NotificationCenter();

nc.on("error", (err) => {
  console.log(`[ERROR] Đã bắt lỗi hệ thống: ${err.message}`);
});

nc.on("user:registered", (user) => {
  console.log(`[EMAIL] Gửi email chào mừng thành viên ${user.name}`);
});

nc.on("user:registered", (user) => {
  console.log(`[LOG] Ghi nhận người dùng mới ID #${user.id}`);
});

nc.on("order:created", (order) => {
  console.log(`[EMAIL] Gửi xác nhận đơn #${order.id}`);
});

nc.on("order:created", (order) => {
  console.log(`[STATS] Cập nhật doanh thu: +${order.total}`);
});

nc.on("order:cancelled", (order) => {
  console.log(`[EMAIL] Thông báo hủy đơn hàng #${order.id}`);
});

nc.on("order:cancelled", (order) => {
  if (order.total > 1000000) {
    throw new Error(
      `Đơn hàng #${order.id} vượt hạn mức hủy tự động (Giá trị: ${order.total})`,
    );
  }
  console.log(`[REFUND] Hoàn tiền cho đơn hàng #${order.id}: ${order.total}`);
});

export const testEvents = [
  { event: "user:registered", payload: { id: 101, name: "Nguyen Van A" } },
  { event: "order:created", payload: { id: 1, total: 500000 } },
  { event: "order:cancelled", payload: { id: 2, total: 1500000 } },
  { event: "order:created", payload: { id: 3, total: 200000 } },
  { event: "order:cancelled", payload: { id: 4, total: 300000 } },
];

testEvents.forEach(({ event, payload }) => {
  nc.emit(event, payload);
});
