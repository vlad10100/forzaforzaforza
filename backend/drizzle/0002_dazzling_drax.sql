ALTER TABLE "activities" ALTER COLUMN "splits_metric" SET DEFAULT '[]'::json;--> statement-breakpoint
ALTER TABLE "activities" ALTER COLUMN "laps_metric" SET DEFAULT '[]'::json;