import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import NavBar from '../shared/layout/NavBar'
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
      <Container className="pt-4">
        <Outlet />
      </Container>
      <TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
    </>
  ),
})
