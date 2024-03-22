import { Hono } from "hono";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

import { ForzaRequest, authGuard } from "../auth/authGuard";

import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { users } from "../drizzle/schema";

const user = new Hono();

user.get("/", authGuard, async (context: Context) => {
  const request: ForzaRequest = context.req;
  const user_id = request.user_id;
  if (!db) {
    throw new HTTPException(400, {
      message: "Failed to connect to the database",
    });
  }
  if (!user_id) {
    throw new HTTPException(401, { message: "User not found" });
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, user_id),
  });
  if (!user) {
    throw new HTTPException(401, { message: "User not found" });
  }

  return context.json(user);
});

user.post("/:user_id", authGuard, async (context: Context) => {
  const { user_id } = context.req.param();
  const body = await context.req.json();
  if (!db) {
    throw new HTTPException(400, {
      message: "Failed to connect to the database",
    });
  }

  const payload = {
    first_name: body.first_name,
    last_name: body.last_name,
    username: body.username,
    birthday: new Date(body.birthday),
    age: body.age,
    gender: body.gender,
    height: body.height,
    weight: body.weight,
  };
  const user = await db
    .update(users)
    .set(payload)
    .where(eq(users.id, user_id))
    .returning();

  return context.json(user[0]);
});

export default user;
