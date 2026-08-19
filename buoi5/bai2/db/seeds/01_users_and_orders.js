exports.seed = async function (knex) {
  // Xóa dữ liệu cũ (xóa orders trước users để tránh dính FK)
  await knex("orders").del();
  await knex("users").del();

  // 1. Nạp 5 Users
  const insertedUsers = await knex("users").insert([
    { id: 1, name: "Nguyen Van A", email: "vana@gmail.com" },
    { id: 2, name: "Tran Thi B", email: "thib@gmail.com" },
    { id: 3, name: "Le Van C", email: "vanc@gmail.com" },
    { id: 4, name: "Pham Thi D", email: "thid@gmail.com" },
    { id: 5, name: "Hoang Van E", email: "vane@gmail.com" },
  ]);

  // 2. Nạp 15 Orders
  // User 1: 4 orders (tổng = 1.900.000)
  // User 2: 5 orders (tổng = 3.200.000)
  // User 3: 3 orders (tổng = 1.350.000)
  // User 4: 2 orders (tổng = 450.000)
  // User 5: 1 order  (tổng = 1.000.000 -> sẽ bị loại vì chỉ có 1 order)
  await knex("orders").insert([
    { id: 1, user_id: 1, total: 300000 },
    { id: 2, user_id: 1, total: 500000 },
    { id: 3, user_id: 1, total: 700000 },
    { id: 4, user_id: 1, total: 400000 },
    { id: 5, user_id: 2, total: 800000 },
    { id: 6, user_id: 2, total: 950000 },
    { id: 7, user_id: 2, total: 450000 },
    { id: 8, user_id: 2, total: 600000 },
    { id: 9, user_id: 2, total: 400000 },
    { id: 10, user_id: 3, total: 250000 },
    { id: 11, user_id: 3, total: 600000 },
    { id: 12, user_id: 3, total: 500000 },
    { id: 13, user_id: 4, total: 150000 },
    { id: 14, user_id: 4, total: 300000 },
    { id: 15, user_id: 5, total: 1000000 },
  ]);
};
