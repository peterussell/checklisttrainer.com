import type { ChecklistSummary } from "./ChecklistSummary";

// TEMP: move to store
export type Aircraft = {
  id: string,
  name: string,
  img: string,
  checklists: ChecklistSummary[]
};
