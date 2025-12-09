import { jwk } from "hono/jwk";

// FIXME: dynamic URI for dev and prod
export const jwtMiddleware = jwk({
  jwks_uri: `https://dev-sha0v78b1jbu5odf.us.auth0.com/.well-known/jwks.json`
});
