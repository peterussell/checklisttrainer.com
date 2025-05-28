import { useAuth0 } from '@auth0/auth0-react';
import { Box, Typography } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router'

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

  if (!isAuthenticated) return <Box p={2}><Typography>Login required, redirecting...</Typography></Box>;

  return (
    <Typography variant="h3" className="p-2 text-green-800">
      Dashboard
    </Typography>
  );
}