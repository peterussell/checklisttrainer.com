import { Box, Checkbox, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router'
import { aircraftDetailQuery } from '../../../../queries/aircraftDetailQuery';
import type { Aircraft } from '../../../../../../core/models/Aircraft';
import { FlightDeckViewer } from '../../../../features/FlightDeckViewer/FlightDeckViewer';

export const Route = createFileRoute(
  '/_authenticated/aircraft/$aircraftId/learn',
)({
  component: LearnMode,
})

function LearnMode() {
  const { aircraftId } = Route.useParams();

  const { data } = useSuspenseQuery<Aircraft | null>({
    queryKey: ['aircraft', aircraftId],
    queryFn: () => aircraftDetailQuery(aircraftId),
  });

  // Also handled at parent, but repeat here to be safe
  if (!data) return <Typography>Failed to load aircraft</Typography>
  const aircraft: Aircraft = data;

  return (
    <>
      {/* Header row */}
      <Stack direction="row" className="w-full justify-between items-center">
        <Stack>
          {/* Title */}
          <Typography variant="h4" className="pb-0">
            {aircraft.registration}
            <ChevronRightIcon fontSize="large" className="pb-1" />
            Learn mode
          </Typography>
          <Typography variant="body2">{aircraft.description}</Typography>
        </Stack>
        
        {/* Back link */}
        <Stack direction="row">
          <ChevronLeftIcon />
          <Typography>
            <Link to="/aircraft/$aircraftId" params={{ aircraftId }}>Back to Checklists</Link>
          </Typography>
        </Stack>
      </Stack>

      <Stack direction="row" gap={3} className="py-8">
        <Stack>
          <Typography variant="h5" className="pt-0">Tasks</Typography>
          <List disablePadding className="w-70">
            <ListItem disablePadding>
              <ListItemIcon><Checkbox checked={true} disableRipple color="success" /></ListItemIcon>
              <ListItemText primary="Control lock - REMOVE" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon><Checkbox checked={true} disableRipple color="success" /></ListItemIcon>
              <ListItemText primary="Avionics - OFF" />
            </ListItem>
            <ListItem disablePadding className="border-2 border-gray-400">
              <ListItemIcon><Checkbox checked={false} disableRipple color="success" /></ListItemIcon>
              <ListItemText primary="Master switch battery - ON" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon><Checkbox checked={false} disableRipple color="success" /></ListItemIcon>
              <ListItemText primary="Fuel guages - CHECK" />
            </ListItem>
          </List>
        </Stack>
        <Box className="max-w-2/3">
          <FlightDeckViewer views={aircraft.views} />
        </Box>
      </Stack>
    </>
  )
}
