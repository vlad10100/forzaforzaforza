import { Hono } from "hono";
import { logger } from "hono/logger";
import type { Context } from "hono";
import { cors } from "hono/cors";

import auth from "./auth";
import strava from "./strava";
import user from "./user";

import { authGuard, ForzaRequest } from "./auth/authGuard";

const app = new Hono();

app.use("*", logger());
app.use(
  "*",
  cors({
    origin: "http://localhost:2020",
    credentials: true,
  }),
);

app.route("/auth", auth);
app.route("/user", user);
app.route("/strava", strava);

// guarded route
app.get("/", authGuard, async (context: Context) => {
  const request: ForzaRequest = context.req;
  return context.json({
    user_id: request.user_id,
    message: "USER FOUND",
  });
});

export default app;
