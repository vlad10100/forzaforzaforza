import { Hono } from "hono";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

import db from "../drizzle/db";
import { eq, desc, and } from "drizzle-orm";
import { users, activities } from "../drizzle/schema";
import { authGuard, ForzaRequest } from "../auth/authGuard";

const strava = new Hono();

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const url = "https://www.strava.com/api/v3/oauth/token";

type ActivityData = {
  resource_state: number;
  athlete: {
    id: string;
    resource_state: number;
  };
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  type: string;
  sport_type: string;
  workout_type: null;
  id: number;
  start_date: string;
  start_date_local: string;
  timezone: string;
  utc_offset: number;
  location_city: null;
  location_state: null;
  location_country: string;
  achievement_count: number;
  kudos_count: number;
  comment_count: number;
  athlete_count: number;
  photo_count: number;
  map: {
    id: string;
    summary_polyline: string;
    resource_state: number;
  };
  trainer: boolean;
  commute: boolean;
  manual: boolean;
  private: boolean;
  visibility: string;
  flagged: boolean;
  gear_id: string;
  start_latlng: [number, number];
  end_latlng: [number, number];
  average_speed: number;
  max_speed: number;
  average_cadence: number;
  average_watts: number;
  max_watts: number;
  weighted_average_watts: number;
  kilojoules: number;
  device_watts: boolean;
  has_heartrate: boolean;
  average_heartrate: number;
  max_heartrate: number;
  heartrate_opt_out: boolean;
  display_hide_heartrate_option: boolean;
  elev_high: number;
  elev_low: number;
  upload_id: number;
  upload_id_str: string;
  external_id: string;
  from_accepted_tag: boolean;
  pr_count: number;
  total_photo_count: number;
  has_kudoed: boolean;
};

const authenticate = async (code: string) => {
  const payload = {
    client_id: STRAVA_CLIENT_ID,
    client_secret: STRAVA_CLIENT_SECRET,
    code: code,
    grant_type: "authorization_code",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const { refresh_token } = await response.json();
    return refresh_token;
  } catch (error) {
    return null;
  }
};

const getTokens = async (refreshToken: string, user_id: string) => {
  const payload = {
    client_id: STRAVA_CLIENT_ID,
    client_secret: STRAVA_CLIENT_SECRET,
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (!data.access_token || !data.refresh_token) {
      throw new HTTPException(400, {
        message: "Failed to authenticate with strava",
      });
    }
    if (!db) {
      throw new HTTPException(400, {
        message: "Failed to connect to the database",
      });
    }

    const tokens = {
      strava_refresh_token: data.refresh_token,
      strava_access_token: data.access_token,
      connected_to_strava: true,
    };

    await db.update(users).set(tokens).where(eq(users.id, user_id));
  } catch (error) {
    return null;
  }
};

const getAthleteActivities = async (
  access_token: string,
  before: string,
  after: string
) => {
  const headers = {
    Authorization: `Bearer ${access_token}`,
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  };
  const url = `https://www.strava.com/api/v3/activities?before=${before}&after=${after}&per_page=200&access_token=${access_token}`;
  const response = await fetch(url, {
    method: "GET",
    headers,
  });
  return await response.json();
};

const getActivityById = async (access_token: string, activity_id: string) => {
  const headers = {
    Authorization: `Bearer ${access_token}`,
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  };
  const url = `https://www.strava.com/api/v3/activities/${activity_id}`;
  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  return await response.json();
};

/*
Strava auth endpoint
*/
strava.post("/auth", authGuard, async (context: Context) => {
  const request: ForzaRequest = context.req;
  const user_id = request.user_id;
  const { code } = await context.req.json();

  if (!user_id) {
    throw new HTTPException(401, { message: "User not found" });
  }

  if (!db) {
    throw new HTTPException(400, {
      message: "Failed to connect to the database",
    });
  }

  const refreshToken = await authenticate(code);
  await getTokens(refreshToken, user_id);

  const user = await db.query.users.findFirst({
    where: eq(users.id, user_id),
  });

  return context.json({
    user,
  });
});

