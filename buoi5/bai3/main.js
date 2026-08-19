const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("=== BẮT ĐẦU THỰC HIỆN CÁC THAO TÁC CRUD VỚI PRISMA ===\n");

  // 1. Tạo một Author kèm 2 Book (Nested Write trong 1 lệnh duy nhất)
  console.log("--- 1. Tạo Author kèm 2 Books (Nested Write) ---");
  const newAuthor = await prisma.author.create({
    data: {
      name: "Robert C. Martin",
      books: {
        create: [
          { title: "Clean Code", price: 250000 },
          { title: "Clean Architecture", price: 280000 },
        ],
      },
    },
    include: {
      books: true,
    },
  });
  console.log("Đã tạo thành công Author và Books:");
  console.dir(newAuthor, { depth: null });
  console.log("\n-----------------------------------------------\n");

  // 2. Đọc Author kèm toàn bộ Book bằng include
  console.log("--- 2. Đọc Author kèm toàn bộ Books (include) ---");
  const authorWithBooks = await prisma.author.findUnique({
    where: { id: newAuthor.id },
    include: {
      books: true,
    },
  });
  console.log("Kết quả đọc Author & Books:");
  console.dir(authorWithBooks, { depth: null });
  console.log("\n-----------------------------------------------\n");

  // 3. Cập nhật giá của một Book
  const firstBook = newAuthor.books[0];
  console.log(`--- 3. Cập nhật giá của Book id=${firstBook.id} ---`);
  const updatedBook = await prisma.book.update({
    where: { id: firstBook.id },
    data: {
      price: 320000,
    },
  });
  console.log("Book sau khi cập nhật giá:");
  console.log(updatedBook);
  console.log("\n-----------------------------------------------\n");

  // 4. Xóa một Book (Bao gồm bắt lỗi khi id không tồn tại)
  const secondBook = newAuthor.books[1];
  console.log(`--- 4. Xóa Book hợp lệ (id=${secondBook.id}) ---`);
  const deletedBook = await prisma.book.delete({
    where: { id: secondBook.id },
  });
  console.log("Đã xóa thành công Book:", deletedBook);

  console.log(
    "\n--- 5. Kiểm tra bắt lỗi khi xóa Book có id không tồn tại (id=9999) ---",
  );
  try {
    await prisma.book.delete({
      where: { id: 9999 },
    });
  } catch (error) {
    if (error.code === "P2025") {
      console.log(
        ">> [THÔNG BÁO]: Không tìm thấy Book có id=9999 để xóa. Lỗi đã được bắt xử lý an toàn, chương trình không bị crash!",
      );
    } else {
      console.error(">> [LỖI KHÁC]:", error.message);
    }
  }

  console.log("\n=== HOÀN THÀNH TOÀN BỘ THAO TÁC THÀNH CÔNG ===");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
