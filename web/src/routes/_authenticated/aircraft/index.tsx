import { useAuth0 } from '@auth0/auth0-react';
import { Stack, Typography } from '@mui/material';
import { createFileRoute, Outlet } from '@tanstack/react-router'
import AircraftSelector from '@features/Aircraft/AircraftSelector';

export const Route = createFileRoute('/_authenticated/aircraft/')({
  component: Aircraft,
})

function Aircraft() {
  const {isLoading} = useAuth0();

  // tmp while offline
  // if (isLoading) return <Box className="p2"><Typography>Checking authentication...</Typography></Box>

  return (
    <Stack>
      <Typography variant="h4">Aircraft</Typography>
      <AircraftSelector />
      <Outlet />
    </Stack>
  );
}