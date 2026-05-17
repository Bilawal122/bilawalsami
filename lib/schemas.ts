import { z } from "zod";

export const tallyRequestSchema = z.object({
  input: z.string().min(1, "Type something").max(200, "Keep it under 200 characters."),
});
export type TallyRequest = z.infer<typeof tallyRequestSchema>;

export const macrosSchema = z.object({
  calories: z.number().nonnegative(),
  protein: z.number().nonnegative(),
  carbs: z.number().nonnegative(),
  fat: z.number().nonnegative(),
  fibre: z.number().nonnegative(),
});
export type Macros = z.infer<typeof macrosSchema>;

export const tallyItemSchema = z.object({
  name: z.string(),
  quantity: z.string(),
  ...macrosSchema.shape,
});
export type TallyItem = z.infer<typeof tallyItemSchema>;

export const tallyResponseSchema = z.object({
  items: z.array(tallyItemSchema),
  total: macrosSchema,
  error: z.string().nullable().optional(),
  stub: z.boolean().optional(),
});
export type TallyResponse = z.infer<typeof tallyResponseSchema>;
