Tài Liệu Hệ Thống Blog API Phân Quyền Theo Vai Trò

1\. Danh Sách Endpoint & Middleware Áp Dụng

| Phương thức (Method) | Đường dẫn (Endpoint) | Middleware áp dụng | Mô tả chức năng |

| `GET` | `/api/posts` | Không | Lấy toàn bộ danh sách bài viết |

| `GET` | `/api/posts/:id` | Không | Lấy thông tin chi tiết bài viết kèm danh sách bình luận |

| `POST` | `/api/posts` | `uploadThumbnail` | Thêm bài viết mới (kèm file thumbnail tối đa 2MB) |

| `DELETE` | `/api/posts/:id` | `authenticate`, `authorize('admin')` | Xóa bài viết và xóa kèm tất cả comment liên quan (Cascade) |

| `POST` | `/api/comments` | `authenticate` | Đăng bình luận mới cho bài viết |

| `GET` | `/api/comments/post/:postId` | Không | Lấy danh sách bình luận theo mã bài viết |

\---

2\. Kịch Bản Kiểm Thử (Test Cases)

Kịch bản 1: Đăng bình luận nhưng chưa đăng nhập

\* **Yêu cầu gửi đi**: `POST /api/comments` không truyền header `Authorization`, body `{ "postId": 1, "text": "Test" }`.

\* **Kết quả mong đợi**: Mã lỗi `401 Unauthorized`, response:

\`\`\`json

{ "success": false, "message": "Chưa đăng nhập" }