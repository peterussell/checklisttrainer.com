export type Checklist = {
  name: string,
  slug: string,
  type: ChecklistType
};

export type ChecklistType = 'emergency' | 'normal';
