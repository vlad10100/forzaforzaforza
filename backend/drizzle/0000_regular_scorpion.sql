CREATE TABLE IF NOT EXISTS "activities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"activity_id" varchar(255),
	"activity_name" varchar(255),
	"activity_date" date,
	"sport_type" varchar(255),
	"workout_type" varchar(255),
	"distance" numeric(10, 5),
	"moving_time" numeric(10, 5),
	"elapsed_time" numeric(10, 5),
	"total_elevation_gain" numeric(10, 5),
	"average_speed" numeric(10, 5),
	"max_speed" numeric(10, 5),
	"manual" boolean,
	"race" boolean,
	"has_heartrate" boolean,
	"device_watts" boolean,
	"average_heartrate" numeric(10, 5),
	"max_heartrate" numeric(10, 5),
	"max_watts" numeric(10, 5),
	"weighted_average_watts" numeric(10, 5),
	"average_cadence" numeric(10, 5),
	"kilojoules" numeric(10, 5),
	"calories" numeric(10, 5),
	"country" varchar(255),
	"summary_polyline" text,
	"splits_metric" json,
	"laps_metric" json,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "activities_activity_id_unique" UNIQUE("activity_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"google_user_id" varchar(255),
	"connected_to_strava" boolean DEFAULT false,
	"strava_access_token" varchar(255),
	"strava_refresh_token" varchar(255),
	"email" varchar(255),
	"first_name" varchar(255),
	"last_name" varchar(255),
	"username" varchar(24),
	"birthday" date,
	"age" varchar(255),
	"gender" "gender",
	"height" integer,
	"weight" integer,
	"singlet_size" "shirt_size",
	"shirt_size" "shirt_size",
	"shoes_size" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"deleted_at" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activities" ADD CONSTRAINT "user_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
