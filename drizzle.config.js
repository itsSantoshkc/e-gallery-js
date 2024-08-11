import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "mysql", // "mysql" | "sqlite" | "postgresql"
  schema: "./src/schema/*",
  out: "./drizzle",
  dbCredentials: {
    user: "root",
    password: "root",
    host: "127.0.0.1",
    port: 3306,
    database: "egallery",
  },
});
