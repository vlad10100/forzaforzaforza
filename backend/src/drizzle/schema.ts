import {
  pgTable,
  varchar,
  uuid,
  date,
  integer,
  timestamp,
  foreignKey,
  boolean,
  text,
  json,
  decimal,
} from "drizzle-orm/pg-core";

import { shirtSizeEnum, genderEnum } from "./enums";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  google_user_id: varchar("google_user_id", { length: 255 }),
  connected_to_strava: boolean("connected_to_strava").default(false),
  strava_access_token: varchar("strava_access_token", { length: 255 }),
  strava_refresh_token: varchar("strava_refresh_token", { length: 255 }),

  email: varchar("email", { length: 255 }),
  first_name: varchar("first_name", { length: 255 }),
  last_name: varchar("last_name", { length: 255 }),
  username: varchar("username", { length: 24 }),

  birthday: date("birthday", { mode: "date" }),
  age: varchar("age", { length: 255 }),
  gender: genderEnum("gender"),
  height: integer("height"),
  weight: integer("weight"),

  singlet_size: shirtSizeEnum("singlet_size"),
  shirt_size: shirtSizeEnum("shirt_size"),
  shoes_size: integer("shoes_size"),

  created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }),
  deleted_at: timestamp("deleted_at", { mode: "date" }),
});

export const activities = pgTable(
  "activities",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    user_id: uuid("user_id"),

    activity_id: varchar("activity_id", { length: 255 }).unique(),
    activity_name: varchar("activity_name", { length: 255 }),
    activity_date: date("activity_date", { mode: "date" }),
    sport_type: varchar("sport_type", { length: 255 }), // create an enum
    workout_type: varchar("workout_type", { length: 255 }),

    distance: decimal("distance", { precision: 10, scale: 2 }),
    moving_time: decimal("moving_time", { precision: 10, scale: 0 }),
    elapsed_time: decimal("elapsed_time", { precision: 10, scale: 0 }),

    total_elevation_gain: decimal("total_elevation_gain", {
      precision: 10,
      scale: 2,
    }),

    average_speed: decimal("average_speed", { precision: 10, scale: 3 }),
    max_speed: decimal("max_speed", { precision: 10, scale: 3 }),

    manual: boolean("manual"),
    race: boolean("race"),
    has_heartrate: boolean("has_heartrate"),
    device_watts: boolean("device_watts"),

    average_heartrate: decimal("average_heartrate", {
      precision: 10,
      scale: 2,
    }),
    max_heartrate: decimal("max_heartrate", { precision: 10, scale: 2 }),
    max_watts: decimal("max_watts", { precision: 10, scale: 2 }),
    weighted_average_watts: decimal("weighted_average_watts", {
      precision: 10,
      scale: 2,
    }),
    average_cadence: decimal("average_cadence", { precision: 10, scale: 2 }),

    kilojoules: decimal("kilojoules", { precision: 10, scale: 2 }),
    calories: decimal("calories", { precision: 10, scale: 2 }),

    country: varchar("country", { length: 255 }),
    summary_polyline: text("summary_polyline"),

    splits_metric: json("splits_metric").$type<[]>().notNull(),
    laps_metric: json("laps_metric").$type<[]>().notNull(),

    created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
  },
  (table) => {
    return {
      parentReference: foreignKey({
        columns: [table.user_id],
        foreignColumns: [users.id],
        name: "user_fk",
      }).onDelete("cascade"),
    };
  }
);
