import { Outlet, createFileRoute } from '@tanstack/react-router'
import NavBar from '@shared/layout/NavBar'
import { Container } from '@mui/material';

/*
 * Layout route for authenticated pages
 */
export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    if (!context.auth.isLoading && !context.auth.isAuthenticated) {
      context.auth.loginWithRedirect();
    }
  },
  component: () => (
    <>
      <NavBar />
      <Container className="mt-4">
        <Outlet />
      </Container>
    </>
  ),
})
