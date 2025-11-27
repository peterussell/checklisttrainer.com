import { createFileRoute, Outlet } from '@tanstack/react-router'
import { aircraftDetailQuery } from '../../../../queries/aircraftDetailQuery';

const FIVE_MINUTES = 1000 * 60 * 5;

export const Route = createFileRoute('/_authenticated/aircraft/$aircraftId')({
  loader: async ({ params, context }) => context.queryClient.ensureQueryData({
    queryKey: ['aircraft', params.aircraftId],
    queryFn: () => aircraftDetailQuery(params.aircraftId),
    staleTime: FIVE_MINUTES
  }),
  component: () => <Outlet />,
});

