import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import NavBar from '../shared/layout/NavBar'

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
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
    </>
  ),
})
