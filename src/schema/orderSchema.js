import {
  integer,
  timestamp,
  pgTable,
  primaryKey,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./userSchema";

export const order = pgTable("order", {
  id: varchar("id", { length: 255 }).primaryKey(),
  orderedBy: varchar("orderedBy", { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  orderedAt: timestamp("orderedAt", { mode: "date" }),
  transaction_id: varchar("transactionId", { length: 255 }),
  deliverStatus: varchar("deliverStatus", { length: 255 }),
  orderedTotalAmount: varchar("orderedTotalAmount", { length: 255 }),
});

export const order_product = pgTable(
  "order_product",
  {
    order_id: varchar("order_id", { length: 255 })
      .notNull()
      .references(() => order.id, { onDelete: "cascade" }),
    product_id: varchar("product_id", { length: 255 }),
    ordered_quantity: integer("ordered_quantity"),
  },
  (orderProduct) => ({
    compoundKey: primaryKey({
      columns: [orderProduct.order_id, orderProduct.product_id],
    }),
  }),
);
