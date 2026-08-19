1\. Tạo Author kèm 2 Books (Nested Write) --- Đã tạo thành công Author và Books: { id: 1, name: 'Robert C. Martin', books: \[ { id: 1, title: 'Clean Code', price: 250000, authorId: 1 }, { id: 2, title: 'Clean Architecture', price: 280000, authorId: 1 } \] }

---

2\. Đọc Author kèm toàn bộ Books (include) --- Kết quả đọc Author & Books: { id: 1, name: 'Robert C. Martin', books: \[ { id: 1, title: 'Clean Code', price: 250000, authorId: 1 }, { id: 2, title: 'Clean Architecture', price: 280000, authorId: 1 } \] }

---

3\. Cập nhật giá của Book id=1 --- Book sau khi cập nhật giá: { id: 1, title: 'Clean Code', price: 320000, authorId: 1 }

---

4\. Xóa Book hợp lệ (id=2) --- Đã xóa thành công Book: { id: 2, title: 'Clean Architecture', price: 280000, authorId: 1 }