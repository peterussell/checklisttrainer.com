import type { ChecklistStep } from "../../../../core/models/Checklist";

// TODO: tests
export function formatChecklistStep(step: ChecklistStep, includeCondition = true): string {
  if (!step) return '';

  let stepText = step.item;
  if (step.action) stepText += ` - ${step.action}`;
  if (includeCondition && step.condition) stepText += ` - ${step.condition}`;
  
  return stepText;
}