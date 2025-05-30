import { useAuth0 } from '@auth0/auth0-react';
import { Box, Stack, Typography } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router'
import AircraftSelector from '@features/Aircraft/AircraftSelector';

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
  beforeLoad: async ({ context }) => {
    if (!context.auth.isAuthenticated) {
      context.auth.loginWithRedirect();
    }
  }
})

function Dashboard() {
  const {isAuthenticated} = useAuth0();

  if (!isAuthenticated) return <Box p={2}><Typography>Authencating...</Typography></Box>;

  return (
    <Stack>
      <Typography variant="h4">
        Dashboard
      </Typography>

      <AircraftSelector />
    </Stack>
  );
}