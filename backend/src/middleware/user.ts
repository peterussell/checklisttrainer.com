import { createMiddleware } from "hono/factory";
import { addUser, getUser } from "@persistence/user.js";
import { HTTPException } from "hono/http-exception";


export const userMiddleware = createMiddleware(async (c, next) => {
  // Look up user
  const payload = c.get('jwtPayload');
  const auth0Id = payload.sub;

  const user = await getUser(auth0Id);

  if (user) {
     // User found, add to context
    c.set('user', user);
  } else {
    // User not found, create and add new user to context
    await addUser(auth0Id);
    const createdUser = await getUser(auth0Id);

    if (createdUser) {
      c.set('user', createdUser);
    } else {
      throw new HTTPException(500, { message: 'Failed to create user' });
    }
  }

  await next();
});
