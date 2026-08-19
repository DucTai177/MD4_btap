1\. Dữ liệu kho ban đầu (Seed Data)

| ID | Tên sản phẩm | Giá (VNĐ) | Tồn kho (Stock) |

| 1 | Bàn Phím Cơ Không Dây | 850.000 | **10** |

| 2 | Chuột Gaming RGB | 450.000 | **5** |

| 3 | Tai Nghe Chống Ồn | 1.200.000 | **2** |

| 4 | Lót Chuột Cỡ Lớn | 80.000 | **20** |

| 5 | Màn Hình 24 Inch 144Hz | 3.100.000 | **3** |

2\. Kết quả kiểm thử các kịch bản (Test Cases)

Kịch bản 1: Đặt hàng thành công (Đủ tồn kho)

\* **Request**: `POST http://localhost:3000/api/v1/orders`

\* **Body**:

\`\`\`json

{

```
"items": \[

  { "productId": 1, "qty": 2 },

  { "productId": 5, "qty": 1 }

\]
```

}

**HTTP Status**: `201 Created`

{

"success": true,

"message": "Đặt hàng thành công",

"data": {

    "orderId": 1,

    "totalAmount": 4800000,

    "items": \[

      { "productId": 1, "quantity": 2, "price": 850000 },

      { "productId": 5, "quantity": 1, "price": 3100000 }

    \]

}

}

- `POST http://localhost:3000/api/v1/orders`

  {

  "items": \[

      { "productId": 1, "qty": 1 },

      { "productId": 5, "qty": 10 }

  \]

  }

**HTTP Status**: `409 Conflict`

{

"success": false,

"code": "OUT_OF_STOCK",

"message": "Sản phẩm 'Màn Hình 24 Inch 144Hz' không đủ tồn kho (Còn lại: 2, Yêu cầu: 10)"

}
