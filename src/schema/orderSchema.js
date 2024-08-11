import {
  boolean,
  int,
  timestamp,
  mysqlTable,
  primaryKey,
  varchar,
  date,
} from "drizzle-orm/mysql-core";

export const order = mysqlTable("order", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }),
  gender: varchar("gender", { length: 10 }),
  phone: varchar("phone", { length: 15 }),
  emailVerified: boolean("emailVerified"),
  image: varchar("image", { length: 255 }),
  birthDate: date("birtdate"),
  verificationToken: int("verificationToken", { unsigned: true }),
});
