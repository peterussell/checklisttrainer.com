import { Typography } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/aircraft/$aircraftId/$checklistSlug/test',
)({
  component: TestMode,
})

function TestMode() {
  const { aircraftId } = Route.useParams();

  // tmp
  console.log(aircraftId);

  return (
    <Typography>{aircraftId} - Test mode</Typography>
  )
}