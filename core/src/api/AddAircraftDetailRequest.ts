import { AircraftSchema } from "../models/Aircraft";

export const AddAircraftDetailRequestSchema = AircraftSchema
  .omit({
    id: true,
    views: true,
    checklists: true
  })
  .extend({
    registration: AircraftSchema.shape.registration.min(1, 'Required'),
    description: AircraftSchema.shape.description.min(1, 'Required')
  })

export type AddAircraftDetailRequest = z.infer<typeof AddAircraftDetailRequestSchema>;
