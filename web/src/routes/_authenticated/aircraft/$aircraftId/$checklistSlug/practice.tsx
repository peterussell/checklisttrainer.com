import { useState } from 'react';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Checkbox, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import Close from "@mui/icons-material/Close";
import { createFileRoute, Link } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query';

import logo200 from '/logo-image-blue-200x200.png';
import type { Aircraft } from '../../../../../../../core/models/Aircraft';
import type { Checklist } from '../../../../../../../core/models/Checklist';
import { PageHeader } from '../../../../../shared/components/PageHeader';
import { aircraftDetailQuery } from '../../../../../queries/aircraftDetailQuery';
import { LeftSidebarLayout } from '../../../../../shared/layout/LeftSidebarLayout';
import { FlightDeckViewer } from '../../../../../features/FlightDeckViewer/FlightDeckViewer';
import { formatChecklistStep } from '../../../../../shared/utils/checklistFormatUtils';

export const Route = createFileRoute(
  '/_authenticated/aircraft/$aircraftId/$checklistSlug/practice',
)({
  component: PracticeMode,
})

function PracticeMode() {
  const { aircraftId, checklistSlug } = Route.useParams();

  const { data } = useSuspenseQuery<Aircraft | null>({
    queryKey: ['aircraft', aircraftId],
    queryFn: () => aircraftDetailQuery(aircraftId),
  });

  const [stepIndex, setStepIndex] = useState(0);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);
  const [isHintShown, setIsHintShown] = useState(false);

  // Also handled at parent, but repeat here to be safe
  if (!data) return <Typography>Failed to load aircraft</Typography>

  const aircraft: Aircraft = data;
  const checklist: Checklist | undefined = aircraft.checklists.find((c: Checklist) => c.slug === checklistSlug);

  function handleActionSelected(control: string, action: string) {
    if (!checklist) return;

    const currentStep = checklist.steps[stepIndex];

    if (currentStep.item === control && currentStep.action === action) {
      setIsHintShown(false);
      setStepIndex(stepIndex+1);

      // Handle checklist complete
      if (stepIndex === checklist.steps.length-1) {
        setIsCompletionModalOpen(true);
      }
    }
  }

  return (
    <>
      <Stack gap={2}>
        <PageHeader
          title={[aircraft.registration, "Practice mode"]}
          subtitle={aircraft.description}
          backLink={<Link to="/aircraft/$aircraftId" params={{ aircraftId }}>Back to Checklists</Link>}
        />

        {/* Instructions */}
        <Box>
          <Typography>Welcome to Practice mode, which provides immediate feedback as each step of the checklist is completed. To get started...</Typography>
          <List dense={true} className="list-disc pl-10">
            <ListItem className="list-item py-0">
              <ListItemText>Complete the checklist by interacting with the the flight deck.</ListItemText>
            </ListItem>
            <ListItem className="list-item py-0">
              <ListItemText>When each correct action is selected it will be shown under&nbsp;<strong>Tasks</strong></ListItemText>
            </ListItem>
            <ListItem className="list-item py-0">
              <ListItemText>Stuck? Click&nbsp;<strong>Hint</strong>&nbsp;to reveal the next item</ListItemText>
            </ListItem>
          </List>
        </Box>

        <LeftSidebarLayout
          sidebarContent={
            <Stack>
              <Typography variant="h5" className="py-0">Tasks</Typography>
              <List disablePadding className="w-70 mb-6">
                {!checklist?.steps?.length ? (
                  <Typography className="italic">No checklist tasks found</Typography>
                ) : (
                  checklist.steps.map((step, i) => (
                    <ListItem disablePadding key={i} className={i === stepIndex ? "border-2 border-gray-400" : ''}> {/* TODO: dynamic */}
                      <ListItemIcon>
                        <Checkbox checked={i < stepIndex} disableRipple color="success" className="cursor-default" />
                      </ListItemIcon>
                      <ListItemText primary={i < stepIndex ? formatChecklistStep(step) : '-'} />
                    </ListItem>
                  ))
                )}
              </List>

              <Typography variant="h5" className="">Hint</Typography>
              {
                isHintShown ? (
                  <Button className="w-full h-14 p-2 rounded-sm border border-ct-blue" onClick={() => setIsHintShown(false)}>
                    <Typography variant="caption" className="text-gray-600">
                      {checklist && formatChecklistStep(checklist.steps[stepIndex])}<br />
                      (Click to hide)
                    </Typography>
                  </Button>
                ) : (
                  <Button className="w-full min-h-14 p-2 rounded-sm bg-gray-200" onClick={() => setIsHintShown(true)}>
                    <Typography variant="caption" className="text-gray-600">Click to show</Typography>
                  </Button>
                )
              }
            </Stack>
          }
          mainContent={
            <FlightDeckViewer views={aircraft.views} onActionSelected={handleActionSelected}/>
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
                to="/aircraft/$aircraftId/$checklistSlug/practice"
                className="text-blue-500 underline"
                params={{ aircraftId, checklistSlug: checklist?.slug ?? '' }}
                reloadDocument
              >
                Practice again?
              </Link>
              &nbsp;
              Or try...</Typography>
          </DialogContentText>

          <Stack direction="row" gap={2} className="w-full">
            <Card className="w-60">
              <CardActionArea href={`/aircraft/${aircraftId}/${checklist?.slug ?? ''}/learn`}>
                <CardMedia sx={{ height: 140 }} image={logo200} title="Practice mode" />
                <CardContent>
                  <Typography variant="h5">Learn mode</Typography>
                  <Typography>Learn checklists with a guided walk through of checklist items.</Typography>
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
  );
}