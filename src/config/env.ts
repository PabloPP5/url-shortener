import "dotenv/config";

export const env = {
  port: Number(process.env.PORT) || 3000,
  baseUrl: process.env.BASE_URL ?? "http://localhost:3000",
};