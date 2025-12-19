import * as z from 'zod';

export const AircraftSummarySchema = z.object({
  id: z.string(),
  registration: z.string(),
  description: z.string(),
  normalChecklistCount: z.number().optional(),
  emergencyChecklistCount: z.number().optional(),
  img: z.string()
});

export type AircraftSummary = z.infer<typeof AircraftSummarySchema>;
