import AircraftSelectorCard from "./AircraftSelectorCard";
import { useQuery } from "@tanstack/react-query";
import { Stack, Typography } from "@mui/material";

function AircraftSelector() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['aircraft'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/aircraft'); // FIXME: env variable!
      return await response.json();
    }
  });

  if (isPending || isFetching) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Failed to load aircraft. Please try refreshing the page.</Typography>
  if (!data) return <Typography>No aircraft found</Typography>

  return (
    <Stack direction="row">
      {Object.entries(data).map(([key, value]) => <AircraftSelectorCard key={key} aircraft={value} />)}
    </Stack>
  );
}

export default AircraftSelector;
