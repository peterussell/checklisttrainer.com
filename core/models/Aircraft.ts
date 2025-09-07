import type { Checklist } from "./Checklist";

export type Aircraft = {
  id: string,
  registration: string,
  description: string,
  images: AircraftImage[],
  checklists: Checklist[]
};

export type AircraftImage = {
  src: string,
  isDefault?: boolean,
  description: string
}