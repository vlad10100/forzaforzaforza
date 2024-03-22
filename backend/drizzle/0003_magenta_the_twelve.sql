ALTER TABLE "activities" ALTER COLUMN "splits_metric" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "activities" ALTER COLUMN "splits_metric" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "activities" ALTER COLUMN "laps_metric" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "activities" ALTER COLUMN "laps_metric" SET NOT NULL;