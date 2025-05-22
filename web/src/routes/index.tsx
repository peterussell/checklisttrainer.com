import { Typography } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <Typography variant="h3" className="p-2 text-blue-800">
      Welcome Home!
    </Typography>
  )
}