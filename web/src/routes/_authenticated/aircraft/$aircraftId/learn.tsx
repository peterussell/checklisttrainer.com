import { Box, Stack, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router'
import { aircraftDetailQuery } from '../../../../queries/aircraftDetailQuery';
import type { Aircraft } from '../../../../../../core/models/Aircraft';
import { FlightDeckViewer } from '../../../../features/FlightDeckViewer/FlightDeckViewer';

export const Route = createFileRoute(
  '/_authenticated/aircraft/$aircraftId/learn',
)({
  component: LearnMode,
})

function LearnMode() {
  const { aircraftId } = Route.useParams();

  const { data } = useSuspenseQuery<Aircraft | null>({
    queryKey: ['aircraft', aircraftId],
    queryFn: () => aircraftDetailQuery(aircraftId),
  });

  // Also handled at parent, but repeat here to be safe
  if (!data) return <Typography>Failed to load aircraft</Typography>
  const aircraft: Aircraft = data;

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

      {/* Flight deck viewer. TODO: add left column before this */}
      <Box className="max-w-2/3 py-8">
        <FlightDeckViewer views={aircraft.views} />
      </Box>
    </>
  )
}