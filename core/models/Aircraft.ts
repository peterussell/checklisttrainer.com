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
  description: string,
  controls: AircraftControl[]
};

export type AircraftControl = {
  title: string,
  xPos: number, // Percent of image width
  yPos: number, // Percent of image height
  actions: string[]
};
