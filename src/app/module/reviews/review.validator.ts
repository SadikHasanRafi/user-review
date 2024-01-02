import { z } from "zod";

export const reviewValidation = z.object({
    courseId: z.string().min(3).max(30).trim(),
    rating: z.number(),
    review:z.string()
});
