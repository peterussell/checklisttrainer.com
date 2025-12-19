import * as z from 'zod';

export const UserSchema = z.object({
  auth0Id: z.string(),
  orgIds: z.array(z.string())
});

export type User = z.infer<typeof UserSchema>;
