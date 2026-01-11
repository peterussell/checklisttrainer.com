import { AircraftSchema } from "../models/Aircraft";

export const AddAircraftDetailResponseSchema = AircraftSchema.omit({
  views: true,
  checklists: true
});

export type AddAircraftDetailResponse = z.infer<typeof AddAircraftDetailResponseSchema>;
