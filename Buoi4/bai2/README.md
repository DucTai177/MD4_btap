 Header Versioning & Deprecation API

 Mô tả

API quản lý sách sử dụng cơ chế **Header Versioning** `Api-Version`) trên cùng một endpoint `/api/books` và đánh dấu ngừng hỗ trợ phiên bản cũ (\*\*Deprecation\*\*).

\---

 Kết quả kiểm thử

1\. Version 1 (Không truyền header hoặc `Api-Version: v1`)

\* **Endpoint**: `GET http://localhost:3000/api/books`

\* **Header gửi lên**: `Api-Version: v1`

\* **HTTP Status**: `200 OK`

\* **Response Headers**:

  \`\`\`http