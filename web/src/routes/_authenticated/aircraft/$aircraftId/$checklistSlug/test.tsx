import { Alert, Button, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, Stack, Typography } from '@mui/material';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router'
import type { Aircraft } from '../../../../../../../core/models/Aircraft';
import { aircraftDetailQuery } from '../../../../../queries/aircraftDetailQuery';
import type { Checklist } from '../../../../../../../core/models/Checklist';
import { LeftSidebarLayout } from '../../../../../shared/layout/LeftSidebarLayout';
import InfoOutline from '@mui/icons-material/InfoOutline';
import { PageHeader } from '../../../../../shared/components/PageHeader';
import { FlightDeckViewer } from '../../../../../features/FlightDeckViewer/FlightDeckViewer';
import { useEffect, useState } from 'react';
import { formatChecklistStep } from '../../../../../shared/utils/formatChecklistStep';
import Close from '@mui/icons-material/Close';

export const Route = createFileRoute(
  '/_authenticated/aircraft/$aircraftId/$checklistSlug/test',
)({
  component: TestMode,
})

function TestMode() {
  const { aircraftId, checklistSlug } = Route.useParams();

  const { data } = useSuspenseQuery<Aircraft | null>({
    queryKey: ['aircraft', aircraftId],
    queryFn: () => aircraftDetailQuery(aircraftId),
  });

  const [isTestRunning, setIsTestRunning] = useState(false);
  const [timer, setTimer] = useState(0);
  const [actions, setActions] = useState<{item: string, action: string}[]>([]);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);

  // Timer updates
  useEffect(() => {
    if (!isTestRunning) return;
    const interval = setInterval(() => setTimer((t) => t+1), 100); // update per 1/10s
    return () => clearInterval(interval);
  }, [isTestRunning]);

  // Also handled at parent, but repeat here to be safe
  if (!data) return <Typography>Failed to load aircraft</Typography>

  const aircraft: Aircraft = data;
  const checklist: Checklist | undefined = aircraft.checklists.find((c: Checklist) => c.slug === checklistSlug);

  function handleToggleTest() {
    if (!isTestRunning) {
      setIsTestRunning(true);
    } else {
      setIsTestRunning(false);
      handleFinishTest();
    }
  }

  function handleFinishTest() {
    setIsCompletionModalOpen(true);
  }

  function handleActionSelected(item: string, action: string) {
    if (checklist) setActions([...actions, {item, action}]);
  }

  return (
    <>
      <Stack gap={2}>
        <PageHeader
          title={[aircraft.registration, "Test mode"]}
          subtitle={aircraft.description}
          backLink={<Link to="/aircraft/$aircraftId" params={{ aircraftId }}>Back to Checklists</Link>}
        />

        {/* Instructions */}
        <Alert icon={<InfoOutline fontSize="large" />} severity="info" className="items-center">
          <Typography>
              <strong>Test mode</strong> challenges you to complete the checklist from memory using the interactive
              flight deck. No hints are shown, and tasks are only revealed once you’ve finished the checklist. At the
              end, you’ll receive feedback on accuracy and missed steps.
            </Typography>
        </Alert>

        <LeftSidebarLayout
          sidebarContent={
            <Stack gap={2} className="mt-10">
              <Button variant="contained" onClick={handleToggleTest}>
                <Typography>
                  {!isTestRunning ? 'Start test' : 'Done'}
                </Typography>
              </Button>
              {/* TODO: improve stopwatch formatting */}
              <Typography variant="h5" className="font-oxanium text-4xl text-center">{(timer / 10).toFixed(1) + 's'}</Typography>
              <Stack>
                {actions.map(a => 
                  <Typography>{formatChecklistStep(a)}</Typography>
                )}
              </Stack>
            </Stack>
          }
          mainContent={
            <>
              <Typography variant="h5" className="pt-0">
                Checklist: {checklist?.name ?? "Unknown checklist"}
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
                  <Typography className="mb-4">Yay!</Typography>
                </DialogContentText>
              </DialogContent>
            </Dialog>
    </>
  );
}