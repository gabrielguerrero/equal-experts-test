import { z } from "zod";
import { selectGroceriesSchema } from "./validations";

export type Grocery = z.infer<typeof selectGroceriesSchema>;
