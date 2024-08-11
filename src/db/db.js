import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

export const connection = await mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "egallery",
});

export const db = drizzle(connection);
