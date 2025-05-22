import { Typography } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <Typography variant="h3" className="p-2 text-green-800">
      About
    </Typography>
  );
}