const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: (sql) => {
    if (global.queryLogger) {
      global.queryLogger(sql);
    }
  },
});

module.exports = sequelize;
