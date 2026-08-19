const knex = require("./db/knex");

async function runReport() {
  try {
    // Chuỗi hàm duy nhất chứa đầy đủ: .leftJoin(), .select(), knex.raw(), .groupBy(), .havingRaw(), .orderBy(), .limit(3)
    const query = knex("users")
      .leftJoin("orders", "users.id", "orders.user_id")
      .select(
        "users.id",
        "users.name as user_name",
        knex.raw("COUNT(orders.id) as total_orders"),
        knex.raw("SUM(orders.total) as total_spent"),
      )
      .groupBy("users.id", "users.name")
      .havingRaw("COUNT(orders.id) >= ?", [2])
      .orderBy("total_spent", "desc")
      .limit(3);

    // In câu lệnh SQL ra console bằng .toString()
    console.log("--- GENERATED SQL QUERY ---");
    console.log(query.toString());
    console.log("---------------------------\n");

    // Thực thi câu lệnh
    const result = await query;

    console.log("--- REPORT RESULT (TOP 3 USERS) ---");
    console.table(result);
  } catch (error) {
    console.error("Lỗi khi thực thi report:", error);
  } finally {
    await knex.destroy();
  }
}

runReport();
