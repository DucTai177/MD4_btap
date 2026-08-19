\# Nested Resource & Query String API

\## Test Cases & Kết quả

\### Case 1: Đủ tham số `status=paid` và `limit=3`)

\* **URL**: `GET http://localhost:3000/api/v1/users/2/orders?status=paid&limit=3`

\* **HTTP Status**: `200 OK`

\* **Response**:

\`\`\`json

{

  "success": true,

  "data": \[

    { "id": 5, "userId": 2, "status": "paid", "total": 500000 },

    { "id": 6, "userId": 2, "status": "paid", "total": 120000 },

    { "id": 8, "userId": 2, "status": "paid", "total": 990000 }

  \],

  "meta": {

    "total": 3

  }

}