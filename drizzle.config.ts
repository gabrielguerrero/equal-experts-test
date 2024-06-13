import { type Config } from "drizzle-kit";

import { env } from "equal-experts/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["equal-experts2_*"],
} satisfies Config;