/*
Fetch and Save activities
*/
strava.post(
  "/activities/:after/:before",
  authGuard,
  async (context: Context) => {
    const { before, after } = context.req.param();
    const request: ForzaRequest = context.req;
    const user_id = request.user_id;

    if (!user_id) {
      throw new HTTPException(401, { message: "User not found" });
    }

    if (!db) {
      throw new HTTPException(400, {
        message: "Failed to connect to the database",
      });
    }

    const database = db;

    try {
      const user = await database.query.users.findFirst({
        where: eq(users.id, user_id),
      });

      if (!user || !user.strava_access_token || !user.strava_refresh_token) {
        throw new HTTPException(400, {
          message: "Strava access not found",
        });
      }

      const athlete_activities = await getAthleteActivities(
        user.strava_access_token,
        before,
        after
      );

      // refetch strava tokens and do the query again
      if (athlete_activities.message === "Authorization Error") {
        await getTokens(user.strava_refresh_token, user_id);
        return context.redirect(`/strava/activities/${before}/${after}`);
      }

      athlete_activities.forEach(async (item: ActivityData) => {
        try {
          const activity_payload: any = {
            user_id: user_id,
            activity_id: item.id,
            activity_name: item.name,
            activity_date: new Date(item.start_date),
            sport_type: item.sport_type,
            workout_type: item.workout_type,
            distance: item.distance,
            moving_time: item.moving_time,
            elapsed_time: item.elapsed_time,
            total_elevation_gain: item.total_elevation_gain,
            average_speed: item.average_speed,
            max_speed: item.max_speed,
            manual: item.manual,
            race: false,
            has_heartrate: item.has_heartrate,
            device_watts: item.device_watts,
            average_heartrate: item.average_heartrate,
            max_heartrate: item.max_heartrate,
            max_watts: item.max_watts,
            weighted_average_watts: item.weighted_average_watts,
            average_cadence: item.average_cadence,
            kilojoules: item.kilojoules,
            calories: null,
            country: item.location_country,
            summary_polyline: item.map.summary_polyline,
            splits_metric: [],
            laps_metric: [],
          };

          await database
            .insert(activities)
            .values(activity_payload)
            .onConflictDoNothing();
        } catch (error) {
          console.log(error);
        }
      });

      return context.json("Connected to strava");
    } catch (error) {
      console.log(error);
      throw new HTTPException(400, {
        message: "Failed to fetch and save athlete activities",
      });
    }
  }
);

strava.get("/athlete-activities", authGuard, async (context: Context) => {
  const request: ForzaRequest = context.req;
  const user_id = request.user_id;

  if (!user_id) {
    throw new HTTPException(401, { message: "User not found" });
  }

  if (!db) {
    throw new HTTPException(400, {
      message: "Failed to connect to the database",
    });
  }

  //activity_date
  try {
    const athlete_activities = await db.query.activities.findMany({
      where: eq(activities.user_id, user_id),
      orderBy: [desc(activities.activity_date)],
    });

    return context.json(athlete_activities);
  } catch (error) {
    throw new HTTPException(400, {
      message: "Failed to get athlete activities",
    });
  }
});

strava.get(
  "/athlete/activity/:activity_id",
  authGuard,
  async (context: Context) => {
    const request: ForzaRequest = context.req;
    const user_id = request.user_id;
    const { activity_id } = context.req.param();

    if (!user_id) {
      throw new HTTPException(401, { message: "User not found" });
    }

    if (!activity_id) {
      throw new HTTPException(401, { message: "Invalid request" });
    }

    if (!db) {
      throw new HTTPException(400, {
        message: "Failed to connect to the database",
      });
    }
    const database = db;

    const user = await database.query.users.findFirst({
      where: eq(users.id, user_id),
    });

    if (!user || !user.strava_access_token || !user.strava_refresh_token) {
      throw new HTTPException(400, {
        message: "Strava access not found",
      });
    }

    const access_token = user.strava_access_token;

    if (!access_token) {
      await getTokens(user.strava_refresh_token, user_id);
      return context.redirect(`/strava/athlete/activity/${activity_id}`);
    }

    const activity = await database.query.activities.findFirst({
      where: eq(activities.activity_id, activity_id),
    });

    if (!activity) {
      throw new HTTPException(400, { message: "Activity not found" });
    }
    if (activity.laps_metric.length || activity.splits_metric.length) {
      return context.json(activity);
    }

    const resp = await getActivityById(access_token, activity_id);
    if (resp.message === "Authorization Error") {
      await getTokens(user.strava_refresh_token, user_id);
      return context.redirect(`/strava/athlete/activity/${activity_id}`);
    }

    // update activity
    const updatedActivity = await database
      .update(activities)
      .set({
        laps_metric: resp.laps,
        splits_metric: resp.splits_metric,
      })
      .where(
        and(
          eq(activities.user_id, user_id),
          eq(activities.activity_id, activity_id)
        )
      )
      .returning();

    return context.json(updatedActivity[0]);
  }
);

export default strava;
