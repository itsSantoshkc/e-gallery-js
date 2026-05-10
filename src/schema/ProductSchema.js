import {
  boolean,
  integer,
  timestamp,
  pgTable,
  primaryKey,
  varchar,
  real,
  date,
} from "drizzle-orm/pg-core";
import { users } from "./userSchema";

export const labels = pgTable("labels", {
  id: integer("id").primaryKey(),
  label: varchar("label", { length: 255 }),
});

export const product = pgTable("product", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }),
  price: real("price").notNull(),
  description: varchar("description", { length: 500 }),
  availableQuantity: integer("availableQuantity"),
  totalLikes: integer("totalLikes"),
  createdAt: timestamp("createdAt", { mode: "date" }),
  OwnerId: varchar("OwnerId", { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const product_label = pgTable(
  "product_label",
  {
    productId: varchar("productId", { length: 255 })
      .notNull()
      .references(() => product.id, { onDelete: "cascade" }),
    labelId: integer("labelId"),
  },
  (productLabel) => ({
    compoundKey: primaryKey({
      columns: [productLabel.productId, productLabel.labelId],
    }),
  }),
);

export const product_userLiked = pgTable(
  "product_userLiked",
  {
    productId: varchar("productId", { length: 255 })
      .notNull()
      .references(() => product.id, { onDelete: "cascade" }),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    likedAt: timestamp("likedAt", { mode: "date" }).notNull().defaultNow(),
  },
  (productUserLike) => ({
    compoundKey: primaryKey({
      columns: [productUserLike.productId, productUserLike.userId],
    }),
  }),
);

export const product_image = pgTable(
  "product_image",
  {
    productId: varchar("productId", { length: 255 })
      .notNull()
      .references(() => product.id, { onDelete: "cascade" }),
    image: varchar("image", { length: 255 }),
  },
  (productImage) => ({
    compoundKey: primaryKey({
      columns: [productImage.productId, productImage.image],
    }),
  }),
);
