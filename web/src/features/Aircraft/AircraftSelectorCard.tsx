import { Card, CardActionArea, CardContent, CardMedia, Chip, Stack, Typography } from "@mui/material";

import type { AircraftSummary } from "@ct/core/models/AircraftSummary";

function AircraftSelectorCard ({aircraft}: {aircraft: AircraftSummary}) {
  return (
    <Card className="p0 m0">
      <CardActionArea href={`/aircraft/${aircraft.id}`}>
        <CardMedia component="img" image={aircraft.img} sx={{width: '360px', height: '280px'}}/>

        <CardContent>

          <Typography variant="h5">{aircraft.registration}</Typography>
          <Typography variant="body2" sx={{marginBottom: '16px !important'}}>{aircraft.description ?? '-'}</Typography>

          <Stack direction="row" gap={1}>
            <Typography>Normal checklists:</Typography>
            <Chip className="bg-green-700 text-white p-0" size="small" label={aircraft.normalChecklistCount ?? '0'} />
          </Stack>

          <Stack direction="row" gap={1}>
            <Typography>Emergency checklists:</Typography>
            <Chip className="bg-red-700 text-white p-0" size="small" label={aircraft.normalChecklistCount ?? '0'} />
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default AircraftSelectorCard;
