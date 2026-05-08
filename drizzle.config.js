import { defineConfig } from "drizzle-kit";
import "dotenv/config";

import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export default defineConfig({
  dialect: "mysql",
  schema: "./src/schema/*",
  out: "./drizzle",
  dbCredentials: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    database: process.env.DB_DATABASE,
  },
});
