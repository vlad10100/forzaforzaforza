// Hono types
import type { Context, Next, HonoRequest } from "hono";

// Hono Exceptions
import { HTTPException } from "hono/http-exception";

// Hono cookie and jwt
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";

// Auth key
const AUTH_SIGNING_KEY = process.env.AUTH_SIGNING_KEY;

// append user to the request
export interface ForzaRequest extends HonoRequest {
  user_id?: string; // Add your custom property here
}

/*
Auth Guard
Check if the user is authenticated
*/
export const authGuard = async (context: Context, next: Next) => {
  const cookie = getCookie(context, "forza_cookie");
  if (!cookie) {
    throw new HTTPException(401, { message: "Auntentication Failed" });
  }
  if (!AUTH_SIGNING_KEY) {
    throw new HTTPException(400, { message: "Auth keys are not set" });
  }

  const verifiedCookie = await verify(cookie, AUTH_SIGNING_KEY);

  const datetimeNow = Math.floor(Date.now() / 1000);
  const isCookieValid = verifiedCookie.exp > datetimeNow;

  // should check user in db?

  if (!verifiedCookie || !isCookieValid) {
    throw new HTTPException(401, {
      message: "Invalid Session. Please Log In Again",
    });
  }

  const request: ForzaRequest = context.req;
  request.user_id = verifiedCookie.id;
  await next();
};
