import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { createFileRoute, Outlet } from '@tanstack/react-router'
import AircraftSelector from '@features/Aircraft/AircraftSelector';

export const Route = createFileRoute('/_authenticated/aircraft/')({
  component: Aircraft,
})

function Aircraft() {
  const {isLoading} = useAuth0();

  if (isLoading) return <Box className="p2"><Typography>Checking authentication...</Typography></Box>

  return (
    <Stack>
      <Stack direction="row" className="items-center">
        <Typography variant="h4">Aircraft</Typography>
        <Box className="ml-auto">
          <Button variant="contained" href="/aircraft/add">Add Aircraft</Button>
        </Box>
      </Stack>
      <AircraftSelector />
      <Outlet />
    </Stack>
  );
}
