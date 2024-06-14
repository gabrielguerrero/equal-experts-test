import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const groceries = pgTable("groceries", {
  id: serial("id"),
  name: text("name").notNull(),
  done: boolean("done").notNull().default(false),
  createdAt: timestamp("created_at").notNull().default(new Date()),
  updatedAt: timestamp("updated_at").notNull().default(new Date()),
});
