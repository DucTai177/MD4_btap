const queryCounter = (req, res, next) => {
  let count = 0;
  const start = Date.now();

  // Đăng ký hook bắt các câu lệnh SQL Sequelize sinh ra
  global.queryLogger = () => {
    count++;
  };

  // Ghi đè res.json để tự động gán meta đo lường
  const originalJson = res.json.bind(res);
  res.json = (body) => {
    const durationMs = Date.now() - start;
    if (body && typeof body === "object" && !Array.isArray(body)) {
      body.meta = {
        queryCount: count,
        durationMs,
      };
    }
    global.queryLogger = null;
    return originalJson(body);
  };

  next();
};

module.exports = queryCounter;
