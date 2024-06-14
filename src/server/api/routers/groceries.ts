import { createTRPCRouter, publicProcedure } from "../trpc";
import { asc, eq } from "drizzle-orm";
import { z } from "zod";
import { schema, validations } from "equal-experts/server/db";

export const groceriesRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    const results = ctx.db.query.groceries.findMany({
      orderBy: asc(schema.groceries.id),
    });
    return results;
  }),
  add: publicProcedure
    .input(
      validations.insertGroceriesSchema.omit({
        createdAt: true,
        updatedAt: true,
      }),
    )
    .mutation(({ input, ctx }) => {
      return ctx.db
        .insert(schema.groceries)
        .values({
          name: input.name,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();
    }),
  update: publicProcedure
    .input(
      validations.insertGroceriesSchema
        .extend({ id: z.number() })
        .omit({ createdAt: true, updatedAt: true }),
    )
    .mutation(({ input, ctx }) => {
      return ctx.db
        .update(schema.groceries)
        .set({
          name: input.name,
          done: input.done,
          updatedAt: new Date(),
        })
        .where(eq(schema.groceries.id, input.id))
        .returning();
    }),
  delete: publicProcedure.input(z.number()).mutation(({ input, ctx }) => {
    return ctx.db
      .delete(schema.groceries)
      .where(eq(schema.groceries.id, input));
  }),
  deleteAll: publicProcedure.mutation(({ ctx }) => {
    // eslint-disable-next-line drizzle/enforce-delete-with-where
    return ctx.db.delete(schema.groceries);
  }),
});
export type GroceriesRouter = typeof groceriesRouter;
