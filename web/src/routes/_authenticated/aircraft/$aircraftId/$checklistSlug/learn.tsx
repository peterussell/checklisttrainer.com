import { Box, Checkbox, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router'
import { aircraftDetailQuery } from '../../../../../queries/aircraftDetailQuery';
import type { Aircraft } from '../../../../../../../core/models/Aircraft';
import { FlightDeckViewer } from '../../../../../features/FlightDeckViewer/FlightDeckViewer';
import type { Checklist, ChecklistStep } from '../../../../../../../core/models/Checklist';
import { useState } from 'react';

export const Route = createFileRoute(
  '/_authenticated/aircraft/$aircraftId/$checklistSlug/learn',
)({
  component: LearnMode,
})

function LearnMode() {
  const { aircraftId, checklistSlug } = Route.useParams();

  const { data } = useSuspenseQuery<Aircraft | null>({
    queryKey: ['aircraft', aircraftId],
    queryFn: () => aircraftDetailQuery(aircraftId),
  });

  const [stepIndex, setStepIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Also handled at parent, but repeat here to be safe
  if (!data) return <Typography>Failed to load aircraft</Typography>

  const aircraft: Aircraft = data;
  const checklist: Checklist | undefined = aircraft.checklists.find((c: Checklist) => c.slug === checklistSlug);

  function handleActionSelected(control: string, action: string) {
    if (!checklist) return;

    setFeedback(null);
    const currentStep = checklist.steps[stepIndex];

    if (currentStep.item === control && currentStep.action === action) {
      setStepIndex(stepIndex+1);
    } else {
      setFeedback(`Expected "${getStepText(currentStep, false)}". Selected "${getStepText({item: control, action}, false)}". Please try again.`);
    }
  }

  // TODO: tests
  function getStepText(step: ChecklistStep, includeCondition = true): string {
    if (!step) return '';

    let stepText = step.item;
    if (step.action) stepText += ` - ${step.action}`;
    if (includeCondition && step.condition) stepText += ` - ${step.condition}`;
    
    return stepText;
  }

  return (
    <>
      {/* Header row */}
      <Stack direction="row" className="w-full justify-between items-center">
        <Stack>
          {/* Title */}
          <Typography variant="h4" className="pb-0">
            {aircraft.registration}
            <ChevronRightIcon fontSize="large" className="pb-1" />
            Learn mode
          </Typography>
          <Typography variant="body2">{aircraft.description}</Typography>
        </Stack>
        
        {/* Back link */}
        <Stack direction="row">
          <ChevronLeftIcon />
          <Typography>
            <Link to="/aircraft/$aircraftId" params={{ aircraftId }}>Back to Checklists</Link>
          </Typography>
        </Stack>
      </Stack>

      <Stack direction="row" gap={3} className="py-8">
        <Stack>
          <Typography variant="h5" className="pt-0">Tasks</Typography>
          <List disablePadding className="w-70 mb-6">
            {!checklist?.steps?.length ? (
              <Typography variant="h5">No checklists found</Typography>
            ) : (
              checklist.steps.map((step, i) => ( // TODO: need to store this as local state with completion status
                <ListItem disablePadding key={i} className={i === stepIndex ? "border-2 border-gray-400" : ''}> {/* TODO: dynamic */}
                  <ListItemIcon>
                    <Checkbox checked={i < stepIndex} disableRipple color="success" className="cursor-default" />
                  </ListItemIcon>
                  <ListItemText primary={getStepText(step)} />
                </ListItem>
              ))
            )}
          </List>

          <Typography variant="h5" className="pt-0">Feedback</Typography>
          <Typography className="italic">{feedback}</Typography>
        </Stack>
        <Box className="max-w-2/3">
          <FlightDeckViewer views={aircraft.views} onActionSelected={handleActionSelected}/>
        </Box>
      </Stack>
    </>
  )
}
