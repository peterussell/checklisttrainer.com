// URL
let API_DOMAIN;

if (!$dev) {
  API_DOMAIN = $app.stage === "prod" ? "api.checklisttrainer.com" : "dev.api.checklisttrainer.com";
}

export const api = new sst.aws.ApiGatewayV2("ct-api", {
  domain: API_DOMAIN
});

// Proxy all routes to backend for Hono to handle
api.route("ANY /{proxy+}", "backend/src/index.handler");
