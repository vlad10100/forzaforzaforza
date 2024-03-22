import { sign } from "hono/jwt";

export const jwtAuthCookie = async (id: string, secret: string) => {
  const cookie = await sign(
    {
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7days * 24hrs * 60min * 60sec
      id,
    },
    secret,
  );
  return cookie;
};

export const cookieConfig = {
  httpOnly: true,
  secure: true,
  path: "/",
  maxAge: 7 * 24 * 60 * 60, // 7days * 24hrs * 60min * 60sec
};
