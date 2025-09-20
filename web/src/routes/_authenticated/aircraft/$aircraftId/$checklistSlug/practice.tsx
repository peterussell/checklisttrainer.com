import { Typography } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/aircraft/$aircraftId/$checklistSlug/practice',
)({
  component: PracticeMode,
})

function PracticeMode() {
  const { aircraftId } = Route.useParams();

  // tmp
  console.log(aircraftId);

  return (
    <Typography>{aircraftId} - Practice mode</Typography>
  )
}