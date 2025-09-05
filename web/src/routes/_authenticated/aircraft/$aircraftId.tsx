import { Typography } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/aircraft/$aircraftId')({
  component: AircraftDetail,
})

function AircraftDetail() {
  const { aircraftId } = Route.useParams()

  return (
    <Typography variant="h5" className="">
      {aircraftId}
    </Typography>
  );
}