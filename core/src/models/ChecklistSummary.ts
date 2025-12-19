import { ChecklistType } from "./Checklist";

export type ChecklistSummary = {
  type: ChecklistType
  name: string,
  category: string,
  slug: string,
};

