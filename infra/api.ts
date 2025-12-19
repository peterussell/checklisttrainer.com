import { accounts as accountsTable, aircraft as aircraftTable } from './db';
import { aircraftBucket } from './storage';

// URL
let API_DOMAIN;

if (!$dev) {
  API_DOMAIN = $app.stage === "prod" ? "api.checklisttrainer.com" : "dev.api.checklisttrainer.com";
}

export const api = new sst.aws.ApiGatewayV2("ct-api", {
  domain: API_DOMAIN,
  transform: {
    route: {
      handler: {
        link: [accountsTable, aircraftTable, aircraftBucket]
      }
    }
  }
});

// Proxy all routes to backend for Hono to handle
api.route("ANY /{proxy+}", "backend/src/index.handler");
