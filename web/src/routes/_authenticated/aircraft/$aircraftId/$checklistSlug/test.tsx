import { Alert, Stack, Typography } from '@mui/material';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router'
import type { Aircraft } from '../../../../../../../core/models/Aircraft';
import { aircraftDetailQuery } from '../../../../../queries/aircraftDetailQuery';
import type { Checklist } from '../../../../../../../core/models/Checklist';
import { LeftSidebarLayout } from '../../../../../shared/layout/LeftSidebarLayout';
import InfoOutline from '@mui/icons-material/InfoOutline';
import { PageHeader } from '../../../../../shared/components/PageHeader';

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

    // Also handled at parent, but repeat here to be safe
  if (!data) return <Typography>Failed to load aircraft</Typography>

  const aircraft: Aircraft = data;
  const checklist: Checklist | undefined = aircraft.checklists.find((c: Checklist) => c.slug === checklistSlug);

  return (
    <>
      <Stack gap={2}>
        <PageHeader
          title={[aircraft.registration, "Practice mode"]}
          subtitle={aircraft.description}
          backLink={<Link to="/aircraft/$aircraftId" params={{ aircraftId }}>Back to Checklists</Link>}
        />

        {/* Instructions */}
        <Alert icon={<InfoOutline fontSize="large" />} severity="info" className="items-center">
          <Typography>
              <strong>Test mode</strong> provides immediate feedback as you complete each step of the checklist
              using the interactive flight deck. If the selected task is correct, it will be revealed under <strong>Tasks</strong>.
              Stuck? Click <strong>Hint</strong> to show the next checklist item.
            </Typography>
        </Alert>

        <LeftSidebarLayout
          sidebarContent={
            <>
              <Typography>Left sidebar</Typography>
            </>
          }
          mainContent={
            <>
              <Typography>Main content</Typography>
            </>
          }
        />
      </Stack>
    </>
  );
}