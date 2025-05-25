import { Typography } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
  beforeLoad: async ({ context }) => {
    console.log('called beforeload for dashboard');
    console.log(context);

    if (!context.auth.isAuthenticated) {
      context.auth.loginWithRedirect();
    }
  }
})

function Dashboard() {
  return (
    <Typography variant="h3" className="p-2 text-green-800">
      Dashboard
    </Typography>
  );
}