import { AircraftSchema } from "../models/Aircraft";

export const AddAircraftDetailRequestSchema = AircraftSchema.omit({
  id: true,
  views: true,
  checklists: true
});

export type AddAircraftDetailRequest = z.infer<typeof AddAircraftDetailRequestSchema>;
