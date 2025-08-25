import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools' // TODO: move to root
import NavBar from '../../shared/layout/NavBar'
import { Container } from '@mui/material';

type RouterContext = {
  auth: {
    isLoading: boolean,
    isAuthenticated: boolean,
    loginWithRedirect: () => void
  }
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <NavBar />
      <Container>
        <Outlet />
      </Container>
    </>
  ),
})
