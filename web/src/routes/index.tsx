import { useAuth0 } from '@auth0/auth0-react'
import { Stack, Typography } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <Stack>
      <Typography variant="h4">
        Home
      </Typography>

      {isLoading && (<Typography>Loading...</Typography>)}

      {isAuthenticated && user && (
        <Stack direction="row" gap={2} m={2}>
          <img src={user.picture} alt={user.name} width="30px" />
          <Typography>Logged in as {user.email}</Typography>
        </Stack>
      )}
    </Stack>
    
  )
}