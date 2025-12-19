import * as z from 'zod';

import { AircraftControlSchema } from "@ct/core/models/Aircraft.js";
import { ChecklistStepSchema, ChecklistTypeSchema } from "@ct/core/models/Checklist.js";

export const DBAircraftMetadataSchema = z.object({
  PK: z.string(),
  SK: z.string(),
  description: z.string(),
  registration: z.string(),
  image_path: z.string()
});

export const DBAircraftViewSchema = z.object({
  PK: z.string(),
  SK: z.string(),
  description: z.string(),
  image_path: z.string(),
  is_default: z.boolean(),
  controls: z.array(AircraftControlSchema)
});

export const DBAircraftChecklistSchema = z.object({
  PK: z.string(),
  SK: z.string(),
  name: z.string(),
  slug: z.string(),
  type: ChecklistTypeSchema,
  steps: z.array(ChecklistStepSchema)
});

export type DBAircraftMetadata = z.infer<typeof DBAircraftMetadataSchema>;
export type DBAircraftView = z.infer<typeof DBAircraftViewSchema>;
export type DBAircraftChecklist = z.infer<typeof DBAircraftChecklistSchema>;
