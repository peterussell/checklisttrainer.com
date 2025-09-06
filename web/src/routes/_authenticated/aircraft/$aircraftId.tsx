import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import type { Aircraft } from '../../../../../core/models/Aircraft'; // TODO: move to @ct
import type { Checklist } from '../../../../../core/models/Checklist'; // TODO: move to @ct

export const Route = createFileRoute('/_authenticated/aircraft/$aircraftId')({
  component: AircraftDetail,
})

// TODO: working here - fetch aircraft detail and display

function AircraftDetail() {
  const { aircraftId } = Route.useParams()
  
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['aircraft'],
    queryFn: async () => {
      if (aircraftId === null) return;
      const response = await fetch(`http://localhost:3000/aircraft/${aircraftId}`); // FIXME: env variable!
      return await response.json();
    }
  });

  if (isPending || isFetching) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Failed to load aircraft. Please try refreshing the page.</Typography>
  if (!data?.length) return <Typography>Aircraft not found.</Typography>
  if (data.length > 1) return <Typography>Failed to load aircraft.</Typography>

  const aircraft: Aircraft = data[0];

  return (
    <>
      <Stack direction="row" gap={2} className="flex items-center">
        <img src={`/${aircraft.img}`} className="w-32 h-32 rounded-full object-cover" />
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
          {checklists.map((c: Checklist) => (
            <Stack direction="row" gap={1} className="flex items-center py-4 border-b border-b-gray-200">
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
                    onClick={() => navigate({to: `/aircraft/${aircraftId}/learn`})} />

                  {/* Practice */}
                  <Chip
                    label="Practice"
                    size="small"
                    className="bg-green-600/30 hover:bg-green-600/50 text-green-800 px-2"
                    onClick={() => navigate({to: `/aircraft/${aircraftId}/learn`})} />

                  {/* Test */}
                  <Chip
                    label="Test"
                    size="small"
                    className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-2"
                    onClick={() => navigate({to: `/aircraft/${aircraftId}/learn`})} />
                </Stack>

                <ChevronRightIcon className="text-lg" />
                <Typography>{c.name}</Typography>
              </Stack>
          ))}
        </CardContent>
      </Card>
  )
};
