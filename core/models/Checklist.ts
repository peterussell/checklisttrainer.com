export type Checklist = {
  id: string,
  name: string,
  slug: string,
  type: ChecklistType,
  steps: ChecklistStep[],
};

export type ChecklistType = 'emergency' | 'normal';

export type ChecklistStep = {
  item: string,
  action?: string,
  condition?: string
};
