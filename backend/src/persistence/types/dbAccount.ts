import * as z from 'zod';

export const DBAccountSchema = z.object({
  PK: z.string(),
  SK: z.string()
});

export type DBAccount = z.infer<typeof DBAccountSchema>;
