import AircraftSelectorCard from "./AircraftSelectorCard";
import { useQuery } from "@tanstack/react-query";
import { Box, Stack, Typography } from "@mui/material";
import type { AircraftSummary } from "../../../../core/models/AircraftSummary"; // TODO: move to @ct

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
    <Stack direction="row" gap={3} className="w-full flex flex-wrap">
      {(data as AircraftSummary[]).map((aircraft, i) => (
        <Box key={i} className="xs:min-w-full sm:min-w-1/2 md:min-w-1/4">
          <AircraftSelectorCard key={i} aircraft={aircraft} />
        </Box>
      ))}
    </Stack>
  );
}

export default AircraftSelector;
