import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import NavBar from '../../shared/layout/NavBar'
import { Container } from '@mui/material';

type RouterContext = {
  auth: {
    isLoading: boolean,
    isAuthenticated: boolean,
    loginWithRedirect: () => void
  }
};

/*
 * Layout route for authenticated pages
 */
export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <NavBar />
      <Container className="mt-4">
        <Outlet />
      </Container>
    </>
  ),
})
