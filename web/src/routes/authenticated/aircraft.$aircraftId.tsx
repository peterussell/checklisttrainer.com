import { Typography } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/authenticated/aircraft/$aircraftId')({
  component: Aircraft,
})

function Aircraft() {
  const { aircraftId } = Route.useParams()

  return (
    <Typography variant="h5" className="">
      {aircraftId}
    </Typography>
  );
}