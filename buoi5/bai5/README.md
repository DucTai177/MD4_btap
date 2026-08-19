Case 1: Endpoint chậm mắc lỗi N+1 Query (`GET /api/v1/report/slow`)

**URL**: `GET http://localhost:3000/api/v1/report/slow`

{

"success": true,

"data": \[

```
{

  "id": 1,

  "name": "Danh mục 1",

  "products": \[

    { "id": 1, "name": "Sản phẩm 1-1", "price": 60000, "categoryId": 1 },

    { "id": 2, "name": "Sản phẩm 1-2", "price": 70000, "categoryId": 1 },

    { "id": 10, "name": "Sản phẩm 1-10", "price": 150000, "categoryId": 1 }

  \]

}
```

\],

"meta": {

```
"queryCount": 51,

"durationMs": 118
```

}

}

Case 2: Endpoint tối ưu với Eager Loading (`GET /api/v1/report/fast`)

**URL**: `GET http://localhost:3000/api/v1/report/fast`

{

"success": true,

"data": \[

```
{

  "id": 1,

  "name": "Danh mục 1",

  "products": \[

    { "id": 1, "name": "Sản phẩm 1-1", "price": 60000, "categoryId": 1 },

    { "id": 2, "name": "Sản phẩm 1-2", "price": 70000, "categoryId": 1 },

    { "id": 10, "name": "Sản phẩm 1-10", "price": 150000, "categoryId": 1 }

  \]

}
```

\],

"meta": {

```
"queryCount": 1,

"durationMs": 9
```

}

}
