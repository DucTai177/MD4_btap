import { OrderService } from "./orderService.js";
import { registerLogger } from "./logger.js";

const orderService = new OrderService();
registerLogger(orderService);

orderService.createOrder({ id: 101, total: 250000 });
orderService.createOrder({ id: 102, total: 490000 });
