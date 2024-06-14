import { type Config } from "drizzle-kit";

import { env } from "equal-experts/env";
import path from "path";
import os from "os";
import fs from "node:fs";
const migrationPath = path.join(os.tmpdir(), "equal-expert/migrations");
if (!fs.existsSync(migrationPath)){
  fs.mkdirSync(migrationPath, { recursive: true });
}
console.log("migrationPath", migrationPath);
export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  out: migrationPath,
  tablesFilter: ["equal-experts2_*"],
} satisfies Config;
