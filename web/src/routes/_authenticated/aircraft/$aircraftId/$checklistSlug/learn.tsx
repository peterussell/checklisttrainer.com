import { Card, CardActionArea, CardContent, CardMedia, Checkbox, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router'
import { aircraftDetailQuery } from '../../../../../queries/aircraftDetailQuery';
import type { Aircraft } from '../../../../../../../core/models/Aircraft';
import { FlightDeckViewer } from '../../../../../features/FlightDeckViewer/FlightDeckViewer';
import type { Checklist } from '../../../../../../../core/models/Checklist';
import { useState } from 'react';

import logo200 from '/logo-image-blue-200x200.png';
import { PageHeader } from '../../../../../shared/components/PageHeader';
import { formatChecklistStep } from '../../../../../shared/utils/checklistFormatUtils';
import { LeftSidebarLayout } from '../../../../../shared/layout/LeftSidebarLayout';
import Close from '@mui/icons-material/Close';

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
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);

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

      // Handle checklist complete
      if (stepIndex === checklist.steps.length-1) {
        setIsCompletionModalOpen(true);
      }
    } else {
      setFeedback(`Expected "${formatChecklistStep(currentStep, false)}". Selected "${formatChecklistStep({item: control, action}, false)}". Please try again.`);
    }
  }

  return (
    <>
      <Stack gap={4}>
        <PageHeader
          title={[aircraft.registration, "Learn mode"]}
          subtitle={aircraft.description}
          backLink={<Link to="/aircraft/$aircraftId" params={{ aircraftId }}>Back to Checklists</Link>}
        />

        <LeftSidebarLayout
          sidebarContent={
            <Stack>
              <Typography variant="h5" className="pt-0">Tasks</Typography>
              <List disablePadding className="w-70 mb-6">
                {!checklist?.steps?.length ? (
                  <Typography className="italic">No checklist tasks found</Typography>
                ) : (
                  checklist.steps.map((step, i) => (
                    <ListItem disablePadding key={i} className={i === stepIndex ? "border-2 border-gray-400" : ''}> {/* TODO: dynamic */}
                      <ListItemIcon>
                        <Checkbox checked={i < stepIndex} disableRipple color="success" className="cursor-default" />
                      </ListItemIcon>
                      <ListItemText primary={formatChecklistStep(step)} />
                    </ListItem>
                  ))
                )}
              </List>

              <Typography variant="h5" className="pt-0">Feedback</Typography>
              <Typography className="italic">{feedback}</Typography>
            </Stack>
          }
          mainContent={
            <>
              <Typography variant="h5" className="pt-0">
                {checklist?.name ?? "Unknown checklist"}
              </Typography>
              <FlightDeckViewer views={aircraft.views} onActionSelected={handleActionSelected}/>
            </>
          }
        />
      </Stack>

      {/* Completion dialog */}
      <Dialog open={isCompletionModalOpen} onClose={() => setIsCompletionModalOpen(false)}>
        <DialogTitle>
          <Stack direction="row" className="w-full items-center justify-between">
            <Typography variant="h5" className="p-0 m-0">Checklist complete</Typography>
            <IconButton onClick={() => setIsCompletionModalOpen(false)}>
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            <Typography className="mb-4">
              <Link
                to="/aircraft/$aircraftId/$checklistSlug/learn"
                className="text-blue-500 underline"
                params={{ aircraftId, checklistSlug: checklist?.slug ?? '' }}
                reloadDocument
              >
                Learn again?
              </Link>
              &nbsp;
              Or try...</Typography>
          </DialogContentText>

          <Stack direction="row" gap={2} className="w-full">
            <Card className="w-60">
              <CardActionArea href={`/aircraft/${aircraftId}/${checklist?.slug ?? ''}/practice`}>
                <CardMedia sx={{ height: 140 }} image={logo200} title="Practice mode" />
                <CardContent>
                  <Typography variant="h5">Practice mode</Typography>
                  <Typography>Practice checklists with immediate feedback at each step.</Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card className="w-60">
              <CardActionArea href={`/aircraft/${aircraftId}/${checklist?.slug ?? ''}/test`}>
                <CardMedia sx={{ height: 140 }} image={logo200} title="Test mode" />
                <CardContent>
                  <Typography variant="h5">Test mode</Typography>
                  <Typography>Test your knowledge with a timed and graded checklist test.</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  )
}
