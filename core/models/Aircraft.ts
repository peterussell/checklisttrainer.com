import type { Checklist } from "./Checklist";

export type Aircraft = {
  id: string,
  registration: string,
  description: string,
  img: string,
  checklists: Checklist[]
};