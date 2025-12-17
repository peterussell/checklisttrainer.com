import type { Checklist } from "./Checklist.ts";

export type Aircraft = {
  id: string,
  registration: string,
  description: string,
  views: AircraftView[],
  checklists: Checklist[]
};

export type AircraftView = {
  imgSrc: string,
  isDefault?: boolean,
  description: string,
  controls: AircraftControl[]
};

export type AircraftControl = {
  title: string,
  xPos: number, // Percent of image width
  yPos: number, // Percent of image height
  markerRotation?: number,
  actions: string[]
};
