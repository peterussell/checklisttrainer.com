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
      <Typography variant="h3" className="p-2 text-blue-800">
        Home
      </Typography>

      <Typography variant="h4">User info</Typography>
      {isLoading && (<Typography>Loading...</Typography>)}

      {isAuthenticated && user && (
        <>
        <img src={user.picture} alt={user.name} width="30px" />
        <Typography>{user.name}</Typography>
        <Typography>{user.email}</Typography>
        </>
      )}
    </Stack>
    
  )
}