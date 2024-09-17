import {
  boolean,
  int,
  timestamp,
  mysqlTable,
  primaryKey,
  varchar,
  date,
  datetime,
} from "drizzle-orm/mysql-core";
import { users } from "./userSchema";

export const order = mysqlTable("order", {
  id: varchar("id", { length: 255 }).primaryKey(),
  orderedBy: varchar("orderedBy", {
    length: 255,
  })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  orderedAt: datetime("orderedAt"),
  orderedTotalAmount: varchar("orderedTotalAmount", { length: 255 }),
});

export const order_product = mysqlTable(
  "order_product",
  {
    order_id: varchar("order_id", {
      length: 255,
    })
      .notNull()
      .references(() => order.id, { onDelete: "cascade" }),
    product_id: varchar("product_id", {
      length: 255,
    }),
    ordered_quantity: int("ordered_quantity"),
  },
  (orderProduct) => ({
    compoundKey: primaryKey({
      columns: [orderProduct.order_id, orderProduct.product_id],
    }),
  })
);
