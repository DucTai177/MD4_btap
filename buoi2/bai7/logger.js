require("dotenv").config();

let initCount = 0;
initCount++;

const LOG_PRIORITY = {
  info: 1,
  warn: 2,
  error: 3,
};

const currentLevel = (process.env.LOG_LEVEL || "info").toLowerCase();
const minPriority = LOG_PRIORITY[currentLevel] || LOG_PRIORITY.info;

function info(msg) {
  if (LOG_PRIORITY.info >= minPriority) {
    console.log(`[INFO] ${msg}`);
  }
}

function warn(msg) {
  if (LOG_PRIORITY.warn >= minPriority) {
    console.log(`[WARN] ${msg}`);
  }
}

function error(msg) {
  if (LOG_PRIORITY.error >= minPriority) {
    console.log(`[ERROR] ${msg}`);
  }
}

module.exports = {
  info,
  warn,
  error,
  getInitCount: () => initCount,
};
