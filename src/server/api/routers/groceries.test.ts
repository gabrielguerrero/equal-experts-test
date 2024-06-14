import { describe, expect, test } from "vitest";
import { testDB } from "equal-experts/server/api/routers/test-util";
import { appRouter } from "equal-experts/server/api/root";
import { schema } from "equal-experts/server/db";

describe("groceries", async () => {
  async function init() {
    const db = await testDB();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const caller = appRouter.createCaller({
      db: db,
    } as any);
    return { db, caller };
  }

  test("should list groceries", async () => {
    // Arrange
    const { db, caller } = await init();
    await db.insert(schema.groceries).values({
      name: "Cheerios",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    // Act
    await db.insert(schema.groceries).values({
      name: "Bananas",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    // Assert
    const groceries = await caller.groceries.list();
    expect(groceries.length).toBe(2);
    expect(groceries[0]?.name).toBe("Cheerios");
  });

  test("should add a groceries", async () => {
    // Arrange
    const { db, caller } = await init();
    // Act
    await caller.groceries.add({
      name: "Cheerios",
      done: false,
    });
    // Assert
    const groceries = await db.query.groceries.findMany();
    expect(groceries.length).toBe(1);
    expect(groceries[0]?.name).toBe("Cheerios");
    expect(groceries[0]?.done).toBe(false);
  });

  test("should update a groceries", async () => {
    // Arrange
    const { db, caller } = await init();
    await db.insert(schema.groceries).values({
      name: "Cheerios",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    // Act
    await caller.groceries.update({
      id: 1,
      name: "Banana",
      done: true,
    });
    // Assert
    const groceries = await db.query.groceries.findMany();
    expect(groceries.length).toBe(1);
    expect(groceries[0]?.name).toBe("Banana");
    expect(groceries[0]?.done).toBe(true);
  });

  test("should delete a groceries", async () => {
    // Arrange
    const { db, caller } = await init();
    await db.insert(schema.groceries).values({
      name: "Cheerios",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    // Act
    await caller.groceries.delete(1);
    // Assert
    const groceries = await db.query.groceries.findMany();
    expect(groceries.length).toBe(0);
  });

  test("should delete all groceries", async () => {
    // Arrange
    const { db, caller } = await init();
    await db.insert(schema.groceries).values({
      name: "Cheerios",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    // Act
    await db.insert(schema.groceries).values({
      name: "Bananas",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    // Assert
    await caller.groceries.deleteAll();
    const groceries = await db.query.groceries.findMany();
    expect(groceries.length).toBe(0);
  });
});
