import { Hono } from 'hono';
import { handle } from 'hono/aws-lambda';

import { aircraft } from '../sample-data/getAircraft.js';
import { aircraftDetail } from '../sample-data/getAircraftDetail.js';
import { jwkMiddleware } from './middleware/jwk.js';
import { corsMiddleware } from './middleware/cors.js';
import { userMiddleware } from './middleware/user.js';

const app = new Hono();

export const handler = handle(app);

// MARK: Middleware
app.use(corsMiddleware);
app.use(jwkMiddleware);
app.use(userMiddleware);

// MARK: Handlers
app.get('/aircraft', (c) => {
  return c.json(aircraft);
});

app.get('/aircraft/:id', (c) => {
  const id = c.req.param('id');
  return c.json(aircraftDetail.filter(a => a.id === id)[0]); // TODO: better error checking
});
