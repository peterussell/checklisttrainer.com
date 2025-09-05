import { Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import type { Aircraft } from '../../../../../core/models/Aircraft'; // TODO: move to @ct

export const Route = createFileRoute('/_authenticated/aircraft/$aircraftId')({
  component: AircraftDetail,
})

// TODO: working here - fetch aircraft detail and display

function AircraftDetail() {
  const { aircraftId } = Route.useParams()
  
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['aircraft'],
    queryFn: async () => {
      if (aircraftId === null) return;
      const response = await fetch(`http://localhost:3000/aircraft/${aircraftId}`); // FIXME: env variable!
      return await response.json();
    }
  });

  if (isPending || isFetching) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Failed to load aircraft. Please try refreshing the page.</Typography>
  if (!data?.length) return <Typography>Aircraft not found.</Typography>
  if (data.length > 1) return <Typography>Failed to load aircraft.</Typography>

  const aircraft: Aircraft = data[0]
  return (
    <Typography variant="h4">{aircraft.registration}</Typography>
  );
}