import { Stack, Typography } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/aircraft/add')({
  component: AddAircraft,
})

function AddAircraft() {
  return (
    <Stack>
      <Typography variant="h4">Add Aircraft</Typography>
    </Stack>
  );
}