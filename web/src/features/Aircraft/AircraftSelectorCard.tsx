import type { Aircraft } from "@models/Aircraft";
import type { ChecklistSummary } from "@models/ChecklistSummary";
import { Box, Card, CardContent, CardMedia, List, ListItem, Stack, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";

function AircraftSelectorCard ({aircraft}: {aircraft: Aircraft}) {
  return (
    <Card className="m-6 flex">
      <CardMedia component="img" image={aircraft.img} sx={{height: '200px', width: '300px', m: 1, borderRadius: 1}}/>
      <CardContent sx={{flexGrow: 1}}>
        <Typography variant="h5">{aircraft.name}</Typography>

        <Stack direction="row" sx={{flexGrow: 1}} pt={2} gap={4}>

          {/* Emergency checklists */}
          <Box maxWidth="50%">
            <Typography variant="h6">Emergency checklists</Typography>
            <List sx={{paddingTop: 0}}>
              {aircraft.checklists.filter((checklist: ChecklistSummary) => checklist.type === 'emergency').map((c: ChecklistSummary) => (
                  <ListItem className="px-0 text-sm hover:bg-slate-100" divider>
                    <Link to={`/aircraft/${aircraft.id}/${c.slug}`}>
                      {c.name}
                    </Link>
                  </ListItem>
                ))}
            </List>
          </Box>

          {/* Normal checkists */}
          <Box maxWidth="50%">
            <Typography variant="h6">Normal checklists</Typography>
            <List sx={{paddingTop: 0}}>
              {aircraft.checklists.filter((checklist: ChecklistSummary) => checklist.type === 'normal').map((c: ChecklistSummary) => (
                  <ListItem className="px-0 text-sm hover:bg-slate-100" divider>
                    <Link to={`/aircraft/${aircraft.id}/${c.slug}`}>
                      {c.name}
                    </Link>
                  </ListItem>
                ))}
            </List>
          </Box>
        </Stack>
        
      </CardContent>
    </Card>
  )
}

export default AircraftSelectorCard;
