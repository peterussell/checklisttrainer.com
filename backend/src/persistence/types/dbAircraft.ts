import type { AircraftControl } from "@ct/core/models/Aircraft.js";

export type DBAircraftMetadata = {
  PK: string,
  SK: string,
  description: string,
  registration: string,
  image_path: string
};

export type DBAircraftView = {
  PK: string,
  SK: string,
  description: string,
  image_path: string,
  is_default: boolean,
  controls: AircraftControl[]
};
