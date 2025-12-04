import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { handle } from 'hono/aws-lambda';

import { aircraft } from '../sample-data/getAircraft.js';
import { aircraftDetail } from '../sample-data/getAircraftDetail.js';

const app = new Hono();

export const handler = handle(app);

app.use('/*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length'],
  maxAge: 3600,
  // credentials: true
}))

app.get('/aircraft', (c) => {
  return c.json(aircraft);
})

app.get('/aircraft/:id', (c) => {
  const id = c.req.param('id');
  return c.json(aircraftDetail.filter(a => a.id === id)[0]); // TODO: better error checking
})
