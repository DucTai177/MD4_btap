1\. Cấu hình & Tham số Query String

| Tham số | Kiểu dữ liệu | Mặc định | Giới hạn | Mô tả |

| `page` | `Integer` | `1` | $&gt; 0$ | Số trang cần lấy, chặn số âm/0 |

| `limit` | `Integer` | `10` | $1 \\le limit \\le 50$ | Số bản ghi trên mỗi trang (tối đa 50) |

| `keyword` | `String` | - | - | Tìm kiếm gần đúng theo tên sản phẩm `Op.like`) |

| `sort` | `String` | `id_desc` | `price_asc`, `price_desc` | Tiêu chí sắp xếp theo giá tăng/giảm dần |

\---

\## 2. Kết quả kiểm thử 4 URL (Test Results)

\### Case 1: Đầy đủ tham số `page=1&limit=3&keyword=sach&sort=price_asc`)

\* **Mô tả**: Tìm sản phẩm có tên chứa chữ `"sach"`, sắp xếp theo giá tăng dần, lấy trang 1 với giới hạn 3 bản ghi.

\* **URL**: `GET http://localhost:3000/api/v1/products?page=1&limit=3&keyword=sach&sort=price_asc`

\* **HTTP Status**: `200 OK`

\* **Response Body**:

\`\`\`json

{

"success": true,

"data": \[

    {

      "id": 1,

      "name": "Sách Lập Trình Node.js",

      "price": 150000,

      "createdAt": "2026-08-19T04:50:00.000Z",

      "updatedAt": "2026-08-19T04:50:00.000Z"

    },

    {

      "id": 13,

      "name": "Sách Lập Trình Hướng Đối Tượng",

      "price": 160000,

      "createdAt": "2026-08-19T04:50:00.000Z",

      "updatedAt": "2026-08-19T04:50:00.000Z"

    },

    {

      "id": 2,

      "name": "Sách Thiết Kế RESTful API",

      "price": 180000,

      "createdAt": "2026-08-19T04:50:00.000Z",

      "updatedAt": "2026-08-19T04:50:00.000Z"

    }

\],

"meta": {

    "page": 1,

    "limit": 3,

    "total": 7,

    "totalPages": 3

}

}

case 2:

{

"success": true,

"data": \[

    {

      "id": 7,

      "name": "Chuột Gaming RGB",

      "price": 450000,

      "createdAt": "2026-08-19T04:50:00.000Z",

      "updatedAt": "2026-08-19T04:50:00.000Z"

    }

\],

"meta": {

    "page": 1,

    "limit": 10,

    "total": 1,

    "totalPages": 1

}

}

case 3

{

"success": true,

"data": \[

    {

      "id": 12,

      "name": "Màn Hình 24 Inch 144Hz",

      "price": 3100000,

      "createdAt": "2026-08-19T04:50:00.000Z",

      "updatedAt": "2026-08-19T04:50:00.000Z"

    },

    {

      "id": 8,

      "name": "Tai Nghe Chống Ồn",

      "price": 1200000,

      "createdAt": "2026-08-19T04:50:00.000Z",

      "updatedAt": "2026-08-19T04:50:00.000Z"

    },

    {

      "id": 6,

      "name": "Bàn Phím Cơ Không Dây",

      "price": 850000,

      "createdAt": "2026-08-19T04:50:00.000Z",

      "updatedAt": "2026-08-19T04:50:00.000Z"

    },

    {

      "id": 7,

      "name": "Chuột Gaming RGB",

      "price": 450000,

      "createdAt": "2026-08-19T04:50:00.000Z",

      "updatedAt": "2026-08-19T04:50:00.000Z"

    },

    {

      "id": 9,

      "name": "Sách Học Sâu và AI",

      "price": 320000,

      "createdAt": "2026-08-19T04:50:00.000Z",

      "updatedAt": "2026-08-19T04:50:00.000Z"

    },

    {

      "id": 11,

      "name": "Sách Thiết Kế Hệ Thống Phân Tán",

      "price": 290000,

      "createdAt": "2026-08-19T04:50:00.000Z",

      "updatedAt": "2026-08-19T04:50:00.000Z"

    },

    {

      "id": 3,

      "name": "Sách Clean Code",

      "price": 250000,

      "createdAt": "2026-08-19T04:50:00.000Z",

      "updatedAt": "2026-08-19T04:50:00.000Z"

    },

    {

      "id": 4,

      "name": "Sách Tối Ưu Hóa Database",

      "price": 210000,

      "createdAt": "2026-08-19T04:50:00.000Z",

      "updatedAt": "2026-08-19T04:50:00.000Z"

    },

    {

      "id": 5,

      "name": "Sách Cấu Trúc Dữ Liệu & Giải Thuật",

      "price": 190000,

      "createdAt": "2026-08-19T04:50:00.000Z",

      "updatedAt": "2026-08-19T04:50:00.000Z"

    },

    {

      "id": 2,

      "name": "Sách Thiết Kế RESTful API",

      "price": 180000,

      "createdAt": "2026-08-19T04:50:00.000Z",

      "updatedAt": "2026-08-19T04:50:00.000Z"

    }

\],

"meta": {

    "page": 1,

    "limit": 10,

    "total": 13,

    "totalPages": 2

}

}

case 4

{

"success": true,

"data": \[

    {

      "id": 13,

      "name": "Sách Lập Trình Hướng Đối Tượng",

      "price": 160000,

      "createdAt": "2026-08-19T04:50:00.000Z",

      "updatedAt": "2026-08-19T04:50:00.000Z"

    },

    {

      "id": 12,

      "name": "Màn Hình 24 Inch 144Hz",

      "price": 3100000,

      "createdAt": "2026-08-19T04:50:00.000Z",

      "updatedAt": "2026-08-19T04:50:00.000Z"

    },

    {

      "id": 11,

      "name": "Sách Thiết Kế Hệ Thống Phân Tán",

      "price": 290000,

      "createdAt": "2026-08-19T04:50:00.000Z",

      "updatedAt": "2026-08-19T04:50:00.000Z"

    },

    {

      "id": 10,

      "name": "Lót Chuột Cỡ Lớn",

      "price": 80000,

      "createdAt": "2026-08-19T04:50:00.000Z",

      "updatedAt": "2026-08-19T04:50:00.000Z"

    },

    {

      "id": 9,

      "name": "Sách Học Sâu và AI",

      "price": 320000,

      "createdAt": "2026-08-19T04:50:00.000Z",

      "updatedAt": "2026-08-19T04:50:00.000Z"

    },

    {

      "id": 8,

      "name": "Tai Nghe Chống Ồn",

      "price": 1200000,

      "createdAt": "2026-08-19T04:50:00.000Z",

      "updatedAt": "2026-08-19T04:50:00.000Z"

    },

    {

      "id": 7,

      "name": "Chuột Gaming RGB",

      "price": 450000,

      "createdAt": "2026-08-19T04:50:00.000Z",

      "updatedAt": "2026-08-19T04:50:00.000Z"

    },

    {

      "id": 6,

      "name": "Bàn Phím Cơ Không Dây",

      "price": 850000,

      "createdAt": "2026-08-19T04:50:00.000Z",

      "updatedAt": "2026-08-19T04:50:00.000Z"

    },

    {

      "id": 5,

      "name": "Sách Cấu Trúc Dữ Liệu & Giải Thuật",

      "price": 190000,

      "createdAt": "2026-08-19T04:50:00.000Z",

      "updatedAt": "2026-08-19T04:50:00.000Z"

    },

    {

      "id": 4,

      "name": "Sách Tối Ưu Hóa Database",

      "price": 210000,

      "createdAt": "2026-08-19T04:50:00.000Z",

      "updatedAt": "2026-08-19T04:50:00.000Z"

    }

\],

"meta": {

    "page": 1,

    "limit": 10,

    "total": 13,

    "totalPages": 2

}

}
