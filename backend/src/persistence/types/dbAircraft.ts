import type { AircraftControl } from "@ct/core/models/Aircraft.js";

export type DBAircraft = {
  PK: string,
  SK: string,
  description: string,
  registration: string,
  image_path: string
};

export type DBAircraftView = {
  PK: string,
  SK: string,
  title: string,
  image_path: string,
  is_default: boolean,
  controls: AircraftControl[]
};
