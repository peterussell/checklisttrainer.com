import * as z from 'zod';

import { ChecklistTypeSchema } from "./Checklist";

export const ChecklistSummarySchema = z.object({
  type: ChecklistTypeSchema,
  name: z.string(),
  category: z.string(),
  slug: z.string()
})

export type ChecklistSummary = z.infer<typeof ChecklistSummarySchema>;
