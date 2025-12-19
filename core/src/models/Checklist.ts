import * as z from 'zod';

export const ChecklistSchema = z.object({
  id: z.uuidv4(),
  name: z.string(),
  slug: z.string(),
  type: ChecklistTypeSchema,
  steps: z.array(ChecklistStepSchema)
});

export const ChecklistTypeSchema = z.enum(['emergency', 'normal']);

export const ChecklistStepSchema = z.object({
  item: z.string(),
  action: z.string().optional(),
  condition: z.string().optional()
});

export type Checklist = z.infer<typeof ChecklistSchema>;
export type ChecklistType = z.infer<typeof ChecklistTypeSchema>;
export type ChecklistStep = z.infer<typeof ChecklistStepSchema>;
