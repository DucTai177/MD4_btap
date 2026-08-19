import EventEmitter from "node:events";


export class OrderService extends EventEmitter {
  constructor() {
    super();
    this.registerHandlers();
  }

  registerHandlers() {

    this.once("order:created", () => {
      console.log("[SYSTEM] Đơn hàng đầu tiên đã được khởi tạo trong hệ thống");
    });


    this.on("order:created", ({ id }) => {
      console.log(`[EMAIL] Đã gửi email xác nhận cho đơn hàng #${id}`);
    });
  }


  createOrder(order) {
    this.emit("order:created", order);
  }
}


export const mockOrders = [
  { id: 1, total: 100000 },
  { id: 2, total: 250000 },
  { id: 3, total: 75000 },
];


const orderService = new OrderService();

mockOrders.forEach((order) => {
  orderService.createOrder(order);
});
