const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  // Lấy giá trị header Authorization (dạng: "Bearer <token>")
  const authHeader = req.headers["authorization"];
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

  // 1. Nếu không có token -> Chặn và trả về 401
  if (!token) {
    return res.status(401).json({
      status: 401,
      message: "TOKEN_REQUIRED",
      errors: null,
    });
  }

  // 2. Xác thực token với JWT_ACCESS_SECRET
  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decodedUser) => {
    if (err) {
      return res.status(401).json({
        status: 401,
        message:
          err.name === "TokenExpiredError" ? "TOKEN_EXPIRED" : "INVALID_TOKEN",
        errors: err.message,
      });
    }

    // 3. Token hợp lệ: Gắn dữ liệu giải mã vào req.user và tiếp tục
    req.user = decodedUser;
    next();
  });
};

module.exports = { authenticateToken };
