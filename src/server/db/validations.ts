// Schema for inserting a user - can be used to validate API requests
import { schema } from "./db";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

// Schema for selecting a user - can be used to validate API responses
export const insertGroceriesSchema = createInsertSchema(schema.groceries);
export const selectGroceriesSchema = createSelectSchema(schema.groceries);
