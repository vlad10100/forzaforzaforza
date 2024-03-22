// Hono
import { Hono } from "hono";
import type { Context } from "hono";
import { setCookie, deleteCookie } from "hono/cookie";
import { HTTPException } from "hono/http-exception";

// Drizzle
import db from "../drizzle/db";
import { users } from "../drizzle/schema";
import { eq, and } from "drizzle-orm";

// Auth keys
const AUTH_SIGNING_KEY = process.env.AUTH_SIGNING_KEY;
const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME;

// Cookie
import { jwtAuthCookie, cookieConfig } from "./cookie";

// Hono
const auth = new Hono();

/**
POST /auth
Login or create a new user with Google OAuth
*/
auth.post("/", async (context: Context) => {
  const { google_user_id, email } = await context.req.json();
  if (!AUTH_SIGNING_KEY || !AUTH_COOKIE_NAME) {
    throw new HTTPException(400, { message: "Auth keys are not set" });
  }

  if (!db) {
    throw new HTTPException(400, {
      message: "Failed to connect to the database",
    });
  }

  // GET user
  const user = await db.query.users.findFirst({
    where: and(
      eq(users.email, email),
      eq(users.google_user_id, google_user_id),
    ),
  });

  // Existing user flow
  if (user) {
    // Create JWT token
    const jwtToken = await jwtAuthCookie(user.id, AUTH_SIGNING_KEY);

    // Set Cookie
    setCookie(context, AUTH_COOKIE_NAME, jwtToken, cookieConfig);
    const isNewUser =
      user.username === "" ||
      user.first_name === "" ||
      user.last_name === "" ||
      user.age === null;
    context.status(200);
    return context.json({ user: user, new_user: isNewUser });
  }

  // New user flow
  const newUser = await db
    .insert(users)
    .values({
      email: email,
      google_user_id: google_user_id,
    })
    .returning();

  if (!newUser) {
    throw new HTTPException(400, { message: "Failed to create a new user" });
  }

  // Create JWT token
  const jwtToken = await jwtAuthCookie(newUser[0].id, AUTH_SIGNING_KEY);

  // Set Cookie
  setCookie(context, AUTH_COOKIE_NAME, jwtToken, cookieConfig);
  context.status(200);
  return context.json({ user: newUser[0], new_user: true });
});

/**
Logout
*/
auth.post("/logout", (context: Context) => {
  if (!AUTH_COOKIE_NAME) {
    throw new HTTPException(400, { message: "Auth keys are not set" });
  }
  deleteCookie(context, AUTH_COOKIE_NAME);
  return context.json({ message: "Logged out" });
});

export default auth;
