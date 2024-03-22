ALTER TABLE "activities" ALTER COLUMN "distance" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "activities" ALTER COLUMN "moving_time" SET DATA TYPE numeric(10, 0);--> statement-breakpoint
ALTER TABLE "activities" ALTER COLUMN "elapsed_time" SET DATA TYPE numeric(10, 0);--> statement-breakpoint
ALTER TABLE "activities" ALTER COLUMN "total_elevation_gain" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "activities" ALTER COLUMN "average_speed" SET DATA TYPE numeric(10, 3);--> statement-breakpoint
ALTER TABLE "activities" ALTER COLUMN "max_speed" SET DATA TYPE numeric(10, 3);--> statement-breakpoint
ALTER TABLE "activities" ALTER COLUMN "average_heartrate" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "activities" ALTER COLUMN "max_heartrate" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "activities" ALTER COLUMN "max_watts" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "activities" ALTER COLUMN "weighted_average_watts" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "activities" ALTER COLUMN "average_cadence" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "activities" ALTER COLUMN "kilojoules" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "activities" ALTER COLUMN "calories" SET DATA TYPE numeric(10, 2);