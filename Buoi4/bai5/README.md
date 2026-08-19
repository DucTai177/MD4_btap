 HATEOAS RESTful API (Richardson Maturity Model - Level 3)

1\. Giải thích: Khối `_links` giúp API đạt Level 3 như thế nào so với Level 2?

\* **Ở Level 2 (HTTP Verbs & Status Codes):** 

  - Client chỉ nhận dữ liệu thô và phải **tự ghi nhớ (hardcode) các URL** hoặc đọc tài liệu API bên ngoài để biết muốn hủy đơn thì gọi đường dẫn nào, method gì.

  - Client phải tự kiểm tra điều kiện (ví dụ: client tự viết logic `if (status === 'pending')` để hiển thị nút huỷ).

\***Ở Level 3 (HATEOAS - Hypermedia As The Engine Of Application State):**

  - Khối `_links` giúp response **tự mô tả hành động tiếp theo** mà client có thể thực hiện tại trạng thái hiện tại.

  - Client hoàn toàn linh hoạt (Decoupled), chỉ cần duyệt qua các quan hệ `rel` như `self`, `cancel`, `customer`) và gọi đường dẫn có sẵn trong `href` cùng `method` tương ứng. Nếu đơn hàng đã bị `cancelled`, server không trả về link `cancel`, client tự động biết không thể huỷ đơn nữa mà không cần hardcode logic.

\---

 2\. Kết quả kiểm thử (Test Results)

 Test Case 1: Đơn hàng ở trạng thái `pending` (ID: 17)

\* **Request**: `GET http://localhost:3000/api/v2/orders/17`

\* **Response Body**:

\`\`\`json

{

  "success": true,

  "data": {

    "id": 17,

    "userId": 3,

    "total": 350000,

    "status": "pending",

    "createdAt": "2026-08-19T08:00:00.000Z",

    "\_links": {

      "self": {

        "href": "/api/v2/orders/17",

        "method": "GET"

      },

      "customer": {

        "href": "/api/v2/users/3",

        "method": "GET"

      },

      "cancel": {

        "href": "/api/v2/orders/17/cancellation",

        "method": "POST"

      }

    }

  }

}