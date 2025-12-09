import { Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import type { Aircraft } from '@ct/core/models/Aircraft';
import type { Checklist } from '@ct/core/models/Checklist';
import { aircraftDetailQuery } from '../../../../queries/aircraftDetailQuery';

export const Route = createFileRoute('/_authenticated/aircraft/$aircraftId/')({
  component: AircraftDetail,
})

function AircraftDetail() {
  const { aircraftId } = Route.useParams();

  const { data } = useSuspenseQuery<Aircraft | null>({
    queryKey: ['aircraft', aircraftId],
    queryFn: async () => aircraftDetailQuery(aircraftId)
  });

  // Also handled at parent, but repeat here to be safe
  if (!data) return <Typography>Failed to load aircraft</Typography>
  const aircraft: Aircraft = data;

  return (
    <>
      <Stack direction="row" gap={2} className="flex items-center">
        <img
          src={`/${aircraft.views.find(v => v.isDefault)?.src ?? aircraft.views[0]?.src}`}
          className="w-32 h-32 rounded-full object-cover"
        />
        <Stack>
          <Typography variant="h4" className="pb-0">{aircraft.registration}</Typography>
          <Typography variant="body2">{aircraft.description}</Typography>
        </Stack>
      </Stack>

      {/* Emergency procedures */}
      <ChecklistsCard
        title="Emergency Procedures"
        checklists={aircraft.checklists.filter(c => c.type === 'emergency')}
        aircraftId={aircraft.id} />

      {/* Normal procedures */}
      <ChecklistsCard
        title="Normal Procedures"
        checklists={aircraft.checklists.filter(c => c.type === 'normal')}
        aircraftId={aircraft.id} />
    </>
  );
};

type ChecklistsCardProps = { checklists: Checklist[], title: string, aircraftId: string };

function ChecklistsCard({checklists, title, aircraftId}: ChecklistsCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="my-4">
        <CardContent>
          <Typography variant="h5" className="pt-0">{title}</Typography>
          {checklists.map((c: Checklist, i: number) => (
            <Stack key={i} direction="row" gap={1} className="flex items-center py-4 border-b border-b-gray-200">
              {/* Chips stack */}
              <Stack
                className="align-self-right"
                direction="row"
                gap={1}
                divider={<Typography className="text-gray-200">|</Typography>}>
                  {/* Learn */}
                  <Chip
                    label="Learn"
                    size="small"
                    className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-2"
                    onClick={() => navigate({to: `/aircraft/${aircraftId}/${c.slug}/learn`})} />

                  {/* Practice */}
                  <Chip
                    label="Practice"
                    size="small"
                    className="bg-green-600/30 hover:bg-green-600/50 text-green-800 px-2"
                    onClick={() => navigate({to: `/aircraft/${aircraftId}/${c.slug}/practice`})} />

                  {/* Test */}
                  <Chip
                    label="Test"
                    size="small"
                    className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-2"
                    onClick={() => navigate({to: `/aircraft/${aircraftId}/${c.slug}/test`})} />
                </Stack>

                <ChevronRightIcon className="text-lg" />
                <Typography>{c.name}</Typography>
              </Stack>
          ))}
        </CardContent>
      </Card>
  )
};
