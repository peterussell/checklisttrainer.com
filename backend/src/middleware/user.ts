import { createMiddleware } from "hono/factory";
import { addUser, getUser } from "@persistence/user.js";
import { HTTPException } from "hono/http-exception";


export const userMiddleware = createMiddleware(async (c, next) => {
  // Look up user and add to context
  const payload = c.get('jwtPayload');
  const auth0Id = payload.sub;

  const user = await getUser(auth0Id);

  if (user) {
    c.set('user', user);
  } else {
    await addUser(auth0Id);
    
    // User created, now try and get the user again
    const createdUser = await getUser(auth0Id);
    if (createdUser) {
      c.set('user', createdUser);
    } else {
      throw new HTTPException(500, { message: 'Failed to create user' });
    }
  }

  await next();
});
