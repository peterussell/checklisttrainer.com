import { Hono } from 'hono';
import { handle } from 'hono/aws-lambda';
import { HTTPException } from 'hono/http-exception';

import { jwkMiddleware } from './middleware/jwk.js';
import { corsMiddleware } from './middleware/cors.js';
import { userMiddleware } from './middleware/user.js';
import { createAircraft, getAircraftById, getAllAircraftForUser } from '@persistence/aircraft.js';
import type { User } from '@ct/core/models/accounts/user.js';
import { AddAircraftDetailRequestSchema, type AddAircraftDetailRequest } from '@ct/core/api/AddAircraftDetailRequest.js';
import z from 'zod';

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

// Get all aircraft for user
app.get('/aircraft', async (c) => {
  const allAircraft = await getAllAircraftForUser(c.var.user.auth0Id);
  return c.json(allAircraft);
});

// Create aircraft
app.post('/aircraft', async (c) => {
  const data = await c.req.json();

  try {
    const aircraftDetail: AddAircraftDetailRequest = AddAircraftDetailRequestSchema.parse(data);
    const id = await createAircraft(aircraftDetail);
    return c.json({ success: true, data: {...data,  id}}, 400) // Success
  } catch(error) {
    if (error instanceof z.ZodError) {
      console.error(error.issues); // TODO: logger
      return c.json({ success: false }, 400);
    }

    // Non-Zod error
    console.error('Failed to create aircraft', error); // TODO: logger
    return c.json({ success: false }, 500);
  }
})

// Get aircraft by ID
app.get('/aircraft/:id', async (c) => {
  const id = c.req.param('id');
  const aircraft = await getAircraftById(id, c.var.user.auth0Id);
  if (!aircraft) throw new HTTPException(404, { message: 'Aircraft not found' });
  return c.json(aircraft);
});
