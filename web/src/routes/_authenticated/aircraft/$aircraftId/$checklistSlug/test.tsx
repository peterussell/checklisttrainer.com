import { useEffect, useMemo, useState } from 'react';
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
  Typography,
  type AlertColor
} from '@mui/material';
import CancelOutlined from '@mui/icons-material/CancelOutlined';
import CheckOutlined from '@mui/icons-material/CheckOutlined';
import Close from '@mui/icons-material/Close';
import Refresh from '@mui/icons-material/Refresh';
import ChecklistOutlined from '@mui/icons-material/ChecklistOutlined'
import TimerOutlined from '@mui/icons-material/TimerOutlined'
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router'
import type { Aircraft } from '@ct/core/models/Aircraft';
import type { Checklist, ChecklistStep } from '@ct/core/models/Checklist';
import { aircraftDetailQuery } from '../../../../../queries/aircraftDetailQuery';
import { LeftSidebarLayout } from '@shared/layout/LeftSidebarLayout';
import { PageHeader } from '@shared/components/PageHeader';
import { FlightDeckViewer } from '@features/FlightDeckViewer/FlightDeckViewer';
import { formatChecklistStep } from '@shared/utils/formatChecklistStep';
import { calculatePercentage } from '@shared/utils/calculatePercentage';

export const Route = createFileRoute(
  '/_authenticated/aircraft/$aircraftId/$checklistSlug/test',
)({
  component: TestMode,
})

function TestMode() {
  const { aircraftId, checklistSlug } = Route.useParams();

  const { data } = useSuspenseQuery<Aircraft | null>({
    queryKey: ['aircraft', aircraftId],
    queryFn: async () => aircraftDetailQuery(aircraftId),
  });

  const [isTestRunning, setIsTestRunning] = useState(false);
  const [timer, setTimer] = useState(0);
  const [userInput, setUserInput] = useState<{item: string, action: string}[]>([]);
  const [isCompletionDialogOpen, setIsCompletionDialogOpen] = useState(false);

  const aircraft: Aircraft | undefined = data ?? undefined;
  const checklist: Checklist | undefined = aircraft?.checklists.find((c: Checklist) => c.slug === checklistSlug) ?? undefined;

  // Timer logic
  const formattedTimer = (timer / 10).toFixed(1) + 's';

  useEffect(() => {
    if (!isTestRunning) return;
    const interval = setInterval(() => setTimer((t) => t+1), 100); // update per 1/10s
    return () => clearInterval(interval);
  }, [isTestRunning]);

  // Test result calculation
  type ChecklistTestResult = {score: number, possibleScore: number, percentage: number};

  const testResult: ChecklistTestResult | null = useMemo(() => {
    if (!isCompletionDialogOpen) return null; // Only calculate when completion dialog's open
    if (!checklist) throw new Error('No checklist found');
    if (!checklist?.steps?.length) throw new Error('Checklist has no steps');
    if (!userInput?.length) return {score: 0, possibleScore: checklist.steps.length, percentage: 0};

    const score = checklist.steps.reduce((accumulator, checklistStep, i) => {
      if (i > userInput.length) return accumulator;
      return (areEquivalent(checklistStep, userInput[i])) ? accumulator + 1 : accumulator;
    }, 0);

    return {
      score,
      possibleScore: checklist.steps.length,
      percentage: calculatePercentage(score, checklist.steps.length)
    };
  }, [isCompletionDialogOpen, checklist, userInput]);

  const testResultSeverity: AlertColor = useMemo(() => {
    if (!testResult) return 'info';
    if (testResult.percentage >= 80) return 'success';
    if (testResult.percentage >= 40) return 'warning';
    return 'error';
  }, [testResult]);

  // Also handled at parent, but repeat here to be safe
  if (!aircraft) return <Typography>Failed to load aircraft</Typography>

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
    setUserInput([]);
  }

  function handleFinishTest() {
    setIsCompletionDialogOpen(true);
  }

  function handleActionSelected(item: string, action: string) {
    if (!isTestRunning) return;
    setUserInput([...userInput, {item, action}]);
  }

  function areEquivalent(step: ChecklistStep, userInput: {item: string, action: string}) {
    if (!step.action || !userInput) return false;
    return step.action === userInput.action && step.item === userInput.item;
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
        <Alert severity="info" className="items-center">
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
              <Typography variant="h5" className="font-oxanium text-4xl text-center">{formattedTimer}</Typography>

              <Stack>
                  <Typography variant="h5" className="py-0">Completed actions</Typography>
                  <List disablePadding className="w-70 mb-6">
                    {userInput?.length ? userInput.map((input, i) => (
                        <ListItem disablePadding key={i}>
                          <ListItemText primary={`${i+1}. ${formatChecklistStep(input)}`} />
                        </ListItem>
                      )) : <Typography>(None)</Typography>}
                  </List>
              </Stack>
            </Stack>
          }
          mainContent={
            <>
              <Typography variant="h5" className="pt-0">
                Checklist: {checklist?.name ?? "Unknown checklist"}
              </Typography>
              <FlightDeckViewer views={aircraft.views} onActionSelected={handleActionSelected} disabled={!isTestRunning} />
            </>
          }
        />
      </Stack>

      {/* Completion dialog */}
      <Dialog
        open={isCompletionDialogOpen}
        onClose={() => {
          handleReset();
          setIsCompletionDialogOpen(false);
        }}>
        <DialogTitle>
          <Stack direction="row" className="w-full items-center justify-between">
            <Typography variant="h5" className="p-0 m-0">Checklist complete</Typography>
            <IconButton onClick={() => {
              handleReset();
              setIsCompletionDialogOpen(false);
            }}>
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Stack gap={1.5}>
            <Alert icon={false} severity={testResultSeverity}  className="items-center">
              <Stack gap={0.5}>
                {/* Score */}
                <Stack direction="row" gap={2} className="items-center">
                  <ChecklistOutlined className="text-ct-blue" fontSize="small" />
                  <Typography variant="h6">Score: {
                    testResult ? (
                      `${testResult.score}/${testResult.possibleScore} (${testResult.percentage}%)`
                    ) : (
                      'No test result found'
                    )}</Typography>
                </Stack>

                {/* Time */}
                <Stack direction="row" gap={2} className="items-center">
                  <TimerOutlined className="text-ct-blue" fontSize="small" />
                  <Typography variant="h6">Time: {formattedTimer}</Typography>
                </Stack>
              </Stack>
            </Alert>

            <Typography variant="h5" className="pb-0">Results</Typography>
            <Stack gap={2} direction="row">
              <Stack className="w-400">
                  <Typography variant="h6" className="py-0">Expected</Typography>
                  <List disablePadding className="mb-6">
                    {checklist?.steps?.length ? checklist?.steps?.map((step, i) => (
                        <ListItem disablePadding key={i} className="py-1 border-b border-gray-300">
                          <ListItemText primary={formatChecklistStep(step)} />
                        </ListItem>
                      )) : '(None)'}
                  </List>
              </Stack>

              <Stack className="w-500">
                  <Typography variant="h6" className="py-0">Selected</Typography>
                  <List disablePadding className="mb-6">
                    {userInput?.length ? userInput.map((input, i) => {
                      const isCorrect = checklist?.steps && checklist?.steps?.length > i && areEquivalent(checklist.steps[i], input);

                      return (
                        <ListItem disablePadding key={i} className="py-1 border-b border-gray-300">
                          <ListItemText primary={
                            <Stack direction="row" className="w-full">
                              <Typography component="span" className="flex-grow" color={isCorrect ? "success" : "error"}>
                                {formatChecklistStep(input)}
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
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}