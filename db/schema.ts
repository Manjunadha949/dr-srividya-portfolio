import { sqliteTable, text } from "drizzle-orm/sqlite-core";
export const content = sqliteTable("content", { id: text("id").primaryKey(), data: text("data").notNull() });