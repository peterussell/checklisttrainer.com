import { useAuth0 } from '@auth0/auth0-react'
import { Button, Container, Stack, Typography } from '@mui/material'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

import logo200 from '/logo-image-blue-200x200.png';

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const {loginWithRedirect, isAuthenticated, isLoading} = useAuth0();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate({ to: '/aircraft'});
  }
  return (
    <Container maxWidth={false} className="
      flex
      h-screen
      items-center
      justify-center
      bg-[url(/cessna-flight-deck.jpg)]
      bg-cover" sx={{ px: '0 !important'}}>
      <Container maxWidth={false} className="flex h-screen items-center justify-center bg-ct-blue/60">

      <Stack className="px-16 py-20 text-center rounded-md bg-white shadow-lg/90">
        <img src={logo200} width={200} className="self-center pb-10" />

        <Typography variant="h4">Checklist Trainer</Typography>
        <Typography variant="h5" className="font-thin text-2xl">Master your memory items</Typography>

        {isLoading && (<Typography variant="h5" className="font-thin pt-4">Loading...</Typography>)}

        <Button
          variant="outlined"
          className="mt-10 text-ct-blue border-ct-blue py-2 mb-2"
          onClick={() => loginWithRedirect({authorizationParams: {redirect_uri: 'http://localhost:5173/aircraft'}})}>Log In</Button>

        <Stack direction="row" className="flex items-center justify-center">
          <Typography variant="overline">
            Don't have an account?
          </Typography>
          <Button variant="text" onClick={() => loginWithRedirect({authorizationParams: { screen_hint: 'signup' }})}>
            <Typography variant="overline">Sign up</Typography>
          </Button>
        </Stack>
      </Stack>

      </Container>
    </Container>
  )
}