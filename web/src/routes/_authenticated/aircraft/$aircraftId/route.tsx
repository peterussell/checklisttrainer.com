import { createFileRoute, Outlet } from '@tanstack/react-router'

// const FIVE_MINUTES = 1000 * 60 * 5;

export const Route = createFileRoute('/_authenticated/aircraft/$aircraftId')({
  // FIXME: this isn't playing nicely with the axios auth interceptor to add the JWT header, but it
  // would be nice to re-implement this so we preload aircraft data for all nested routes.

  // loader: async ({ params, context }) => context.queryClient.ensureQueryData({
  //   queryKey: ['aircraft', params.aircraftId],
  //   queryFn: () => aircraftDetailQuery(params.aircraftId),
  //   staleTime: FIVE_MINUTES
  // }),
  component: () => <Outlet />,
});

