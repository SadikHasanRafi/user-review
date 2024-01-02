import { z } from "zod";

export const courseCategoryValidator = z.object({
  name: z.string().min(3).max(30).trim(),
});
