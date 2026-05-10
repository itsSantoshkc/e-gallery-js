import {
  boolean,
  integer,
  timestamp,
  pgTable,
  primaryKey,
  varchar,
  date,
} from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }),
  gender: varchar("gender", { length: 10 }),
  phone: varchar("phone", { length: 15 }),
  emailVerified: boolean("emailVerified"),
  image: varchar("image", { length: 255 }),
  role: varchar("role", { length: 50 }),
  birthDate: date("birthdate"),
  verificationToken: integer("verificationToken"),
});

export const accounts = pgTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 }).notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: varchar("id_token", { length: 2048 }),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: varchar("credentialID", { length: 255 }).notNull().unique(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    credentialPublicKey: varchar("credentialPublicKey", {
      length: 255,
    }).notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: varchar("credentialDeviceType", {
      length: 255,
    }).notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: varchar("transports", { length: 255 }),
  },
  (authenticator) => ({
    compositePk: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  }),
);

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  }),
);

export const sessions = pgTable("session", {
  sessionToken: varchar("sessionToken", { length: 255 }).primaryKey(),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const shippingAddresses = pgTable("shippingAddresses", {
  userId: varchar("userId", { length: 255 })
    .notNull()
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  province: varchar("province", { length: 255 }),
  address: varchar("address", { length: 255 }),
});

export const passwordReset = pgTable("passwordReset", {
  hash: varchar("id", { length: 255 }).primaryKey(),
  email: varchar("email", { length: 255 })
    .notNull()
    .references(() => users.email, { onDelete: "cascade" }),
  expiryDate: timestamp("expiryDate", { mode: "date" }),
});
