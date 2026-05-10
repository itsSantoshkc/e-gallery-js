import { integer, pgTable, varchar, real } from "drizzle-orm/pg-core";
import { users } from "./userSchema";
import { product } from "./ProductSchema";

export const cart = pgTable("cart", {
  itemQuantity: integer("itemQuantity"),
  itemPrice: real("itemPrice"),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  productId: varchar("productId", { length: 255 })
    .primaryKey()
    .notNull()
    .references(() => product.id, { onDelete: "cascade" }),
});
