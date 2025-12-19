import { Hono } from 'hono';
import { handle } from 'hono/aws-lambda';

import { jwkMiddleware } from './middleware/jwk.js';
import { corsMiddleware } from './middleware/cors.js';
import { userMiddleware } from './middleware/user.js';
import { getAircraftById, getAllAircraftForUser } from '@persistence/aircraft.js';
import type { User } from '@ct/core/models/accounts/user.js';
import { HTTPException } from 'hono/http-exception';

type Variables = {
  user: User
}
const app = new Hono<{ Variables: Variables }>();

export const handler = handle(app);

// MARK: Middleware
app.use(corsMiddleware);
app.use(jwkMiddleware);
app.use(userMiddleware);

// MARK: Handlers
app.get('/aircraft', async (c) => {
  const allAircraft = await getAllAircraftForUser(c.var.user.auth0Id);
  return c.json(allAircraft);
});

app.get('/aircraft/:id', async (c) => {
  const id = c.req.param('id');
  const aircraft = await getAircraftById(id, c.var.user.auth0Id);
  if (!aircraft) throw new HTTPException(404, { message: 'Aircraft not found' });
  return c.json(aircraft);
});
