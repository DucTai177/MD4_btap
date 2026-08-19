import dotenv from "dotenv";

dotenv.config();

export const config = {
  PROCESSING_DELAY_MS: Number(process.env.PROCESSING_DELAY_MS) || 2000,
  LOG_TIMEZONE: process.env.LOG_TIMEZONE || "Asia/Ho_Chi_Minh",
};
