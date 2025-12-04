export const api = new sst.aws.ApiGatewayV2("ct-api");

// Pass all routes to backend for Hono to handler
api.route("ANY /{proxy+}", "backend/src/index.handler");
