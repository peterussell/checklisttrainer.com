import type { Checklist } from "./Checklist";

export type Aircraft = {
  id: string,
  registration: string,
  description: string,
  views: AircraftView[],
  checklists: Checklist[]
};

export type AircraftView = {
  src: string,
  isDefault?: boolean,
  description: string
}