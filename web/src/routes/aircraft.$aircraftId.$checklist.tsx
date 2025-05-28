import { Typography } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/aircraft/$aircraftId/$checklist')({
  component: Aircraft,
})

function Aircraft() {
  const { aircraftId, checklist } = Route.useParams()

  return (
    <Typography variant="h5" className="">
      {aircraftId} {checklist}
    </Typography>
  );
}