import * as z from 'zod';

import type { ChecklistSchema } from "./Checklist.ts";

export const AircraftSchema = z.object({
  id: z.string(),
  registration: z.string(),
  description: z.string(),
  views: z.array(AircraftViewSchema),
  checklists: z.array(z.ChecklistSchema)
});

export const AircraftViewSchema = z.object({
  imgSrc: z.string(),
  isDefault: z.boolean().optional(),
  description: z.string(),
  controls: z.array(AircraftControlSchema)
});

export const AircraftControlSchema = z.object({
  title: z.string(),
  xPos: z.number(), // Percent of image width
  yPos: z.number(), // Percent of image height
  markerRotation: z.number().optional(),
  actions: z.array(z.string())
});

export type Aircraft = z.infer<typeof AircraftSchema>;
export type AircraftView = z.infer<typeof AircraftViewSchema>;
export type AircraftControl = z.infer<typeof AircraftControlSchema>;
