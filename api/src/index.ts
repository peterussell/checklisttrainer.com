import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { aircraft } from '../sample-data/getAircraft.js';
import { aircraftDetail } from '../sample-data/getAircraftDetail.js';

const app = new Hono()

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

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
