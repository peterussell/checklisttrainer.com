import type { Aircraft } from "@models/Aircraft";
import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";

function AircraftSelectorCard ({aircraft}: {aircraft: Aircraft}) {
  return (
    <Card className="m-6 pr-4">
      <Stack direction="row">
      <CardMedia component="img" image={aircraft.img} sx={{height: '200px', width: '300px', m: 1, borderRadius: 1}}/>
      <CardContent>
        <Typography variant="h5">
          <Link to={`/aircraft/${aircraft.id}`}>{aircraft.registration}</Link>
          </Typography>
        <Typography>{aircraft.description ?? '-'}</Typography>
        <Typography>Normal checklists: {aircraft.normalChecklistCount ?? '-'}</Typography>
        <Typography>Emergency checklists: {aircraft.emergencyChecklistCount ?? '-'}</Typography>
      </CardContent>
      </Stack>
    </Card>
  )
}

export default AircraftSelectorCard;
