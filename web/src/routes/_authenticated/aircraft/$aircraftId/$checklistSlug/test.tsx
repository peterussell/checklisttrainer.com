import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';
import CancelOutlined from '@mui/icons-material/CancelOutlined';
import CheckOutlined from '@mui/icons-material/CheckOutlined';
import Close from '@mui/icons-material/Close';
import InfoOutline from '@mui/icons-material/InfoOutline';
import Refresh from '@mui/icons-material/Refresh';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router'
import type { Aircraft } from '../../../../../../../core/models/Aircraft';
import type { Checklist, ChecklistStep } from '../../../../../../../core/models/Checklist';
import { aircraftDetailQuery } from '../../../../../queries/aircraftDetailQuery';
import { LeftSidebarLayout } from '../../../../../shared/layout/LeftSidebarLayout';
import { PageHeader } from '../../../../../shared/components/PageHeader';
import { FlightDeckViewer } from '../../../../../features/FlightDeckViewer/FlightDeckViewer';
import { formatChecklistStep } from '../../../../../shared/utils/formatChecklistStep';

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

  function handleReset() {
    setIsTestRunning(false);
    setTimer(0);
    setActions([]);
  }

  function handleFinishTest() {
    setIsCompletionModalOpen(true);
  }

  function handleActionSelected(item: string, action: string) {
    if (!isTestRunning) return;
    setActions([...actions, {item, action}]);
  }

  function areEquivalent(step: ChecklistStep, action: {item: string, action: string}) {
    if (!step.action || !action) return false;
    return step.action === action.action && step.item === action.item;
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
              <Stack gap={1} direction="row">
              <Button onClick={handleToggleTest} variant="contained" className="flex-grow">
                <Typography>
                  {!isTestRunning ? 'Start test' : 'Done'}
                </Typography>
              </Button>
              <Button onClick={handleReset} variant="contained" className="px-0">
                <Refresh />
              </Button>
              </Stack>
              <Typography variant="h5" className="font-oxanium text-4xl text-center">{(timer / 10).toFixed(1) + 's'}</Typography>

              <Stack>
                  <Typography variant="h5" className="py-0">Completed actions</Typography>
                  <List disablePadding className="w-70 mb-6">
                    {actions?.length ? actions.map((action, i) => (
                        <ListItem disablePadding key={i}>
                          <ListItemText primary={`${i+1}. ${formatChecklistStep(action)}`} />
                        </ListItem>
                      )) : <Typography>(None)</Typography>'}
                  </List>
              </Stack>
            </Stack>
          }
          mainContent={
            <>
              <Typography variant="h5" className="pt-0">
                Checklist: {checklist?.name ?? "Unknown checklist"}
              </Typography>
              <FlightDeckViewer views={aircraft.views} onActionSelected={handleActionSelected} />
            </>
          }
        />
      </Stack>

      {/* Completion dialog */}
      <Dialog
        open={isCompletionModalOpen}
        onClose={() => {
          handleReset();
          setIsCompletionModalOpen(false);
        }}>
        <DialogTitle>
          <Stack direction="row" className="w-full items-center justify-between">
            <Typography variant="h5" className="p-0 m-0">Checklist complete</Typography>
            <IconButton onClick={() => {
              handleReset();
              setIsCompletionModalOpen(false);
            }}>
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>

        <DialogContent>
            <Stack gap={2} direction="row">
              <Stack className="w-400">
                  <Typography variant="h6" className="py-0">Expected</Typography>
                  <List disablePadding className="mb-6">
                    {checklist?.steps?.length ? checklist?.steps?.map((step, i) => (
                        <ListItem disablePadding key={i} className="py-1 border-b border-gray-300">
                          <ListItemText primary={formatChecklistStep(step)} />
                        </ListItem>
                      )) : '(none)'}
                  </List>
              </Stack>

              <Stack className="w-500">
                  <Typography variant="h6" className="py-0">Selected</Typography>
                  <List disablePadding className="mb-6">
                    {actions?.length ? actions.map((action, i) => {
                      const isCorrect = checklist?.steps && checklist?.steps?.length > i && areEquivalent(checklist.steps[i], action);

                      return (
                        <ListItem disablePadding key={i} className="py-1 border-b border-gray-300">
                          <ListItemText primary={
                            <Stack direction="row" className="w-full">
                              <Typography component="span" className="flex-grow" color={isCorrect ? "success" : "error"}>
                                {formatChecklistStep(action)}
                              </Typography>
                              {isCorrect ? <CheckOutlined color="success" /> : <CancelOutlined color="error" />}
                            </Stack>
                          } />
                        </ListItem>
                      );
                    }) : 'No actions'}
                  </List>
              </Stack>
            </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}