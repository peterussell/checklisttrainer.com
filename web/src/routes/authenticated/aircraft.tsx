import { useAuth0 } from '@auth0/auth0-react';
import { Box, Stack, Typography } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router'
import AircraftSelector from '@features/Aircraft/AircraftSelector';

export const Route = createFileRoute('/authenticated/aircraft')({
  component: Aircraft,
  beforeLoad: async ({ context }) => {
    if (!context.auth.isAuthenticated) {
      context.auth.loginWithRedirect();
    }
  }
})

function Aircraft() {
  const {isAuthenticated} = useAuth0();

  if (!isAuthenticated) return <Box p={2}><Typography>Authenticating...</Typography></Box>;

  return (
    <Stack>
      <Typography variant="h4">Aircraft</Typography>
      <AircraftSelector />
    </Stack>
  );
}