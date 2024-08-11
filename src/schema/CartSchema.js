import {
  boolean,
  int,
  timestamp,
  mysqlTable,
  primaryKey,
  varchar,
  float,
} from "drizzle-orm/mysql-core";
import { users } from "./userSchema";
import { product } from "./ProductSchema";

export const cart = mysqlTable("cart", {
  itemQuantity: int("itemQuantity"),
  itemPrice: float("itemPrice"),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  productId: varchar("productId", { length: 255 })
    .primaryKey()
    .notNull()
    .references(() => product.id, { onDelete: "cascade" }),
});
