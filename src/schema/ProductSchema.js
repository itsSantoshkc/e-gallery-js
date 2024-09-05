import {
  boolean,
  int,
  timestamp,
  mysqlTable,
  primaryKey,
  varchar,
  float,
  date,
  datetime,
} from "drizzle-orm/mysql-core";
import { users } from "./userSchema";

export const labels = mysqlTable("labels", {
  id: int("id").primaryKey().autoincrement(),
  label: varchar("label", { length: 255 }),
});

// export const userRecetlyVisitedLabel = mysqlTable(
//   "userRecetlyVisitedLabel",
//   {
//     userId: varchar("userId", { length: 255 })
//       .notNull()
//       .references(() => users.id, { onDelete: "cascade" }),
//     labelId: int("labelId")
//       .notNull()
//       .references(() => labels.id, { onDelete: "cascade" }),
//     visitedAt: datetime("visitedAt", { mode: "date" }),
//   },
//   (recentlyVisit) => ({
//     compoundKey: primaryKey({
//       columns: [recentlyVisit.labelId, recentlyVisit.userId],
//     }),
//   })
// );

export const product = mysqlTable("product", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }),
  price: float("price").notNull(),
  description: varchar("description", { length: 500 }),
  availableQuantity: int("availableQuantity"),
  totalLikes: int("totalLikes"),
  createdAt: datetime("createdAt"),
  OwnerId: varchar("OwnerId", { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const product_label = mysqlTable(
  "product_label",
  {
    productId: varchar("productId", {
      length: 255,
    })
      .notNull()
      .references(() => product.id, { onDelete: "cascade" }),
    labelId: int("labelId", {}),
  },
  (productLabel) => ({
    compoundKey: primaryKey({
      columns: [productLabel.productId, productLabel.labelId],
    }),
  })
);

export const product_userLiked = mysqlTable(
  "product_userLiked",
  {
    productId: varchar("productId", {
      length: 255,
    })
      .notNull()
      .references(() => product.id, { onDelete: "cascade" }),
    userId: varchar("userId", {
      length: 255,
    })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    likedAt: timestamp("likedAt", { mode: "date" }).notNull().defaultNow(),
  },
  (productUserLike) => ({
    compoundKey: primaryKey({
      columns: [productUserLike.productId, productUserLike.userId],
    }),
  })
);

export const product_image = mysqlTable(
  "product_image",
  {
    productId: varchar("productId", {
      length: 255,
    })
      .notNull()
      .references(() => product.id, { onDelete: "cascade" }),
    image: varchar("image", {
      length: 255,
    }),
  },
  (productImage) => ({
    compoundKey: primaryKey({
      columns: [productImage.productId, productImage.image],
    }),
  })
);
