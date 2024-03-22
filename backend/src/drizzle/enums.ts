import { pgEnum } from "drizzle-orm/pg-core";

export const genderEnum = pgEnum("gender", ["male", "female", "non-binary"]);
export const shirtSizeEnum = pgEnum("shirt_size", [
  "xxs",
  "xs",
  "s",
  "m",
  "l",
  "xl",
  "xxl",
]);
