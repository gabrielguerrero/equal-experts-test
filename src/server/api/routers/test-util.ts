import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import path from "path";
import { schema } from "equal-experts/server/db";
import os from "os";
import * as fs from "node:fs";

export const testDB = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
  const sqlite = new PGlite();
  const db = drizzle(sqlite, { schema: schema });
  const migrationPath = path.join(os.tmpdir(), "equal-expert/migrations");
  if (!fs.existsSync(migrationPath)) {
    fs.mkdirSync(migrationPath, { recursive: true });
  }
  // console.log(`Migrating to ${migrationPath}`);
  await migrate(db, { migrationsFolder: migrationPath });
  return db;
};
